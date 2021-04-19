import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { StateService } from '@uirouter/angular';

import { AuthService } from '../../../commons/services/users/auth.service';
import { StreamService } from '../../../commons/services/channels/stream.service';
import { ChannelService } from '../../../commons/services/channels/channel.service';

import { Channel } from '../../../commons/models/channels.model';
import { PipeCollector } from '@angular/compiler/src/template_parser/binding_parser';


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styles: [
  ]
})
export class ChannelComponent implements OnInit {

  @ViewChild('sc', { static: false }) sc?: ElementRef;
  @ViewChild('peerstream', { static: false }) peerstream?: ElementRef;

  #media: MediaStream = new MediaStream();
  #medialist = new Array();
  #connections = new Array();
  #channelId: string;


  channel = {} as Channel;

  constructor(
    private state: StateService,
    private chan: ChannelService,
    private auth: AuthService,
    private session: StreamService,
    private renderer: Renderer2
  ) {
    this.#channelId = state.params.id;
  }

  ngOnInit(): void {
    // load channel information
    this.chan.getChannel(this.#channelId)
      .then((resp: any) => {
        this.channel = resp as Channel;
      })
    ;
  }

  get hasMedia() {
    return this.#media.active;
  }

  async connect() {
    const userID = this.auth.user.id;
    // establish the connection to the session (via socket)
    this.session.connect(this.#channelId);

    // create stream
    this.#media = await navigator.mediaDevices.getUserMedia({
      video: true, audio: true
    });
    this.createStream(this.#media, this.auth.user.id);

    // send signal
    this.session.send("request-offer", userID);

    this.session.stream
      .pipe()
      .subscribe((msg: any) => {
        if(userID !== msg.user.uid) {
          switch(msg.type) {
            case 'request-offer': {
              this.createOffer(msg.user.uid);
              break;
            }
            case 'video-offer': {
              this.handleOffer(msg);
              break;
            }
            case 'answer-sdp-call': {
              this.getPC(msg.user.uid)
                .setRemoteDescription(msg.sdp)
              ;
              break;
            }
            case 'new-ice-candidate': {
              this.handleCandidateMessage(msg);
              break;
            }
            case 'controls-update': {
              this.updateStream(msg);
              break;
            }
            case 'hang-up': {
              this.endStream(msg.user.uid, this.getPC(msg.user.uid));
            }
          }
        }
      });
  }

  private async createOffer(peerUID: any) {
    let pc = await this.createPC(peerUID);

    this.#media.getTracks().forEach(track => {
      pc.addTrack(track, this.#media);
    })
  }

  private async handleOffer(msg: any) {
    const offer = new RTCSessionDescription(msg.sdp);
    const peerUID = msg.user.uid;
    
    // create peer connection
    this.createPC(peerUID);
    const pc = this.getPC(peerUID);

    // set offer sdp as remote sdp
    await pc.setRemoteDescription(offer);

    // add local stream to the RTCPeerConnection
    this.#media.getTracks().forEach(track =>
      pc.addTrack(track, this.#media)
    );

    // create answer sdp
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    // send answer back to the caller
    this.session.send("answer-sdp-call", this.auth.user.id, peerUID, null, answer);
  }

  private handleCandidateMessage(msg: any) {
    this.getPC(msg.user.uid).addIceCandidate(
      new RTCIceCandidate(msg.ice)
    );
  }

  //--

  /* create a peer connection
   */
  private createPC(peerUID: any) {
    const c = new RTCPeerConnection({
      iceServers: [
        { urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302',] }
      ]
    });

    c.onicecandidate = event => this.handleCandidate(event, peerUID);
    c.ontrack = event => this.handleTrack(event, peerUID);
    c.onnegotiationneeded = event => this.handleNegoNeeded(peerUID);
    c.oniceconnectionstatechange = event => this.handleConnectionStateChange(event, peerUID);

    this.#connections.push({peerUID, peer: c});

    return c;
  }

  /* get a specific peer connection
   */
  private getPC(peerUID: any) {
    return this.#connections
      .find(i => i.peerUID === peerUID).peer;
  }

  //--

  /* handle ICE candidate
   */
  private handleCandidate(event: any, peerUID: any) {
    if(event.candidate) {
      this.session.send("new-ice-candidate", this.auth.user.id, peerUID, event.candidate);
    }
  }

  /* handle track event
   * displays the media to the page
   */
  private handleTrack(event: any, peerUID: any) {
    if(event) {
      this.createStream(event.streams[0], peerUID);
    }
  }

  /* handle negotiation needed
   */
  private async handleNegoNeeded(peerUID: any) {
    const pc = this.getPC(peerUID);
    const offer = await pc.createOffer();
    
    await pc.setLocalDescription(offer);

    // send to signal
    this.session.send("video-offer", this.auth.user.id, peerUID, null, offer);
  }

  private handleConnectionStateChange(event: any, peerUID: any) {
    const pc = this.getPC(peerUID);

    switch(pc.iceConnectionState) {
      case 'disconnected':
        this.endStream(peerUID, pc);
    }
  }

  //--

  async createStream(stream: any, peerUID: any) {
    if(!this.#medialist.includes(peerUID)) {

      const el = this.renderer.createElement('div');
      el.id = `streamer-${peerUID}`;
      el.classList.add('stream-video', 'bg-dark', 'col-lg-6');

      const vid = this.renderer.createElement('video');
      vid.classList.add('w-100', 'h-100');
      vid.id = `${peerUID}`;
      vid.srcObject = stream;
      vid.play();

      this.renderer.appendChild(el, vid);
      this.renderer.appendChild(this.sc?.nativeElement, el);
      this.#medialist.push(peerUID);
    }
  }

  private updateStream(msg: any) {
    const video = (Document as any).getElementById(msg.usr.uid);
    
    if(video) {
      video.style.display = msg.controls.video ? 'block': 'none';
    }
  }

  private endStream(peerUID: any, pc: any) {
    const el = document.getElementById(`streamer-${peerUID}`);
    
    pc.onicecandidate = null;
    pc.ontrack = null;
    pc.onnegotiationneeded = null;

    el?.remove();
  }

}
