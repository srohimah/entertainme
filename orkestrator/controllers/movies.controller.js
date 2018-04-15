const axios = require ('axios')
const redis = require ('redis')
const client = redis.createClient()
const url = 'http://localhost:3001/movies'

module.exports = {
  addMovie: async(req, res)=> {
    try {
      const newmovie = await axios.post(url, {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity
      })
      client.get('entertainme', (error, reply) => {
        let entertainme = JSON.parse(reply)
        entertainme.movies.data.push(newmovie.data.data)
        client.set('entertainme', JSON.stringify(entertainme), 'EX', 300)
        res.status(201).json(newmovie.data)
  })
    } catch (error) {
        res.status(500).json({ info: "an error occured while adding data" })
    }
  },
  updateMovie : async (req, res) => {
    try {
      const updateMovie =  await axios.put(`${url}/${req.params.id}`,req.body)
      client.get('entertainme', function(err, reply) {
        let entertainme = JSON.parse(reply)
        let index = entertainme.movies.data.findIndex( movie => movie._id===req.params.id)
        entertainme.movies.data[index]= updateMovie.data.data
        client.set('entertainme', JSON.stringify(entertainme), 'EX', 300)
        res.status(200).json(updateMovie.data)
      })
    } catch (e) {
      res.status(500).json({info: "an error occured while updating data"})
    }
  },
  deleteMovie : async (req, res) => {
    try {
      const removeMovie = await axios.delete(`${url}/${req.params.id}`)
      client.get('entertainme', function(err, reply) {
        let entertainme = JSON.parse(reply)
        let newentertainme = entertainme.movies.data.filter(ent => {
            return ent._id != req.params.id
        })
        entertainme.movies.data = newentertainme
        client.set('entertainme', JSON.stringify(entertainme), 'EX', 300)
        res.status(200).json(removeMovie.data)
      })
    } catch (e) {
      res.status(500).json({info: "an error occured while deleting data"})
    }
  }

}