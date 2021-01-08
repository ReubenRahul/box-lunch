import React, { Component } from 'react';
import Button from '../../component/Common/Button';

class DeleteButton extends Component{
    render () {
        return (
            <Button className="btn btn-sm" onClick= {() => this.props.colDef.clickHandler(this.props.data.id)}> Delete </Button>
        )
    }
}
export default DeleteButton;
