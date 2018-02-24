import React from 'react';
import moment from 'moment';

import '../../images/repo.svg';
import PullRequest from './PullRequest';
import '../../images/git-pull-request.svg';

import UserPhoto from './UserPhoto';
import { Comments } from './Comments';
import { Status } from './Status';

const CLASS_BASE = 'pull-request';
const CLASS_MERGEABLE = `${CLASS_BASE} ${CLASS_BASE}--mergeable`;

export default class PullRequestAssignee extends React.Component {

  formatRelativeTime(date) {
    return moment(date).fromNow();
  }

  formatTime(header, date) {
    return `${header} ${moment(date).format('MMMM Do YYYY, h:mm:ss a')}`;
  }

  render() {
    const assignee = this.props.PullRequestAssignee;
    const className = CLASS_BASE;

    return (
      <div className={className}>
        <UserPhoto size={50} user={assignee.user} />

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
