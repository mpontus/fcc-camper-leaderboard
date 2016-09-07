import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe("reducer", () => {
  it("handles SET_LEAERS", () => {
    const initialState = Map();
    const leaders = {
      period: 'recent',
      entries: ["foo", "bar", "baz"]
    }
    const action = {
      type: 'SET_LEADERS',
      period: leaders.period,
      entries: leaders.entries,
    };
    const nextState = reducer(initialState, action);
    expect(nextState.get('leaders')).to.equal(fromJS(leaders))
  });
})
