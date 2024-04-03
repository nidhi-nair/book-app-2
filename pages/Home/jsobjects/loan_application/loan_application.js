export default {
	executeWorkflow: async (data) => {
		
		await create_new_application.run(data);
		
		if (collectDocuments() == "collected") {
			handleKYCResolution()
		} else {
			// Add code to update application and end workflow
		}
		
		function handleKYCResolution() {
			if (kycApproval() == "approved") {
				handleCreditResolution()
			} else if (kycApproval() == "need_more_documents") {
				
			} else {
				// Add code to update application and end workflow
			}
		}
		
		function handleCreditResolution() {
			if (creditApproval() == "approved") {
					if (loanSacntion() == "approved") {
						update_application.run({"status": "Approved"})
					} else {
						// Add code to update application and end workflow
					}
				} else if (creditApproval() == "need_more_documents") {

				} else {

				}
		}
		
		
		function collectDocuments() {
			const resolution = main.executeWorkflow({
				"requestToUsers": [ 
					 "collection_agent@bank.com"
				],
				"message": "Collect documents for loan at the address #{{data.communication_address}}",
				"name": "Documents Collection",
				"allowedResolutions": [
						"collected",
						"not_collected"
				]}
			)
			return resolution;
		}
		
		function kycApproval() {
			const resolution = main.executeWorkflow({
				"requestToGroups": [ 
					 "KYC Team"
				],
				"message": "Requesting KYC verification for loan application #",
				"name": "KYC Approval",
				"allowedResolutions": [
						"approved",
						"rejected",
						"need_more_documents"
				]}
			)
			return resolution;
		}
			
		function creditApproval() {
			const resolution = main.executeWorkflow({
				"requestToGroups": [ 
					 "Credit Team"
				],
				"message": "Requesting KYC verification for loan application #",
				"name": "Credit Approval",
				"allowedResolutions": [
						"approved",
						"rejected",
						"need_more_documents"
				]}
			)
			return resolution;
		}
		
		function loanSacntion() {
			const resolution = main.executeWorkflow({
				"requestToGroups": [ 
					 "manager_branch_name@bank.com"
				],
				"message": "Requesting KYC verification for loan application #",
				"name": "Sanction Loan",
				"allowedResolutions": [
						"approved",
						"rejected"
				]}
			)
			return resolution;
		}
	}
}