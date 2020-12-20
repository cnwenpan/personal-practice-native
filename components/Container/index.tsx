import React, {Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';

class Container extends Component {
    render() {
        return (
            <View style={styles.container}>
                {this.props.children}
            </View>
        );
    }
}
const styles=StyleSheet.create({
    container:{
        position:'relative',
        paddingLeft:24,
        paddingRight:24,
        paddingTop:48,
        minHeight:'100%'
    }
})
export default Container;