import { Component } from 'react'
import { connect } from 'react-redux'
import { View, Button, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'

var RN = null
if (process.env.TARO_ENV === 'rn') {
  RN = require('react-native')
}

import './index.less'
import { IConnectState } from '../../models'
import { dispatch } from '../../redux/redux'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  num: number
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

const connectRedux = ({ counter }: IConnectState) => ({
  num: counter.num,
})
@connect(connectRedux)
class Index extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {

    return (
      <View className='index'>
        <Button className='add_btn' onClick={() => dispatch({ type: 'counter/add', payload: 1 })}>+</Button>
        <Button className='dec_btn' onClick={() => {
          dispatch({ type: 'counter/dec', payload: 1 })
        }}>-</Button>
        <Button className='dec_btn' onClick={() => {
          if (process.env.TARO_ENV === 'weapp') {
            wx.showModal({
              title: '提示',
              content: '这是一个模态弹窗只有小程序的弹框',
              success(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })

            wx.navigateTo({ url: '/pages/test/index' })
          } else {
            Taro.navigateTo({ url: '/pages/test/index' })
          }

        }}>跳转到哈我的页面</Button>
        <Button onClick={() => {
          RN?.NativeModules?.RNNative?.routeHandlerUrl('zeroeconsumer://user/me')
        }} className={"dec_btn"}>哈哈哈</Button>
        <Text>{this.props.num}</Text>
        <View><Text>Hello, World</Text></View>
      </View>
    )
  }
}

export default Index

