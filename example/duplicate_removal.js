var
set = require('../src/set').set,
duplicateList = [7, 10, 2, 0, 7, 7, 8, 13, 1, 9, 9, 7, 3, 7, 0, 10, 4, 3, 4, 5, 7, 12, 0, 0, 12, 5, 2, 5, 12, 12, 0, 13, 6, 10, 5, 13, 5, 14, 4, 5, 10, 5, 5, 5, 14, 9, 5, 4, 7, 7, 1, 6, 11, 3, 12, 3, 8, 5, 5, 2, 10, 7, 10, 11, 6, 0, 6, 0, 3, 2, 5, 3, 10, 12, 6, 11, 12, 4, 4, 9, 7, 2, 9, 2, 6, 4, 13, 11, 14, 7, 2, 4, 4, 5, 6, 10, 14, 9, 1, 9, 10, 42, 24, 38, 20, 25, 2, 39, 37, 44, 27, 30, 36, 0, 30, 48, 41, 39, 28, 15, 20, 19, 34, 27, 28, 0, 2, 31, 1, 11, 48, 28, 19, 12, 39, 43, 0, 4, 28, 27, 28, 5, 35, 28, 23, 44, 29, 41, 29, 23, 32, 5, 14, 20, 32, 31, 30, 39, 4, 34, 5, 36, 32, 45, 37, 12, 7, 36, 36, 32, 31, 47, 10, 22, 0, 35, 15, 34, 14, 28, 5, 42, 19, 9, 42, 22, 36, 25, 14, 17, 33, 26, 12, 32, 23, 5, 26, 31, 28, 28, 46, 46],
singleList = set()

// or just use `singleList = set(duplicateList)`
for (var i = 0, len = duplicateList.length; i < len; i++) {
    singleList.add(duplicateList[i])
}

// out:[ 7, 10, 2, 0, 8, 13, 1, 9, 3, 4, 5, 12, 6, 14, 11, 42, 24, 38, 20, 25, 39, 37, 44, 27, 30, 36, 48, 41, 28, 15, 19, 34, 31, 43, 35, 23, 29, 32, 45, 47, 22, 17, 33, 26, 46 ]
console.log(singleList.values())

