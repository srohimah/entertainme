const axios = require ('axios')
const getEntertains = async(req, res) => {
  try{
    const dataMovie = await axios.get('http://localhost:3001/movies')
    const dataTv = await axios.get('http://localhost:3002/tvSeries')
    const data = {movies : dataMovie.data, series : dataTv.data}
    res.send(data)
    } catch(err){
      res.status(500).json({ info: "Something Went Wrong" })
    }
  }
  
module.exports = {
  getEntertains
}