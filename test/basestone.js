var
basestone = require('./src/basestone'),
util = require('./util').util

var
EventEmitter = basestone.EventEmitter
module('EventEmitter', {
    setup: function () {
        this.emitter = new EventEmitter()
        ok(typeof this.emitter.__listeners === 'undefined', '__listener is still undefined')
    }
})
test('addListener, on', function () {
    function fNOP() {
    }
    this.emitter.addEventListener('click', fNOP)
    ok(this.emitter.__listeners['click'].indexOf(fNOP) > -1, 'there is a click handler')
    this.emitter.on('mousemove', fNOP)
    ok(this.emitter.__listeners['mousemove'].indexOf(fNOP) > -1, 'there is a mousemove handler')
})

test('once', function () {
    function fNOP() {
    }
    this.emitter.once('click', fNOP)
    ok(this.emitter.__listeners['click'].some(function (listener) {return listener.__listener === fNOP }), 'there is a once handler')
    this.emitter.emit('click')
    ok(this.emitter.__listeners['click'].indexOf(fNOP) === -1, 'once handler is removed')
})

test('removeListener', function () {
    function fNOP() {
    }
    function anotherFNOP() {
    
    }
    this.emitter.on('click', fNOP)
    this.emitter.on('click', anotherFNOP)
    ok(this.emitter.__listeners['click'].length === 2, 'two handlers')
    this.emitter.removeListener('click', fNOP)
    ok(this.emitter.__listeners['click'].indexOf(fNOP) === -1, 'fNOP handler is removed')
    ok(this.emitter.__listeners['click'].indexOf(anotherFNOP) > -1, 'anotherFNOP handler is still there')
    this.emitter.removeListener('click', anotherFNOP)
    ok(this.emitter.__listeners['click'].indexOf(anotherFNOP) === -1, 'anotherFNOP is gone')
})

test('removeAllListeners', 7, function () {
    function fNOP() {
        ok(true, 'call fNOP')
    }
    function anotherFNOP() {
        ok(true, 'call anotherFNOP')
    }
    this.emitter.on('click', fNOP)
    this.emitter.on('mousemove', fNOP)
    this.emitter.on('click', anotherFNOP)
    this.emitter.on('mousemove', anotherFNOP)
    this.emitter.emit('click')
    this.emitter.emit('mousemove')
    this.emitter.removeAllListeners('click')
    this.emitter.emit('click')
    this.emitter.emit('mousemove')
    this.emitter.removeAllListeners()
    this.emitter.emit('click')
    this.emitter.emit('mousemove')
})

test('setMaxListeners', 4, function () {
    function fNOP() {
        ok(true, 'call fNOP')
    }
    function anotherFNOP() {
        ok(true, 'call anotherFNOP')
    }
    this.emitter.on('click', fNOP)
    equal(this.emitter.__listeners.__maxListeners, 10, 'default max count is 10')
    this.emitter.setMaxListeners(2)
    equal(this.emitter.__listeners.__maxListeners, 2, 'now, max count is 2')
    try {
        this.emitter.on('click', fNOP)
        this.emitter.on('click', fNOP)
    } catch (e) {
        ok(true, 'to many listeners')
    }
})

test('listeners', function () {
    function fNOP() {
        ok(true, 'call fNOP')
    }
    function anotherFNOP() {
        ok(true, 'call anotherFNOP')
    }
    equal(this.emitter.listeners('click').length, 0, 'black array')
    this.emitter.on('click', fNOP)
    this.emitter.on('click', anotherFNOP)
    this.emitter.on('mousemove', fNOP)
    deepEqual(this.emitter.listeners('click'), [fNOP, anotherFNOP])
    deepEqual(this.emitter.listeners('mousemove'), [fNOP])
})

test('emit', 3, function () {
    function recieve(one, two) {
        equal(one, 1, one)
        equal(two, 2, two)
    }
    this.emitter.on('send', recieve)
    this.emitter.emit('send', 1, 2)
})

test('Event: \'newListener\'', 3, function () {
    stop()
    this.emitter.on('newListener', function () {
        start()
        ok(true, 'there is a new listener added')
    })
    this.emitter.on('nood', function () {})
})

