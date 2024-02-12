export default {
	executeWorkflow: async (data, context) => {
		const orderDetails = await get_order_details.run({orderId: data.orderId});
		const userDetails = await get_user_details.run({userId: data.userId });

		if (this.isLowRisk(orderDetails, userDetails)) {
			await initiate_refund.run();
			await send_email.run({
				message: "Refund approved"  
			});
		} else {
			const resolution = await appsmith.workflows.assignRequest({
				"requestName": "Refund Order",
				"message": `${userDetails.id} requested a refund for the order ${orderDetails.orderId}`,
				"requestToGroups": ["L2 Agents"],
				"metadata": {"userId": data.userId, "orderDetails": orderDetails},
				"allowedResolutions": ["Approved", "Reject"]
			})
			if (resolution == "Approved") {
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
	}
}

