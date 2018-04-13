const TvSeries = require ('../models/tvseries.model')

  const getAllTvSeries = async(req, res) => {
    try{
      const allTvSeries = await TvSeries.find()
        res.send(200, {
          info: "tv found successfully",
          data: allTvSeries
        })
    } catch(err){
      res.send(500, {
        info: "Something Went Wrong",
        error: err
      })
    }
  }
  
  const addTvSeries = async(req, res) => {
    try {
      const newTvSeries = await TvSeries.create({
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
      })
        res.send(200,{
          info: "new tv created",
          data: newTvSeries
        })
    } catch (err) {
      res.send(500, {
        info: "Something Went Wrong",
        error: err
      })
    }
  }

  const editTvSeries = async (req, res) => {
    try {
      const data = await TvSeries.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).send({
          info: 'tv has been updated',
          data
        })
    } catch (err) {
      res.status(500).send({
        info: "Something Went Wrong",
        error: err
      })
    }
  }

  const deleteTvSeries =  async (req,res) => {
    try {
      const data = await TvSeries.findByIdAndRemove(req.params.id) 
      res.status(200).send({
        info: "tv has been deleted",
        data
      })
    } catch (err) {
      res.status(500).send({
        info: err
      })
    } 
  }

module.exports = {
  getAllTvSeries,
  addTvSeries,
  editTvSeries,
  deleteTvSeries
}