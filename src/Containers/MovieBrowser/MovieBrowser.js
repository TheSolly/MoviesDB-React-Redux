import React from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";
import { AppBar } from "material-ui";
import TextField from "@material-ui/core/TextField";

import * as movieActions from "../../Actions/MovieBrowser";
import * as movieHelpers from "../../Helpers/MovieBrowser";
import * as scrollHelpers from "../../Helpers/Scroll";
import MovieList from "../../Components/MovieList/MovieList";
import MovieModal from "../../Components/MovieModal/MovieModal";

class MovieBrowser extends React.Component {
  state = {
    currentPage: 1,
    currentMovies: [],
  };

  componentDidMount() {
    window.onscroll = this.handleScroll;
    this.props.getTopMovies(this.state.currentPage);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const { topMovies } = this.props;
    if (!topMovies.isLoading) {
      const percentageScrolled = scrollHelpers.getPercentageScrolledDown(
        window
      );
      if (percentageScrolled > 0.8) {
        const nextPage = this.state.currentPage + 1;
        this.props.getTopMovies(nextPage);
        this.setState({ currentPage: nextPage });
      }
    }
  };

  handleSearch = searchWord => {
    const { movieSearch } = this.props;
    this.props.searchMovies(searchWord, this.state.currentPage);
    if (!movieSearch.isLoading) {
      if (movieSearch.response !== null) {
        const movies = movieHelpers.getMoviesList(movieSearch.response);
        this.setState({ currentMovies: [...movies] });
      }
    }
  };

  render() {
    const { topMovies, searchMovies } = this.props;
    var movies = movieHelpers.getMoviesList(topMovies.response);
    // if (this.state.currentMovies !== []) {
    //   movies = movieHelpers.getMoviesList(topMovies.response);
    // } else {
    //   movies = this.state.currentMovies;
    // }
    return (
      <div>
        <Header />
        <Grid style={{ marginTop: "84px" }}>
          <Row style={{ justifyContent: "center" }}>
            <SearchArea
              search={search => this.handleSearch(search.target.value)}
            />
          </Row>
          <Row>
            <MovieList movies={movies} isLoading={topMovies.isLoading} />
          </Row>
        </Grid>
        <MovieModal />
      </div>
    );
  }
}

const SearchArea = ({ search }) => {
  return (
    <TextField
      onChange={search}
      id="standard-search"
      label="Search field"
      type="search"
      margin="normal"
      style={{
        marginBottom: "42px",
      }}
    />
  );
};

const Header = () => {
  return (
    <AppBar
      title="MoviesDB"
      titleStyle={{
        color: "#1d2124",
        fontSize: "30",
      }}
      showMenuIconButton={false}
      style={{
        position: "fixed",
        top: 0,
        width: "-webkit-fill-available",
        backgroundColor: "#ced4da",
        textAlign: "center",
      }}
    />
  );
};

export default connect(
  // Map nodes in our state to a properties of our component
  state => ({
    topMovies: state.movieBrowser.topMovies,
    movieSearch: state.movieBrowser.movieSearch,
  }),
  // Map action creators to properties of our component
  { ...movieActions }
)(MovieBrowser);
