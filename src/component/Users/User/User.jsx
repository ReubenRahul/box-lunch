import React from 'react';
import TableComponent from '../../Common/TableComponent';
import TableHeader from "./TableHeader";
import UserContent from './UserContent'

const User = (props) => {
    
    return (
        <TableComponent>
            <TableHeader />
            {props.users.map(user => (
                <UserContent key ={user.id} {...user}/>
            ))}
         
        </TableComponent>
    )
}

export default User;