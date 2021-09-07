import React, { useState, useEffect, useRef } from 'react';
import ReactSelect from 'react-select';
import { Form, Input, Label, Radio, Button } from "../Common/Form";
import { paymentMethod, dateFormat } from '../Common/Constant';
import DatePicker from "react-datepicker";
import { addBilling } from '../../+store/URL/BillingAction';
import { fetchOrderInDateRange, markOrderPaid } from '../../+store/URL/OrderActions';
import { userRecordForPayment } from './store/AddPayment.model';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import CheckboxRenderer from './CheckboxRenderer'
import {getFirstDayOfNextMonth} from "../../Utils/helper";
const AddPaymentComponent = (props) => {

    const  columnDefsRec = [
        { headerName: "SR", valueGetter: "node.rowIndex +1", pinned: true, width: "20px" },
        { headerName: "Name", field: "name", sortable: true, filter: true },
        { headerName: "Quantity", field: "quantity", width: "100px" },
        { headerName: "Order Amount", field: "amount", sortable: true, filter: true },
        {
            headerName: "Paid",
            field: "is_paid",
            cellRenderer: "checkboxRenderer"
        },
        { headerName: "Amount Paid", field: "final", sortable: true, filter: true },

    ];


    const [ columnDefs ] = useState( columnDefsRec );
    const [ rowData, setRowData ] = useState( [] );

    const [startDate, setStartDate] = useState(props.startDate);


    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);


    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
      };


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

        gridApi.forEachNode((rowNode, index) => {
            const athleteInfo = Object.assign({}, rowNode.data);
            if ( athleteInfo.is_paid)
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
                    markOrderPaid(athleteInfo.userId, startDate, endDate);
                }
                billingStatus().then(res => console.log('', res));
                setTimeout( () => {
                    window.location.reload();
                }, 10*1000)
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
                style={{ width: "80%", margin: "auto", height: "600px" }}>

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



export default AddPaymentComponent;
