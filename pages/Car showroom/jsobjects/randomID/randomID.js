export default {
	randomSalesID: () => {
		console.log("random CustId" + this.randomCustomerID())
		console.log("random SalesId")
		return Math.ceil(Math.random() * (9999 -  + 1)) + 1;
	},
	randomCustomerID: () => {
		return Math.ceil(Math.random() * (99999 -  + 1)) + 1;
	} 
}