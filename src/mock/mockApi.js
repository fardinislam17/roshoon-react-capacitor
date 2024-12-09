import { http, HttpResponse, delay } from 'msw';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const handlers = [
  http.post(`${baseUrl}/auth/login`, async (req) => {
    await delay(500);
    console.log('FINAL', req);

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
