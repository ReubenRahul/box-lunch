import React from 'react';
import { AgGridReact } from 'ag-grid-react';  
import 'ag-grid-community/dist/styles/ag-grid.css';  
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Button from '../Common/Button';
import { Link } from 'react-router-dom';

class Order extends React.Component {
    constructor( props ){
        super(props);
        this.state = {
            columnDefs : [
                { headerName: "Id", field: "Id" , sortable: true, filter: true},
                { headerName: "Date", field: "Date" , sortable: true, filter: true},
                { headerName: "Name", field: "Name" , sortable: true, filter: true},
                { headerName: "Order Amount", field: "Order_Amount" , sortable: true, filter: true}
            ],

            rowData: [
                {
                    Id: "1",
                    Date: new Date(),
                    Name: "Reuben",
                    Order_Amount: 123
                }
            ]
        }
    }
    render() {
        return (
            <div className="ag-theme-alpine">  
             <div>
                    <Button className="btn btn-primary btn-xs align-right" >
                        <Link to="/order/add"> Add Order </Link>
                    </Button>
              </div> 
              <div  style={{width:"60%", margin:"auto", height: "450px"}}>
                <AgGridReact
                    columnDefs ={this.state.columnDefs}
                    rowData={this.state.rowData}
                    pagination="true"  paginationPageSize="5" floatingFilter="true" 
                    >

                    </AgGridReact>
              </div>
               
            </div>
        )
    }
}

export default Order;