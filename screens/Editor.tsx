import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';
import {CommonActions} from '@react-navigation/native';
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Api from '../service/diary'

class Editor extends Component<any> {
    state = {
        diaryText: ''
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
        if (params.diaryId) {
            Api.update({id: params.diaryId, data: diaryText}).then(res => {

            })
        } else {
            Api.add({taskId: params.id, data: diaryText}).then(res => {

            })
        }
    }


    render() {
        const {params} = this.props.route
        const {diaryText}=this.state;
        return (
            <View style={styles.container}>
                <View style={styles.header}>

                    <Ionicons onPress={this.handleBack} style={styles.back} name="md-arrow-back"/>

                    <Text style={styles.title}>日记编辑</Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.pertain_info}>

                        <Text style={styles.pertain_info_text}>
                            里程牌:{params.landmarksName.substr(0, 13)}
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
                        <TextInput
                            style={{
                                borderColor: '#eaeaea',
                                borderWidth: 1,
                                borderRadius: 5,
                                marginTop: 10
                            }}
                            multiline
                            numberOfLines={10}
                            editable
                            maxLength={40}
                            onChangeText={text => this.onChangeText(text)}
                            value={diaryText}
                        >

                        </TextInput>

                    </View>
                    <View style={{
                        marginLeft: 25,
                        marginRight: 25
                    }}>
                        <Button
                            title="保存"
                            color="#F96060"
                            onPress={this.handleSave}
                        />
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
        paddingBottom: 60,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        width: 343,
        marginLeft: 32,
    },
    pertain_info: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginLeft: 24,
        marginRight: 24,
        marginTop: 32,
    },
    pertain_info_text: {
        lineHeight: 48,
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
        paddingBottom: 25,
    },
})

export default Editor;
