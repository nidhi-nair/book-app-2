export default {
	sendMessages: () => {
		if(DiscordSwitch.isSwitchedOn){
			DiscordAPI.run();
			const successMessage1 ="Discord Message sent to ".concat(List1.selectedItem.Mailinglist).concat(" server") 
			showAlert(successMessage1,'success');
			}
		if(EmailSwitch.isSwitchedOn){
			SendEmail.run();
			const successMessage2 ="Email sent to users on ".concat(List1.selectedItem.Mailinglist).concat(" list") 
			showAlert(successMessage2,'success');
		}
		resetWidget("MessageModal");
		closeModal("MessageModal");
	},
	getEmails: () => {
		var nameArray = Table1.selectedRows.map(function (el) { return el.CustomerEmailID; });
		return nameArray.toString();
	},
	addList: () => {
		const a ="We have created a new list".concat(List_Name.text);
		AddNewList.run();
		showAlert(a,'success');
		resetWidget("mailingListModal");
		GetMarketingList.run();
		closeModal("mailingListModal");
	}
}