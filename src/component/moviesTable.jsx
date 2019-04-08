import React, { Component } from 'react';
import Like from './common/like';
import TableHeader from './common/tableHeader';
import TableBody from './common/tableBody';

//in page sakhte shod ta component movie tar tamiztar she va jaye in hame code faghat esme in component ro benevisim
// const x = <like></like> like component here is playing js object

class MoviesTable extends Component {
  columns = [
    { path: 'title', label: 'Table' },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    { key: 'like', content: <Like /> }, //content:  movie => <Like liked ={movie.liked} onClick={() => this.props.onLike(movie)}/> //bekhatere in movie ro be parametr tabdilkardim chon dar gheyre in soorat mizane undefine
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
    const { movies, onDelete, onSort, sortColumn } = this.props; //onDelete hamoon this.handleDelete hast ke baraye props kardan avazesh kardim chon ke ona joze movie component hast va injori ba fn refrences beheshon dastresi peyda mikonim// vaghti az fn component be class component taghir dadim bayad jaye props benevisim this.props chon inja dge parametr nist va khodesh dare props mishe az jaye dge
    return (
      <table className="table">
        <TableHeader columns={this.columns} sortColumn={sortColumn} onSort={onSort} />
        <TableBody columns={this.columns} data={movies} />
        {/* <tbody>
          {movies.map(movie => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like liked ={movie.liked} onClick={() => onClick(movie)}/>
              </td>
              <td>
                <button onClick={() => onDelete(movie)} className="btn btn-danger btn-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody> */}
      </table>
    );
  }
}

export default MoviesTable;
