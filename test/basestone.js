var
basestone = require('./src/basestone')

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

