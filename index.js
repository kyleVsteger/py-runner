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
		if (!opts || !opts.script) {
			throw new Error(`no options or script passed to PyPool constructor.\npass {script: '/path/to/script.py', count: Int (optional|default: 1)} as argument to constructor\n`)
		}
		this.last = 0;
		this.scripts = [];
		opts.count = opts.count ? opts.count : 1;
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