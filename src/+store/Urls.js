import axios from '../axios-order';
const VendorURL = 'vendor.json';
const VendorDeleteUrl = (vendorId) => `vendor/${vendorId}.json`;


export const addVendor = (param) => {
    return axios.post(VendorURL , param)
    .then(response => {
        return {
           result: response.data,
           status: response.status
        }
    })
    .catch(error => {console.log(error); return error})
} ;

const fetchVendor = () => {
    return axios.get(VendorURL)
            .then(response => {
                return {
                    result: response.data,
                    status: response.status
                }
            })
            .catch(error => {
                console.log(error);
                return {
                    result: error,
                    status: error.status
                }
            })
} 



const deleteVendor = (userId) => {
    return axios.delete(VendorDeleteUrl(userId))
            .then(response => {
                return {
                    result: response.data,
                    status: response.status
                }
            })
            .catch(error => {
                console.log(error);
                return {
                    result: error,
                    status: error.status
                }
            })
} 


export {
    fetchVendor,
    deleteVendor
}