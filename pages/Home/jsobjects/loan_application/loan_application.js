export default {
	executeWorkflow: async (data) => {
		
		function collectDocuments() {
			const resolution = appsmith_workflows.approval_request({
				"requestToUsers": [ 
					 "ayush@appsmith.com"
				],
				"message": "Collect documents for loan at the address #",
				"name": "Refund Order",
				"allowedResolutions": [
						"Submit"
				]}
			)
			return resolution;
		}
	}
}