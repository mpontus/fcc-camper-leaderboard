import React from 'react';
import classNames from 'classnames/bind';

export default React.createClass({
  render: function () {
    const classes = classNames({
      'sorted': this.props.sortColumn == this.props.column,
      'reverse': this.props.reverse
    });
    return <th onClick={() => this.props.sort(this.props.column)}>
      <span className={classes}>{this.props.children}</span>
    </th>
  }
});
