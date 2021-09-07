import React, { useEffect, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Link } from 'react-router-dom';
import { getBilling } from '../../+store/URL/BillingAction';
import { convertMonth, getDateSecond, getFirstDayOfNextMonth } from '../../Utils/helper';
import { Label } from '../Common/Form';
import ReactDatePicker from 'react-datepicker';
import firebase from 'firebase';



const column = [
    { headerName: "SR", valueGetter: "node.rowIndex +1", pinned: true, width: "20px" },
    { headerName: "Month", field: "date", sortable: true, filter: true },
    { headerName: "User", field: "name", sortable: true, filter: true },
    { headerName: "Price", field: "amount", sortable: true },
    { headerName: "Quantity", field: "quantity" }
];

const PaymentListComponent = () => {

    const [columnDefs] = useState(column);
    const [rowData, setRowData] = useState();
    const [ selectedDate,setSelectedDate ] = useState();
    const [ totalAmount, setTotalAmount ] = useState(0);
    const [ billingState, setBillingState ] = useState();

    // const dateRef = useRef();
    
    useEffect( () => {
         if ( rowData && selectedDate ) {
            const startDateSecond = getDateSecond(selectedDate)

           const filterData =  [...billingState].filter( data => {
            return data.dateSecond == startDateSecond;
            //  &&  data.dateSecond <= endDateSecond;
                // return data.dateSecond >= startDateSecond &&  data.dateSecond <= endDateSecond;
            });
            
            setRowData(filterData);

           const total =  Object.keys(filterData).reduce((previous, key) =>  {
                if ( filterData[key] ){
                    previous += Number (filterData[key].amount);
                }
                return previous;
            },  0 );
          setTotalAmount(total);
         }
    }, [ selectedDate ])




    useEffect( () => {
        let bills;
        getBilling()
        .then( response => {
         bills =  response.map( res => {
            setTotalAmount ( prevTotalAmount => Number (prevTotalAmount) + Number( res.amount))

            let dateMonth =  new Date((res.date.seconds)  * 1000)
            return Object.assign({}, res, {
                dateSecond: res.date.seconds,
                date:  `
                        ${dateMonth.getFullYear() } -
                        ${ convertMonth[dateMonth.getMonth()+1 ] } `
              })
         }) ;
        } )

        .finally( () => {
            setRowData( bills)
            setBillingState(bills)
        })
    }, [] ) 
    return (
        <div className="ag-theme-alpine">
            <div
                id="myGrid" 
                style=
                    {{
                     width: "70%", margin: "auto", height: "600px"
                    }}
                >
                <div className="form-group mb-10">

                <div className = "align-right">
                           <Link className ="btn btn-success" to = "billing/add"> Add Payment Bill </Link>
                        </div>


                    <Label value="Start Date" />


                    <ReactDatePicker
                        dateFormat="MM/yyyy"
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        showMonthYearPicker
                        showFullMonthYearPicker
                    />


                </div>

                <h4> { totalAmount } </h4>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    // frameworkComponents={frameworkComponents}
                    pagination="true"
                    paginationPageSize="25"
                    floatingFilter="true"
                    animateRows={true}
                    groupUseEntireRow={true}
                >
                </AgGridReact>
            </div>
        </div>
    );
};

export default PaymentListComponent;