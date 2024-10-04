import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { roshoonsApi } from '../features/roshoon/roshoonsApi';
import { sessionSlice } from '../features/session';
import roshoonsSlice from '../features/roshoon/roshoonsSlice';
const rootReducer = combineSlices(roshoonsApi, roshoonsSlice, sessionSlice);

export const makeStore = (preloadedState) => {
  const appMiddleWare = [roshoonsApi.middleware];
  console.log('redux store created, ', rootReducer);
  const store = configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) => {
      const defaultMiddleware = import.meta.env.VITEST
        ? getDefaultMiddleware({
            serializableCheck: false,
            immutableChcek: false,
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
