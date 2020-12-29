import { apisAreAvailable } from 'expo';
import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native'
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import md5 from 'md5'
import * as Api from '../service/user'

class Register extends Component<any> {

    state = {
        form: {
            account: '',
            accessCode: '',
            password: '',
            rePassword: '',
        },

        tips: {
            account: {
                visible: false,
                msg: '账号不能为空'
            },
            accessCode: {
                visible: false,
                msg: '邀请码不能为空'
            },
            password: {
                visible: false,
                msg: '密码不能为空'
            },
            rePassword: {
                visible: false,
                msg: '密码不一致'
            },
        }
    }

    handleToLogin = () => {
        const { navigation } = this.props;
        navigation.navigate('login')
    }

    handleSave = () => {
        if (this.checkForm()) {
            const { form } = this.state;
            Api.register({
                account: form.account,
                accessCode: form.accessCode,
                password: md5(form.password)
            }).then((res: any) => {
                Alert.alert(res.msg)
            })
        }
    }

    checkForm = () => {
        const { form, tips } = this.state;
        let result: boolean = true;
        Object.keys(form).forEach((key, index) => {


            if (!form[key]) {
                const account = {
                    ...tips[key],
                    visible: true
                }
                this.setState({
                    tips: { ...tips, ...{ account } }
                })
                result = false;
                return false
            }

        })

        return result



    }

    handleChange = (item: object) => {
        const { form } = this.state;
        this.setState({
            form: { ...form, ...item }
        })
    }

    render() {
        const { tips } = this.state;

        return (

            <View style={styles.container}>
                <View style={styles.app_name}>
                    <Text style={styles.app_name_text}>注册</Text>
                    <Text style={styles.app_name_tip}>邀请码申请：cnwenpan@gmail.com</Text>
                </View>
                <View style={styles.login}>
                    <View style={styles.form_item}>
                        <Text style={styles.form_label}>用户名：</Text>
                        <TextInput onChange={(value) => { this.handleChange({ account: value }) }} style={styles.input} />
                    </View>
                    {tips.account.visible ? <Text style={styles.tip_info}>{tips.account.msg}</Text> : null}
                    <View style={styles.form_item}>
                        <Text style={styles.form_label}>邀请码：</Text>
                        <TextInput style={styles.input} />
                    </View>
                    {tips.accessCode.visible ? <Text>{tips.accessCode.msg}</Text> : null}
                    <View style={styles.form_item}>

                        <Text style={styles.form_label}>密码：</Text>
                        <TextInput style={styles.input} />
                    </View>
                    {tips.password.visible ? <Text>{tips.password.msg}</Text> : null}
                    <View style={styles.form_item}>
                        <Text style={styles.form_label}>确认密码：</Text>
                        <TextInput style={styles.input} />
                    </View>
                    {tips.rePassword.visible ? <Text>{tips.rePassword.msg}</Text> : null}
                </View>
                <View style={styles.register}>
                    <Text onPress={this.handleToLogin}>
                        <Ionicons name="arrow-back" />
                        返回登录页</Text>
                </View>
                <View style={{ marginTop: 70, backgroundColor: '#F96060' }}>
                    <Button
                        title="保存"
                        color="#ffffff"
                        onPress={this.handleSave}
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
        lineHeight: 28,
        fontSize: 18,
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
    tip_info: {
        color: '#F96060'
    }
});


export default Register;
