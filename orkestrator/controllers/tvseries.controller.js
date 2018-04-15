const axios = require ('axios')
const redis = require ('redis')
const client = redis.createClient()
const url = 'http://localhost:3002/tvSeries'

module.exports = {
  addSeries: async(req, res)=> {
    try {
      const newSeries = await axios.post(url, {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity
      })
      client.get('entertainme', (error, reply) => {
        let entertainme = JSON.parse(reply)
        entertainme.series.data.push(newSeries.data.data)
        client.set('entertainme', JSON.stringify(entertainme), 'EX', 300)
        res.status(201).json(newSeries.data)
  })
    } catch (error) {
        res.status(500).json({ info: "an error occured while adding data" })
    }
  },
  updateSeries : async (req, res) => {
    try {
      const updatedSeries =  await axios.put(`${url}/${req.params.id}`,req.body)
      client.get('entertainme', function(err, reply) {
        let entertainme = JSON.parse(reply)
        let index = entertainme.series.data.findIndex( serie => serie._id===req.params.id)
        entertainme.series.data[index]= updatedSeries.data.data
        client.set('entertainme', JSON.stringify(entertainme), 'EX', 300)
        res.status(200).json(updatedSeries.data)
      })
    } catch (e) {
      res.status(500).json({info: "an error occured while updating data"})
    }
  },
  deleteSeries : async (req, res) => {
    try {
      const removeMovie = await axios.delete(`${url}/${req.params.id}`)
      client.get('entertainme', function(err, reply) {
        let entertainme = JSON.parse(reply)
        let newentertainme = entertainme.series.data.filter(serie => {
            return serie._id != req.params.id
        })
        entertainme.series.data = newentertainme
        client.set('entertainme', JSON.stringify(entertainme), 'EX', 300)
        res.status(200).json(removeMovie.data)
      })
    } catch (e) {
      res.status(500).json({info: "an error occured while deleting data"})
    }
  }

}