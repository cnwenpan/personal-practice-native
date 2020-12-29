import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native'
import md5 from 'md5'
import * as Api from '../service/user'
import { setLocalData } from "../utils";

class Login extends Component<any> {
    state = {
        account: '',
        accountTip: '',
        password: '',
        passwordTip: ''
    }

    handleToHome = () => {
        const { account, password } = this.state;
        if (!account) {
            this.setState({
                accountTip: '账号不能为空'
            })
        }
        if (!password) {
            this.setState({
                passwordTip: '密码不能为空'
            })
        }
        if (!account || !password) {
            return
        }

        const md5Password = md5(password)

        Api.login({ account, password: md5Password })

            .then(async (res: any) => {
                await setLocalData('token', res.token)
                const { navigation } = this.props;
                navigation.navigate('home')
            })
            .catch(e => {
                Alert.alert(e.toString())
            })


    }

    handleToRegister = () => {
        const { navigation } = this.props;
        navigation.navigate('register')
    }

    handleAccountChange = (value: string) => {
        this.setState({
            account: value,
            accountTip: !!value ? '' : '账号不能为空'
        })
    }

    handlePasswordChange = (value: string) => {
        this.setState({
            password: value,
            passwordTip: !!value ? '' : '密码不能为空'
        })
    }

    render() {
        const { accountTip, passwordTip } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.app_name}>
                    <Text style={styles.app_name_text}>修炼自己</Text>
                    <Text style={styles.app_name_tip}>每日三省</Text>
                </View>
                <View style={styles.login}>
                    <View style={styles.form_item}>
                        <Text style={styles.form_label}>用户名：</Text>
                        <TextInput style={styles.input} onChangeText={this.handleAccountChange} />
                        {accountTip ? <Text style={styles.tip}>{accountTip}</Text> : null}
                    </View>
                    <View style={styles.form_item}>
                        <Text style={styles.form_label}>密码：</Text>
                        <TextInput style={styles.input} onChangeText={this.handlePasswordChange} />
                        {passwordTip ? <Text style={styles.tip}>{passwordTip}</Text> : null}
                    </View>
                </View>
                <View style={styles.register}>
                    <Text onPress={this.handleToRegister}>注册</Text>
                    <Text>找回密码</Text>
                </View>
                <View style={{ marginTop: 70, backgroundColor: '#F96060' }}>
                    <Button
                        title="登录1"
                        // color="#F96060"
                        onPress={this.handleToHome}
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    app_name: {
        marginTop: 60,
    },
    app_name_text: {
        fontSize: 32,
        fontWeight: "bold",
    },
    app_name_tip: {
        marginTop: 12,
        fontSize: 16,
        color: '#9B9B9B'
    },
    container: {
        padding: 24,
    },

    login: {
        marginTop: 40,
    },
    form_item: {
        marginBottom: 10,
        // flexDirection: 'row'

    },
    form_label: {
        color: '#313131',
        fontSize: 20,
        lineHeight: 30,
    },
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    register: {
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    reset_password: {},
    login_button: {
        textAlign: "center"
    },
    bigBlue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    red: {
        color: 'red',
    },
    tip: {
        color: '#F96060'
    }
});


export default Login;
