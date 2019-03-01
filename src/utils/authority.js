export function getAuthority(str) {
  return typeof str === 'undefined' ? localStorage.getItem('chart-authority') : str;
}

export function setAuthority(authority){
  const proAuthority = typeof authority === 'string' ? authority : 'visitor';
  return localStorage.setItem('chart-authority', proAuthority);
}