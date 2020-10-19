import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';  
import 'ag-grid-community/dist/styles/ag-grid.css';  
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Button from '../Common/Button';
import { Link } from 'react-router-dom';
import { deleteVendor, fetchVendor } from '../../+store/Urls';
import DeleteButton from '../../Utils/AgGridHelper/DeleteButton';


export  const VendorListComponent = (props) => {
    const peromiseFunation = (fun) => new Promise ( (resolve) => {
        const res = fun;
        resolve(res)        
}) 
    const clickHandleData = (id) => {

       
       const pro = peromiseFunation(deleteVendor(id) );
       pro.then( res => {
           console.log(res , '23')
        //    const status = userFetch ? false : true;
        setUserFetch(userFetch+1);
       })
        // console.log(response);
        // setUserFetch(!userFetch);
    }
    const coloums =  [
        // { headerName: "Id", field: "id" }, 
        { headerName: "Row",valueGetter: "node.rowIndex + 1", pinned: true},
        { headerName: "Name", field: "name" , sortable: true, filter: true, editable: true},
        { headerName: "Address", field: "address" , sortable: true, filter: true},
        { headerName: "Number", field: "number" , sortable: true, filter: true},
        { headerName: "Whats App Number", field: "whatsAppNumber" , sortable: true, filter: true},
        { headerName: "Serial Number", field: "id" }, 
        // { headerName: "Edit", cellRenderer: 'btnCellRenderer', cellRendererParams: {
        //             clicked: function(field) {
        //               alert(`${field} was clicked`);
        //             }
        //           },
        //           minWidth: 150
        //         },
        // {headerName:"Delete",cellRenderer:deleteButton}
        {
            headerName: 'Child/Parent',
            field: 'value',
            cellRenderer: 'childMessageRenderer',
            colId: 'params',
            clickHandler: clickHandleData,
            editable: false,
            minWidth: 150,
          },

    ];

    // frameworkComponentsNEW: {
    //     childMessageRenderer: ChildMessageRenderer,
    //   };
    const [userFetch, setUserFetch] = useState(false);
    const [columnDefs] = useState(coloums );
    const [rowData, setRowData] = useState( [] );
    const [context] = useState({ componentParent: this })
    const [frameworkComponents ] = useState( {
        childMessageRenderer: DeleteButton,
      }); 

    //   columnDefs.cellRendererParams = {
    //     handleDeleteClick: clickHandleData
    // }
    useEffect( () => {
        // fetch the vendor details
      const fetchVendorFun = new Promise( (resolve) => {
          const res = fetchVendor();
          resolve(res);
      })

     fetchVendorFun.then(res => {
         let vendorList = [];
         for( let key in res.result) {
            vendorList.push({
                //key --> index key
                ...res.result[key],
                id: key
            })
         }
         setRowData(vendorList.reverse());
     })
    }, [userFetch]);
    
    return  (
        <div className="ag-theme-alpine">  
        <div>
               <Button className="btn btn-primary btn-xs align-right" >
                   <Link to="vendor/add"> Add Vendor </Link>
               </Button>
         </div> 
         <div  style={{width:"70%", margin:"auto", height: "700px"}}>
           <AgGridReact
               cellEditingStarted={true}
               frameworkComponents={frameworkComponents}
               columnDefs ={columnDefs}
               rowData={rowData}
               context={context}

               pagination="true"  paginationPageSize="10" floatingFilter="true" 
            />
         </div>
          
       </div>
    )
}