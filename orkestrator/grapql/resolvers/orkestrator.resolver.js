const axios = require('axios')

const resolvers = {
  Query: {
    movies: async () => {
      try {
        const moviesData = await axios.get('http://localhost:3001/movies')
        return moviesData.data.data
      } catch (error) {
        return error
      }
    },
    tvseries: async () => {
      try {
        const seriesData = await axios.get('http://localhost:3002/tvSeries')
        return seriesData.data.data
      } catch (error) {
        return error
      }
    }
  },
  Mutation: {
    addMovie: async (_, { input }) => {
      try {
        const newMovie =  await axios.post('http://localhost:3001/movies',input)
        return newMovie.data.data
      } catch (error) {
        return error
      }
    }
  }
}
module.exports = resolvers