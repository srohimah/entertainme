const Movies = require ('../models/movies.model')

  const getAllMovie = async(req, res) => {
    try{
      const allMovie = await Movies.find()
        res.send(200, {
          info: "movies found successfully",
          length: allMovie.length,
          data: allMovie
        })
    } catch(err){
      res.send(500, {
        info: "Something Went Wrong",
        error: err
      })
    }
  }
  
  const addMovie = async(req, res) => {
    try {
      const newmovie = await Movies.create({
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
      })
        res.send(200,{
          info: "new movie created",
          data: newmovie
        })
    } catch (err) {
      res.send(500, {
        info: "Something Went Wrong",
        error: err
      })
    }
  }

  const editMovie = async (req, res) => {
    try {
      const data = await Movies.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).send({
          info: 'Movie has been updated',
          data
        })
    } catch (err) {
      res.status(500).send({
        info: "Something Went Wrong",
        error: err
      })
    }
  }

  const deleteMovie =  async (req,res) => {
    try {
      const data = await Movies.findByIdAndRemove(req.params.id) 
      res.status(200).send({
        info: "movie has been deleted",
        data
      })
    } catch (err) {
      res.status(500).send({
        info: err
      })
    } 
  }

module.exports = {
  getAllMovie,
  addMovie,
  editMovie,
  deleteMovie
}