export default {
	onOpen: () =>{
		storeValue('cart', appsmith.store?.cart || [])
	},

	resetCart: () =>{
		storeValue('cart',[]);
		resetWidget('lst_cart');
	},

	addToCart: async () => {
		await closeModal('mdl_details');
		await storeValue('cart', appsmith.store.cart.concat({id:lst_products.selectedItem.id,model:lst_products.selectedItem.model,qty:1,price:lst_products.selectedItem.price,image:lst_products.selectedItem.image}));
		await showAlert(`${lst_products.selectedItem.model} added to cart`,'info')
	},

	saveQty: async (qty, itemId)=>{
		let cart = appsmith.store.cart;
		let cartRow = cart.findIndex(item=>item.id==itemId);
		cart[cartRow].qty = qty;
		await storeValue('cart',cart);
		await resetWidget('lst_cart')
	},

	showConfirm: async (title,message,icon) => {
		await storeValue('confirm',{message:message,title:title,icon:icon});
		await resetWidget('mdl_confirm');
		await showModal('mdl_confirm');
	},

	isConfirmed: () => {
		let confirm = appsmith.store.confirm;
		confirm.response = true;
		storeValue('confirm',confirm);
		closeModal('mdl_confirm');
		//showAlert(JSON.stringify(confirm));

		let title = confirm.title;
		switch(title){
			case 'WARNING':
				utils.resetCart()
				break;
			case 'CHECKOUT':
				navigateTo('Checkout','SAME_WINDOW');
				break;
			case 'RESET FILTERS':
				//showAlert('case = reset filters');
				storeValue('search','')
				storeValue('filter','')
				resetWidget('Select1')
				break;
			default:
				//showAlert('default case');
		}
		return confirm
	},


	getSelectOptions: (data, labelKey, valueKey = 'id') => {  
		// creates a deduplicated array of SelectOptions from data 
		let dupValues = data.map(row => {return {'label':row[labelKey], 'value':row[valueKey]}});
		let output = {};
		dupValues.forEach(option => {output[option.label] = option});
		let outputProps = Object.getOwnPropertyNames(output);
		return outputProps.map(prop => output[prop])
	},
}