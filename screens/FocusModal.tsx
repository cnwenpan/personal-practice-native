import React, {Component} from 'react';
// import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {View, Text, StyleSheet, Button, useWindowDimensions} from 'react-native'
import moment from "moment";
import {CommonActions} from "@react-navigation/native";
import HTML from "react-native-render-html";

class FocusModal extends Component<any> {
    state = {
        restTime: new Date('2020-12-20 12:30:00').getTime()
    }

    private timer: NodeJS.Timeout | undefined = setInterval(() => {
        const {restTime} = this.state;
        this.setState({
            restTime: restTime - 1000
        })
    }, 1000)


    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer)
        }
    }

    exitFocus = () => {
        this.props.navigation.dispatch(CommonActions.goBack());
    }

    render() {
        const {params} = this.props.route
        const {restTime} = this.state;
        return (
            <SafeAreaProvider>
                {/*<StatusBar/>*/}
                <View style={styles.container}>
                    <Text style={styles.rest_time}>{moment(restTime).format('mm:ss')}</Text>
                    <View style={styles.info}>
                        <HTML source={{html: params.description}}/>
                    </View>
                    {/*<Text style={styles.info}>{params.description}</Text>*/}
                    <View style={styles.exit_focus}>
                        <Button
                            title="退出"
                            color="#F96060"
                            onPress={this.exitFocus}
                        />
                    </View>
                </View>
            </SafeAreaProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#000000',
        marginTop: 44,
        height: '100%',

    },
    rest_time: {
        marginTop: 50,
        marginBottom: 20,
        // color:'#ffffff',
        textAlign: 'center',
        fontSize: 40,

    },
    info: {
        // color: '#ffffff',
        textAlign: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    exit_focus: {
        position: 'absolute',
        bottom: 50,
        width: '100%'
    }
})
export default FocusModal;
