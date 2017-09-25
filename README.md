##Why I made this package:
This package was created to quickly bridge a set of Python machine learning models with a NodeJS service.
This solution works, but there is an inherent cost to spinning up the Python processes. 
For applications that are not time sensitive this solution will work and requires little modification to an existing Python script.
Since we're working with std.in/out, be aware that any `print` lines in your Python file will be piped to the `PyPool.execute` callback.

##Sample JS File
```javascript
const PyPool = require('py-runner');
// creates a pool of five readily available processes running the same script
const pool = new PyPool({count: 5, script:'/path/to/your/script.py'}); 
const args = [1,2,3,4,5];
// takes an available process and executes with args
pool.execute(args, result =>{ 
	console.log(result); // print value from python file
});
```



##Sample Python File
```python
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
```