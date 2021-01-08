// this component dedicated for add the menu for dedicated vendor

import React, { PureComponent } from 'react';
import { db } from '../../../Firebase/Firebase';
import Button from '../../Common/Button';
import Form from '../../Common/Form/Form';
import Input from '../../Common/Form/Input';
import TextArea from '../../Common/Form/TextArea';
import firebase from 'firebase';
import VendorMenuList from './VendorMenuList';
import { addMenuAction, getVendorMenu, deleteMenuAction } from '../../../+store/URL/MenuActions';
import { editVendorAction } from '../../../+store/URL/VendorActions/VendorAction';
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

            // fireabase----
        // const vendorData = db.ref(`menu`).orderByChild('vendorId').equalTo(params.id);
        // vendorData.once('value', this.getVendorMenuHandler);
        // const menus = db.ref('vendor').orderByKey().equalTo(params.id);
        // menus.once('value', this.onDataChange)

        getVendorMenu(params.id).then(res => {
            this.getVendorMenuHandler(res)
        }).catch(err => console.log(err, 'error occur'))

        editVendorAction(params.id).then(res => {
            this.onDataChange(res);
        });




        // firestore ---
       const responseData =  getVendorMenu(params.id)
    //    this.onDataChange(responseData);
    }
    resetFormStat = () => {
        this.setState({
            price: 0,
            details: '',
        })
    }
    getVendorMenuHandler(items) {
        console.log(items)
            this.setState({
                vendorMenu: items
            })
    }

    addIntoVendorMenu =  (id) => (items) => {
        const vendorMenuClone = [...this.state.vendorMenu];
        vendorMenuClone.push({
            ...items,
            id: id
        })
        this.setState({
            vendorMenu: vendorMenuClone,
        })
        this.resetFormStat();
    }


    onDataChange(items) {
        // const vendor = Object.values(items.val())
        this.setState({
            vendor: items,
            vendorName: items.name
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
                timestamps:  firebase.firestore.FieldValue.serverTimestamp()
            }
           addMenuAction(data).then (res => {
                if (res.status === 201) {
                    this.addIntoVendorMenu(res.id)(data);
                }
            });
        }

        event.preventDefault();
    }

    deleteClickHandler = (id) => {
        deleteMenuAction(id).then( res => {
            if ( res.status === 204)
            {
                const vendorMenuClone = [...this.state.vendorMenu];
                const arrayIndex = vendorMenuClone.findIndex( (item) => (item.id ===id ));
                vendorMenuClone.splice( arrayIndex, 1 );
                this.setState( {
                    vendorMenu:vendorMenuClone
                });
            }
        })
        // db.ref('menu').child(id).remove();
        // const vendorMenuClone = [...this.state.vendorMenu];
        // const arrayIndex = vendorMenuClone.findIndex((item) => {
        //     return item.id === id;
        // });
        // vendorMenuClone.splice(arrayIndex, 1);
        // this.setState({
        //     vendorMenu: vendorMenuClone
        // })
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
