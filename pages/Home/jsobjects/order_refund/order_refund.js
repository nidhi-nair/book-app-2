export default {
	executeWorkflow: async (data, context) => {
		const orderDetails = await get_order_details.run({
			orderId: data.orderId
		});

		const userDetails = await get_user_details.run({
			userId: data.userId 
		});

		if (this.isLowRisk(orderDetails, userDetails)) {
			await initiate_refund.run();
			await send_email.run({
				message: "Refund approved"  
			});
		} else {
			if (this.refundApproval() == "Approved") {
				await initiate_refund.run();
				await send_email.run({
					message: "Refund Approved"
				})
			} else {
				await send_email.run({
					message: "Refund Rejected"
				})
			}
		}
	},

	isLowRisk: (orderDetails, userDetails) => {
		if (orderDetails.value < 500 && userDetails.risk == "Low") {
			return true;
		} else {
			return false;
		}
	},

	refundApproval: () => {
		const resolution = appsmith_workflows.approval_request({
			"requestToUsers": [
				"neosrix+2@gmail.com", 
				"ayush@appsmith.com"
			],
			"requestToGroups": [
				"ayush@appsmith.com"
			],
			"message": "Customer with id #{{data.userId}} requested refund of amount {{orderDetails.amount}} for item {{orderDetails.item}}.",
			"name": "Refund Order",
			"allowedResolutions": [
				"Approved",
				"Reject"
			]})
		return resolution;
	}
}

