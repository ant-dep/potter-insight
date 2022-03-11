import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

let store

const InitialState = {
  theme: 'light',
  error: null,
}

export const actionTypes = {
  toggleTheme: 'toggleTheme',
}

// REDUCERS
export const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case actionTypes.toggleTheme:
      return {
        theme: action.data,
      }
    default:
      return state
  }
}

// ACTIONS
export const loadTheme = (data) => {
  return { type: actionTypes.toggleTheme, data }
}

const persistConfig = {
  timeout: 100, // override the default 5sec timeout hit
  key: 'root',
  storage,
  whitelist: ['theme'], // place to select which state you want to persist
}

const persistedReducer = persistReducer(persistConfig, reducer)

function makeStore(initialState = InitialState) {
  return createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware())
  )
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? makeStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
