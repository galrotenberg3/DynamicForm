import React from 'react';
import { Picker, Text, View } from 'react-native';

// Dropdown ref - https://www.npmjs.com/package/react-native-material-dropdown
import { Dropdown } from 'react-native-material-dropdown';
// TextField ref - https://github.com/n4kz/react-native-material-textfield#properties
import { TextField } from 'react-native-material-textfield';

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
            // return <Picker.Item label={item} value={item} key={item} />
            return {value: item};
        })

        // field = <Picker onValueChanged={props.on_value_changed}>
        //             {sub_fields}
        //         </Picker>
        field = <Dropdown label={props.name}
                          data={sub_fields}
                          onChangeText={(value) => props.on_value_changed(props.name, value)} />
    }
    else if(props.type == 'string'){
        field = 
                // <MKTextField
                // tintColor={MKColor.Lime}
                // textInputStyle={{color: MKColor.Orange}}
                // style={styles.textfield} />
                <TextField label={props.name}
                            value={props.current_value}
                            onChangeText={(value) => props.on_value_changed(props.name, value)} />
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
            props.on_value_changed(props.name, value);
        }
        // field = <MKTextField
        //         tintColor={MKColor.Lime}
        //         textInputStyle={{color: MKColor.Orange}}
        //         style={styles.textfield}
        //         onTextChange={field_changed} />
        field = <TextField label={props.name}
                            value={props.current_value}
                            onTextChange={field_changed} />
    }
    return (
        <View>
            {/* <Text>{props.name}</Text> */}
            {field}
            <DataMark mark='?' data={props.description} is_visible={props == null} />
        </View>
    )
}

export default FormField;