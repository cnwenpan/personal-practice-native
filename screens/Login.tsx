import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, Button,Alert} from 'react-native'

class Login extends Component<any> {

    handleToHome=()=>{
        const {navigation} = this.props;
        navigation.navigate('home')
    }

    handleToRegister=()=>{
        const {navigation} = this.props;
        navigation.navigate('register')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.app_name}>
                    <Text style={styles.app_name_text}>修炼自己</Text>
                    <Text style={styles.app_name_tip}>每日三省</Text>
                </View>
                <View style={styles.login}>
                    <View style={styles.form_item}>
                        <Text style={styles.form_label}>用户名：</Text>
                        <TextInput style={styles.input}/></View>
                    <View style={styles.form_item}>
                        <Text style={styles.form_label}>密码：</Text>
                        <TextInput style={styles.input}/>
                    </View>
                </View>
                <View  style={styles.register}>
                    <Text onPress={this.handleToRegister}>注册</Text>
                    <Text>找回密码</Text>
                </View>
                <View style={{marginTop:70}}>
                    <Button
                        title="登录"
                        color="#F96060"
                        onPress={this.handleToHome}
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    app_name:{
        marginTop:60,
    },
    app_name_text:{
        fontSize:32,
        fontWeight:"bold",
    },
    app_name_tip:{
        marginTop:12,
        fontSize:16,
        color:'#9B9B9B'
    },
    container: {
        padding: 24,
    },

    login:{
        marginTop:40,
    },
    form_item: {
        marginBottom:10,
        // flexDirection: 'row'

    },
    form_label: {
        color:'#313131',
        fontSize:20,
        lineHeight:30,
    },
    input: {
        borderBottomColor:'#ccc',
        borderBottomWidth: 1,
    },
    register:{
        marginTop:12,
        flexDirection:"row",
        justifyContent: "space-between",
    },
    reset_password:{

    },
    login_button:{
        textAlign:"center"
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


export default Login;