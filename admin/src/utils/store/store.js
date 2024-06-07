import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import themeSlice from './features/themeSlice';

const themePersistConfig = {
    key: 'theme',
    storage: storage,
    whitelist: ['mode'],
};

const rootReducer = combineReducers({
    theme: persistReducer(themePersistConfig, themeSlice),
});

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    });
};
