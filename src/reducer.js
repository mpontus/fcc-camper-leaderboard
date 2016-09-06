import {Map} from 'immutable';

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
  return state.set('entries', {period, entries});
}

export default function (state = Map(), action) {
  switch(action.type) {
    case 'SORT':
      return state.update('sort', Map(), state => sort(state, action.column));
    case 'SET_LEADERS':
      return setLeaders(state, action.period, action.entries);
  }
}
