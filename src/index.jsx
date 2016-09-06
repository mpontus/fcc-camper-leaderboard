import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import $ from 'jquery';

import reducer from './reducer';
import {sort, setEntries} from './action_creators';
import {LeaderboardContainer} from './components/Leaderboard';

const store = createStore(reducer);

function subscribe () {
  let unsubscribe = store.subscribe(() => {
    const column = store.getState().getIn(['sort', 'column']);
    const sourceUrl = getSourceUrlForColumn(column);
    $.get(sourceUrl).done( data => {
      unsubscribe();
      try {
        store.dispatch(setEntries(data))
      } finally {
        subscribe();
      }
    });
  });
}
subscribe();

store.dispatch(sort('recent'));

function getSourceUrlForColumn(column) {
  switch (column) {
    case 'recent':
      return "https:fcctop100.herokuapp.com/api/fccusers/top/recent";
    case 'alltime':
      return "https:fcctop100.herokuapp.com/api/fccusers/top/alltime";
  };
  throw new Error("Unable to provide source url for invalid column");
}

ReactDOM.render(
  <Provider store={store}>
    <LeaderboardContainer />
  </Provider>,
  document.getElementById('app')
)


