import React from 'react';

export default (props) => {
    console.log({props})
  return (
    <span>
      {props.value}
    </span>
  );
};
