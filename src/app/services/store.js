import { createStore, combineReducers, compose, applyMiddleware } from "redux"
import { createLogger } from "redux-logger"
import { routerReducer, routerMiddleware, routerActions } from "react-router-redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/es/storage"
import createHistory from "history/createBrowserHistory"

class Store {
  constructor() {
    this.history = createHistory()
    this.state = this.configureStore()
    this.persistor = persistStore(this.state)
    this.state.dispatch({ type: `INIT_STATE` })
  }

  composeEnhancers = typeof window === `object` && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ routerActions })
    : compose

  createReducer(asyncReducers) {
    return persistReducer(
      { key: `root`, storage },
      combineReducers({
        router: routerReducer,
        ...asyncReducers
      })
    )
  }

  configureStore() {
    const loggerMiddleware = createLogger()
    const store = createStore(
      this.createReducer(),
      this.composeEnhancers(applyMiddleware(routerMiddleware(this.history)), applyMiddleware(loggerMiddleware))
    )
    store.asyncReducers = {}
    return store
  }

  addReducer(name, reducer) {
    let newReducers = {}
    newReducers[`${name}`] = reducer
    this.state.asyncReducers = { ...this.state.asyncReducers, ...newReducers }
    this.state.replaceReducer(this.createReducer(this.state.asyncReducers))
  }
}

export const store = new Store()

export const Reducer = Class =>
  class extends Class {
    constructor(...args) {
      super(...args)
      store.addReducer(this.name, this.reducer)
    }
  }
