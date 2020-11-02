import React from 'react';
const Radio = ({ options, name, selected, ...props }) => {
    return (
        <React.Fragment>
          {
         options && options.length && options.map( (option ,index) => {
               return (
                <React.Fragment key = {index}>
                    <input  type="radio"  name={name} value={option.id} checked ={selected === option.id ? true : false} {...props}/>
                    <label htmlFor={name} > {`${option.price} ${option.details}` } </label>
                </React.Fragment>
               ) 
          })
        }
        </React.Fragment>
         
    )
}

export default Radio;