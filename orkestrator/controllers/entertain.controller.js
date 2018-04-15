const axios = require ('axios')
const redis = require ('redis')
const client = redis.createClient()
const getEntertains = async(req, res) => {
  try{
    const dataMovie = await axios.get('http://localhost:3001/movies')
    const dataTv = await axios.get('http://localhost:3002/tvSeries')
    const data = {movies : dataMovie.data, series : dataTv.data}
    client.set('entertainme', JSON.stringify(data), 'EX', 300)
    res.json(data)
    } catch(err){
      res.status(500).json({ info: "an error occured while getting data" })
    }
  }
  
module.exports = {
  getEntertains
}