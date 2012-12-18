var record_visit = function (req, res) {
    /* Connect to the DB and auth */
    require('mongodb').connect(mongourl, function (err, conn) {
        conn.collection('ips', function (err, coll) {
            /* Simple object to insert: ip address and date */
            object_to_insert = {
                'ip': req.connection.remoteAddress,
                'ts': new Date()
            }

            /* Insert the object then print in response */
            /* Note the _id has been created */
            coll.insert(object_to_insert, {
                safe: true
            },
            function (err) {
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                })
                res.write(JSON.stringify(object_to_insert))
                res.end('\n')
            })
        })
    })
}

