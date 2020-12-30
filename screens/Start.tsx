import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {getLocalData} from "../utils";

class Start extends Component<any> {

    async componentDidMount() {
        const token = await getLocalData('token')
        // console.log('当前token：', token)
        if (!token) {
            this.props.navigation.navigate('login')
            return
        } else {
            this.props.navigation.navigate('home')
            return
        }

    }

    render() {
        return (
            <View>
                <Text>11</Text>
            </View>

        );
    }
}

export default Start;
