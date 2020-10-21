// this component dedicated for add the menu for dedicated vendor

import React, { PureComponent } from 'react';
import { db } from '../../../Firebase/Firebase';
import Button from '../../Common/Button';
import Form from '../../Common/Form/Form';
import Input from '../../Common/Form/Input';
import TextArea from '../../Common/Form/TextArea';
import firebase from 'firebase';
import VendorMenuList from './VendorMenuList';

class AddVendorMenu extends PureComponent {

    // firebase.database().ref("Profiles").orderByChild("uid").equalTo(this.state.authUser.uid).once("value",snapshot => {
    constructor(props) {
        super(props);
        const { params } = this.props.match;
        this.onDataChange = this.onDataChange.bind(this);
        this.getVendorMenuHandler = this.getVendorMenuHandler.bind(this);
        this.state = {
            vendor: {},
            showForm: false,
            vendorId: params.id,
            vendorMenu: [],
            vendorName: '',
            price: 0,
            details: '',
            errorStatus: true,
            errors: []
        }
    }
    componentDidMount() {

        const { params } = this.props.match;
        // let's access the this id menu with price
        // .orderByChild("uid").equalTo("-MJzbZ-bV3ijq_AEkbfL")
        //.orderByChild("name").equalTo("Janna Hardy")
        //.orderByKey().equalTo("-MJzbZ-bV3ijq_AEkbfL")


        const vendorData = db.ref(`menu`).orderByChild('vendorId').equalTo(params.id);
        vendorData.once('value', this.getVendorMenuHandler);
        const menus = db.ref('vendor').orderByKey().equalTo(params.id);
        menus.once('value', this.onDataChange)
    }
    resetFormStat = () => {
        this.setState({
            price: 0,
            details: '',
        })
    }
    getVendorMenuHandler(items) {

        if (items.val()) {
            const vendor = Object.values(items.val());
            const objectKeys = Object.keys(items.val());
            const vendorMenu = [];
            vendor.map((values, key) => {
                vendorMenu.push({
                    ...values,
                    id: objectKeys[key]
                });
            })
            this.setState({
                vendorMenu
            })
        }
    }

    addIntoVendorMenu = (key) => (items) => {
        const vendorMenuClone = [...this.state.vendorMenu];
        vendorMenuClone.push({
            id: key,
            ...items.val()
        })
        this.setState({
            vendorMenu: vendorMenuClone,
        })
        this.resetFormStat();
    }


    onDataChange(items) {
        const vendor = Object.values(items.val())
        this.setState({
            vendor: vendor,
            vendorName: vendor[0].name
        })
    }


    changeHandler = (input) => (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    formValidation() {
        let errors = [];
        if (this.state.price > 120) {
            errors.push('Price is more than 120')
        }
        if (errors.length == 0) {
            this.setState(
                { errorStatus: false },
                () => console.log(this.state.errorStatus, 'dfsd')
            )
            return true;
        }
        this.setState({
            errors,
            // errorStatus: errorStatus
        })
        return false;
    }
    handleSubmit = (event) => {
        const validaStat = this.formValidation()
        if (validaStat) {
            const data = {
                vendorId: this.state.vendorId,
                price: this.state.price,
                details: this.state.details,
                timestamps: firebase.database.ServerValue.TIMESTAMP
            }
            const res = db.ref('menu').push(data);
            const key = res.getKey();
            if (key) {

                let menuRef = db.ref('menu/' + key);
                menuRef.once('value', this.addIntoVendorMenu(key));
            }
        }

        event.preventDefault();
    }

    deleteClickHandler = (id) => {
        db.ref('menu').child(id).remove();
        const vendorMenuClone = [...this.state.vendorMenu];
        const arrayIndex = vendorMenuClone.findIndex((item) => {
            return item.id === id;
        });
        vendorMenuClone.splice(arrayIndex, 1);
        this.setState({
            vendorMenu: vendorMenuClone
        })
    }
    render() {
        const { vendorName, price, details, errors, vendorMenu, showForm } = this.state;
        return (
            <div>
                <Button onClick={() => this.setState(state => ({ showForm: !state.showForm }))} > {showForm ? 'Hide' : 'Show'} Form</Button>
                  {vendorMenu && <VendorMenuList menus={vendorMenu} {...this.state} deleteClickHandler={this.deleteClickHandler} />}
                { showForm &&
                    <Form onSubmit={this.handleSubmit}>
                        {errors && errors.map((error, index) => {
                            return <div key={index}> <p> {error} </p> </div>
                        })}
                        <div className="form-group">
                            <Input
                                labelValue="vendorName"
                                value={vendorName}
                                disabled={true}
                            />
                        </div>


                        <div className="form-group">
                            <Input
                                labelValue="Price"
                                type="number"
                                name="price"
                                value={price}
                                onChange={this.changeHandler('price')}
                                placeholder="Enter Price"
                            />
                        </div>

                        <div className="form-group">
                            <TextArea
                                labelValue="Details"
                                name="details"
                                value={details}
                                rows="4"
                                style={{ width: "40%" }}
                                onChange={this.changeHandler('details')}
                            />
                        </div>

                        <Button type="submit" className="btn btn-sm btn-primary"> Save Data</Button>

                    </Form>
                }
            </div>
        )
    }
}

export default AddVendorMenu;