import React, {Component} from 'react';
import {StyleSheet} from "react-native";
import Checkbox from 'expo-checkbox';

class CheckBox extends Component<any> {
    state = {
        isChecked: false
    }

    handleChange = (value: any) => {
        console.log(value)
        const {
            onChange = () => {
            }
        } = this.props;
        this.setState({
            isChecked: value
        })
        onChange(value)
    }

    render() {
        const {isChecked} = this.state;
        const {style} = this.props;
        return (
            <Checkbox
                style={style}
                value={isChecked}
                onValueChange={this.handleChange}
                color={isChecked ? '#4630EB' : undefined}
            />
        );
    }
}

export default CheckBox;
