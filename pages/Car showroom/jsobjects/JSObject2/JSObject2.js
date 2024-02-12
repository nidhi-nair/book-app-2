{
    async executeWorkflow(data) {
        const { step, outcome, comment, date } = data;
        let message = this.create_message(step, outcome, comment, date);
        let channel = "C06B5GJHNTT";	
				const thread = await Query1.run({"date": date});
				await Api2.run({"channel": channel, "message": message, "thread_ts": ""})		

				if (thread.length != 0) {
					// Assume threadId is the ID of the existing thread
					await Api2.run({"channel": channel, "message": message, "thread_ts": thread.thread_ts});
				} else {
					// Create new thread and send message
					const newThread = await Api2.run({"channel": channel, "message": message, "thread_ts": ""});
					await Query2.run({"date": date, "thread_ts": newThread.thread_ts});
				}

        return true;
    },

    create_message(step, outcome, comment, date) {
        let message = `${step} + ${outcome} + ${comment} + ${date}`;
        
        return message;
    }
}
