import { http, HttpResponse, delay } from 'msw';

const baseUrl = `${import.meta.env.BASE_URL}api`;
const AUTH_TOKEN_COOKIE = 'roshoon_auth_token';
const MOCK_ACCESS_TOKEN = 'mockAccessToken123456789';

const dummyUser = {
  id: 1,
  name: 'test name',
  email: 'test1@example.com',
  roles: ['buyer', 'chef'],
};

const createUserResponse = (
  user = dummyUser,
  message = 'Action successful'
) => ({
  success: true,
  message,
  user,
  accessToken: MOCK_ACCESS_TOKEN,
});

const handlers = [
  http.get(`${baseUrl}/auth/token-login`, async ({ cookies }) => {
    const authToken = cookies[AUTH_TOKEN_COOKIE];
    if (!authToken) {
      return HttpResponse.json(
        { success: false, message: 'No Auth token provided' },
        { status: 401 }
      );
    }
    await delay(100);
    return HttpResponse.json(createUserResponse(), { status: 200 });
  }),

  http.post(`${baseUrl}/auth/login`, async () => {
    await delay(500);
    return HttpResponse.json(
      createUserResponse(undefined, 'Login Successful'),
      {
        status: 200,
        headers: {
          'Set-Cookie': `${AUTH_TOKEN_COOKIE}=${MOCK_ACCESS_TOKEN}; Path=/; HttpOnly`,
        },
      }
    );
  }),

  http.post(`${baseUrl}/auth/google-login`, async () => {
    await delay(500);
    return HttpResponse.json(
      createUserResponse(undefined, 'Login Successful'),
      {
        status: 200,
        headers: {
          'Set-Cookie': `${AUTH_TOKEN_COOKIE}=${MOCK_ACCESS_TOKEN}; Path=/; HttpOnly`,
        },
      }
    );
  }),

  http.post(`${baseUrl}/auth/facebook-login`, async () => {
    await delay(500);
    return HttpResponse.json(
      createUserResponse(undefined, 'Login Successful'),
      {
        status: 200,
        headers: {
          'Set-Cookie': `${AUTH_TOKEN_COOKIE}=${MOCK_ACCESS_TOKEN}; Path=/; HttpOnly`,
        },
      }
    );
  }),

  http.post(`${baseUrl}/auth/register`, async () => {
    await delay(500);
    return HttpResponse.json(
      createUserResponse(undefined, 'Registration Successful'),
      {
        status: 200,
        headers: {
          'Set-Cookie': `${AUTH_TOKEN_COOKIE}=${MOCK_ACCESS_TOKEN}; Path=/; HttpOnly`,
        },
      }
    );
  }),

  http.post(`${baseUrl}/auth/logout`, async () => {
    await delay(500);
    return HttpResponse.json(
      { success: true, message: 'Logout successful' },
      { status: 200 }
    );
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
