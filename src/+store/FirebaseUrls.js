import {db, fireStoreObj} from '../Firebase/Firebase';
import firebase from 'firebase';

const getMenuDetails = new Promise ( (resolve)  => {
    const menuRef = db.ref("menu").orderByChild("timestamps");
    menuRef.once("value", handleVendorMenu);
    
    
    function handleVendorMenu(items){
        const vendorMenuRecord = {}
        Object.entries(items.val()).map( ( [key , value] , index) => {
            if (vendorMenuRecord[`${value.vendorId}`] ) {
                vendorMenuRecord[`${value.vendorId}`].push({
                    id: key,
                    value: `${value.price} - ${value.details}`,
                    price: value.price,
                    details: value.details,
                })
            }
          else {
              vendorMenuRecord[`${value.vendorId}`] = [{
                    id: key,
                    value: `${value.price} - ${value.details}`,
                    price: value.price,
                    details: value.details,
                }]
          }  
        } )
        resolve(vendorMenuRecord);
    }
}) 


// const getMenuDetails = new Promise ( (resolve)  => {
const handleAddOrder = (data) => new Promise ( (resolve) => {
    data.timestamps = firebase.database.ServerValue.TIMESTAMP;
    const orderRef = db.ref("orders").push(data);
    resolve( orderRef.getKey() );
})


const fetchOrders = (date, selectedUser='') => new Promise( (resolve) => {
    let orderRef ; 
    
    if (selectedUser)
    {

    testingOrder(date, selectedUser);
        //multiple where condition is not possible in firebase
        // orderRef = db.ref("orders").child("userId").equalTo(selectedUser).child("date").equalTo(date)
        // .orderByChild("date");
    } 
    // else 
    // {
        orderRef = db.ref("orders").orderByChild("date").startAt(date);
    // }
    // orderRef.orderByChild("date").startAt(date).limitToLast(100)
    // orderRef = db.ref("orders").orderByChild("date").startAt(date).limitToLast(100);
    // orderByChild("timestamps");
    orderRef.limitToLast(100).once("value", items =>  {
        if( !items.val()) 
        {
           return resolve([]);
           
        }
        const orderCollection = [];
       Object.entries(items.val()).map( ([itemsKey, itemsVal], index) => {
            orderCollection.push({
                ...itemsVal,
                id: itemsKey
            } )
       });
       resolve(orderCollection);
    })
    
})

function testingOrder( date, selectedUser ) 
{
    console.log(selectedUser);
    // testingOrder(date, selectedUser);
    // new Promise ( (resolve)  =>
const data = new Promise( (resolve) => {
            fireStoreObj.collection("orders")
            .get()
            .then(querySnapshot => {
                console.log(querySnapshot);
            const data = querySnapshot.docs.map(doc => {
                console.log(doc, doc.data, '86')
            return   doc.data()
                
            });
          
        })
    } )
   data.then(ans => {
        console.log(ans);
    })
}

export  {
    getMenuDetails,
    handleAddOrder,
    fetchOrders,
}