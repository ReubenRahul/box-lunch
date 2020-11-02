import React from 'react';
import Button from '../../component/Common/Button';
import { useStateValue } from '../../StateProvider';
// const VendorListComponent = (props) => {
const  AddMenuButton = (props) => {
    const [  { vendorMenus } ] = useStateValue();
    
        return( <Button  onClick= {() => props.colDef.addMenuClickHandler(props.data.id)} className="btn btn-sm btn-primary" > 
            {vendorMenus && vendorMenus[props.data.id] &&  vendorMenus[props.data.id].length  } Add Menu
            </Button>)
    }

export default AddMenuButton;