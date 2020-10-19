import React from 'react';

const Select = (props) => {
    return (
        <select
        {...props}
        >
           { props.options.map(( optionVal) => (
                <option key = {optionVal.key} value ={optionVal.value}> {optionVal.value} </option>
                ) )
           }
        </select>
    )
}

export default Select;