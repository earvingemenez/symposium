import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styles: [
  ]
})
export class ChannelComponent implements OnInit {
  #id?: number;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    
  }

}
