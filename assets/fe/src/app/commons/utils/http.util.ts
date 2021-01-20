/* transform a list of strings into url path
 * separated by trailing slash
 */
export let urlsafe = (url: string, ...params: any[]): string => {
  return url.concat(params.join('/'), '/');
};

/* transform dict into urlencoded string
 */
// export let queryparams = (d: object): string => {
//     const params = Object.keys(d)
//         .map((k)=> `${k}=${encodeURIComponent(d[k])}`)
//         .join('&')
//     ;
//     return `?${params}`;
// }