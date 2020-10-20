import React from 'react';
import Label from './Label';

const TextArea = (props) => {
    return (
        <React.Fragment>
             { props.labelValue && 
                <Label value = {props.labelValue} />
            }
            <textarea
                {...props}
                className="form-control"
            >
                {props.value}
            </textarea>

        </React.Fragment>
         
    )
}

export default TextArea;