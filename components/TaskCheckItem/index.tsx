import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert, Pressable} from 'react-native';
import CheckBox from "../CheckBox";
import {classnames} from "../../utils";
import * as Api from '../../service/task'

class TaskCheckItem extends Component<any> {

    handleUpdateStatus = () => {
        const {data, onSuccess} = this.props;
        if (data.is_repeat === 0) {
            if (data.progress !== 100) {
                Alert.alert('进度必须完成，才能完成任务。')
                return
            }
        }
        Api.taskUpdateStatus({recordId: data.id, isRepeat: data.is_repeat}).then(res => {
            onSuccess()
        })
    }

    handleFocus = () => {
        const {data}=this.props
        this.props.navigation.navigate('focusModal',data)
    }
    handleDiary=()=>{
        const {data}=this.props
        this.props.navigation.navigate('editor',data)
    }
    render() {
        const {data} = this.props;

        return (
            <Pressable onLongPress={this.handleFocus} style={{width:'100%'}}>
            <View style={classnames([
                {style: styles.task_item, status: true},
                {style: styles.gray, status: !!data.status}
            ])}

            >

                    <View style={{
                        marginLeft: 20,
                        marginTop: 18
                    }}>
                        <CheckBox value={!!data.status} onChange={this.handleUpdateStatus}/>
                    </View>
                    <View style={{
                        paddingTop: 14,
                        paddingBottom: 10,
                        marginLeft: 20,
                        width: 240
                    }}>
                        <Text
                            style={{fontSize: 16}}> {data.name.length > 16 ? `${data.name.substr(0, 16)}...` : data.name}</Text>
                        <Text style={{color: "#9b9b9b"}}> {data.programName}</Text>
                    </View>
                    <View style={styles.diary_btn}>
                        <Text onPress={this.handleDiary}>日记{!!data.diaryText ? 1 : 0}</Text>
                    </View>
                    <View style={classnames([{style: styles.level, status: true}, {
                        // @ts-ignore
                        style: styles[`level_${data.level}`],
                        status: true
                    }])}/>

            </View>
            </Pressable>
        );
    }
}

const styles = StyleSheet.create({
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
    gray: {
        backgroundColor: '#efe9e9',
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

    },
    level_s: {
        backgroundColor: "#ba1b53"
    },
    level_a: {
        backgroundColor: "#581ac9"
    },
    level_b: {
        backgroundColor: "#2fa1de"
    }

})

export default TaskCheckItem;
