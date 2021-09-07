import { orderCollection} from '../Collections';
import {addedResponse, deleteResponse, updatedResponse} from '../Status';
import firebase from 'firebase';
import {getFirstDayOfNextMonth} from "../../../Utils/helper";
const fetchOrderInDateRange = (startDate , isPaid = false) => {
    const startDateSecond = firebase.firestore.Timestamp.fromDate(startDate).seconds;
    const endDateSecond =  firebase.firestore.Timestamp.fromDate(getFirstDayOfNextMonth(startDate)).seconds;
    return  orderCollection
            .where("dateTimestamp", "<=", endDateSecond)
            .where("dateTimestamp", ">=", startDateSecond)
            .where('isPaid', '==', isPaid).get()
            .then(snapshot => snapshot.docs.map(doc => ({
                ...doc.data(),
                key: doc.id
            }),
        )
    )
}


const fetchOrderAction = (selectedDate, selectedUser, isPaid = false)  => {
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate()+1);
    const tomorrowDate = firebase.firestore.Timestamp.fromDate(tomorrow).seconds;
    const selectedDateSecond = firebase.firestore.Timestamp.fromDate(new Date(selectedDate)).seconds;

    let query = orderCollection
        .where("dateTimestamp", "<=", tomorrowDate)
        .where("dateTimestamp", ">", selectedDateSecond);
    if (selectedUser && selectedUser != 0) {
        query = query
                .where("userId", "==", selectedUser)

    }
    return query
        .where('isPaid', '==', isPaid).get()
        .then(snapshot => snapshot.docs.map(doc => ({
            ...doc.data(),
            key: doc.id
        })
       )
    )
}

const userOrderHandler = (query) => {
    return query
        .get()
        .then( snapshot => {
            return snapshot.docs.map(doc =>  ({
                ...doc.data(),
                key: doc.id
            }))
        }).catch(err => console.log(err, 'err'))
}



const fetchUserOrderOnDateRange = (userId, startDate, endDate, selectedVendor= undefined) => {
    const startDateSeconds = firebase.firestore.Timestamp.fromDate(startDate).seconds;
    const endDateSeconds = firebase.firestore.Timestamp.fromDate(endDate).seconds;
    let query = orderCollection
        .where("dateTimestamp", "<=", endDateSeconds)
        .where("dateTimestamp", ">", startDateSeconds);
    console.log({selectedVendor})
    if(selectedVendor)
    {

        query =   query.where("vendorMenu.vendorId", "==", "ia6J9aG6ddDxllX2MpeL");
    }
    if (userId) {
        query =   query.where("userId", "==", userId);
    }

    return userOrderHandler(query)

}

const addOrderAction = (data) => {
    return orderCollection.doc().set(data)
        .then(res => addedResponse)
        .catch(err => console.log(err));
}

const deleteOrderAction = (key) => {
    return orderCollection.doc(key).delete().then(() => deleteResponse).catch(err => console.log('err',err));
}

const markOrderPaid = (userId, startDate, endDate) => {
    const startDateSeconds = firebase.firestore.Timestamp.fromDate(startDate).seconds;
    const endDateSeconds = firebase.firestore.Timestamp.fromDate(endDate).seconds;
    const query = orderCollection
        .where("dateTimestamp", "<=", endDateSeconds)
        .where("dateTimestamp", ">", startDateSeconds)
        .where("userId", "==", userId);


    query
        .get()
        .then( snapshot => {
            snapshot.docs.map(record => {
                console.log('updated IDs', record.id)
                orderCollection.doc(record.id).set(
                    {isPaid: true },
                    {merge: true} // merge true add the field in collection if not exist. otherwise it remove all other record and only put isPaid -- if isPaid not exist
                )
                .then(res =>console.log(updatedResponse))
                .catch(er => console.log(er))

            }


        )
        }).catch(err => console.log(err, 'err'))
    // orderRecords.then(snapShot => {
    //     snapShot.docs.map( res => {
    //         console.log(res);
    //     })
    // })
}
export {
    fetchOrderInDateRange,
    fetchOrderAction,
    addOrderAction,
    fetchUserOrderOnDateRange,
    deleteOrderAction,
    markOrderPaid
}
