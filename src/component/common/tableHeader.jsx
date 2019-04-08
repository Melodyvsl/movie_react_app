import React, { Component } from 'react';

//interface of new TableHeade component
//column:array
//sortColumn : obj
//onSort : fn

class TableHeader extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path == path) sortColumn.order = (sortColumn.order = 'asc') ? 'desc' : 'asc';
    //age sotcolumn hamoni bod ke entekhab kardim lazeme ke orderesho taghir bedim va chek mikonim age orderesh asc hast baraksesh mikonim dar gheyre in soorat asc mimone
    else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    this.props.onSort(sortColumn); //?
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th key={column.path || column.key} onClick={() => this.raiseSort(column.path)}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
