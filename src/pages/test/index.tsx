import { Text, View } from "@tarojs/components"
import { getState } from "../../redux/redux"
import './index.less'

const TestPage = () => {
    return <View className="index">
        <Text style={{ "color": "red", "fontSize": 18 }}>TestPage   {getState()["counter"].num}</Text>
    </View>
}

export default TestPage