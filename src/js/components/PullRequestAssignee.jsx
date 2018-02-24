import React from 'react';
import moment from 'moment';

import '../../images/repo.svg';
import PullRequest from './PullRequest';
import '../../images/git-pull-request.svg';

import UserPhoto from './UserPhoto';

const ASSIGNEE_CLASS = 'assignee';


export default class PullRequestAssignee extends React.Component {

  formatRelativeTime(date) {
    return moment(date).fromNow();
  }

  formatTime(header, date) {
    return `${header} ${moment(date).format('MMMM Do YYYY, h:mm:ss a')}`;
  }

  render() {
    const assignee = this.props.PullRequestAssignee;
    const className = ASSIGNEE_CLASS;

    return (
      <div className={className}>
          <div className="assignee-info">
              <UserPhoto size={50} user={assignee.user}/>
              <div className="assignee-info-1">
                  <b>{assignee.user.username}:  </b>
                  <b>Number of pull requests waiting: {assignee.prs.length}</b>
              </div>
          </div>


          {assignee.prs.map(pr =>
              <div key={pr.id}>
                  <PullRequest key={pr.id} pullRequest={pr} />
              </div>
          )}

      </div>
    );
  }
}

PullRequestAssignee.propTypes = {
    PullRequestAssignee: React.PropTypes.object.isRequired
};
