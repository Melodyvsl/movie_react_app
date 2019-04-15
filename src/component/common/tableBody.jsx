import React, { Component } from 'react';
import _ from 'lodash';

class TableBody extends Component {
  renderCell = (item, column) => (column.content ? column.content(item) : _.get(item, column.path));
  // if column.content is truthi we are going to call this as a fun and give it an argument and it would be item an give us a react elemnt
  //age halate bala nashod va nadashtim current item return mishe

  creatKey = (item, column) => {
    return item.id + column.path || column.key;
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={this.creatKey(item, column)}>{this.renderCell(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
