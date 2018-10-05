import React from "react";
import { Row, Col } from "react-bootstrap";
import LazyLoad from "react-lazyload";
import MovieCard from "../MovieCard/MovieCard";
import LoaderComponent from "../Loader/Loader";

const styles = {
  movieColumn: {
    marginBottom: 20,
  },
};
const MovieListComponent = ({ movies, isLoading }) => {
  const movieColumns = movies
    ? movies.map(movie => (
        <Col
          style={styles.movieColumn}
          key={movie.id}
          xs={12}
          sm={4}
          md={3}
          lg={3}>
          <MovieCard movie={movie} />
        </Col>
      ))
    : null;

  return (
    <LazyLoad throttle={2000} height={400}>
      <Row>
        {movieColumns}
        <LoaderComponent isLoading={isLoading} />
      </Row>
    </LazyLoad>
  );
};

export default MovieListComponent;
