export default {
	executeWorkflow: async (data) => {
		const orderDetails = await get_order_details.run({
			orderId: data.orderId
		});

		const userDetails = await get_user_details.run({
			userId: data.userId 
		});

		if (approveRefund(orderDetails, userDetails)) {
			await initiate_refund.run();
			await send_email.run({
				message: "Refund approved"  
			});
		} else {
			// create approval request
		}


		function approveRefund(orderDetails, userDetails) {
			if (orderDetails.value < 500 && userDetails.risk == "Low") {
				return true;
			} else {
				return false;
			}
		}
	}
}

