/* transform a list of strings into url path
 * separated by trailing slash
 */
export let urlsafe = (url: string, ...params: any[]): string => {
  return url.concat(params.join('/'), '/');
};