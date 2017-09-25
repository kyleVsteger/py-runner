Usage:

##Sample JS File
const PyPool = require('py-runner');
const pool = new PyPool({count: 5, script:'/path/to/your/script.py'}); // creates a pool of five readily available processes running the same script
const args = [1,2,3,4,5];
pool.execute(args, result =>{ // takes and available process and executes with args
	console.log(result); // return from script
});



##Sample Python File

import sys
import json
import numpy as np

def read_in():
	lines = sys.stdin.readlines()
	return json.loads(lines[0])


def main():
	data = read_in()
	np_data = np.array(data)
	result = np.sum(np_data)
	print(result, end='') 


if __name__ == '__main__':
    main()

*/