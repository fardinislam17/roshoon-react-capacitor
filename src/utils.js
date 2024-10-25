export const getCookieByName = (coockieName) => {
  let value = getCookie(coockieName);
  if (value) {
    value = value.replace(/\\054/g, ',');
    value = value.replace(/\\"/g, '"');
    value = value.replace(/054/g, '');
  }
  return value;
};

export const setCookie = (cookieName, cookieValue, expirationDays = 1) => {
  const date = new Date();
  date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + date.toUTCString();
  document.cookie = cookieName + '=' + cookieValue + ';' + expires + ';path=/';
};

const getCookie = (cookieName) => {
  let name = cookieName + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  const item = decodedCookie.split(';');
  for (const cookieItem of item) {
    let cPart = cookieItem;
    while (cPart.charAt(0) === ' ') {
      cPart = cPart.substring(1);
    }
    if (cPart.indexOf(name) === 0) {
      return cPart.substring(name.length, cPart.length);
    }
  }
  return '';
};
