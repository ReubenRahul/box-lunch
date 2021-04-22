import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Button from '../Common/Button';
import { Link } from 'react-router-dom';
import { convertDate, getDateTimestamps } from '../../Utils/helper';
import DatePicker from "react-datepicker";
import { Select } from '../Common/Form';


// import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';



import { fetchOrderAction, deleteOrderAction } from '../../+store/URL/OrderActions';
import { fetchUsers } from '../../+store/URL/User/UsersUrls';
import DeleteButton from '../../Utils/AgGridHelper/DeleteButton';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
// import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';




const DateFormat = { year: "2-digit", month: "short", day: "2-digit" };

const CellDateFormat = { weekday: 'long', year: "2-digit", month: "short", day: "2-digit" };
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
                {
                    headerName: "Date", field: "date", sortable: true, filter: true, cellRenderer: (data) => {
                        return data.value ? (new Date(data.value)).toLocaleDateString('en-US', CellDateFormat) : '';

                    }
                },
                { headerName: "Name", field: "userName", sortable: true, filter: true },
                { headerName: "Vendor Name", field: "vendorName", sortable: true, filter: true },
                { headerName: "Quantity", field: "quantity", width: "100px" },
                { headerName: "Order Amount", field: "price", sortable: true, filter: true },
                { headerName: "Delete", field: "value", cellRenderer: "deleteButtonRenderer", colId: 'params', clickHandler: this.clickHandleData, },
            ],
            rowData: [],
            filterRowData: [],
            uniqueVendor: [],
            selectedDate: firstday,
            uniqueUsers: [],
            selectedVendor: '',
            selectedUser: '',
            totalAmount: 0,
            frameworkComponents: {
                deleteButtonRenderer: DeleteButton
            }
        }
        this.fetchUser = this.fetchUser.bind(this);
    }

    componentDidMount() {
        this.fetchOrderHandler(convertDate(this.state.selectedDate));
        this.fetchUser();
    }

    componentWillUpdate(nextProps, nextState) {
        if ((nextState.selectedDate !== this.state.selectedDate) || (nextState.selectedUser !== this.state.selectedUser)) {
            this.setState({
                selectedVendor: ''
            })
            const convertedDate = convertDate(nextState.selectedDate);
            this.props.history.push({
                search: `?date=${convertedDate}?userId=${nextState.selectedUser}`
            })
            this.fetchOrderHandler(convertedDate, nextState.selectedUser)

        }
        // nextState.rowData !== this.state.rowData ||
        else if (nextState.selectedVendor !== this.state.selectedVendor) {
            const cloneRowData = [...nextState.rowData];
            const filterRecord = cloneRowData.filter(res => res.vendorId === nextState.selectedVendor);
            const total = filterRecord.reduce((total, value) => total + value.price, 0);
            this.setState({
                filterRowData: filterRecord,
                totalAmount: total
            })
        }
    }

    fetchUser = () => {
        const usersCollection = ['Select User'];
        fetchUsers().then(users => {
            users.map(user => {
                usersCollection[`${user.key}`] = `${user.name} - ${user.phone}`;
            })
        })
            .finally(() => {
                this.setState({ uniqueUsers: usersCollection })
            });
    }

    fetchOrderHandler = (selectedDate, selectedUser) => {
        let rowData = [];
        let uniqueVendor = [' Select Vendor'];
        fetchOrderAction(selectedDate, selectedUser).then(
            res => {
                res.map((value, index) => {
                    if (!uniqueVendor[`${value.vendorMenu.vendorId}`]) {
                        uniqueVendor[`${value.vendorMenu.vendorId}`] = value.vendorMenu.vendor;
                    }
                    rowData.push({
                        id: value.key,
                        date: value.date,
                        quantity: value.quantity,
                        userName: value.user.name,
                        vendorName: value.vendorMenu.vendor,
                        vendorId: value.vendorMenu.vendorId,
                        price: value.vendorMenu.menu.price * value.quantity,
                    })
                });
            }
        ).finally(() => {
            const total = rowData.reduce((total, value) => total + value.price, 0);
            this.setState({ rowData, totalAmount: total, uniqueVendor })
        })
    }
    redirectToBilling = () => {
        const { selectedUser, selectedDate, selectedVendor } = this.state;
        let urlStr = `/billing/${selectedUser}/user?selectedDate=${getDateTimestamps(selectedDate)}`;
        const billingUrl = !selectedVendor ? urlStr : `${urlStr}?selectedVendor=${selectedVendor}`;
        this.props.history.push(billingUrl);
    }

    clickHandleData = (key) => {
        const { rowData } = this.state;

        deleteOrderAction(key).then((res) => {
            const indexRow = rowData.findIndex(row => row.id === key)
            const cloneRowData = [...rowData];
            cloneRowData.splice(indexRow, 1);
            this.setState({
                rowData: cloneRowData
            })
        })
    }
    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    
        params.api.expandAll();
      };


 setPrinterFriendly = (api) => {
    var eGridDiv = document.querySelector('#myGrid');
    eGridDiv.style.height = '';
    
    console.log('dfdf');
    api.setDomLayout('print');
  }
