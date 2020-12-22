import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, Button, Alert} from 'react-native'
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';

class Register extends Component<any> {

    handleToLogin = () => {
        const {navigation} = this.props;
        navigation.navigate('login')
    }

    handleSave = () => {

    }

    render() {
        return (

            <View style={styles.container}>
                <View style={styles.app_name}>
                    <Text style={styles.app_name_text}>注册</Text>
                    <Text style={styles.app_name_tip}>邀请码申请：cnwenpan@gmail.com</Text>
                </View>
                <View style={styles.login}>
                    <View style={styles.form_item}>
                        <Text style={styles.form_label}>用户名：</Text>
                        <TextInput style={styles.input}/>
                    </View>
                    <View style={styles.form_item}>
                        <Text style={styles.form_label}>邀请码：</Text>
                        <TextInput style={styles.input}/>
                    </View>
                    <View style={styles.form_item}>

                        <Text style={styles.form_label}>密码：</Text>
                        <TextInput style={styles.input}/>
                    </View>
                    <View style={styles.form_item}>
                        <Text style={styles.form_label}>确认密码：</Text>
                        <TextInput style={styles.input}/>
                    </View>
                </View>
                <View style={styles.register}>
                    <Text onPress={this.handleToLogin}>
                        <Ionicons name="arrow-back"/>
                        返回登录页</Text>
                </View>
                <View style={{marginTop: 70}}>
                    <Button
                        title="保存"
                        color="#F96060"
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
});


export default Register;
