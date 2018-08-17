import React from 'react';
import { View } from 'react-native';



import Categories from './Categories';
import FormField from './FormField';
import DatePicker from './DatePicker';
import * as utils from '../utils/utils';

export default class UserForm extends React.Component {
    constructor(props){
        super(props);

        // Connect to Db and pull forms
        const form_objects = [{
                            category: 'Sports',
                            sub_category: 'Tennis',
                            fields: [
                                {
                                    name: 'Type of court',
                                    description: 'Specify the court conditions',
                                    type: 'combo_box',
                                    box_strings: ['Grass', 'Concrete']
                                },
                                {
                                    name: 'Check text boxes',
                                    description: 'Enter free text',
                                    type: 'string',
                                },
                            ]
                         },]
        let categories = utils.collect_categories(form_objects);
        this.state = {
            form_objects: form_objects,
            categories: categories,
            selected_category: 'Default',
            selected_sub_category: 'Default',
            event_name: null,
            show_date: false,
            date: null,
            location: null,
            additional_data: null,
            current_form: {category: null, sub_category: null},
            field_values: {},
            not_valid_fields: {},
        }
    }

    render() {
        var form_fields = null
        this.state.form_objects.forEach(form_obj => {
            if(form_obj.category != this.state.current_form.category || form_obj.sub_category != this.state.current_form.sub_category){
                return;
            }
            
            form_fields = form_obj.fields.map(field => {
                // var current_value = this.state.field_values.hasOwnProperty(field.name) ? this.state.field_value[field_name] : null;
                return <FormField   key={field.name}
                                    name={field.name}
                                    description={field.description}
                                    type={field.type}
                                    max_value={field.max_value}
                                    min_value={field.min_value}
                                    box_strings={field.box_strings}
                                    on_value_changed={this.on_form_field_changed}
                                    invalid_value_cb={this.invalid_value_cb}
                                    clean_invalid_value_cb={this.clean_invalid_value_cb} />
            })
        })
        

        return(
            <View style={{flexDirection: 'column'}}>
                <Categories selected_category={this.state.selected_category}
                            selected_sub_category={this.state.selected_sub_category}
                            categories={this.state.categories}
                            on_category_changed={this.on_category_changed}
                            on_sub_category_changed={this.on_sub_category_changed} /> 

                {form_fields}

                <DatePicker on_date_pick={this.on_date_pick}
                            show_date={this.state.show_date}
                            confirm_date={this.confirm_date}
                            cancel_date={this.cancel_date} />
            </View>
        );
    }

    on_category_changed = (category) => {
        this.setState(prev_state => {
            return {
            form_objects: prev_state.form_objects,
            categories: prev_state.categories,
            selected_category: category,
            selected_sub_category: null,
            event_name: prev_state.event_name,
            show_date: prev_state.show_date,
            date: prev_state.date,
            location: prev_state.location,
            additional_data: prev_state.additional_data,
            current_form: {category: null, sub_category: null},
            field_values: {},
            not_valid_fields: prev_state.no_valid_fields,
            }
        })
    }

    on_sub_category_changed = (category, sub_category) => {
        console.log(utils.string_format('changed categories to {0}\\{1}', category, sub_category))
        this.setState(prev_state => {
            return {
                form_objects: prev_state.form_objects,
                categories: prev_state.categories,
                selected_category: category,
                selected_sub_category: sub_category,
                event_name: prev_state.event_name,
                show_date: prev_state.show_date,
                date: prev_state.date,
                location: prev_state.location,
                additional_data: prev_state.additional_data,
                current_form: {category: category, sub_category: sub_category},
                // Changed dynamic form, thus emptying the current one
                field_values: {},
                not_valid_fields: prev_state.no_valid_fields,
                }
        })
    }

    on_form_field_changed = (field_name, field_value) =>{
        console.log('=============')
        console.log(field_name)
        console.log(field_value)
        console.log(this.state)
        console.log('=============')
        var field_values = this.state.field_values;
        field_values[field_name] = field_value;

        this.setState(prev_state => {
            return {
                form_objects: prev_state.form_objects,
                categories: prev_state.categories,
                selected_category: prev_state.selected_category,
                selected_sub_category: prev_state.sub_category,
                event_name: prev_state.event_name,
                show_date: prev_state.show_date,
                date: prev_state.date,
                location: prev_state.location,
                additional_data: prev_state.additional_data,
                current_form: prev_state.current_form,
                field_values: field_values,
                not_valid_fields: prev_state.no_valid_fields,
            }
        })
    }

    confirm_date = (date_value) => {
        this.setState(prev_state => {
            return {
                form_objects: prev_state.form_objects,
                categories: prev_state.categories,
                selected_category: prev_state.selected_category,
                selected_sub_category: prev_state.sub_category,
                event_name: prev_state.event_name,
                show_date: false,
                date: date_value,
                location: prev_state.location,
                additional_data: prev_state.additional_data,
                current_form: prev_state.current_form,
                field_values: prev_state.field_values,
                not_valid_fields: prev_state.no_valid_fields,
            }
        })
    }

    cancel_date = (_) => {
        this.setState(prev_state => {
            return {
                form_objects: prev_state.form_objects,
                categories: prev_state.categories,
                selected_category: prev_state.selected_category,
                selected_sub_category: prev_state.sub_category,
                event_name: prev_state.event_name,
                show_date: false,
                date: prev_state.date,
                location: prev_state.location,
                additional_data: prev_state.additional_data,
                current_form: prev_state.current_form,
                field_values: prev_state.field_values,
                not_valid_fields: prev_state.no_valid_fields,
            }
        })
    }

    on_date_pick = () => {
        this.setState(prev_state => {
            let show_date = !prev_state.show_date;
            return {
                form_objects: prev_state.form_objects,
                categories: prev_state.categories,
                selected_category: prev_state.selected_category,
                selected_sub_category: prev_state.sub_category,
                event_name: prev_state.event_name,
                show_date: {show_date},
                date: prev_state.date,
                location: prev_state.location,
                additional_data: prev_state.additional_data,
                current_form: prev_state.current_form,
                field_values: prev_state.field_values,
                not_valid_fields: prev_state.no_valid_fields,
            }
        })
    }

    invalid_value_cb = (field_name, error_msg) => {
        this.setState(prev_state => {
            let invalid_fields = prev_state.invalid_fields
            invalid_fields[field_name] = error_msg
            return {
                form_objects: prev_state.form_objects,
                categories: prev_state.categories,
                selected_category: prev_state.selected_category,
                selected_sub_category: prev_state.sub_category,
                event_name: prev_state.event_name,
                show_date: {show_date},
                date: prev_state.date,
                location: prev_state.location,
                additional_data: prev_state.additional_data,
                current_form: prev_state.current_form,
                field_values: prev_state.field_values,
                invalid_fields: invalid_fields,
            }
        })
    }

    clean_invalid_value_cb = (field_name) => {
        this.setState(prev_state => {
            let invalid_fields = prev_state.invalid_fields
            delete invalid_fields[field_name]
            return {
                form_objects: prev_state.form_objects,
                categories: prev_state.categories,
                selected_category: prev_state.selected_category,
                selected_sub_category: prev_state.sub_category,
                event_name: prev_state.event_name,
                show_date: {show_date},
                date: prev_state.date,
                location: prev_state.location,
                additional_data: prev_state.additional_data,
                current_form: prev_state.current_form,
                field_values: prev_state.field_values,
                invalid_fields: invalid_fields,
            }
        })
    }
}