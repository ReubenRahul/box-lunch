import React, { Component, useEffect, useState } from 'react'
import { quantity } from '../Common/Constant';
import { Radio, Button, Select, Label, Form } from '../Common/Form';
import { useStateValue } from '../../StateProvider';
import { db } from '../../Firebase/Firebase';
import { USERS_OPTION, VENDOR_OPTION, VENDOR_MENU } from '../../+store/Action';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getMenuDetails, handleAddOrder } from '../../+store/FirebaseUrls';
import { convertDate } from '../../Utils/helper'
import { fetchUsers } from '../../+store/URL/User/UsersUrls';
import { fetchVendorAction } from '../../+store/URL/VendorActions/VendorAction';
import { addOrderAction, fetchOrderAction } from '../../+store/URL/OrderActions';
import firebase from 'firebase';
import { getVendorMenu } from '../../+store/URL/MenuActions';


const AddOrder = (props) => {

    const [{ vendorOptions, userOptions, vendorMenus }, dispatch] = useStateValue();
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedVendor, setSelectedVendor] = useState('');
    const [selectedVendorMenuOption, setSelectedVendorMenuOption] = useState('');
    const [date, setDate] = useState(new Date());
    const [selectedQunatity, setSelectedQunatity] = useState(quantity[1])
    const [menuOptions, setMenuOptions] = useState([])
    const [errorFound, setErrorFound] = useState(false);
    const [errors, setErrors] = useState({});



    //   const resetState =() => {

    //   }
    //   this.getVendorMenuHandler = this.getVendorMenuHandler.bind(this);

    const formInputHandle = inputType => (event) => {
        switch (inputType) {
            case "user":
                setSelectedUser(event.target.value);
                break;
            case "vendor":
                setSelectedVendor(event.target.value);
                break;
            case "quantity":
                setSelectedQunatity(event.target.value);
                break;
            case 'date':
                setDate(event.target.value);
                break;
            case "menu":
                setSelectedVendorMenuOption(event.target.value)
                break;
            default:
                break;
        }
    }
    // import the users
    useEffect(() => {
        if (!vendorOptions.length) {
            // make a request
            fetchVendorAction().then(res => {
                dispatch({
                    type: VENDOR_OPTION,
                    payload: res
                })
                setSelectedVendor(res[0].id);
            })
        }

        if (!userOptions.length) {
            fetchUsers().then(res => {
                dispatch({
                    type: USERS_OPTION,
                    payload: res
                })
                setSelectedUser(res[0].key)
            })
            // const userData = db.ref("users").orderByKey();
            // userData.once("value", getUserHandler)
        }
    }, [])

    useEffect(() => {
        if (!vendorMenus.length) {
            getVendorMenu(selectedVendor).then(data => {
                    dispatch({
                    type: VENDOR_MENU,
                    payload: data,
                });
                menuOptionHandler(data);
            })
            .catch(err => {
                console.log('err', err);
            })
            return ;
        }
        menuOptionHandler(vendorMenus);

    }, [selectedVendor])


    useEffect(() => {
        if (menuOptions && menuOptions.length) {
            setSelectedVendorMenuOption(menuOptions[0].id)
        }
    }, [menuOptions])


    const menuOptionHandler = (vendorMenus) => {
        const selectedVendorMenu =  vendorMenus.filter(res => res.vendorId === selectedVendor).map(res => {
            res.value =  `${res.price} - ${res.details}`
            return res;
        });
        setMenuOptions(selectedVendorMenu);
    }

    const handleSubmit = (event) => {
        formValidation();
        event.preventDefault();
        const selectedVendorMenuOpt = vendorMenus.filter(menu => menu.id === selectedVendorMenuOption);
        const data = {
            user: {
                name: userOptions[selectedUser]
            },
            isPaid: false,
            vendorMenu: {
                vendor: vendorOptions[selectedVendor],
                vendorId: selectedVendor,
                menu: {
                    menuId: selectedVendorMenuOption,
                    price: selectedVendorMenuOpt[0].price,
                    detail: selectedVendorMenuOpt[0].details,
                }
            },
            userId: selectedUser,
            quantity: selectedQunatity,
            date: convertDate(date),
            dateTimestamp: firebase.firestore.Timestamp.fromDate(new Date(date)).seconds
            // firebase.firestore.date.serverTimestamp().toDate()
        }
        addOrderAction(data).then((res) => {
            alert(res.msg)
        });

    }

    const formValidation = () => {
        const errors = [];
        let errorFound = false;
        if (!selectedUser) {
            errors.push({ user: 'please select the user' });
            errorFound = true;
        }
        if (!selectedVendor) {
            errors.push({ vendor: 'please select the vendor' });
            errorFound = true;

        }
        if (!date) {
            errors.push({ date: 'please select the date' });
            errorFound = true;
        }
        if (!selectedQunatity) {
            errorFound = true;
            errors.push({ quantity: 'please select the quantity' });
        }
        if (!selectedVendorMenuOption) {
            errorFound = true;
            errors.push({ vendorMenu: 'please select the vendorMenu' });
        }
        setErrorFound(errorFound);
        setErrors(errors)

    }
    return (
        <Form style={{ width: "60%", margin: 'auto' }} onSubmit={handleSubmit}>
            <div className="form-group">
                <Label value="Vendor" />
                <Select
                    name="vendor"
                    value={selectedVendor}
                    options={vendorOptions}
                    onChange={formInputHandle("vendor")}
                />
            </div>

            <div className="form-group">
                <Label value="Select Menu" />
                <Radio options={menuOptions} name="menu" onChange={formInputHandle("menu")} selected={selectedVendorMenuOption} />
            </div>

            <div className="form-group">
                <Label value="Quantity" />
                <Select
                    name="quantity"
                    value={selectedQunatity}
                    options={quantity}
                    onChange={formInputHandle("quantity")}
                />
            </div>

            <div className="form-group">
                <Label value="User Name" />
                <Select
                    name="user"
                    value={selectedUser}
                    options={userOptions}
                    onChange={formInputHandle("user")}
                />
            </div>

            <div className="form-group">
                <Label value="Date" />
                <DatePicker name="date" selected={date} onChange={date => setDate(date)} dateFormat="yyyy/MM/dd" />
            </div>

            <div style={{ marginTop: "20px" }}>
                <Button className="btn btn-primary mt-100">Save Record</Button>
            </div>
        </Form>
    )
}
export default AddOrder;
