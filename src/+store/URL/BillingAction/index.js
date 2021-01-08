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

export  {
    addBilling
}

