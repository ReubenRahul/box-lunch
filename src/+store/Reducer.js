import { USERS_OPTION, VENDOR_OPTION } from "./Action";

export const initialState = {
     redirect: '',
     vendorOptions:[],
     userOptions:[]
 };
 const reducer = (state =initialState, action)  => {
     console.log('something dispatch', action);
     switch( action.type) {
        case 'redirect':
        return {
            ...state,
            redirect: action.url
        }

        case VENDOR_OPTION:
            let vendorOpt = {};
            (action.payload).forEach( (vendor) =>{
                   vendorOpt[`${vendor.id}`] = vendor.name; 
            })
            return {
                ...state,
                vendorOptions: vendorOpt
            }
        case USERS_OPTION:
            let usersOpt ={};
            (action.payload).forEach( user => {
                usersOpt[`${user.id}`] = user.name;
            })
            return {
                ...state,
                userOptions: usersOpt
            }
        default:
        return state;
     }
 }

 export default reducer