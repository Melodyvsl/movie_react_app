import React from 'react';
import { saveMovie } from '../servises/fakeMovieService';

const MovieForm = ({ match, history }) => {
  return (
    <div>
      <h1>MovieForm {match.params.id}</h1>
      <button className="btn btn-primary" onClick={() => history.push('/movies')}>
        Save
      </button>
    </div>
  );
};

export default MovieForm;

//az match baraye gereftane id estefade mishe chonmarbood be parametrhas az history baraye estefade az fn push estefade mishe ke mishe maro bargardone
//be safei ke mikhaym.inja ham mige ke idie filmi ke rosh clcik shode in hast va svae ro ke bezanim bar migardim be safeye movie
