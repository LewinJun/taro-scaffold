import { Component } from 'react'
import { Provider } from 'react-redux'
import './app.less'
import { reduxHelper } from './redux/redux'
import createStore from './redux/redux-dva'
import { PersistGate } from 'redux-persist/integration/react'
import { persistHelper } from './redux/redux-persist'
import persistStore from 'redux-persist/es/persistStore'
import { afterRehydrated, beforeRunApp } from './redux/redux-lifecycle'

// const store = configStore()

const store = reduxHelper(createStore())
const persistor = persistHelper(persistStore(store, null, afterRehydrated))

class App extends Component {
  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} onBeforeLift={beforeRunApp}>
          {this.props.children}
        </PersistGate>

      </Provider>
    )
  }
}

export default App
