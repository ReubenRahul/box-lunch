import { USERS_OPTION, VENDOR_OPTION, VENDOR_MENU } from "./Action";

export const initialState = {
     redirect: '',
     vendorOptions:[],
     userOptions:[],
     vendorMenus:[]
 };
 const reducer = (state =initialState, action)  => {
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
        case USERS_OPTION: // for the dropdown
            let usersOpt ={};
            (action.payload).forEach( user => {
                usersOpt[`${user.key}`] = user.name;
            })
            return {
                ...state,
                userOptions: usersOpt
        }
        case VENDOR_MENU:
            // i will get payload
            //  i will get the vendor
            return {
                ...state,
                vendorMenus:action.payload
            }
        default:
        return state;
     }
 }

 export default reducer