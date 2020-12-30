import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, RefreshControl,} from 'react-native'
import moment from 'moment'
import {classnames} from '../utils'
import TaskCheckItem from "../components/TaskCheckItem";
import {setLocalData, getLocalData} from "../utils";
import * as Api from '../service/task'

class Home extends Component<any> {
    state = {
        tabIndex: 1,
        refreshing: false,
        repeatData: [],
        noRepeatData: []
    }

    async componentDidMount() {
        const token = await getLocalData('token')
        // console.log('当前token：', token)
        if (!token) {
            this.props.navigation.navigate('login')
            return
        }

        this.query()

    }

    query = () => {
        this.setState({
            refreshing: true
        })

        Promise.all([Api.repeatTask(), Api.noRepeatTask()]).then((res: Array<any>) => {
            this.setState({
                repeatData: res[0],
                noRepeatData: res[1],
                refreshing: false
            })
        })
    }

    handleRefresh = () => {
        this.query();
    }

    render() {
        let {tabIndex, repeatData, noRepeatData, refreshing} = this.state
        const unDoList = repeatData.filter((item: any) => item.status === null);
        const doneList = repeatData.filter((item: any) => !!item.status);
        repeatData = [...unDoList, ...doneList]

        const undoNoRepeatList = noRepeatData.filter((item: any) => item.status === null);
        const doneNoRepeatList = noRepeatData.filter((item: any) => !!item.status);
        noRepeatData = [...undoNoRepeatList, ...doneNoRepeatList]
        return (
            <View>
                <View style={styles.header}>
                    <Text style={{
                        textAlign: 'center',
                        color: '#ffffff',
                        fontSize: 20,
                        lineHeight: 40,
                    }}>{moment(new Date()).format('YYYY-MM-DD')}</Text>
                </View>


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
                <ScrollView
                    style={styles.scrollView}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={this.handleRefresh}/>
                    }
                >

                    <View style={styles.task_container}>
                        {tabIndex === 1 && <View>
                            <Text style={styles.task_info}>{unDoList.length}/{repeatData.length}</Text>
                            {repeatData.map((item: any, index) => <TaskCheckItem {...this.props} key={item.id+item.status} data={item}
                                                                                 onSuccess={this.query}/>)}
                        </View>}
                        {tabIndex === 2 && <View>
                            <Text style={styles.task_info}>{undoNoRepeatList.length}/{noRepeatData.length}</Text>
                            {noRepeatData.map((item: any, index) => <TaskCheckItem {...this.props} key={item.id} data={item}
                                                                                   onSuccess={this.query}/>)}
                        </View>}
                    </View>
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: '#F96060',
        // height: 151,
        paddingTop: 44,
    },
    tab_bar: {
        backgroundColor: '#F96060',
        paddingTop: 4,
        height: 'auto',
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
    task_container: {
        paddingBottom: 180,
    },
    task_info: {
        color: '#9a9a9a',
        fontSize: 14,
        marginTop: 30,
        paddingLeft: 20,
    },
    scrollView: {
        backgroundColor: '#ffffff',

    },
})

export default Home;
