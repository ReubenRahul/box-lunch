import React, { useState, useEffect, useRef } from 'react';
import ReactSelect from 'react-select';
import { Form, Input, Label, Radio, Button } from "../Common/Form";
import { paymentMethod, dateFormat } from '../Common/Constant';
import DatePicker from "react-datepicker";
import { addBilling } from '../../+store/URL/BillingAction';
import { fetchOrderInDateRange, markOrderPaid } from '../../+store/URL/OrderActions';
import { userRecordForPayment } from './store/AddPayment.model';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';


import  ApprovalRenderer from './Approval'
import CheckboxRenderer from './CheckboxRenderer'

import GenderRenderer from './genderRenderer';
import {getFirstDayOfNextMonth} from "../../Utils/helper";



const AddPaymentComponent = (props) => {

    const  columnDefsRec = [
        { headerName: "SR", valueGetter: "node.rowIndex +1", pinned: true, width: "20px" },
        { headerName: "Name", field: "name", sortable: true, filter: true },
        { headerName: "Quantity", field: "quantity", width: "100px" },
        { headerName: "Order Amount", field: "amount", sortable: true, filter: true },
        { headerName: "Approval", field: "gender", sortable: true, filter: true },
        {
            headerName: "Paid",
            field: "registered",
            cellRenderer: "checkboxRenderer"
        },
        // { headerName: "Discount", field: "discount", sortable: true, filter: true },
        { headerName: "Final", field: "final", sortable: true, filter: true },


        // { headerName: "Delete", field: "value", cellRenderer: "deleteButtonRenderer", colId: 'params', clickHandler: this.clickHandleData, },
    ];


    const [ columnDefs ] = useState( columnDefsRec );
    const [ rowData, setRowData ] = useState( [] );

    const [startDate, setStartDate] = useState(props.startDate);
    const [endDate, setEndDate] = useState(props.endDate)
    const [payingMethod, setPayingMethod] = useState(1);
    const [discount, setDiscount] = useState(0)
    const [subTotal, setSubTotal] = useState(props.total);

    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);


    const onGridReady = (params) => {
        console.log({params})
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
      };
    // const onGridReady = (params) => {
    //     this.gridApi = params.api;
    //     this.gridColumnApi = params.columnApi;

    //     params.api.expandAll();
    //   };


    useEffect(() => {
        if ( startDate)
        {

                fetchOrderInDateRange( startDate )
                .then(res => {
                    const result =  userRecordForPayment(res);
                    setRowData(result)
                })
        }

    }, [startDate])


    const paymentHandler = ()  => {

        const body = {
            billing: [],
        };
        gridApi.forEachNode((rowNode, index) => {
            const athleteInfo = Object.assign({}, rowNode.data);
            if ( athleteInfo.final)
            {
                const billingStatus = async () => {
                    await addBilling({
                        dateTimestamp: startDate.getSeconds(),
                        amount: athleteInfo.final,
                        quantity:  athleteInfo.quantity,
                        name: athleteInfo.name,
                        userId:athleteInfo.userId,
                        date:startDate,
                        payingMethod: 'gpay',
                        selectedVendor: "ia6J9aG6ddDxllX2MpeL"
                    })
                    .then(res => console.log(res));
                    const endDate = getFirstDayOfNextMonth(startDate)
                        // new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
                    markOrderPaid(athleteInfo.userId, startDate, endDate);
                }
                billingStatus().then(res => console.log('', res));
                return false;
            }
        })
    }


    return (
        <div>
            <Form>
                <div className="form-group">
                    <Label value="Start Date" />
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        showFullMonthYearPicker
                    />
                </div>

                <div className="ag-theme-alpine">
                <div
                id="myGrid"
                style={{ width: "80%", margin: "auto", height: "800px" }}>

                    <AgGridReact
                         columnDefs={columnDefs}
                         rowData={rowData}
                            defaultColDef={{
                                editable: true,
                                sortable: true,
                                flex: 1,
                                minWidth: 100,
                                filter: true,
                                resizable: true,
                            }}
                            frameworkComponents={{
                                checkboxRenderer: CheckboxRenderer
                            }}
                            onGridReady={onGridReady}
                        >

                                <AgGridColumn
                                    headerName="Is Paid"
                                    field="is_paid"
                                    minWidth={180}
                                    headerCheckboxSelection={true}
                                    headerCheckboxSelectionFilteredOnly={true}
                                    checkboxSelection={true}
                                />

                        </AgGridReact>
                </div>
                </div>


                <div>
                    <Button type="Button" className="btn btn-primary" onClick={paymentHandler}>
                        Save Payment
                </Button>
                </div>


            </Form>
        </div>
    )
}


const createRowData = () => {
    const cloneObject = (obj) => JSON.parse(JSON.stringify(obj));
    const students = [
        {
            first_name: 'Bob',
            last_name: 'Harrison',
            gender: 'Male',
            address:
                '1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763',
            mood: 'Happy',
            country: {
                name: 'Ireland',
                code: 'IE',
            },
        },
        {
            first_name: 'Mary',
            last_name: 'Wilson',
            gender: 'Female',
            age: 11,
            address: '3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA, (867) 371-4215',
            mood: 'Sad',
            country: {
                name: 'Ireland',
                code: 'IE',
            },
        },
        {
            first_name: 'Sadiq',
            last_name: 'Khan',
            gender: 'Male',
            age: 12,
            address:
                '3235 High Forest, Glen Campbell, MS, 39035-6845, US, (601) 638-8186',
            mood: 'Happy',
            country: {
                name: 'Ireland',
                code: 'IE',
            },
        },
        {
            first_name: 'Jerry',
            last_name: 'Mane',
            gender: 'Male',
            age: 12,
            address:
                '2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US, (202) 948-3634',
            mood: 'Happy',
            country: {
                name: 'Ireland',
                code: 'IE',
            },
        },
    ];
    students.forEach((item) => {
        students.push(cloneObject(item));
    });
    students.forEach((item) => {
        students.push(cloneObject(item));
    });
    students.forEach((item) => {
        students.push(cloneObject(item));
    });
    return students;
};

export default AddPaymentComponent;
