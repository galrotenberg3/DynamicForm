import React from 'react';
import { Picker, Text, View } from 'react-native';

import DataMark from './DataMark';

import {
    MKTextField,
    MKColor,
    mdl,
  } from 'react-native-material-kit';

const FormField = (props) => {
    console.log(props)
    var field = null;
    var _on_value_changed = null
    if(props.type == 'combo_box'){
        var sub_fields = props.box_strings.map(item => {
            return <Picker.Item label={item} value={item} key={item} />
        })

        field = <Picker onValueChanged={props.on_value_changed}>
                    {sub_fields}
                </Picker>
    }
    else if(props.type == 'string'){
        field = 
                <MKTextField
                tintColor={MKColor.Lime}
                textInputStyle={{color: MKColor.Orange}}
                style={styles.textfield} />
    }
    else if(props.type == 'number' || props.type == 'double'){
        var min_validation = props.min_value ? (value) => {return value > props.min_value} : (value) => {return True}
        var max_validation = props.max_value ? (value) => {return value < props.min_value} : (value) => {return True}
        const field_changed = (value) => {
            if(!min_validation(value) || !max_validation(value)){
                props.invalid_value_cb(props.field_name, "'${props.field_name}' has to be in restriction of: ${props.min_value} - ${props.max_value}");
            }
            else if(props.name in props.need_validate_values){
                props.clean_invalid_value_cb(props.name)
            }
            props.on_value_changed(value);
        }
        field = <MKTextField
                tintColor={MKColor.Lime}
                textInputStyle={{color: MKColor.Orange}}
                style={styles.textfield}
                onTextChange={field_changed} />
    }
    console.log(field)
    return (
        <View>
            <Text>{props.name}</Text>
            <DataMark mark='?' data={props.data} is_visible={props == null} />
            {field}
        </View>
    )
}

export default FormField;