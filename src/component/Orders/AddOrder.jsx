import React, { Component } from 'react'
import Form from '../Common/Form/Form'
import Label from '../Common/Form/Label'
import Select from '../Common/Form/Select'
import { quantity } from '../Common/Constant';
import Input from '../Common/Form/Input';
import Button from '../Common/Button';
class AddOrder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            _quantity : '',
            _user: '',
            _date: '',
            error:[]
        }
    }
    componentDidMount()
    {
        this.setState ({
            users : [
                { key:1,value: 'Reuben' },
                {key:2, value: 'rahul'  }
              ]
        } )
    }
    formInputHandle = inputType => (event) => {
        console.log(inputType, event.target.value)
        const errors = {};
        switch (inputType) {
            case '_quantity':
                if(!event.target.value) {
                 errors._quantity = ['_quantity is required'];
                }
                this.setState( {
                    _quantity: event.target.value
                })
            break;
            case '_user':
                if(!event.target.value) {
                    errors._user = ['_user is required'];
                }
                this.setState( {
                    _user: event.target.value
                })
            break;

            case '_date':
                if(!event.target.value) {
                 errors._date = ['_date is required'];
                }
                this.setState( {
                    _date: event.target.value,
                    error: errors
                })
            break;

            default:
            break;
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
// form request will go here

    }

    render () {
        const { users, _quantity, _user, _date } = this.state;
        return (
            <Form style={{width:"60%", margin: 'auto'}} onSubmit={this.handleSubmit}>
                   <div className="form-group">
                    <Label value="Quantity" />
                        <Select 
                            name="quantity"
                            value ={_quantity}
                            options = {quantity}
                            onChange ={this.formInputHandle("_quantity")}
                        />
                    </div>

                <div className="form-group">
                    <Label value="User Name" />
                        <Select 
                            name="user"
                            value={_user}
                            options = {users}
                            onChange ={this.formInputHandle("_user")}
                        />
                </div>

                <div className="form-group">
                          <Label value="Date"/>
                          <Input 
                            type="date" 
                            name="date" 
                            value={_date}
                            placeholder="date" 
                            onChange ={this.formInputHandle('_date')}
                         />
                 </div>

                 <div style={{marginTop:"20px"}}>
                     <Button className="btn btn-primary mt-100">Save Record</Button>
                 </div>
               </Form>
        )
    }
}

export default AddOrder;