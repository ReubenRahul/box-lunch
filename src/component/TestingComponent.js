
import React, { useEffect } from 'react';
import { fireStoreObj } from '../Firebase/Firebase';

const TestingComponent = (props) => {
    useEffect( () => {
        console.log('dsfsd');
        fireStoreObj.collection("test").doc().set({
            name: 'Rahul reyben'
        });
    }, []);

    return (
        <div> Hi from testing</div>
    )
}

export default TestingComponent;