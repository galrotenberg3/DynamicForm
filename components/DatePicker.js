import React from 'react';
import { View, Button } from 'react-native';

import DateTimePicker from 'react-native-modal-datetime-picker';
import { MKButton, MKColor,
    mdl, } from 'react-native-material-kit';

const DatePicker = (props) => {

    return(
        <View>
            <Button onPress={props.on_date_pick} title='Choose date' />

            <DateTimePicker
            isVisible={props.show_date}
            onConfirm={props.confirm_date}
            onCancel={props.cancel_date} />
        </View>
    )
}

export default DatePicker