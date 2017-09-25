'use strict';
const PyPool = require('../index');


const args = [0];


const pool = new PyPool({ count: 10, script: './test.py' });

let i = 0;
(function executeAgain() {
	if (i < 10) {
		pool.execute(args, res => {
			console.log(res);
			i++;
			args.push(1);
			executeAgain();
		});
	} else {
		process.exit();
	}
})();