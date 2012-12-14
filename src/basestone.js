(function(root) {
	var
	_

	if(typeof exports !== 'undefined') {
		_ = require('underscore')
	} else {
		_ = root._
	}

	/**
	 * http://wiki.ecmascript.org/doku.php?id=harmony:simple_maps_and_sets
	 * _.Map
	 */
	var Map = _.Map = function(iterable) {
			var
			that = this
			iterable = iterable || []
			this._keys = []
			this._vals = []
			_.forEach(iterable, function(element) {
				that.set(element[0], element[1])
			})
		}
	_.extend(Map.prototype, {
		get: function(key) {
			var i = _.indexOf(this._keys, key)
			return i < 0 ? undefined : this._vals[i]
		},
		has: function(key) {
			return _.indexOf(this._keys, key) >= 0
		},
		set: function(key, val) {
			var keys, i
			keys = this._keys
			i = _.indexOf(keys, key)
			if(i < 0) {
				i = keys.length
			}
			keys[i] = key
			this._vals[i] = val
		},
		remove: function(key) {
			var keys, i
			keys = this._keys
			i = _.indexOf(keys, key)
			if(i < 0) {
				return false
			}
			keys.splice(i, 1)
			this._vals.splice(i, 1)
			return true
		},
		items: function(iterator) {
			var keys = this._keys
			for(var i = 0; i < keys.length; i++) {
				iterator(keys[i], this._vals[i])
			}
		},
		keys: function(iterator) {
			var keys = this._keys
			for(var i = 0; i < keys.length; i++) {
				iterator(keys[i])
			}
		},
		values: function(iterator) {
			for(var i = 0; i < this._keys.length; i++) {
				iterator(this._vals[i])
			}
		}
	})

	/**
	 * http://wiki.ecmascript.org/doku.php?id=harmony:simple_maps_and_sets
	 * _.Set
	 */
	var Set = _.Set = function(iterable) {
			var
			that = this
			iterable = iterable || []
			this._map = new _.Map()
			_.forEach(iterable, function(element) {
				that.add(element)
			})
		}
	_.extend(Set.prototype, {
		add: function(key) {
			this._map.set(key, true)
		},
		has: function(key) {
			return this._map.has(key)
		},
		remove: function(key) {
			return this._map.remove(key)
		},
		values: function(iterator) {
			this._map.keys(iterator)
		}
	})

	var Stack = _.Stack = function(iterator) {
			var
			that = this
			iterator = iterator || []
			this._stack = []
			_.forEach(iterator, function(element) {
				that.push(element)
			})
		}
	_.extend(Stack.prototype, {
		push: function(element) {
			this._stack.push(element)
		},
		pop: function() {
			return this._stack.pop()
		},
		peek: function() {
			var stack = this._stack
			return stack[stack.length]
		}
	})

	var Queue = _.Queue = function(iterator) {
			var
			that = this
			iterator = iterator || []
			this._queue = []
			_.forEach(iterator, function(element) {
				that.add(element)
			})
		}
	_.extend(Queue.prototype, {
		add: function(element) {
			this._queue.push(element)
		},
		peek: function() {
			return this._queue[0]
		},
		poll: function() {
			return this._queue.shift()
		}
	})

	/**
	 * http://eloquentjavascript.net/appendix2.html
	 */

	var BinaryHeap = _.BinaryHeap = function(iterator, scorer) {
			var
			that = this
			iterator = iterator || []
			this._binaryHeap = []
			this.scorer = scorer ||
			function(element) {
				return element
			}
			_.forEach(iterator, function(element) {
				that.push(element)
			})
		}

	_.extend(BinaryHeap.prototype, {
		push: function(element) {
			var binaryHeap = this._binaryHeap
			this._binaryHeap.push(element)
			this.bubbleUp(binaryHeap.length - 1)
		},
		pop: function() {
			var binaryHeap = this._binaryHeap,
				top = binaryHeap[0],
				end = binaryHeap.pop()
				if(binaryHeap.length > 0) {
					binaryHeap[0] = end
					this.sinkDown(0)
				}
			return top
		},
		remove: function(element) {
			var that = this,
				binaryHeap = this._binaryHeap,
				length = binaryHeap.length,
				end, i, node
			for(i = 0; i < length; i++) {
				node = binaryHeap[i]
				if(node === element) {
					end = binaryHeap.pop()
					if(i !== length - 1) {
						binaryHeap[i] = end
						if(end < node) {
							that.bubbleUp(i)
						} else {
							that.sinkDown(i)
						}
					}
					return
				}
			}
		},
		size: function() {
			return this._binaryHeap.length
		},
		bubbleUp: function(position) {
			var element = this._binaryHeap[position],
				parentN, parent
			while(position > 0) {
				parentN = Math.floor((position + 1) / 2) - 1
				parent = this._binaryHeap[parentN]
				if(this.scorer(element) < this.scorer(parent)) {
					this._binaryHeap[parentN] = element
					this._binaryHeap[position] = parent
					position = parentN
				} else {
					break
				}
			}
		},
		sinkDown: function(position) {
			var binaryHeap = this._binaryHeap,
				length = binaryHeap.length,
				element = binaryHeap[position],
				leftChildPos, rightChildPos, leftChild, rightChild, swapPos = position
			while(true) {
				leftChildPos = position * 2 + 1, rightChildPos = leftChildPos + 1
				swapPos = position
				if(leftChildPos < length) {
					leftChild = binaryHeap[leftChildPos]
					if(this.scorer(leftChild) < this.scorer(element)) {
						swapPos = leftChildPos
					}
				}
				if(rightChildPos < length) {
					rightChild = binaryHeap[rightChildPos]
					if(this.scorer(rightChild) < this.scorer(binaryHeap[swapPos])) {
						swapPos = rightChildPos
					}
				}
				if(swapPos !== position) {
					binaryHeap[position] = binaryHeap[swapPos]
					binaryHeap[swapPos] = element
					position = swapPos
				} else {
					break
				}
			}
		}
	})
	/**
	 * http://www.nczonline.net/blog/2009/04/13/computer-science-in-javascript-linked-list/
	 */
	var LinkList = _.LinkList = function() {
			this._length = 0
			this._head = null
		}

	_.extend(LinkList.prototype, {
		add: function(node) {
			var current
			node = {
				data: node,
				next: null
			}
			if(this._head === null) {
				this._head = node
			} else {
				current = this._head
				while(current.next) {
					current = current.next
				}
				current.next = node
			}
			this._length++
		},
		get: function(index) {
			var current, i = 0
			if(index < -1 || index > this._length) {
				return null
			}
			current = this._head
			while(i++ < index) {
				current = current.next
			}
			return current.data
		},
		remove: function(index) {
			var current, previous, i = 0
			if(index < -1 || index > this._length) {
				return null
			}
			current = this._head
			if(index === 0) {
				this._head = current.next
			} else {
				while(i++ < index) {
					previous = current
					current = current.next
				}
				previous.next = current.next
			}
			this._length--
			return current.data
		},
		items: function(iterable) {
			var current = this._head
			while(current) {
				iterable(current.data)
				current = current.next
			}
		}
	})
}).call(this)

function() {
	function() {
		function() {

		}
	}
}