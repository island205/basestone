var
set = require('../src/set').set,
// pool = require('../src/pool'),
urls = ['http//google.com', 'http://baidu.com', 'http://dianping.com'],
i,
len

function pool() {
    var
    st = set()
    return {
        add: function (task) {
             st.add(task)
        }
    }
}

function Task() {

}

Task.prototype.run = function () {
    var url = urls.pop()
    setTimeout(function () {
        console.log(url)
        this.finish(this)
    }.bind(this), 0)
}
for (i = 0, len = 2; i < len; i++) {
    pool.add(new Task())
}

pool.start()

