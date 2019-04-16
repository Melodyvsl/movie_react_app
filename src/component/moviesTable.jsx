import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Like from './common/like';
import Table from './common/table';

//in page sakhte shod ta component movie tar tamiztar she va jaye in hame code faghat esme in component ro benevisim
// const x = <like></like> like component here is playing js object

class MoviesTable extends Component {
  columns = [
    {
      path: 'title',
      label: 'Table',
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>, //inja content ye property hast ke fn ro tarif mikone ke movie ro migire va ye link azash ijad mikone ke ba un url shenakhte mishe va rabt [eyda mikone be movie title...]yani kari mikone ke roye title mizanim id ro dar url baraye har movie namayesh mide
    },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like',
      content: movie => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />,
    }, //content:  movie => <Like liked ={movie.liked} onClick={() => this.props.onLike(movie)}/> //bekhatere in movie ro be parametr tabdilkardim chon dar gheyre in soorat mizane undefine//inja component key hokme ye js -obj dare pas mishe be onvane ye property dar fn ya jaye dge estefade she//content is a fn hich give a item(movie and return a react element(<like/>))
    {
      key: 'delete',
      content: movie => (
        <button onClick={() => this.props.onDelete(movie)} className="btn btn-danger btn-sm">
          Delete
        </button>
      ),
    }, //delete
  ]; //lazem nist state beshe chon gharar nist ke avaz beshe

  render() {
    const { movies, onSort, sortColumn } = this.props; //onDelete hamoon this.handleDelete hast ke baraye props kardan avazesh kardim chon ke ona joze movie component hast va injori ba fn refrences beheshon dastresi peyda mikonim// vaghti az fn component be class component taghir dadim bayad jaye props benevisim this.props chon inja dge parametr nist va khodesh dare props mishe az jaye dge
    return <Table columns={this.columns} data={movies} sortColumn={sortColumn} onSort={onSort} />;
  }
}

export default MoviesTable;
