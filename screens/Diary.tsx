import React, {Component} from 'react';
import {View, Text, ScrollView, RefreshControl, StyleSheet} from 'react-native'
import HTML from "react-native-render-html";
import * as Api from "../service/diary";

class Diary extends Component {
    state = {
        data: [],
        refreshing: false,
    }

    componentDidMount() {
        this.query()
    }

    query = () => {
        this.setState({
            refreshing: true
        })
        Api.list().then(data => {
            console.log(data)
            this.setState({
                data,
                refreshing: false
            })
        })
    }
    handleRefresh = () => {
        this.query()
    }

    render() {
        const {refreshing, data} = this.state

        return (
            <View style={styles.container}>
                <View style={styles.header}>

                    <Text style={styles.title}>日记清单</Text>
                </View>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={this.handleRefresh}/>
                    }>
                    <View style={styles.content}>
                        {data.map((item: any) => (
                            <View style={styles.diary_item} key={item.time}>
                                <Text style={{fontSize: 16,
                                    fontWeight: 'bold'}}>{item.time}</Text>
                                {item.list.map((li: any, index: number) => {
                                    return <View key={index}>
                                        <View style={{
                                            borderColor: '#F4CA8F',
                                            borderBottomWidth: 1,
                                            height: 30,
                                            width: 150,

                                        }}>
                                            <Text style={{lineHeight: 30,
                                                color:'#b775f1'}}>{li.name}</Text>
                                        </View>
                                        <HTML key={index} source={{html: li.diaryText}}/>
                                    </View>
                                })}
                            </View>
                        ))}
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
        // flexDirection: 'row',
        // justifyContent: "flex-start",
        // flexWrap: 'wrap',
        paddingTop: 20,

        // paddingLeft:16,
        paddingRight: 16,
        paddingBottom: 10,
    },
    diary_item: {
        marginTop: 10,
        marginLeft: 16,
        padding: 6,
        borderRadius: 2,
        backgroundColor: '#ffffff',

    },
    inventory: {
        flexDirection: 'row',
        justifyContent: "flex-start",
    }
})
export default Diary;
