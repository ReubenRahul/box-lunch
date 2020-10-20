import React from 'react';
import Button from '../../component/Common/Button';

const  addMenuButton = (props) => ( 
        <Button  onClick= {() => props.colDef.addMenuClickHandler(props.data.id)} className="btn btn-sm btn-primary" > Add Menu </Button>
    )

    export default addMenuButton;