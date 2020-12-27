import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, Image, Alert} from 'react-native'
import Container from "../components/Container";
import {removeLocalData} from "../utils";

class Mine extends Component<any> {

    logout = () => {
        removeLocalData('token').then((res:any) => {
            const {navigation} = this.props;
            navigation.navigate('login')
        }).catch(e=>{
            Alert.alert(e)
        })


    }

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 20,
                            paddingBottom: 4
                        }}>
                            个人中心
                        </Text>
                    </View>
                    <View style={styles.user}>
                        <View style={styles.user_base_info}>
                            <View>
                                <Image
                                    style={styles.user_tx}
                                    source={{
                                        uri: 'http://jirancloud.com/tx.jpg',
                                    }}
                                />
                            </View>
                            <View style={styles.user_account}>
                                <Text style={{fontSize: 18}}>温攀</Text>
                                <Text style={{fontSize: 16, color: '#9a9a9a'}}>cnwenpan@gmail.com</Text>
                            </View>
                        </View>
                        <View style={styles.task_info}>
                            <View>
                                <Text>120</Text>
                                <Text style={{fontSize: 16, color: '#9a9a9a'}}>Create Task</Text>
                            </View>
                            <View>
                                <Text>80</Text>
                                <Text style={{fontSize: 16, color: '#9a9a9a'}}>Completed</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.logout}>
                        <Button color="#cccccc" title="注销" onPress={this.logout}/>
                    </View>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        minHeight: '100%',
        borderColor: '#ffffff',
    },
    header: {
        // borderBottomColor: '#f6f0f0',
        // borderBottomWidth: 1,

    },
    user: {
        // marginLeft:16,
        // marginRight:16,
        padding: 24,
        marginTop: 16,
        height: 190,
        backgroundColor: '#ffffff',
        // borderColor:'#f9f9f9',
        // borderWidth:1,
        borderRadius: 2,
        shadowColor: 'rgba(0, 0, 0, 0.01)',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowRadius: 1,
        elevation: 1,
    },
    user_base_info: {
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    user_tx: {
        width: 64,
        height: 64,
        borderRadius: 32,
    },
    user_account: {
        marginLeft: 10,
        marginTop: 10,
    },
    task_info: {
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    logout: {
        position: "absolute",
        bottom: 100,
        width: '100%',
        paddingLeft: 24,
        paddingRight: 24,

    }
})

export default Mine;
