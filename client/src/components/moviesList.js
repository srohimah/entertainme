import React, { Component } from 'react';
import {Query} from 'react-apollo'
import gql from 'graphql-tag'

export default class MoviesList extends Component {
  render() {
    return (
      <div>
        <Query query={gql`
        {
          movies{
            title
            poster_path
            overview
          }
        }
        `}
        >
        {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return data.movies.map((movie, index) => (
          <div key={`movie${index}`}>
            <p>{movie.overview}</p>
          </div>
        ));
      }}
        </Query>
      </div>
    )
  }
};
