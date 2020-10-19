import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import Button from '../Common/Button';
import Form from '../Common/Form/Form';
import Input from '../Common/Form/Input';
import '../Common/Form/Form.css';
import axios from '../../axios-order';
const AddUser = (props) => {
    let history = useHistory();
    const urlParams =  new URLSearchParams(window.location.search);
    const editUserId = urlParams.get('edit');
    


    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [btnString, setBtnString] = useState('Add Record')
    
   const handleSubmit = (event) => {
        event.preventDefault();
        const data = {  name,  phone  }
        if (editUserId) {
            axios.put(`users/${editUserId}.json`,  data  )
            .then(response => { history.push('/')   })
            .catch(err => { console.log(err);   })
             return true;
        }
    
        axios.post('/users.json', data)
        .then(response => {  history.push('/') })
        .catch(err => console.log(err));
     
    }
    const formInputHandle = (inputType) => (event) =>{
        console.log({inputType}, {event})
        const errors = {};
        switch (inputType) {
            case 'name':
                if(!event.target.value) {
                 errors.name = ['name is required'];
                }
                setName( event.target.value)
            break;
            case 'phone':
                if(!event.target.value) {
                    errors._user = ['phone is required'];
                }
                setPhone( event.target.value);
               
            break;
            default:
            break;
        }
    }


  
    useEffect( () => {
        if (editUserId) {
           
            axios.get(`users/${editUserId}.json`)
            .then(response => {
                 setName(response.data.name);
                 setPhone(response.data.phone);
                 setBtnString('Update Record')
            })
         }
    }, [])
   
    return (
        <div className="container">
            <Button className="btn btn-primary btn-xs align-right"  >
                <Link to="">  User List</Link>
            </Button>
             <Form style={{width:"60%", margin: 'auto'}}  onSubmit={handleSubmit}>
                    <div className="form-group">
                                <Input 
                                labelValue= "Enter your Name"
                                type="text"
                                name="name"
                                value = {name}
                                onChange ={formInputHandle("name")}
                                placeholder="Enter Name"
                                />
                    </div>

                 <div className="form-group">
                          <Input
                          labelValue="Enter your phone number"
                          type="text"
                          name="phone"
                          value = {phone}
                          onChange ={formInputHandle("phone")}
                          placeholder="Enter your phone number" 
                        />
                 </div>
                 <div style={{marginTop:"20px"}}>
                    <Button
                    type="submit"
                    className="btn btn-primary mt-100"
                    >
                        {btnString}
                    </Button>
                 </div>
             </Form>
        </div>
    )
}

export default AddUser;

