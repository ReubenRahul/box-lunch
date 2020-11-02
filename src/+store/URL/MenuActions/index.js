import { menuCollection } from '../Collections';
import { addedResponse, deleteResponse } from '../Status';


const getVendorMenu = (vendorId)  => {
  return  menuCollection
//   .where("vendorId", "==", vendorId)
  .get().then(snapshot => {
    return  snapshot.docs.map( doc => ({
           id:doc.id,
            ...doc.data()
        })
     )
   });
} 




const addMenuAction = (data) => {
    return menuCollection.add(data)
                .then(res => ({ ...addedResponse, id: res.id}) )
                .catch(err =>{ 
                    console.log(err, 'err');
                     return err;
                });

}


const deleteMenuAction = key => {
    return menuCollection.doc(key).delete().then(()=> deleteResponse);
}

export  {
    getVendorMenu,
    addMenuAction,
    deleteMenuAction
}