setNormal = (api) => {
    var eGridDiv = document.querySelector('#myGrid');
    eGridDiv.style.width = '100%';
    eGridDiv.style.height = '800px';
    api.setDomLayout(null);
  }
  

    onBtPrint = () => {
        var api = this.gridApi;
        this.setPrinterFriendly(api);
        setTimeout(function () {
          this.print();
              var eGridDiv = document.querySelector('#myGrid');
            eGridDiv.style.width = '100%';
            eGridDiv.style.height = '800px';
             api.setDomLayout(null);
        }, 2000);
      };

    render() {
        const {
            filterRowData,
            rowData,
            selectedDate,
            uniqueUsers,
            uniqueVendor,
            totalAmount,
            columnDefs,
            frameworkComponents,
            selectedUser,
            selectedVendor
        } = this.state;

        const orderRecords = (filterRowData).length ? filterRowData : rowData;
        const selecteMonth = selectedDate ? selectedDate.toLocaleString('default', { month: 'short' }) : 'all';
        const fileName = selectedUser ? this.state.uniqueUsers[selectedUser].replace(' ', '_') : 'all_user';
        return (
            <div className="ag-theme-alpine">
                <div>
                    <Button className="btn btn-primary btn-xs align-right" >
                        <Link to="/order/add"> Add Order </Link>
                    </Button>
                </div>
                <ReactToPrint
          trigger={() => <button >Print this out!</button>}
          content={() => this.componentRef}
        />
        <div  ref={(el) => (this.componentRef = el)}   >
                        <div>
                            <h4>
                                Starting Date:
                            <DatePicker
                                    showPreviousMonths
                                    monthsShown={2}
                                    name="date"
                                    selected={selectedDate}
                                    onChange={date => this.setState({ selectedDate: date })}
                                />
                                <span
                                    style={{ fontSize: "14px" }}>
                                    {selectedDate.toLocaleDateString('en-US', DateFormat)}
                               ---
                            {/* {(new Date( new Date().getMonth() +1, 0)).toLocaleDateString('en-US', DateFormat)} */}
                         { ( new Date(new Date().getFullYear(), new Date().getMonth() + 0, 0)).toLocaleDateString('en-US', DateFormat) }
                            
                                </span>
                            </h4>
                            <div className="inline-flex-sec">User:
                                 <Select
                                    name="user"
                                    onChange={(event) => this.setState({ selectedUser: event.target.value })}
                                    options={uniqueUsers}
                                />
                            </div>
                            {Object.keys(uniqueVendor).length > 2 && (
                                <div className="inline-flex-sec">
                                    <Select
                                        name="vendor"
                                        onChange={(event) => this.setState({ selectedVendor: event.target.value })}
                                        options={uniqueVendor}
                                    />
                                </div>
                            )}

                        </div>
                        <div 
                                   id="myGrid" style={{ width: "80%", margin: "auto", height: "900px" }}>

                            <div>
                                <h4> Total Is {totalAmount} </h4>
                                {
                                    selectedUser &&
                                    totalAmount > 0 &&
                                    (Object.keys(uniqueVendor).length < 3 ||
                                        selectedVendor) &&
                                    (
                                        <Button
                                            onClick={() => this.redirectToBilling()}
                                            className="btn btn-primary"
                                        >
                                            Bill
                                        </Button>
                                    )}
                            </div>

                            <AgGridReact
                                columnDefs={columnDefs}
                                rowData={orderRecords}
                                frameworkComponents={frameworkComponents}
                                pagination="true"
                                 paginationPageSize="25"
                                  floatingFilter="true"
                                   animateRows={true}
                                  groupUseEntireRow={true}
                                  onGridReady={this.onGridReady}
                            >
                            </AgGridReact>
                        </div>
                        </div>
            </div>
        )
    }
}


export default Order;

