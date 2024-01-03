export default {
	executeWorkflow: async (payload) => {
		const data = Constants.data;
		const status = this.licenseStatus(data)
		const user = data.data.attributes.name;
		console.log(user)
		if (status == "EXPIRED") {
			console.log("expired")
			send_message.run({"message": user + "'s license has expired."});
		} else if (status == "EXPIRING-SOON") {
			send_message.run({"message": user + "'s license is expiring soon."});
		} else {
			return
		}

		return user
	},

	licenseStatus: (data) => {
		console.log("license status");
		return data.data.attributes.status;
	}

}

