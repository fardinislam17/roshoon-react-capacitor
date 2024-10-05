import { http, HttpResponse, delay } from 'msw';

export const handlers = [
  // Mock a GET request to /user
  http.get(`/me/roles`, async () => {
    await delay(500);
    return HttpResponse.json(['developer', 'chef'], { status: 200 });
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
