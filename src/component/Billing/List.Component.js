import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Button from "../Common/Button";
import PayBillingComponent from './Pay.Component';
import DatePicker from "react-datepicker";
import { fetchUserOrderOnDateRange } from '../../+store/URL/OrderActions';
import {agGridDateFormat,dateFormat} from "../Common/Constant";
import { getDateFromTimestamps } from '../../Utils/helper'
// Mon Nov 09 2020 18:23:19 20GMT+0530 20(India 20Standard 20Time)
// Mon Nov 09 2020 18:29:49 GMT+0530 (India Standard Time)

const ListComponent = (props) => {
    const columns = [
        {headerName:"SR", valueGetter: "node.rowIndex +1", pinned: true, width: "20px"},
        {headerName:"Date", field:"date",sortable:true, filter:true,  cellRenderer: (data) => {
        return data.value ? (new Date(data.value)).toLocaleDateString('en-US',agGridDateFormat ) : '';
       }},
        {headerName:"User", field:"userName",sortable:true, filter:true},
        {headerName: "Vendor Name", field: "vendorName"},
        {headerName: "Price", field:"price", sortable: true},
        {headerName:"Quantity", field:"quantity"}
    ];

    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate()+1);

    const { match,location } = props;
    const locationArray = (location.search).split("?");
    const isIndexFound = locationArray.find(loc => {
       return loc.match(/[selectedDate]/)
    })
    // console.log(locationArray)
    // useEffect(() => {
    //
    // }, [])
    const isSelectedVendorIndexFound = locationArray.find(loc => {

        return loc.match(/[selectedVendor]/);
        // console.log(loc.match(/[selectedVendor]/), '42', {loc})
        // return loc.mas/ch(/[selectedVendor]/)
    })
    // console.log({isSelectedVendorIndexFound}, {isIndexFound}, {locationArray})
    const vendor = isSelectedVendorIndexFound ? isSelectedVendorIndexFound.split("=")[1]: undefined;

    const selectedDateStart =  isIndexFound ? getDateFromTimestamps(isIndexFound.split("=")[1]): new Date()

    const [columnDefs] = useState(columns);
    const [ selectedUser ] = useState(match.params.userId);
    const [showBillingForm , setShowBillingForm] = useState(false)
    const [ startDate , setStartDate ] = useState(selectedDateStart );
    const [ endDate, setCustomEndDate ] = useState(tomorrow);
    const [rowData, setRowData ] = useState( [] );
    const [selectedVendor] = useState(vendor);
    const onChange = dates => {
        const [ start , end ] = dates
        setStartDate(start);
        setCustomEndDate(end);
    }
    // selectedDate=Mon%20Nov%2009%202020%2018:15:58%20GMT+0530%20(India%20Standard%20Time)
    useEffect( () => {
        if (endDate) {
            const orders = [];
            let total = 0;
            fetchUserOrderOnDateRange(selectedUser, startDate, endDate,selectedVendor)
                .then(response => {
                    const cloneArr = Object.values(response);
                    cloneArr.reduce((order, res) => {
                        order.push({
                                key: res.key,
                                quantity: res.quantity,
                                date: res.date,
                                vendorId: res.vendorMenu.vendorId,
                                vendorName: res.vendorMenu.vendor,
                                finalPrice: res.quantity * res.vendorMenu.menu.price,
                                price: res.vendorMenu.menu.price,
                                userName:res.user.name
                            })
                        total =  total +( res.quantity * res.vendorMenu.menu.price);
                        order.total = total;
                        return order;
                    }, orders);
                })
                .finally(() => {
                    // console.log({orders});
                    setRowData(orders);
                })
        }
    }, [startDate, endDate])

   let  ShowBillingFormComponent = null;
    if (showBillingForm)
    {
        ShowBillingFormComponent = <PayBillingComponent selectedUser ={selectedUser} startDate={startDate} endDate={endDate} total = {rowData.total}/>
    }

    return (
        <div className="display-flex mt-30">
                <div className="display-content">
                    <div className="ag-theme-alpine" style={{width: "70%"}}>
                        <DatePicker
                            selected ={startDate}
                            onChange={onChange}
                            startDate={startDate}
                            dateFormat={dateFormat}
                            endDate={endDate}
                            selectsRange
                            inline
                        />

                        <div className="Ag_Grid_Custom">
                            <AgGridReact
                                columnDefs={columnDefs}
                                rowData={rowData}
                                pagination="true" paginationPageSize="20" floatingFilter="true"
                            />
                        </div>
                        <Button className="btn btn-primary" onClick={() => setShowBillingForm(true)}> Pay Bill </Button>
                </div>
            </div>
            <div className="display-content mt-30">
                { ShowBillingFormComponent }
            </div>

        </div>
    )
}

export default ListComponent;
