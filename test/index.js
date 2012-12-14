var
_ = require('../src/collection'),
assert = require('assert')
describe('Map', function () {
	var map = null
	beforeEach(function () {
		map = new _.Map()
	})

	it('can set a object key, and can get value by object', function () {
		map.set(this, 'this')
		assert.equal('this', map.get(this))
	})

	it('can delete a key', function () {
		map.set(this, 'this')
		assert.ok(map['delete'](this))
		assert.ok(!map['delete'](this))
		assert.ok(!map['delete']({}))
	})

	it('can iterate by items or keys or values', function () {
		var
        key = {},
		that = this
		map.set(this, 'this')
		map.set(key, 'key')
		map.items(function (k, v) {
			assert.ok(that === k || key === k)
			assert.ok('this' === v || 'key' === v)
		})
		map.keys(function (k) {
			assert.ok(that === k || key === k)
		})
		map.values(function (v) {
			assert.ok('this' === v || 'key' === v)
		})
	})
})

describe('Set', function () {
	var set = null
	beforeEach(function () {
		set = new _.Set()
	})

	it('can add a valye', function () {
		set.add(this)
		assert.ok(true)
	})

	it('can test if has some value', function () {
		set.add(this)
		assert.ok(set.has(this))
	})

	it('can delete value', function () {
		set.add(this)
		assert.ok(set.has(this))
		set['delete'](this)
		assert.ok(!set.has(this))
	})
	it('can iterate it values', function () {
		var that = this
		set.add(this)
		set.add('this')
		set.values(function (value) {
			assert.ok(value === that || value === 'this')
		})
	})
})

describe('Heap', function () {
	var heap = null
	beforeEach(function () {
		heap = new _.Heap()
	})
	it('can add node to it', function () {
		heap.add(1)
		heap.add(2)
		heap.add(3)
		assert.deepEqual(heap._tree, [3, 1, 2])
	})
})
