// add users



import { fireStoreObj } from '../../../Firebase/Firebase';
import { addedResponse, deleteResponse } from '../Status';
const userCollection = fireStoreObj.collection("users");

const addUser = (data) => {
  return userCollection.doc().set(data)
    .then( () => {
      return addedResponse;
    }).catch( error => {
    })
}


const fetchUsers = () => {
  return  userCollection.get()
          .then(snapShot => {
            return snapShot.docs.map(doc => {
              return {
               ...doc.data(),
                key: doc.id
              }
            })
          }).catch( error => {
            console.log('error', error)
          })
}

const editUserAction = (key) => {
  return userCollection.doc(key).get().then(snapshot => snapshot.data()
  //  console.log(snapshot, snapshot.data());
  //  return snapshot.docs.map(doc => {
  //     return {...doc.data(),key: doc.id } 
  //   })
  ) 
}

const updateUerAction = (key, data) => {
 return  userCollection.doc(key).set(data).then(addedResponse)
}

const deleteUserAction = (key) => {
  return  userCollection.doc(key).delete().then(deleteResponse)
}
export  {
    addUser,
    fetchUsers,
    editUserAction,
    updateUerAction,
    deleteUserAction
}