import { convertDate } from '../../../Utils/helper';
import { orderCollection } from '../Collections';
import { addedResponse } from '../Status';
import firebase from 'firebase';


const fetchOrderAction = (selectedDate, selectedUser) => {
    const tomorrow = new Date();
tomorrow.setDate(new Date().getDate()+1);
    const tomorrowDate = firebase.firestore.Timestamp.fromDate(tomorrow).seconds;
    const selectedDateSecond = firebase.firestore.Timestamp.fromDate(new Date(selectedDate)).seconds;
  
    let query = orderCollection
        .where("dateTimestamp", "<=", tomorrowDate)
        
        .where("dateTimestamp", ">", selectedDateSecond);
    if (selectedUser) {
        query = orderCollection.where("userId", "==", selectedUser);
    }
    return query.get().then(snapshot => snapshot.docs.map(doc => ({
        ...doc.data(),
        key: doc.id
    })

    )
    )
}


const addOrderAction = (data) => {
    return orderCollection.doc().set(data)
        .then(res => addedResponse)
        .catch(err => console.log(err));
}

export {
    fetchOrderAction,
    addOrderAction
}