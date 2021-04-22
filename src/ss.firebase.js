import axios from 'axios';

const ssinstance = axios.create({
    baseURL: "https://share-market-6a918.firebaseapp.com/"
})

export default ssinstance