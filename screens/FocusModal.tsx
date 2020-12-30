import React, {Component} from 'react';
// import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {View, Text, StyleSheet, Button, ScrollView} from 'react-native'
import moment from "moment";
import {CommonActions} from "@react-navigation/native";
import HTML from "react-native-render-html";

class FocusModal extends Component<any> {
    state = {
        restTime: moment('2020-12-20 12:30:00').millisecond() - 30 * 60 * 1000
    }

    private timer: NodeJS.Timeout | undefined

    componentDidMount() {
        console.log(this.state.restTime)
        this.timer = setInterval(() => {
            const {restTime} = this.state;
            this.setState({
                restTime: restTime - 1000
            })
        }, 1000)
    }

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
                        <ScrollView >
                            <HTML source={{html: params.description}}/>
                        </ScrollView>
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
        paddingBottom:260
    },
    exit_focus: {
        marginLeft: 20,
        marginRight: 20,
        position: 'absolute',
        right: 10,
        bottom: 100,
    }
})
export default FocusModal;
