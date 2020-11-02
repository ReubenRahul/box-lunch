import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Button from '../Common/Button';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../../+store/FirebaseUrls';
import { convertDate } from '../../Utils/helper';
import DatePicker from "react-datepicker";
import { Select } from '../Common/Form';

import { fetchOrderAction } from '../../+store/URL/OrderActions';
import { fetchUsers } from '../../+store/URL/User/UsersUrls';


class Order extends React.Component {
    constructor(props) {
        super(props);
        const curr = new Date();
        const first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
        const firstday = new Date(curr.setDate(first));
        this.state = {
            columnDefs: [
                { headerName: "SR", valueGetter: "node.rowIndex +1", pinned: true, width: "20px" },
                // {headerName:'Row', valueGetter:"node.rowIndex +1", pinned:true},
                { headerName: "Date", field: "date", sortable: true, filter: true },
                { headerName: "Name", field: "userName", sortable: true, filter: true },
                { headerName: "Vendor Name", field: "vendorName", sortable: true, filter: true },
                { headerName: "Quantity", field: "quantity", width: "100px" },
                { headerName: "Order Amount", field: "price", sortable: true, filter: true },

            ],
            rowData: [
            ],
            selectedDate: firstday,
            uniqueUsers: [],
            selectedUser: '',
            totalAmount: 0,
        }
        this.fetchUser = this.fetchUser.bind(this);
    }
    componentDidMount() {

        // let's make request for order table
        // we can not use useReducer here becuase its class based componen
        this.fetchOrderHandler(convertDate(this.state.selectedDate));


        this.fetchUser();
        // stat update
        // url access

    }

    componentWillUpdate(nextProps, nextState) {
        if ((nextState.selectedDate !== this.state.selectedDate) || (nextState.selectedUser !== this.state.selectedUser)) {

            const convertedDate = convertDate(nextState.selectedDate);

            this.props.history.push({
                search: `?date=${convertedDate}?userId=${nextState.selectedUser}`
            })
            this.fetchOrderHandler(convertedDate, nextState.selectedUser)
        }
    }

    fetchUser = () => {
        const usersCollection = ['Select User'];
        fetchUsers().then(users => {
            users.map(user => {
                usersCollection[`${user.key}`] = user.name;
            })
        })
            .finally(() => {
                this.setState({ uniqueUsers: usersCollection })
            });


    }
    fetchOrderHandler = (selectedDate, selectedUser) => {
        let rowData = [];
        fetchOrderAction(selectedDate, selectedUser).then(
            res => {
                res.map((value, index) => {
                    rowData.push({
                        date: value.date,
                        quantity: value.quantity,
                        userName: value.user.name,
                        vendorName: value.vendorMenu.vendor,
                        price: value.vendorMenu.menu.price * value.quantity
                    })
                });
            }
        ).finally(  () => {
            const total = rowData.reduce( (total , value) => total+ value.price, 0);
            this.setState({  rowData, totalAmount: total })
        } )
    }
    render() {
        return (
            <div className="ag-theme-alpine">
                <div>
                    <Button className="btn btn-primary btn-xs align-right" >
                        <Link to="/order/add"> Add Order </Link>
                    </Button>
                </div>
                <div>
                    <h4>Starting Date:  <DatePicker name="date" selected={this.state.selectedDate} onChange={date => this.setState({ selectedDate: date })} />
                    <span style={{fontSize:"14px"}}> selected Date --- today date</span>
                    </h4>
                    <div className="inline-flex-sec">User:
                   <Select
                            name="user"
                            onChange={(event) => this.setState({ selectedUser: event.target.value })}
                            options={this.state.uniqueUsers}
                        />
                    </div>
                </div>
                <div style={{ width: "80%", margin: "auto", height: "450px" }}>
                    
                   {this.state.selectedUser && (<h4> Total Is {this.state.totalAmount} </h4>)} 
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        pagination="true" paginationPageSize="5" floatingFilter="true"
                    >
                    </AgGridReact>
                </div>

            </div>
        )
    }
}

export default Order;