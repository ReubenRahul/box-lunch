import React, { Suspense, useEffect, useState, lazy } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '../Common/Button';
import User from '../Users/User/User';
import axios from '../../axios-order';
import { useStateValue } from '../../StateProvider';
import { USERS_OPTION } from '../../+store/Action';
import { fetchUsers, deleteUserAction } from '../../+store/URL/User/UsersUrls'
// const User = lazy( () => import('../Users/User/User') )

const UserComponent = () => {
    const [{userOptions} , dispatch] = useStateValue();
    let history = useHistory();
    const [users, setUsers] =useState([]);
    const [userUpdate, setUserUpdate] = useState(false);

    useEffect(() => {
        fetchUsers().then( (res) => {
            dispatch( {  type:USERS_OPTION, payload:res  })
            setUsers(res);
            }
        );
    }, [userUpdate]); 


    

    const deleteUser = (userId) => {
        deleteUserAction(userId);
        setUserUpdate(true);
        // axios.delete(`users/${userId}.json`)
        // .then(response => {
        //     setUserUpdate(true);
        // })
        // .catch(err => {
        //     console.log(err)
        // })
    }


    const editUser = (userId) => {
        history.push(`user/add?edit=${userId}`)
    }
    return (
        <div className="UserSection" style={{ width: '80%', margin: 'auto' }}>
            <Suspense fallback ={ <h2> Loading..</h2>}>
                <Button
                    className="btn btn-primary btn-xs align-right"
                >
                    <Link to="user/add"> Add User</Link>
                </Button>
                <User users={users} deleteHandler ={deleteUser} editUserHandler={editUser}/>
            </Suspense>
        </div>
    )
}

export default UserComponent;
