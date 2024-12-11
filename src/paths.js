export const homepagePath = `${import.meta.env.BASE_URL}`;
export const loginPath = `${import.meta.env.BASE_URL}login`;
export const registerPath = `${import.meta.env.BASE_URL}register`;
export const becomeAChefPath = `${registerPath}?asChef=true`;
export const generatePath = (path) => `${homepage}${path}`;
