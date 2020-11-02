const convertDate = (date) => { 
    const dd = new Date(date);
    
    date = [ 
        dd.getFullYear(), 
        ('0' + (dd.getMonth() + 1)).slice(-2),
        ('0' + dd.getDate()).slice(-2) 
    ].join('-');
    return date;
}

export {
    convertDate
}