const redis = require('redis')
const client = redis.createClient()

module.exports = { 
  checkEntertainmeCache (req, res, next) {
    client.get('entertain', function (err, reply){
      err && res.status(500).json({info: "OOps,,. error on Redis"})
      reply ? res.status(200).json(JSON.parse(reply)) : next()
    })
  }
}