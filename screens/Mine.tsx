import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native'
import Container from "../components/Container";

class Mine extends Component<any> {

    logout = () => {
        const {navigation} = this.props;
        navigation.navigate('login')
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
                        <Text>1</Text>
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
        borderColor:'#ffffff'
    },
    header: {
        borderBottomColor: '#e5e0e0',
        borderBottomWidth: 1,
        shadowColor:'#e5e0e0',
        shadowOffset:{
            width:4,
            height:4,
        },
        shadowRadius:10
    },
    user:{
        height:190,
        borderColor:'#F9F9F9',
    },
    logout: {
        position: "absolute",
        bottom: 10,
        width: '100%',
        paddingLeft: 24,
        paddingRight: 24,

    }
})

export default Mine;