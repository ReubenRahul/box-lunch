import React, { Component } from 'react';
import Button from '../Common/Button';
import Form from '../Common/Form/Form';
import Input from '../Common/Form/Input';
import { addVendor } from '../../+store/Urls';
import { Redirect } from 'react-router-dom';

class AddComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            number: '',
            whatsAppNumber: '',
            redirect: '',
            errors: [],
            error: false,
            disableBtn: false
        }
    }

    changeHandler = (input) => (event) => {
       this.setState({
          [event.target.name] : event.target.value
       })
    }

    checkValidation = () => {
      const {name, address , number, whatsAppNumber, errors } = this.state;
      if(name.length === 0) {
         errors.push({msg: 'Name is required', index: 'name'});
      }
      if(address.length === 0) {
         errors.push({msg: 'Address is required', index: 'address'});
      }
      if(number.length === 0) {
         errors.push({msg: 'Number is required', index: 'number'});
      }
      if(whatsAppNumber.length === 0) {
         errors.push({msg: 'WhatsAppNumber is required', index: 'whatsAppNumber'});
      }
      let errorStatus = false;
      let disabled = true
      if(errors.length > 0) {
         errorStatus = true
         disabled = false
      }
      this.setState({
         errors,
         disableBtn:disabled,
         error:errorStatus
      })

    }
    handleSubmit = (event) => {
       this.setState({
         disableBtn: true
       })
        event.preventDefault();
        this.checkValidation();
        const {name, address , number, whatsAppNumber, errors ,error} = this.state;

        if(!error) {
          const  data = {
               name, address , number, whatsAppNumber
            }

         const addVendorData = data => new Promise ( (resolve) => {
               const res = addVendor(data);
               resolve(res);
         })
         addVendorData(data).then((res) => {
               if(res.status) {
                     this.setState({
                        redirect: '/vendors'
                     })
                  }
          });
        }
    }

  
    render() {
        const {name, address , number, whatsAppNumber, errors, disableBtn } = this.state;
        if (this.state.redirect) {
         return <Redirect to={this.state.redirect} />
       }
        return (
           <Form className="minimize-form" onSubmit={this.handleSubmit}>
               {errors && errors.map((error) => (  
                  <div className="panel" key={error.index}>
                      <p className="text-danger"> {error.msg} </p>
                   </div>
               )
               )}
                 <div className="form-group">
                    <Input
                    labelValue="Enter Vendor Name" 
                    type="text" 
                    name="name"
                    value={name}
                    onChange={this.changeHandler('name')} 
                    placeholder="Enter Vendor Name" 
                    />
                 </div>


                 <div className="form-group">
                    <Input
                    labelValue="Vendor Address" 
                    type="text" 
                    name="address" 
                    value={address}
                    onChange={this.changeHandler('address')}
                    placeholder="Vendor Address" 
                    />
                 </div>

                 <div className="form-group">
                    <Input
                    labelValue="Phone Number" 
                    type="text" 
                    name="number" 
                    value={number}
                    onChange={this.changeHandler('number')}
                    placeholder="Enter Vendor Phone Numbe" 
                    />
                 </div>


                 <div className="form-group">
                    <Input
                    labelValue="Enter Vendor Whatss App Number" 
                    type="text" 
                    name="whatsAppNumber" 
                    value={whatsAppNumber}
                    onChange={this.changeHandler('whatsAppNumber')}
                    placeholder="Enter Vendor Whatss App Number" 
                    />
                 </div>

                 <Button disabled={disableBtn} className="btn btn-primary mt-100" type="submit">Save</Button>
           </Form>
        )
    }
} 

export default AddComponent