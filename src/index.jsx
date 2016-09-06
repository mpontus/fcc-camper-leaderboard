import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import $ from 'jquery';

import reducer from './reducer';
import {sort, setLeaders} from './action_creators';
import {LeaderboardContainer} from './components/Leaderboard';

require('./stylesheet.scss');

const store = createStore(reducer);

store.subscribe(() => {
  const state = store.getState();
  const sortedColumn = state.getIn(['sort', 'column']);
  const currentPeriod = state.getIn(['leaders', 'period']);
  if (sortedColumn !== currentPeriod) {
    const sourceUrl = getSourceUrlForPeriod(sortedColumn);
    $.get(sourceUrl).done( data =>
      store.dispatch(setLeaders(sortedColumn, data)));
  }
  return state;
});

store.dispatch(sort('recent'));

function getSourceUrlForPeriod(period) {
  switch (period) {
    case 'recent':
      return "https:fcctop100.herokuapp.com/api/fccusers/top/recent";
    case 'alltime':
      return "https:fcctop100.herokuapp.com/api/fccusers/top/alltime";
  };
  throw new Error("Unable to provide source url for invalid period");
}

ReactDOM.render(
  <Provider store={store}>
    <LeaderboardContainer />
  </Provider>,
  document.getElementById('app')
)


