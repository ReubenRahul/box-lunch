const { fireStoreObj } = require("../../Firebase/Firebase");

const vendorCollection = fireStoreObj.collection("vendors");

const menuCollection = fireStoreObj.collection("menus");


const orderCollection = fireStoreObj.collection("orders");

const billingCollection = fireStoreObj.collection("billing");

export  {
    vendorCollection,
    menuCollection,
    orderCollection,
    billingCollection
}
