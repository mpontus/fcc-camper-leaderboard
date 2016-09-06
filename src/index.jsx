import {Map} from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import classNames from 'classnames/bind';
import $ from 'jquery';

require('./stylesheet.scss');

function sort(state, column) {
  if (state.get('column') === column) {
    const reverse = state.get('reverse');
    return state.set('reverse', !reverse);
  }
  return state.merge({
    column,
    reverse: false
  });
};

function setLeaders(state, period, entries) {
  return state.set('leaders', Map({period, entries}));
}

function reducer (state = Map(), action) {
  switch(action.type) {
    case 'SORT':
      return state.update('sort', Map(), state => sort(state, action.column));
    case 'SET_LEADERS':
      return setLeaders(state, action.period, action.entries);
  }
  return state;
}

const store = createStore(reducer);

store.subscribe(() => {
  const state = store.getState();
  const period = state.getIn(['sort', 'column']);
  const currentPeriod = state.getIn(['leaders', 'period']);
  if (period !== currentPeriod) {
    const sourceUrl = getSourceUrlForPeriod(period);
    $.get(sourceUrl).done( entries =>
      store.dispatch({type: 'SET_LEADERS', period, entries}));
  }
  return state;
});

store.dispatch({ type: 'SORT', column: 'recent' });

function getSourceUrlForPeriod(period) {
  switch (period) {
    case 'recent':
      return "https:fcctop100.herokuapp.com/api/fccusers/top/recent";
    case 'alltime':
      return "https:fcctop100.herokuapp.com/api/fccusers/top/alltime";
  };
  throw new Error("Unable to provide source url for invalid period");
}

const Leaderboard = React.createClass({
  render: function () {
    return <table className="leaderboard">
      <thead>
        <tr>
          <th>#</th>
          <th>Camper Name</th>
          <SortableColumn column='recent' {...this.props}>
            Points in last 30 days
          </SortableColumn>
          <SortableColumn column='alltime' {...this.props}>
            All time points
          </SortableColumn>
        </tr>
      </thead>
      <tbody>
        {this.props.entries &&
         (this.props.reverse
         ? this.props.entries.reverse()
         : this.props.entries).map((entry, idx) =>
           <tr key={entry.username}>
             <td className="text-center">{idx+1}</td>
             <td>
               <a href={`https://www.freecodecamp.com/${entry.username}`}>
                 <img className="avatar" src={entry.img} />
                 <span className="username">{entry.username}</span>
               </a>
             </td>
             <td className="text-center">{entry.recent}</td>
             <td className="text-center">{entry.alltime}</td>
           </tr>
         )}
      </tbody>
    </table>;
  }
});

const SortableColumn = React.createClass({
  render: function () {
    const classes = classNames({
      'sorted': this.props.sortColumn == this.props.column,
      'reverse': this.props.reverse
    });
    return <th className="sortable" onClick={() => this.props.sort(this.props.column)}>
      <span className={classes}>{this.props.children}</span>
    </th>
  }
});

function mapStateToProps(state) {
  return {
    entries: state.getIn(['leaders', 'entries']),
    sortColumn: state.getIn(['sort', 'column']),
    reverse: state.getIn(['sort', 'reverse']),
  }
};

const LeaderboardContainer = connect(
  mapStateToProps,
  {
    sort: (column) => {
      return { type: 'SORT', column }
    },
  }
)(Leaderboard);

ReactDOM.render(
  <Provider store={store}>
    <LeaderboardContainer />
  </Provider>,
  document.getElementById('app')
)
