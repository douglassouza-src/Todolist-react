import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import meuStorage from 'redux-persist/lib/storage';
import { rootReducer } from './modules/rootReducer';


const persistedReducer = persistReducer({key: 'app', storage: meuStorage}, rootReducer);

const minhaStore = configureStore({reducer: persistedReducer});

const persistor = persistStore(minhaStore);

export { minhaStore, persistor };

export type RootState = ReturnType<typeof minhaStore.getState>; 

export type AppDispatch = typeof minhaStore.dispatch;