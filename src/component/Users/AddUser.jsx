import React from 'react'
import { Link } from 'react-router-dom';
import Button from '../Common/Button';

const AddUser = (props) => {
    return (
        <div>
            
            <Button
                className="btn btn-primary btn-xs align-right"
            >
                <Link to="">  User List</Link>
            </Button>
             This is Add User </div>
    )
}

export default AddUser;

