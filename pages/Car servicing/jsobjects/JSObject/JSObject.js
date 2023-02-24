export default {
	myVar1: [],
	myVar2: {},
		search: () => {
		if(Input1Copy.text.length==0){
			return select_repair_db.data
		}
		else{
			return(select_repair_db.data.filter(word => word.cust_name.toLowerCase().includes(Input1Copy.text.toLowerCase())))
		}
	},
}