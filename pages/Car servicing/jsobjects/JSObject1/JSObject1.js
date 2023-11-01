export default {
	requester: "Akhil",
	aprover: "Varma",
	amount: "$46.29",
	for: "Lunch",
	body: "The reimbursement is for ${for}, [Invoice](https://su63746.ap-south-1.aws.snowflakecomputing.com/console/login#/?returnUrl=internal%2Fworksheet) for your perusal.",
	executeWorkflow: () => {
		return `${this.requester} requested you to approve a reimbursement of ${this.amount}`;
	}
}