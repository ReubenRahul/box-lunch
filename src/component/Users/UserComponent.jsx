import React, { Suspense, useEffect, useState, lazy } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '../Common/Button';
import User from '../Users/User/User';
import axios from '../../axios-order';

// const User = lazy( () => import('../Users/User/User') )

const UserComponent = () => {
    let history = useHistory();
    const [users, setUsers] =useState([]);
    const [userUpdate, setUserUpdate] = useState(false);

    const updateUserData = (response) => {
        let fetchedUers = [];
        for( let key in response.data) {
            fetchedUers.push({
                ...response.data[key],
                id : key
            });
        }
        setUsers(fetchedUers);
    }
    useEffect(() => {
        axios.get('/users.json')
        .then(response => {
            updateUserData(response)
        })
        .catch(err => {
            console.log('err', err)
        })
    }, [userUpdate]); 


    

    const deleteUser = (userId) => {
        axios.delete(`users/${userId}.json`)
        .then(response => {
            setUserUpdate(true);
        })
        .catch(err => {
            console.log(err)
        })
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
