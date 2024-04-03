export default {
  async executeWorkflow(data) {
    const { employee_id, employee_name, employee_email, quarter } = data;
		let submissions = [];
    let reviews = [];

    try {
      await notify_employee.run({ "status": `Pending on ${employee_name}`, "quarter": quarter });

      const submission = await appsmith.workflows.assignRequest({
        "requestName": "Quarterly Compliance Submission",
        "requestToUsers": [employee_email],
        "metadata": { "status": `Pending on ${employee_name}`, "quarter": quarter },
        "allowedResolutions": ["Submit"]
      });
			submissions.push(submission.metadata)

      const review = await this.review_request(submission);
      this.handleReviewOutcome(review);
				
			await update_compliance_db.run({"data": data, "submissions": submissions, "reviews": reviews})
			return true;
    } catch (error) {
      console.error("Error executing workflow:", error);
			throw error;
    }
  }
}

async function review_request(submissions, reviews) {
  try {
    const review = await appsmith.workflows.assignRequest({
      "requestName": "Quarterly Compliance Review",
      "requestToGroups": ["Compliance Team"],
      "metadata": { "submissions": submissions },
      "allowedResolutions": ["Passed Compliance", "Failed Compliance", "Request More Information"]
    });
		reviews.push(review)
		
    if (review.resolution === "Request More Information") {
      return await more_information_request(review);
    }

    return review;
  } catch (error) {
    console.error("Error in review request:", error);
    throw error;
  }
}

async function more_information_request(submissions, reviews) {
  try {
		await notify_employee.run({ "status": "Additional Information Requested", "quarter": quarter });
    const informationRequest = await appsmith.workflows.assignRequest({
      "requestName": "Compliance Additional Information",
      "requestToGroups": [employee_email],
      "metadata": { "reviews": reviews },
      "allowedResolutions": ["Submit"]
    });
		submissions.push(informationRequest.metadata)

    return await review_request(informationRequest);
  } catch (error) {
    console.error("Error in more information request:", error);
    throw error;
  }
}

async function handleReviewOutcome(review) {
  if (review.resolution === "Passed Compliance") {
    await notify_employee.run({ "status": "Passed Compliance", "quarter": quarter })
  } else if (review.resolution === "Failed Compliance") {
    await notify_employee.run({ "status": "Failed Compliance", "quarter": quarter })
  }
}
