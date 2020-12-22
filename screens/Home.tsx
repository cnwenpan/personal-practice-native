import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native'
import {classnames} from '../utils'
import TaskCheckItem from "../components/TaskCheckItem";
import {setLocalData, getLocalData} from "../utils";

class Home extends Component<any> {
    state = {
        tabIndex: 1,
        repeatData: [{}, {}, {}],
        noRepeatData: []
    }

    async componentDidMount() {
        const token =await getLocalData('token')
        if (!token) {
            this.props.navigation.navigate('login')
        }

    }

    render() {
        const {tabIndex, repeatData, noRepeatData} = this.state
        return (

            <View style={styles.header}>
                <Text style={{
                    textAlign: 'center',
                    color: '#ffffff',
                    fontSize: 20,
                    lineHeight: 40,
                }}>今日任务</Text>
                <View style={styles.tab_bar}>
                    <Text
                        onPress={() => {
                            this.setState({tabIndex: 1})
                        }}
                        style={
                            classnames([
                                {style: styles.tab_bar_title, status: true},
                                {style: styles.active, status: tabIndex === 1}
                            ])}>
                        习惯
                    </Text>
                    <Text
                        onPress={() => {
                            this.setState({tabIndex: 2})
                        }}
                        style={classnames([
                            {style: styles.tab_bar_title, status: true},
                            {
                                style: styles.active,
                                status: tabIndex === 2
                            }])}>
                        项目
                    </Text>
                </View>
                {tabIndex === 1 && <View>
                    <Text style={styles.task_info}>1/3-120分钟</Text>
                    {repeatData.map((item, index) => <TaskCheckItem key={index} data={item}/>)}
                </View>}
                {tabIndex === 2 && <View>
                    <Text style={styles.task_info}>1/4-120分钟</Text>
                    {noRepeatData.map((item, index) => <TaskCheckItem key={index} data={item}/>)}
                </View>}
            </View>

        );
    }
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: '#F96060',
        height: 151,
        paddingTop: 44,
    },
    tab_bar: {
        marginTop: 27,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    tab_bar_title: {
        fontSize: 18,
        textAlign: "center",
        height: 40,
        width: 100,
        color: '#ffffff',

    },
    active: {
        borderBottomColor: "#ffffff",
        borderBottomWidth: 2,
    },
    task_info: {
        color: '#9a9a9a',
        fontSize: 14,
        marginTop: 30,
        paddingLeft: 20,
    },

})

export default Home;
