export const LocalStorageService = {
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get: (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },
  delete: (key) => {
    localStorage.removeItem(key);
  },
  clear: () => {
    localStorage.clear();
  },
};

export const SessionStorageService = {
  set: (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  get: (key) => {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },
  delete: (key) => {
    sessionStorage.removeItem(key);
  },
  clear: () => {
    sessionStorage.clear();
  },
};
