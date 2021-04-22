import  React from 'react';

const CheckboxRenderer = (params) => {
    return (
        <input
        type="checkbox"
        name={`is_paid_${params.data.userId}`}

        />
    )
}

export default CheckboxRenderer;