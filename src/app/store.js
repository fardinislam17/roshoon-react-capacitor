import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { roshoonApi } from '../features/roshoon/roshoonApi';
import { sessionSlice } from '../features/session';
import roshoonSlice from '../features/roshoon/roshoonSlice';
const rootReducer = combineSlices(roshoonApi, roshoonSlice, sessionSlice);

export const makeStore = (preloadedState) => {
  const appMiddleWare = [roshoonApi.middleware];
  const store = configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) => {
      const defaultMiddleware = import.meta.env.VITEST
        ? getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
          })
        : getDefaultMiddleware({
            immutableCheck: {
              warnAfter: 200,
            },
            serializableCheck: {
              warnAfter: 200,
              ignoredActionPaths: [
                'payload.file',
                'meta.args',
                'meta.args.originalArgs',
                'meta.baseQueryMeta',
              ],
              ignoredPaths: ['api.mutation', 'meta.args.originalArgs'],
            },
          });

      return defaultMiddleware.concat(...appMiddleWare);
    },
    preloadedState,
  });

  setupListeners(store.dispatch);
  return store;
};

export const store = makeStore();
