const ProcessAsPromised = require("process-as-promised");

module.exports = class Shard {
	constructor(id, proc, sharder, worker) {
		this.process = proc;
		this.sharder = sharder;
		this.worker = worker;
		this.id = id;
		this.process.setMaxListeners(0);
		this.IPC = new ProcessAsPromised(this.process);

		this.process.once("exit", () => {
			console.log(`Shard ${this.id} betrayed soviet motherland!`);
			this.sharder.create(this.id);
		});

		this.sharder.IPC.onEvents.forEach((callback, event) => {
			this.IPC.on(event, (...args) => callback(...args));
		});
		this.sharder.IPC.onceEvents.forEach((callback, event) => this.IPC.once(event, callback));
	}

	send(event, data, timeout) {
		return this.IPC.send(event, data, timeout || undefined);
	}

	eval(code) {
		return new Promise(resolve => this.IPC.send("eval", code).then(res => resolve(res)));
	}
};
