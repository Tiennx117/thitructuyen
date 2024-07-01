import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducers from './reducers';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['oauth','detailplayaudio','playerAudioItem', 'detailUrlAudio', 'voicePlayer', 'statusProgress', 'pageCurrent', 'progressLtsAudioBook', 'filterMenu']
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  devTools: import.meta.env.MODE !== "production",
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export { store }
export const persistor = persistStore(store);