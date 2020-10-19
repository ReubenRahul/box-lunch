import React from 'react'
import {  useHistory } from 'react-router-dom';


const Demo  = (props) => {
    let history = useHistory();
   const  handleSubmit = (event) => {
        event.preventDefault();
        //logic will be here
        history.push('/users-list') // this will redirect to users-list
        // in #react with the help of useHistory hook we can redirect to other route from functional component. here is the example in SS
        // #react #reactRocks #100DaysOfCode
    }


    return (
        <div>
            <form onSubmit ={handleSubmit}>
               <button type="submit"></button>
            </form>
           
        </div>
    )
}
export default Demo;