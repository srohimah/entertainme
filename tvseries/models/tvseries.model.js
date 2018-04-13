const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tvSeriesSchema = new Schema({
  title:  String,
  overview: String,
  poster_path: String,
  popularity: String,
  tag: [],
  status: String
},{
  timestamps: true
});

const TVSeries = mongoose.model('TVSeries',tvSeriesSchema)
module.exports = TVSeries