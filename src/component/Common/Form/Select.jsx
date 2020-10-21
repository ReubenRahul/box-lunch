import React from 'react';

const Select = (props) => {
    if(props.name==="vendors")
    {
        console.log(props,'props',props.length)
        console.log( props.options,'props')
    }
    
    return (
        <select
        {...props}
        >
          { Object.entries(props.options).map( ( [value ,key], index)   => (
             <option key={index} value={value}> {key}</option>
           )
           )
          }
        </select>
    )
}
export default Select;