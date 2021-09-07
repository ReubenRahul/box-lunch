export const userRecordForPayment = (orders) => {
    const output = [];

	orders.map( (user ) => {
       
  	let amount =  output[user.userId ] && output[user.userId ].amount 
                     ? 
                        Number(output[user.userId ].amount) 
                         +  ( Number(user.vendorMenu.menu.price) * user.quantity )
                     : user.vendorMenu.menu.price *  user.quantity;


    let quantity =     output[user.userId ] && output[user.userId ].quantity 
                        ?  Number(output[user.userId ].quantity)  +  Number (user.quantity) 
                        :  user.quantity;                  

 

        output[ user.userId ] = {
                userId: user.userId,
                amount: amount,
                quantity,
                name:  user.user.name,
                final: amount
          };
          return output;
    })
return Object.values(output);
}

const structure = {
//     const userRecordForPayment = (users) => {
// 		const output = [];
// 	users.map( (user ) => {
//   	let amount =  output[user.userid ] && output[user.userid ].amount  ? output[user.userid ].amount + user.amount : user.amount;
//     			output[ user.userid ] = {
//          		 userid: user.userid,
//              amount: amount,
//              total: 1
//           };
         
     
//           return output;
//     })
  	
// 	output.forEach( ( value , index) => {
  		
//   })
// }


// const multiarray = [
// 	{
//   	userid:1,
//     username:'rahul',
//     amount:10,
    
//   },
//   {
//   	userid:1,
//     username:'rahul2',
//     amount:102,
    
//   },
//   {
//   	userid:1,
//     username:'rahul',
//     amount:101,
    
//   },
//   {
//   	userid:3,
//     username:'33 rahul',
//     amount:10,
    
//   }
// ]

// userRecordForPayment(multiarray)
}