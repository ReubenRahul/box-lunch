import React, { Component, useEffect, useState } from 'react'
import Form from '../Common/Form/Form'
import Label from '../Common/Form/Label'
import Select from '../Common/Form/Select'
import { quantity } from '../Common/Constant';
import Input from '../Common/Form/Input';
import Button from '../Common/Button';
import { useStateValue } from '../../StateProvider';
import { db } from '../../Firebase/Firebase';
import { USERS_OPTION, VENDOR_OPTION } from '../../+store/Action';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const AddOrder = (props) => {

    const [  {vendorOptions,userOptions}, dispatch] = useStateValue();
    const [selectedUser, setSelectedUser] = useState('');

  const [vendor, setVendor] = useState('');
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState([]);
  const [selectedQunatity, setSelectedQunatity] = useState(quantity[1])
//   this.getVendorMenuHandler = this.getVendorMenuHandler.bind(this);

   const formInputHandle = inputType => (event) => {
       switch(inputType)
       {
           case "user":
             setSelectedUser(event.target.value);
            break;
            case "vendor":
                setVendor(event.target.value);
            break;
            case "quantity":
                setSelectedQunatity(event.target.value);
            break;
            case 'date':
                setDate(event.target.value);
            break;    
        default:
            break;
       }
  } 

  useEffect( () => {
    if(!vendorOptions.length) {
        // make a request
        const vendorData = db.ref('vendor').orderByKey();
        vendorData.once("value", getVendorMenuHandler)
    }

    if(!userOptions.length)
    {
        const userData = db.ref("users").orderByKey();
        userData.once("value", getUserHandler)
    }
  }, [])


const getUserHandler = items => {
    if(items.val())
    {
        const users = Object.values(items.val());
        const userKey = Object.keys(items.val());
        const userData = [];
        users.map( (values, key) => {
            userData.push( {
                name:values.name,
                id:userKey[key]
            })
        });
        dispatch( {
            type:USERS_OPTION,
            payload:userData
        })
        setSelectedUser(userData[0].id)
    }
}
 const getVendorMenuHandler = (items) => {
   if (items.val())
   {
       const vendor = Object.values(items.val());
       const objectKeys = Object.keys(items.val());
       const vendorMenu = [];
            vendor.map((values, key) => {
                vendorMenu.push({
                    ...values,
                    id: objectKeys[key]
                });
            })

            dispatch({
                type: VENDOR_OPTION,
                payload:vendorMenu
            })
   }
  }

  const handleSubmit =(event) => {
    event.preventDefault();
  }
    return (
        <Form style={{width:"60%", margin: 'auto'}} onSubmit={handleSubmit}>
               <div className="form-group">
                <Label value="Vendor" />
                    <Select 
                        name="vendor"
                        value ={vendor}
                        options = {vendorOptions}
                        onChange ={formInputHandle("vendor")}
                    />
                </div>

               <div className="form-group">
                <Label value="Quantity" />
                    <Select 
                        name="quantity"
                        value={selectedQunatity}
                        options = {quantity}
                        onChange ={formInputHandle("quantity")}
                    />
                </div>

            <div className="form-group">
                <Label value="User Name" />
                    <Select 
                        name="user"
                        value={selectedUser}
                        options = {userOptions}
                        onChange ={formInputHandle("user")}
                    />
            </div>

            <div className="form-group">
                      <Label value="Date"/>
                      <DatePicker name="date" selected={date} onChange={date => setDate(date)} />
             </div>

             <div style={{marginTop:"20px"}}>
                 <Button className="btn btn-primary mt-100">Save Record</Button>
             </div>
           </Form>
    )
} 
export default AddOrder;