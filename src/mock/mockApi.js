import { http, HttpResponse, delay } from 'msw';

const baseUrl = `${import.meta.env.BASE_URL}api`;

export const handlers = [
  http.post(`${baseUrl}/auth/login`, async (req) => {
    await delay(500);

    const response = {
      success: true,
      message: 'Logged in successfully',
      user: {
        id: 1,
        name: 'test name',
        email: 'test1@example.com',
        roles: ['buyer', 'chef'],
      },
      accessToken: 'eyJhbGciOiJIUzI1NiI4WbRskRpP_FMPWLPfkxrmXUrmTwXM',
    };
    return HttpResponse.json(response, { status: 200 });
  }),
  http.post(`${baseUrl}/auth/google-login`, async (req) => {
    await delay(500);
    const response = {
      success: true,
      message: 'Logged in with google successful',
      user: {
        id: 1,
        firstName: 'test name',
        email: 'test1@example.com',
        roles: ['buyer'],
      },
      accessToken: 'eyJhbGciOiJIUzI1NiI4WbRskRpP_FMPWLPfkxrmXUrmTwXM',
    };
    return HttpResponse.json(response, { status: 200 });
  }),
  http.post(`${baseUrl}/auth/register`, async (req) => {
    await delay(500);
    const response = {
      success: true,
      message: 'Registration in successful',
      user: {
        id: 3,
        firstName: 'test name',
        email: 'test1@example.com',
        roles: ['buyer'],
      },
      accessToken: 'eyJhbGciOiJIUzI1NiI4WbRskRpP_FMPWLPfkxrmXUrmTwXM',
    };
    return HttpResponse.json(response, { status: 200 });
  }),
  http.post(`${baseUrl}/auth/logout`, async (req) => {
    await delay(500);
    const response = {
      success: true,
      message: 'Logout successful',
    };
    return HttpResponse.json(response, { status: 200 });
  }),
];

export const enableMockApi = async () => {
  const { setupWorker } = await import('msw/browser');
  const worker = setupWorker(...handlers);
  await worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    },
  });
};
