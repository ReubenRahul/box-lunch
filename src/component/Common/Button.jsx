import React from 'react';
import './Css/Button.css'
const Button = (props) => {
    return (
        <div className="Button-Section">
               <button className = {props.className} {...props}> 
                 {props.children}       
             </button> 
        </div>
    )
}
export default Button;