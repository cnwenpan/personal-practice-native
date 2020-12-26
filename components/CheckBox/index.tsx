import React, {Component} from 'react';
import {StyleSheet} from "react-native";
import Checkbox from 'expo-checkbox';

class CheckBox extends Component<any> {
    handleChange = (value: any) => {

        const {
            onChange = () => {
            }
        } = this.props;

        onChange(value)
    }

    render() {
        const {style,value} = this.props;
        return (
            <Checkbox
                style={style}
                value={value}
                onValueChange={this.handleChange}
                color={value ? '#4630EB' : undefined}
            />
        );
    }
}

export default CheckBox;
