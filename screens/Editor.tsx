import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, TextInput,ToastAndroid} from 'react-native';
import {CommonActions} from '@react-navigation/native';
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Api from '../service/diary'
import HTML from "react-native-render-html";
import moment from "moment";

class Editor extends Component<any> {
    state = {
        diaryText: '',
        visible:false,
    }

    handleBack = () => {
        this.props.navigation.dispatch(CommonActions.goBack());
    }

    componentDidMount() {
        const {params} = this.props.route;
        this.setState({
            diaryText: params.diaryText
        })
    }

    onChangeText = (value:any) => {

        this.setState({
            diaryText: value
        })
    }

    handleSave = () => {
        const {params} = this.props.route;
        const {diaryText} = this.state;
        ToastAndroid.showWithGravity(
            'All Your Base Are Belong To Us',
            ToastAndroid.LONG,
            ToastAndroid.CENTER
        );
        if (params.diaryId) {
            Api.update({id: params.diaryId, data: diaryText}).then(res => {
                // this.setState({
                //     visible:false
                // })
            })
        } else {
            Api.add({taskId: params.id, data: diaryText}).then(res => {
                // this.setState({
                //     visible:false
                // })
            })
        }
    }


    render() {
        const {params} = this.props.route
        const {diaryText,visible}=this.state;
        return (
            <View style={styles.container}>
                <View style={styles.header}>

                    <Ionicons onPress={this.handleBack} style={styles.back} name="md-arrow-back"/>

                    <Text style={styles.title}>任务细节</Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.pertain_info}>

                        <Text style={styles.pertain_info_text}>
                            里程牌:{params.landmarksName}
                        </Text>
                        <Text style={styles.pertain_info_text}>
                            项目：{params.programName}
                        </Text>
                    </View>

                    <View>
                        <Text style={styles.content_title}>{params.name}</Text>

                    </View>
                    <View style={styles.text_input}>
                        <Text style={{color: '#9e9e9e'}}>内容：</Text>
                        <HTML source={{html: params.description}}/>
                        {/*<TextInput*/}
                        {/*    style={{*/}
                        {/*        borderColor: '#eaeaea',*/}
                        {/*        borderWidth: 1,*/}
                        {/*        borderRadius: 5,*/}
                        {/*        marginTop: 10,*/}
                        {/*        textAlignVertical:'top',*/}
                        {/*        padding:4,*/}
                        {/*    }}*/}
                        {/*    multiline*/}
                        {/*    numberOfLines={10}*/}
                        {/*    editable*/}
                        {/*    maxLength={40}*/}
                        {/*    onChangeText={text => this.onChangeText(text)}*/}
                        {/*    value={diaryText}*/}
                        {/*>*/}

                        {/*</TextInput>*/}

                    </View>


                    {/*<View style={{*/}
                    {/*    marginLeft: 25,*/}
                    {/*    marginRight: 25*/}
                    {/*}}>*/}
                    {/*    <Button*/}
                    {/*        title="保存"*/}
                    {/*        color="#F96060"*/}
                    {/*        onPress={this.handleSave}*/}
                    {/*    />*/}
                    {/*</View>*/}

                    <View style={styles.due_time}>
                        <Text style={{lineHeight:28}}>截止日期：</Text>
                        <Text style={styles.show_time}>{moment(params.start_time).format('YYYY-MM-DD')}</Text>
                        <Text style={{lineHeight:28,marginLeft:10}}>进度：{params.progress}%</Text>
                    </View>
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    header: {
        height: 150,
        backgroundColor: '#F96060',
        paddingTop: 44,
        flexDirection: 'row',
    },
    back: {
        color: '#ffffff',
        fontSize: 20,
        marginLeft: 20,

    },
    title: {
        textAlign: 'center',
        width: '100%',
        paddingRight: 80,
        color: '#ffffff',
        fontSize: 20,
        lineHeight: 24,
    },
    content: {
        marginTop: -40,
        // paddingBottom: 60,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        // width: 343,
        marginLeft: 32,
        marginRight:32,
    },
    pertain_info: {
        // flexDirection: 'row',
        // justifyContent: "space-between",
        marginLeft: 24,
        marginRight: 24,
        marginTop: 10,
    },
    pertain_info_text: {
        lineHeight: 28,
        fontSize: 14,
    },
    content_title: {
        backgroundColor: '#f4f4f4',
        lineHeight: 66,
        paddingLeft: 25,
        marginTop: 20,

    },
    text_input: {
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 16,
        // paddingBottom: 25,
    },
    due_time:{
        backgroundColor: '#f4f4f4',
        lineHeight: 66,
        // paddingLeft: 25,
        marginTop: 20,
        flexDirection: "row",
        paddingTop:20,
    },
    show_time:{
        height:28,
        lineHeight:28,
        borderRadius:4,
        fontSize:14,
        color:'#ffffff',
        backgroundColor:'#6074F9',
        paddingLeft:10,
        paddingRight:10,
    },
})

export default Editor;
