export const initialState = {
     redirect: ''
 };
 const reducer = (state =initialState, action)  => {
     console.log('aything trieer', action);
     switch( action.type) {
        case 'redirect':
        return {
            ...state,
            redirect: action.url
        }
        default:
        return state;
     }
 }

 export default reducer