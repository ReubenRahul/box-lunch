import React from 'react';
import TableComponent from '../../Common/TableComponent';
import TableHeader from "./TableHeader";
import UserContent from './UserContent'

const User = (props) => {
    return (
        <TableComponent>
            <TableHeader />
            { props.users.map(user =>(
                 <UserContent editUserHandler ={props.editUserHandler}
                             deleteHandler = {props.deleteHandler} 
                             key ={user.id} 
                             {...user}
                />
                             
                ))
            }
         
        </TableComponent>
    )
}

export default User;