import React from 'react';
import classNames from 'classnames/bind';

export default React.createClass({
  render: function () {
    const spanClass = classNames({
      'sorted': this.props.sortColumn == this.props.column,
      'reverse': this.props.reverse
    });
    return <th onClick={() => this.sort(this.props.column)}>
      <span className={spanClass}>{this.props.children}</span>
    </th>
  }
});