var
value = basestone.value
module('value')
test('value()', 7, function () {
    var
    val,
    VAL = 646456

    val = value()
    strictEqual(val(), undefined, 'undefined')
    val = value(undefined)
    strictEqual(val(), undefined, 'undefined')
    val = value(null)
    strictEqual(val(), null, 'null')
    val = value('')
    strictEqual(val(), '', '')
    val = value(0)
    strictEqual(val(), 0, '0')

    val = value()
    val.on('change', function (val) {
        equal(val, VAL, VAL)
    })
    val(VAL)
    strictEqual(val(), VAL, VAL)
})

var
object = basestone.object
module('object')
test('object()', 5, function () {
    var
    obj,
    OBJ = {
        email: 'island205@gmail.com',
        age: 24,
        working: function () {
            console.log('pa,pa,pa coding')
        }
    }

    obj = object()
    deepEqual(obj(), {}, JSON.stringify({}))
    obj = object(OBJ)
    deepEqual(obj(), OBJ, JSON.stringify(OBJ))
    equal(obj('age'), 24, 'age:24')
    obj.on('change', function (obj) {
        deepEqual(obj, util.extend(OBJ, {age: 25}))
    })
    obj.on('change:age', function (age) {
        equal(age, 25, 'age:25')
    })
    obj('age', 25)
})

test('keys', function () {
    var
    obj,
    OBJ = {
        email: 'island205@gmail.com',
        age: 24,
        working: function () {
            console.log('pa,pa,pa coding')
        }
    }

    obj = object()
    deepEqual(obj.keys(), [], '[]')
    obj(OBJ)
    deepEqual(obj.keys(), ['email', 'age', 'working'])
})

var
array = basestone.array
module('array')
test('array()', function () {
    var
    arr
    arr = array()
    deepEqual(arr(), [], 'call array() without arguments')

    arr = array([])
    deepEqual(arr(), [], 'call array() with []')

    arr = array([undefined, null, '', 1])
    deepEqual(arr(), [undefined, null, '', 1], 'call array() with [undefined, null, \'\', 1]')
    equal(arr(1), null, 'get second item')

    arr([1, 1, 1, 1])
    deepEqual(arr(), [1, 1, 1, 1], '')
})

test('Mutator mehod', 25, function () {
    var
    arr

    arr = array()

    function fNOP() {
        ok(true, 'change event')
    }

    function onReset() {
        ok(true, 'reset')
    }
    arr.on('change', fNOP)
    'pop push reverse shift sort splice unshit'.split(' ').forEach(function (method) {
        arr.on(method, function () {
            ok(true, method + ' event')
        })
    })
    deepEqual(arr(), [])

    arr.push(1)
    deepEqual(arr(), [1], 'push')
    equal(arr.pop(), 1)
    deepEqual(arr(), [], 'pop')

    arr.push(1, 2, 3)
    deepEqual(arr(), [1, 2, 3], 'push')
    arr.reverse()
    deepEqual(arr(), [3, 2, 1], 'reverse')
    arr.sort(function (a, b) {
        return a - b
    })
    deepEqual(arr(), [1, 2, 3], 'sort')
    equal(arr.shift(), 1, 'shift')
    arr.splice(0, 2, 1, 2, 3)
    deepEqual(arr(), [1, 2, 3], 'splice')

    arr.on('reset', onReset)

    arr([])
    deepEqual(arr(), [])
})

test('Accessor method', function () {
    var
    arr

    arr = array()
    deepEqual(arr = arr.concat([1, 2, 3]), [1, 2, 3], 'concat')
    equal(arr.join(','), '1,2,3', 'join')
    deepEqual(arr.slice(0, 2), [1, 2], 'slice')
    equal(arr.indexOf(1), 0, 'indexOf')
    equal(arr.lastIndexOf(3), 2, 'lastIndexOf')
})

test('Iteration method', function () {
    var
    arr

    arr = array([1, 2, 3, 4, 5, 6, undefined, null])

    arr.forEach(function (item) {
        ok(arr.indexOf(item) > -1, 'forEach')
    })

    function filter(item) {
        return typeof item === 'number'
    }

    function reduce(a, b) {
        return a + b
    }

    ok(!arr.every(filter), 'every')
    ok(arr.some(filter), 'some')
    deepEqual(arr.filter(filter), [1, 2, 3, 4, 5, 6], 'filter')
    deepEqual(arr.map(filter), [true, true, true, true, true, true, false, false], 'map')
    equal(array(arr.filter(filter)).reduce(reduce), 21, 'reduce')
    equal(array(arr.filter(filter)).reduceRight(reduce), 21, 'reduce')
})


