export default {
	myVar1: [],
	myVar2: {},
		getCarSalesRevenue: () => {
		const arr = select_showroom_db.data.map(x => parseInt(x.selling_price))
		return ((arr.reduce((a, b) => a + b, 0)))
	},
		search: () => {
		if(Input1Copy.text.length==0){
			return select_showroom_db.data
		}
		else{
			return(select_showroom_db.data.filter(word => word.customer_name.toLowerCase().includes(Input1Copy.text.toLowerCase())))
		}
	}
}