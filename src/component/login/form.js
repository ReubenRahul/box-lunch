import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import Canvas2Image from 'canvas2image';
import ReactSelect from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
// import  './form.css'


const LoginForm = (props) => {
        useEffect(() => {

        })
        const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = selectedOption => {
        setSelectedOption(selectedOption);
        // this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };
        return (
            <div className="container-xs">

                <ReactSelect
                value ={selectedOption}
                options = {options}
                onChange={handleChange}
                isMulti
                isSearchable
                />



            </div>
        );
}

export  default LoginForm;
