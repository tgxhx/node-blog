var utils = {
  query(sql, connection, data) {
    return new Promise((resolve, reject) => {
      if (data) {
        connection.query(sql, data, (err, rows, fields) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
        })
      } else {
        connection.query(sql, (err, rows, fields) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
        })
      }
    })
  }
}

module.exports = utils