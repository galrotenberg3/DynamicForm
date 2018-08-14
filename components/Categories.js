import React from 'react';
import { Picker, Text, View } from 'react-native';

export default class Categories extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selected_category: props.selected_category,
            selected_sub_category: props.selected_sub_category,
            categories: props.categories,
            on_category_changed: props.on_category_changed,
            on_categories_changed: props.on_categories_changed,
        }
    }
    
    render() {
        console.log(this.state.categories)
        let categories= Object.keys(this.state.categories).map(item => {
            return <Picker.Item label={item} value={item} key={item} />
        })
        let sub_categories = this.state.selected_category == null || this.state.selected_sub_category == 'Default' ? [] : this.state.categories[this.state.selected_category].map(item => {
            return <Picker.Item label={item} value={item} key={item} />
        })
         
        return (
            <View>
                <Text>Made categories</Text>
                <Picker onValueChange={this._on_category_changed}>
                    {categories}
                </Picker>
                <Picker onValueChange={this._on_sub_category_changed}>
                    {sub_categories}
                </Picker>
            </View>
        )
    }

    _on_category_changed = (category) => {
        console.log('============')
        console.log(this.state)
        this.setState(prev_state => {
            let tmp_category = category == 'Default' ? null : category;
            let tmp_sub_category = prev_state.selected_category == category ? prev_state.selected_sub_category : null;

            return {
                selected_category: tmp_category,
                selected_sub_category: tmp_sub_category,
                categories: prev_state.categories,
                on_category_changed: prev_state.on_category_changed,
                on_categories_changed: prev_state.on_categories_changed,
            }
        })
        this.state.on_category_changed(category);
    }

    _on_sub_category_changed = (sub_category) => {
        let category = null;
        this.setState(prev_state => {
            category = prev_state.selected_category;
            return {
                selected_category: prev_state.category,
                selected_sub_category: sub_category,
                categories: prev_state.categories,
                on_category_changed: prev_state.on_category_changed,
                on_sub_category_changed: prev_state.on_sub_category_changed,
                }
        })

        this.state.on_categories_changed(category, this.state.selected_sub_category)
    }
}