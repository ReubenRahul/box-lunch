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

const getDateFromTimestamps = timeStamps => new Date(parseInt(timeStamps) );

export {
    convertDate,
    getDateTimestamps,
    getDateFromTimestamps
}
