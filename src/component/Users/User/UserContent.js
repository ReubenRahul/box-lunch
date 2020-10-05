import React from 'react';

const TableContent = (props) => {
    console.log(props);
    return  (
      <tbody>
         <tr>
              <td > <img alt ="Avatar" src ="https://i1.sndcdn.com/avatars-000513469755-q6lxqp-t200x200.jpg" className="img-rounded img-avatar" /> </td>
                <td> {props.name} </td>
                <td> {props.mobile} </td>
            </tr>
      </tbody>
      
    )
    
}

export default TableContent;