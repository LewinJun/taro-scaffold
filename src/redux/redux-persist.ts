import invariant from 'invariant'

import { persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'


interface IStorage {
  getItem(key: string, ...args: Array<any>): any;
  setItem(key: string, value: any, ...args: Array<any>): any;
  removeItem(key: string, ...args: Array<any>): any;
}

/* 
* 不能直接使用localStorage，localStorage的getItem和setItem不是异步的，所以基于localStorage封装一层
*/
const H5Storage: IStorage = {
  getItem: (key, args) => {
    return new Promise((resolve, reject) => {
      resolve(localStorage.getItem(key))
    })
  },
  setItem: (key, args) => {
    return new Promise((resolve, reject) => {
      const value = typeof args === 'string' ? args : JSON.stringify(args)
      resolve(localStorage.setItem(key, value))
    })
  },
  removeItem: (key, args) => {
    return new Promise((resolve, reject) => {
      localStorage.removeItem(key)
      resolve("")
    })
  }
}

var localCache = H5Storage
if (process.env.TARO_ENV === 'rn') {
  localCache = require('@react-native-community/async-storage')
} else {

}

// reference: https://github.com/rt2zz/redux-persist#persistor-object
export const persistHelper = function (persistor) {
  purge = persistor.purge
  flush = persistor.flush
  pause = persistor.pause
  persist = persistor.persist

  return persistor
}

export let purge = function () { invariant(false, 'call failed') }
export let flush = function () { invariant(false, 'call failed') }
export let pause = function () { invariant(false, 'call failed') }
export let persist = function () { invariant(false, 'call failed') }

export const persisteReducerEnhancer = function (reducer) {
  return persistReducer(
    {
      key: "local101Taro",
      storage: localCache,
      stateReconciler: autoMergeLevel2,
      whitelist: ['user', 'counter'],
      debug: false,
      transforms: [],
    },
    reducer
  )
}
