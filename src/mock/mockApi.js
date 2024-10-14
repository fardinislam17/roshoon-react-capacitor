import { http, HttpResponse, delay } from 'msw';

export const handlers = [
  // Mock a GET request to /user
  http.get(`/me/roles`, async () => {
    await delay(500);
    return HttpResponse.json(['developer', 'chef'], { status: 200 });
  }),

  http.get('/v1/auth/login', async (req) => {
    await delay(500);
    console.log('FINAL' , req);
    const apiId = req.request?.url?.search || {}; // Fallback to an empty object if req.query is undefined

    if (!apiId) {
      return HttpResponse.json({ message: 'apiId is required' }, { status: 400 });
    }

    // Simulating a successful response with the apiId
    return HttpResponse.json({ message : 'found user', user: 'RoshoonAdmin', uid: apiId }, { status: 200 });
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
