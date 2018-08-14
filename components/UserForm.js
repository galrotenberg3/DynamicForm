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
        let form_objects = [{
                            category: 'Sports',
                            sub_category: 'Tennis',
                            fields: [
                                {
                                    name: 'Type of court',
                                    description: 'Specify the court conditions.',
                                    type: 'combo_box',
                                    box_strings: ['Grass', 'Concrete']
                                }
                            ]
                         },]
        let categories = utils.collect_categories(form_objects);

        this.state = {
            from_objs: form_objects,
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
        }
    }

    render() {
        let form_fields = []
        if (this.state.current_form.category && this.state.current_form.sub_category){
            this.state.from_objs.forEach(form_obj => {
                if(form_obj.category != this.state.current_form.category || form_obj.sub_category != this.state.current_form.sub_category){
                    return;
                }

                form_fields = form_obj.fields.map(field => {
                    return <FormField name={field.name}
                                      description={field.description}
                                      type={field.description}
                                      max_value={field.max_value}
                                      min_value={field.min_value}
                                      box_strings={field.box_strings} />
                })
            })
        }
        console.log('============')
        console.log(form_fields)
        

        return(
            <View>
                <Categories selected_category={this.state.selected_category}
                            selected_sub_category={this.state.selected_sub_category}
                            categories={this.state.categories}
                            on_category_changed={this.on_category_changed}
                            on_categories_changed={this.on_categories_changed} /> 

                <DatePicker on_date_pick={this.on_date_pick}
                      show_date={this.state.show_date}
                      confirm_date={this.confirm_date}
                      cancel_date={this.cancel_date} />

                <FormField />
            </View>
        );
    }

    on_category_changed = (category) => {
        this.setState(prev_state => {
            return {
            from_objs: prev_state.form_objects,
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
            }
        })
    }

    on_categories_changed = (category, sub_category) => {
        this.setState(prev_state => {
            return {
                from_objs: prev_state.from_objs,
                categories: prev_state.categories,
                selected_category: category,
                selected_sub_category: sub_category,
                event_name: prev_state.event_name,
                show_date: prev_state.show_date,
                date: prev_state.date,
                location: prev_state.location,
                additional_data: prev_state.additional_data,
                current_form: {category: category, sub_category: sub_category},
                field_values: prev_state.field_value,
                }
        })
    }

    on_form_field_changed = (field_name, field_value) =>{
        let field_values = this.state.field_values;
        field_values[field_name] = field_value;

        thie.setState(prev_state => {
            return {
                from_objs: prev_state.from_objs,
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
            }
        })
    }

    confirm_date = (date_value) => {
        this.setState(prev_state => {
            return {
                from_objs: prev_state.from_objs,
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
            }
        })
    }

    cancel_date = (_) => {
        this.setState(prev_state => {
            return {
                from_objs: prev_state.from_objs,
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
            }
        })
    }

    on_date_pick = () => {
        this.setState(prev_state => {
            let show_date = !prev_state.show_date;
            return {
                from_objs: prev_state.from_objs,
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
            }
        })
    }
}