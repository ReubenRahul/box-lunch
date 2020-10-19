import React from 'react';
import Label from './Label';

const Input = (props) => {
    return (
        <React.Fragment>
             { props.labelValue && 
                <Label value = {props.labelValue} />
            }
            <input
                {...props}
                className="form-control"
            />
        </React.Fragment>
         
    )
}

export default Input;