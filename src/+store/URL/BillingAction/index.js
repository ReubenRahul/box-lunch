 import { billingCollection } from '../Collections';
import {addedResponse} from "../Status";

const addBilling = (params) => {
   return  billingCollection.add(params)
            .then(res =>
                ({
                ...addedResponse,
                id: res.id
                })
            )
           .catch(err => console.log(err))
}


const getBilling = () => {

    return billingCollection
            .get()
            .then( snapshot => {
                return snapshot.docs.map( doc => ( {
                    ...doc.data(),
                    key:doc.id
                }))
            })
            .catch(err => console.log(err, 'err'))
}


export  {
    addBilling,
    getBilling
}

