import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, RefreshControl, Pressable} from 'react-native'
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment'
import * as Api from '../service/program'
import {classnames} from "../utils";

class Program extends Component<any> {

    state = {
        data: [],
        refreshing: false
    }

    componentDidMount() {
        this.query()
    }

    query = () => {
        this.setState({
            refreshing: true
        })
        Api.list().then(data => {
            this.setState({
                data,
                refreshing: false
            })
        })
    }
    handleRefresh = () => {
        this.query()
    }

    handleEdit = (data: any) => {

        this.props.navigation.navigate('program_editor', data)
    }

    render() {
        const {data, refreshing} = this.state

        return (
            <View style={styles.container}>
                <View style={styles.header}>

                    <Text style={styles.title}>项目列表</Text>
                </View>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={this.handleRefresh}/>
                    }>
                    <View style={styles.content}>
                        {
                            data.map((item: any) => (

                                <View
                                    key={item.id}
                                    style={styles.program_item}
                                >
                                    <Pressable onPress={() => {
                                        this.handleEdit(item)
                                    }} style={{width: '100%'}}>
                                        <View style={classnames([
                                            {style: styles.status, status: true},
                                            // @ts-ignore
                                            {style: styles[`${!!item.start_time ? 'doing' : 'undo'}`], status: true}
                                        ])}>
                                            <View style={classnames([
                                                {style: styles.status_dot, status: true},

                                                {
                                                    // @ts-ignore
                                                    style: styles[`${!!item.start_time ? 'doing_dot' : 'undo_dot'}`],
                                                    status: true
                                                }
                                            ])}/>
                                        </View>
                                        <Text style={{
                                            fontSize: 14,
                                            marginTop: 4
                                        }}>{item.name}</Text>
                                        <Text style={{
                                            fontSize: 14,
                                            marginTop: 4, color: '#5ABB56'
                                        }}>3 里程碑</Text>
                                        <Text style={{
                                            fontSize: 14,
                                            marginTop: 4, color: '#9a9a9a'
                                        }}>14 任务</Text>
                                        <Text style={{
                                            fontSize: 14,
                                            marginTop: 4,
                                            color: '#E42B6A'
                                        }}>{moment(item.end_time).format('YYYY-MM-DD')}</Text>
                                    </Pressable>
                                </View>

                            ))
                        }

                            <View style={styles.plus}>
                                <Pressable onPress={() => {
                                    this.handleEdit({})
                                }} style={{width: '100%'}}>
                                <Ionicons style={{
                                    fontSize: 40,
                                    color: '#6074F9'
                                }} name="md-duplicate-sharp"/>
                                </Pressable>
                            </View>


                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f1ebeb',
        height: '100%'
    },
    header: {
        paddingTop: 20,
        backgroundColor: '#ffffff',
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowOffset: {
            width: 2,
            height: 4
        },
        shadowRadius: 2,
        elevation: 6,
    },
    title: {
        lineHeight: 40,
        textAlign: 'center',
        fontSize: 20,
        color: '#313131'
    },
    content: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        flexWrap: 'wrap',
        paddingTop: 20,

        // paddingLeft:16,
        paddingRight: 16,
        paddingBottom: 10,
    },
    status: {
        width: 26,
        height: 26,
        marginLeft: -10,
        borderRadius: 13,

        flexDirection: 'column',
        paddingLeft: 3,
        justifyContent: "center",
    },
    status_dot: {
        width: 20,
        height: 20,
        borderRadius: 10,

    },
    doing: {
        backgroundColor: '#D4F1D3',
    },
    undo: {
        backgroundColor: '#DBDDEF',
    },
    doing_dot: {
        backgroundColor: '#5ABB56'
    },
    undo_dot: {
        backgroundColor: '#97a0d7',
    },
    program_item: {
        marginLeft: 16,
        marginTop: 10,
        width: 154,
        minHeight: 150,
        borderRadius: 4,
        paddingLeft: 26,
        paddingRight: 26,
        paddingTop: 10,
        backgroundColor: '#ffffff',
    },
    plus: {
        marginLeft: 16,
        marginTop: 10,
        width: 154,
        height: 150,
        borderRadius: 4,
        backgroundColor: '#ffffff',
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: 50,
    }
})
export default Program;
