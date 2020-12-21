import React, {Component} from 'react';
import {View ,Text,StyleSheet} from 'react-native';
import CheckBox from "../CheckBox";

class TaskCheckItem extends Component<any> {
    render() {
        const {data}=this.props;
        return (
            <View style={styles.task_item}>
                <View style={{marginLeft: 20, marginTop: 18}}>
                    <CheckBox/>
                </View>
                <View style={{paddingTop: 14, paddingBottom: 10, marginLeft: 20}}>
                    <Text style={{fontSize: 16}}> 看书100页</Text>
                    <Text style={{color: "#9b9b9b"}}> 看书10本-看书</Text>
                </View>
                <View style={styles.diary_btn}>
                    <Text>日记</Text>
                </View>
                <View style={styles.level}/>

            </View>
        );
    }
}

const styles=StyleSheet.create({
    task_item: {
        height: 70,
        marginLeft: 16,
        marginRight: 16,
        backgroundColor: '#ffffff',
        borderRadius: 4,
        marginTop: 14,
        flexDirection: "row",
        position: "relative",
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowOffset: {
            width: 2,
            height: 4
        },
        shadowRadius: 2,
        elevation: 6,
    },
    diary_btn: {
        right: 20,
        top: '50%',
        marginTop: -12,
        height: 24,
        width: 'auto',
        paddingLeft: 4,
        paddingRight: 4,
        position: 'absolute',
        borderColor: "#ece3e3",
        borderWidth: 1,
    },
    level: {
        right: 0,
        top: '50%',
        marginTop: -12,
        height: 24,
        width: 6,
        position: 'absolute',
        backgroundColor: "#6074F9"
    }
})

export default TaskCheckItem;
