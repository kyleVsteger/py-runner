var spawn = require('child_process').spawn,
	async = require('async');


class PythonRunner {
	constructor(opts) {
		this.py = {};
		opts.forEach((unit, i) => {
			this.py[unit.name] = {};
			this.py[unit.name].process = spawn('python', [unit.script]);
			this.py[unit.name].args = JSON.stringify(unit.args);
		});
	}
	execute(callback) {
		const self = this;
		const asyncFuncs = {};
		const pyKeys = Object.keys(self.py);
		pyKeys.forEach(pk => {
			asyncFuncs[pk] = asyncCallback => {
				let rs = '';
				self.py[pk].process.stdout.on('data', (data) => {
					rs += data.toString();
				});
				self.py[pk].process.stdout.on('end', () => {
					return asyncCallback(null, rs);
				});

				self.py[pk].process.stdin.write(self.py[pk].args);
				self.py[pk].process.stdin.end();
			};
		});
		async.parallel(asyncFuncs, (err, res) => {
			return callback(res);
		});
	}
}

// let options = [
// 	{ name: 'parThreeHoleScore', script: './test.py', args: [1, 2, 3, 4, 5] },
// 	{ name: 'parThreeParOdds', script: './testTwo.py', args: [1, 2] }
// ]

// let script1 = new PythonRunner(options);
// script1.execute((res) => {
// 	console.log(res);
// });

module.exports = PythonRunner;
