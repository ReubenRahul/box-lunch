import firebase from "firebase";

const convertDate = (date) => {
    const dd = new Date(date);

    date = [
        dd.getFullYear(),
        ('0' + (dd.getMonth() + 1)).slice(-2),
        ('0' + dd.getDate()).slice(-2)
    ].join('-');
    return date;
}

const getDateTimestamps = (date) => {
   const dateTime =  new Date( date );
   return dateTime.getTime();
}

// const getLastDayOfCurrentMonth =  (date) =>{
//     return  new Date(date.getFullYear(), date.getMonth() + 1, 0);

// }


const getFirstDayOfNextMonth =  (date) =>{
    return  new Date(date.getFullYear(), date.getMonth() + 2, 0);

}

const getDateFromTimestamps = timeStamps => new Date(parseInt(timeStamps) );


const getDateSecond = (date) => firebase.firestore.Timestamp.fromDate(date).seconds;


export const convertMonth = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4:'Apr',
    5: 'May',
    6:'June',
    7: 'July',
    8: 'Aug',
    9:'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
}


export {
    convertDate,
    getDateTimestamps,
    getDateFromTimestamps,
    getFirstDayOfNextMonth,
    getDateSecond
    // getLastDayOfCurrentMonth
}
