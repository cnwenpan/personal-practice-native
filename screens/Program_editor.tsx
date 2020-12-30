import React from 'react';
import {View, Text, StyleSheet, TextInput, Button, Alert} from 'react-native';
import {useForm, Controller} from "react-hook-form";
// @ts-ignore
import DatePicker from 'react-native-datepicker'
import * as Api from '../service/program'

function ProgramEditor (props:any) {
    const {control, handleSubmit, errors} = useForm();
    const onSubmit = (values: any) => {
        console.log(values)
        const {params}=props.route;
        if (params.id) {
            Api.update({...params, ...values}).then(res => {
                Alert.alert('修改成功')
            })
        } else {
            Api.add(values).then(res => {
                Alert.alert('新增成功')
            })
        }


    }
    return (
        <View style={styles.container}>

            <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                    <View style={styles.form_item}>
                        <Text style={styles.label}>项目名：</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                        />
                    </View>
                )}
                name="name"
                rules={{required: true}}
                defaultValue={props.route.params.name}
            />
            {errors.name && <Text>This is required.</Text>}
            <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                    <View style={styles.form_item}>
                        <Text style={styles.label}>优先级：</Text>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                        />
                    </View>

                )}
                name="level"
                rules={{required: true}}
                defaultValue={props.route.params.level}
            />
            {errors.level && <Text>This is required.</Text>}
            <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                    <View style={styles.form_item}>
                        <Text style={styles.label}>截止时间：</Text>
                        <DatePicker
                            style={{
                                height: 28,
                                borderBottomWidth: 1,
                                borderColor: '#D8D8D8',
                                width: 120,

                            }}
                            date={props.route.params.start_time}
                            mode="date"
                            placeholder=""
                            format="YYYY-MM-DD"

                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            iconComponent={<Text> </Text>}
                            customStyles={{
                                // dateIcon: {
                                //     position: 'absolute',
                                //     left: 0,
                                //     top: 4,
                                //     marginLeft: 0
                                // },
                                dateInput: {
                                    lineHeight: 28,
                                    height: 28,
                                    borderColor: '#ffffff',
                                    textAlign: 'left',
                                }

                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={value => onChange(value)}
                        />
                    </View>

                )}
                name="endTime"
                rules={{required: true}}
                defaultValue=""
            />
            {errors.endTime && <Text>This is required.</Text>}

            <View style={{marginTop: 10}}>
                <Button title="保存" onPress={handleSubmit(onSubmit)}/>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#ffffff',
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 24,
    },
    form_item: {
        marginTop: 16,
    },
    label: {
        color: '#9A9A9A',
        lineHeight: 28,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#D8D8D8',
        lineHeight: 28,
        width: '100%',
    }
})

export default ProgramEditor;
