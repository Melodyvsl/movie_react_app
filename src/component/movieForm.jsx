import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getMovies, saveMovie, getMovie } from '../servises/fakeMovieService';
import { getGenres } from '../servises/fakeGenreService';

class MovieForm extends Form {
  state = {
    data: {
      title: '',
      genreId: '', //faghat id ro mikhaym na ham id ham name
      numberInStock: '',
      dailyRentalRate: '',
    },
    genres: [], //get our genres from our imaginary server???
    errors: {},
  };

  schema = {
    _id: Joi.string(), //in baraye chie???
    title: Joi.string()
      .required()
      .label('Title'),
    genreId: Joi.string()
      .required()
      .label('Genre'),
    numberInStock: Joi.string()
      .required()
      .min(0)
      .max(100)
      .label('Number in stock'),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label('Daily Rental Rate'),
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === 'new') return; //age movie jadid bood va nadashtim sari neshon bede

    const movie = getMovie(movieId); //age film jadid nabof ba et movie idie on film ro migirim va chek mikonim age vojod nadasht maro bebae be safeye not found
    if (!movie) return this.pops.history.replace('/not-found');
    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailytRentalRate,
    };
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push('/movies');
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number in Stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}
export default MovieForm;

//az match baraye gereftane id estefade mishe chonmarbood be parametrhas az history baraye estefade az fn push estefade mishe ke mishe maro bargardone
//be safei ke mikhaym.inja ham mige ke idie filmi ke rosh clcik shode in hast va svae ro ke bezanim bar migardim be safeye movie
