import React, { Component } from 'react';
import Pagination from './common/pagination';
import MoviesTable from './moviesTable';
import ListGroup from './common/listGroup';
import { getGenres } from '../servises/fakeGenreService';
import { paginate } from '../utils/paginate';
import { getMovies } from '../servises/fakeMovieService';
import _ from 'lodash'; //baraye sorting kardan//library baraye kar ba arayeha

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: 'title', order: 'asc' },
  };

  componentDidMount() {
    const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()]; // // //nemishod faghat name bezarim?
    this.setState({ movies: getMovies(), genres }); //bayad id dashte bashe chon dar list baraye har kodom az lista id tarif kardim pas barash ye id khali mizarim vagarna error mide
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 }); //inja baraye inke age allgenre ro bezanim va safehate mokhtalefesho baraye genraye mokhtalef hamsafeye dovom neshon mide ke khalie baraye hamin baraye baghie genra bayad bargardim be safeye aval ta neshon bede 3 ta filmesho
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn }); //avalesh faghat in bood  sortColumn: { path, order: 'asc'
  };

  getPageData = () => {
    const { pageSize, currentPage, selectedGenre, movies: allMovies, sortColumn } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id // inja ino neveshtim chon baraye allgenre id nadarim pas inja tarifesh kardim ke age id ha ham barabar nabod all movie ro be ma bede...age barabar bod filter kone
        ? allMovies.filter(m => m.genre._id == selectedGenre._id)
        : allMovies; // if selectedItem truthy filter kon oon filmai ke idishon ba idie selected item yekie dar gheyre in sorat kole fimlaro neshon bede

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]); //mige filtero begir bar asase titlesh ke dar path tarif shode be shekle asc orderesh kon

    const movies = paginate(sorted, currentPage, pageSize); // inja ham ye arraye jadid sakhtim ke etelaatesh paginate shode beshe va az fni ke dar paginate.js hast estefade kardim barash va dar bakhshaye dge ham in movies ro be onvane array estefade kardim
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies; //length = this.state.movies.length

    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p>There is no movies in the database.</p>;
    const { totalCount, data: movies } = this.getPageData();
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre} //yani genre ke roosh click shode beshe selctedGenremon va state bar asaseh taghir kone
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} movies in the database.</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            onLike={this.handleLike}
          />
          <Pagination
            itemsCount={totalCount} //tedade filma
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
