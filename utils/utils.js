import React from 'react';

export function collect_categories(form_objects){
    let categories = {'Default': ['Default']};

    form_objects.forEach(form_obj => {
        let category = form_obj.category;
        let sub_category = form_obj.sub_category;
        if(!categories.hasOwnProperty(category)){
            categories[category] = []
        }

        categories[category].push(sub_category)
    })

    return categories;
}

export const string_format = require('string-format');

