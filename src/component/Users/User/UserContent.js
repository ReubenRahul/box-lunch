import React from 'react';
import Button from '../../Common/Button';
const TableContent = (props) => {
    return  (
      <tbody>
         <tr>
              <td > <img alt ="Avatar" src ="https://i1.sndcdn.com/avatars-000513469755-q6lxqp-t200x200.jpg" className="img-rounded img-avatar" /> </td>
                <td> {props.name} </td>
                <td> {props.phone} </td>
                <td><Button onClick ={() => props.editUserHandler(props.userId)} > Edit </Button> </td>
                <td><Button onClick ={() => props.deleteHandler(props.userId) }> Delete </Button> </td>
            </tr>
      </tbody>
      
    )
    
}

export default TableContent;