var
_ = require('../src/collection')

var heap = new _.BinaryHeap()
var arr = [4, 1, 11, 3, 5, 4, 6, 9, 10]

for (var i = 0, len = arr.length; i < len; i++) {
	heap.push(arr[i])
}

var element
while (element = heap.pop()) {
	console.log(element)
}

