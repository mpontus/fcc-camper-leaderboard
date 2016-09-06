import React from 'react';
import {connect} from 'react-redux';

import * as actionCreators from '../action_creators';
import SortableColumn from './SortableColumn';

export const Leaderboard = React.createClass({
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

function mapStateToProps(state) {
  return {
    entries: state.getIn(['leaders', 'entries']),
    sortColumn: state.getIn(['sort', 'column']),
    reverse: state.getIn(['sort', 'reverse']),
  }
};

export const LeaderboardContainer = connect(
  mapStateToProps,
  actionCreators
)(Leaderboard);
