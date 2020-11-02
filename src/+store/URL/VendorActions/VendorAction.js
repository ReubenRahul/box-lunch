import { vendorCollection } from '../Collections';
import { addedResponse, deleteResponse } from '../Status';

const fetchVendorAction = () => {
    return vendorCollection.get().then(res => {
       return  res.docs.map(data => {
            return {
                ...data.data(),
                id:data.id
            }
        })
    }).catch(error => {
        console.log(error, 'error')
    })
};

const addVendorAction = (data) => {
   return vendorCollection.doc().set(data).then(() => addedResponse).catch(err => {
       console.log('err', err);
       
   });

};
const editVendorAction = (vendorId) => {
    return vendorCollection.doc(vendorId).get().then(snapshot => ( {...snapshot.data(), id:snapshot.id } ) );
};
const updateVendorAction = '';
const deleteVendorAction = key => vendorCollection.doc(key).delete().then(() => deleteResponse);


export {
    fetchVendorAction,
    addVendorAction,
    editVendorAction,
    updateVendorAction,
    deleteVendorAction
}


