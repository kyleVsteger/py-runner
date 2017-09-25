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

#start process
if __name__ == '__main__':
    main()