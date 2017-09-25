'use strict';
const spawn = require('child_process').spawn;

class PythonRunner {
	constructor(opts) {
		this.py = {};
		this.script = opts.script;
		this.py.process = spawn('python', [opts.script]);
	}
}



class PyPool {
	constructor(opts) {
		this.last = 0;
		this.scripts = [];
		let i = 0;
		while (i < opts.count) {
			this.scripts.push(new PythonRunner(opts));
			i++;
		}
	}

	execute(args, callback) {
		const runner = this.getRunner();
		args = JSON.stringify(args);
		let result = '';
		runner.py.process.stdout.on('data', (data) => {
			// console.log(data.toString());
			result += data.toString();
		});
		runner.py.process.stdout.on('end', () => {
			runner.py.process = spawn('python', [runner.script]);
			callback(result)
		});
		runner.py.process.stdin.write(args)
		runner.py.process.stdin.end();
	}

	getRunner() {
		this.last++;
		this.last = this.last >= this.scripts.length - 1 ? 0 : this.last;
		return this.scripts[this.last];
	}
}

module.exports = PyPool