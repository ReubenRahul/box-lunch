import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Common/Button';
import User from '../Users/User/User';
const UserComponent = () => {
    console.log('user component');
    const [users, setUsers] = useState(
        [{
            id: 1,
            name: 'Testing1',
            mobile: 1232322
        },
        {
            id: 2,
            name: 'Rahul',
            mobile: 1232322
        }]
    )



    return (
        <div className="UserSection" style={{ width: '80%', margin: 'auto' }}>
            <Button
                className="btn btn-primary btn-xs align-right"
            >
                <Link to="user/add"> Add User</Link>
            </Button>
            <User users={users} />
        </div>
    )
}

export default UserComponent;
