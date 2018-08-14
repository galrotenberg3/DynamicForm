import React from 'react';
import { Picker, Text, View } from 'react-native';

import {
    MKTextField,
    MKColor,
    mdl,
  } from 'react-native-material-kit';

const FormField = (props) => {
    let field = null;
    if(props.type == 'combo-box'){
        sub_fields = props.box_strings.map(item => {
            return <Picker.Item label={item} value={item} key={item} />
        })
        field = <Picker>
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
    else if(props.type == 'integer' || props.type == 'double'){
        max_val_validation = props.max_value ? (value) => {return value<=props.max_value} : (value) => {return True}
        min_val_validation = props.min_value ? (value) => {return value>=props.min_value} : (value) => {return True}
        field = <MKTextField
                tintColor={MKColor.Lime}
                textInputStyle={{color: MKColor.Orange}}
                style={styles.textfield}
                onTextChange={props.validate_field} />
    }
    return (
        <View>
            {field}
        </View>
    )
}

export default FormField;