import React , { useState, useEffect } from 'react';
import {Form, Input, Label, Radio, Button } from "../Common/Form";
import { paymentMethod,dateFormat  } from '../Common/Constant';
import DatePicker from "react-datepicker";
import  { addBilling } from '../../+store/URL/BillingAction';
import { markOrderPaid } from '../../+store/URL/OrderActions';


const PayBillingComponent = (props) => {
    const [paymentDate, setPaymentDate] = useState(new Date() );
    const [ startDate , setStartDate ] = useState(props.startDate );
    const [ endDate, setEndDate ] = useState(props.endDate)
    const [ payingMethod, setPayingMethod ] = useState(1);
    const [discount , setDiscount] = useState(0)
    const [subTotal, setSubTotal] = useState(props.total);

    // useEffect(() => {
    //     return () => {
    //
    //     };
    // }, [discount]);

    const paymentHandler = () => {
        // const cnfrmSt = window.confirm('Are you sure to delete this record?');
        if (window.confirm('Are you sure to pay this record?'))
        {
            const { selectedUser } = props;

            const billingObj= {
                startDate ,
                endDate,
                payingMethod,
                paymentDate,
                selectedUser,
                selectedVendor: "ia6J9aG6ddDxllX2MpeL"
            }
           const billingStatus = async   () =>   {
               await addBilling(billingObj)
                   .then(res => console.log(res));
               markOrderPaid(selectedUser, startDate, endDate);
           }
            billingStatus().then(res => console.log('', res));
           // console.log(billingStatus);
           //  const billingStatus = addBilling(billingObj).then(res => console.log(res)).error(err => console.log('err',err))
            return false;
        }
        return false;
    }
    const getFinalAmount = () => {
        const test = props.total - discount;
        console.log(props.total, {test});
        const discountAmount = ( (props.total *  discount))/ 100;
        console.log('here', discountAmount)
        setSubTotal(props.total  - discountAmount);
    }
    return (
    <div>
        <Form>
            <div className="form-group">
                <Label value ="Start Date"  />
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    dateFormat={dateFormat}
                    disabled
                />
            </div>


            <div className="form-group">
                <Label value ="End Date"  />
                <DatePicker
                    selected={endDate}
                    dateFormat={dateFormat}
                    onChange={date => setEndDate(date)}
                    disabled
                />
            </div>

            <div className="form-group">
                 <Label value="Payment Date" />
                 <DatePicker selected = {paymentDate} dateFormat= {dateFormat}  onChange = {date => setPaymentDate(date)}/>
            </div>

            <div className="form-group">
                Total Bill Is : {props.total}
            </div>

            <div className="form-group">
                Discount in percentage:  <Input type="text" value = {discount} onChange={input =>setDiscount(input.target.value) } onBlur = {() => getFinalAmount()}/>
            </div>
            {
                subTotal !== props.total &&
                <div className="form-group">
                    Sub Total  : {subTotal}
                </div>
            }
        <div className="form-group">
            <Label value="Payment Method"/>
            <Radio onClick = {(e) => setPayingMethod(parseInt(e.target.value))} selected={payingMethod} options = {paymentMethod}/>
        </div>

            <div>
                <Button type ="Button" className = "btn btn-primary" onClick= { paymentHandler }>
                    Save Payment
                </Button>
            </div>


        </Form>
    </div>
    )
}

export default PayBillingComponent;
