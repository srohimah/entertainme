const Movies = require ('../models/movies.model')

  const getAllMovie = async(req, res) => {
    try{
      const allMovie = await Movies.find()
        res.status(200).json({
          info: "movies found successfully",
          data: allMovie
        })
    } catch(err){
      res.status(500).json( {
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
        res.status(200).json({
          info: "new movie created",
          data: newmovie
        })
    } catch (err) {
      res.status(500).json( {
        info: "Something Went Wrong",
        error: err
      })
    }
  }

  const editMovie = async (req, res) => {
    try {
      const data = await Movies.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({
          info: 'Movie has been updated',
          data
        })
    } catch (err) {
      res.status(500).json({
        info: "Something Went Wrong",
        error: err
      })
    }
  }

  const deleteMovie =  async (req,res) => {
    try {
      const data = await Movies.findByIdAndRemove(req.params.id) 
      res.status(200).json({
        info: "movie has been deleted",
        data
      })
    } catch (err) {
      res.status(500).json({
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