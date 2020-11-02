import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';  
import 'ag-grid-community/dist/styles/ag-grid.css';  
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import DeleteButton from '../../../Utils/AgGridHelper/DeleteButton';
import { db } from '../../../Firebase/Firebase';


const VendorMenuList = (props) => {
 
    const coloums = [
        {headerName:'Row', valueGetter:"node.rowIndex +1", pinned:true, width: '60px'},
        {headerName:'Price', field:'price',sortable:'true'},
        {headerName:'Details', field:'details'},
        {headerName:'Delete', field:'key', cellRenderer:'deleteButtonRenderer', colId:"id", clickHandler:props.deleteClickHandler, editable:false}

    ]

    const [columnDefs, setColoums] = useState(coloums);
    const [context] = useState({ componentParent: this })
    const [rowData, setRowData] = useState(props.menus);


    useEffect( () => {
        setRowData(props.menus)
    }, [props.menus])

    const [ frameworkComponents] = useState( {
        deleteButtonRenderer: DeleteButton
    })
    return (
        <div className="ag-theme-alpine" style={{marginBottom:"60px"}}>  

        <div  style={{width:"50%", margin:"auto", height: "300px"}}>
            <div>
                <h2> {props.vendorName} </h2>
            </div>
           <AgGridReact
               cellEditingStarted={true}
               frameworkComponents={frameworkComponents}
               columnDefs ={columnDefs}
               rowData={rowData}
               context={context}
               pagination="true"  
               paginationPageSize="10" 
               floatingFilter="true" 
            />
         </div>
        </div>
    )
} 
export default VendorMenuList;