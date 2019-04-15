import React, { Component } from 'react';

//interface of new TableHeade component
//column:array
//sortColumn : obj
//onSort : fn

class TableHeader extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) sortColumn.order = (sortColumn.order = 'asc') ? 'desc' : 'asc';
    //age sotcolumn hamoni bod ke entekhab kardim lazeme ke orderesho taghir bedim va chek mikonim age orderesh asc hast baraksesh mikonim dar gheyre in soorat asc mimone
    else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    this.props.onSort(sortColumn); //?
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null; //age soton oni nist ke ma entekhab kardim hich kari bahash nakon
    if (sortColumn.order === 'asc') return <i className="fa fa-sort-asc" />; //age soton bar asase asc moratab shode bod flashe samte bala neshon bede
    return <i className="fa fa-sort-desc" />; // inja halate else if hast ke mige age soton halate asc nabod pas halate flesh be samte pain bashe
  };

  render() {
    return (
      <thead className="clickable">
        <tr>
          {this.props.columns.map(column => (
            <th key={column.path || column.key} onClick={() => this.raiseSort(column.path)}>
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
