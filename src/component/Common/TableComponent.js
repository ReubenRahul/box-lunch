import React from 'react';
import '../../css/Table.css';

const TableComponent = (props) => {
    return  (
        <table className="rtable" width="80%" cellSpacing="0" cellPadding="0" >
            {props.children}
        </table>
    )
    
}

export default TableComponent;