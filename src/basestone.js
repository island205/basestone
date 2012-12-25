var
value = require('./value').value,
object = require('./object').object,
array = require('./array').array,
map = require('./map').map,
set = require('./set').set,
structure = {
    set: require('./structure/set'),
    map: require('./structure/map')
}

module.exports = {
    value: value,
    object: object,
    array: array,
    map: map,
    set: set,
    structure: structure
}