var
map = basestone.map
module('map')
test('map()', function () {
    var
    mp

    mp = map()
    deepEqual(mp.keys(), [], '')
    deepEqual(mp.values(), [], '')

    mp = map([[null, null], [undefined, undefined], [0, 0], ['', '']])
    deepEqual(mp.keys(), [null, undefined, 0, ''])
    deepEqual(mp.values(), [null, undefined, 0, ''])

    deepEqual(mp(), [[null, null], [undefined, undefined], [0, 0], ['', '']])

    mp([[null, -1], [undefined, -1], [0, -1]])
    deepEqual(mp(), [[null, -1], [undefined, -1], [0, -1], ['', '']])
    equal(mp(null), -1)
    equal(mp(undefined), -1)
    equal(mp(''), '')
})

test('Motator method', function () {
    var
    mp

    mp = map()

    mp.set(undefined, undefined)
    equal(mp.get(undefined), undefined, 'set')

    mp.set(undefined, 'undefined')
    equal(mp.get(undefined), 'undefined', 'set')

    mp.remove(undefined)
    equal(mp.get(undefined), undefined, 'remove')
})

test('Accessor Method', function () {
    var
    mp

    mp = map([[null, null], [undefined, undefined], [0, 0], ['', '']])
    equal(mp.get(null), null, 'get')
    ok(mp.has(''), 'has')
    deepEqual(mp.keys(), [null, undefined, 0, ''], 'keys')
    deepEqual(mp.values(), [null, undefined, 0, ''], 'values')
})

test('Iterator method', 16, function () {
    var
    mp,
    noop = [null, undefined, 0, '']
    mp = map([[null, null], [undefined, undefined], [0, 0], ['', '']])

    mp.items(function (key, value) {
        ok(noop.indexOf(key) > -1, 'items')
        ok(noop.indexOf(value) > -1, 'items')
    })

    mp.keys(function (key) {
        ok(noop.indexOf(key) > -1, 'keys')
    })
    mp.values(function (value) {
        ok(noop.indexOf(value) > -1, 'values')
    })
})

test('event', 4, function () {
    var
    mp
    mp = map([[null, null], [undefined, undefined], [0, 0], ['', '']])

    mp.on('change', function (key, value) {
        equal(key, null, 'change')
        equal(key, undefined, 'change')
    })

    mp.on('change:null', function (value) {
        equal(value, 'undefined', 'change:null')
    })

    mp.on('remove', function (key) {
        equal(key, 0, 'remove')
    })

    mp.set(null, 'undefined')
    mp.remove(0)
    
})

var
set

set = basestone.set
module('set')
test('set()', function () {
    var
    st

    st = set()
    deepEqual(st(), [], 'set()')

    st = set([undefined, null, null, 0])
    deepEqual(st(), [undefined, null, 0])

    st(['', null, undefined, 0])
    deepEqual(st(), [undefined, null, 0, ''])

    st(' ')
    deepEqual(st(), [undefined, null, 0, '', ' '])
})

test('Metator method', function () {
    var
    st

    st = set()
    st.add(undefined)
    deepEqual(st(), [undefined], 'add')
    st.remove(undefined)
    deepEqual(st(), [], 'remove')
})

test('Accessor method', function () {
    var
    st

    st = set()
    st.add(undefined)
    ok(st.has(undefined), 'has')
    ok(!st.has(null), 'has')
    st.add(null)
    deepEqual(st.values(), [undefined, null], 'values')
})

test('Iterator method', 4, function () {
    var
    st,
    values = [undefined, null, 0, '']
    st = set()

    st(values)

    st.values(function (value) {
        ok(values.indexOf(value) > -1, 'values')
    })
})

test('event', 4, function () {
    var
    st

    st = set()
    st.on('add', function (value) {
        equal(value, 'add', 'add')
    })
    st.on('remove', function (value) {
        equal(value, 'add', 'remove')
    })

    st.on('change', function (value) {
        equal(value, 'add', 'change')
    })
    st.add('add')
    st.remove('add')
})
