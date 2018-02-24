import React from 'react';
import { connect } from 'react-redux';

import PullRequestAssignee from './PullRequestAssignee';
import LoadingOverlay from './LoadingOverlay';
import ErrorMessage from './ErrorMessage';
import Toolbar from './Toolbar';
import Footer from './Footer';
import _ from 'lodash';

class Main extends React.Component {

  renderLoading() {
    if (this.props.loading) {
      return (
        <LoadingOverlay />
      );
    }
    return <div></div>;
  }

  renderFailedRepos() {
    return (
      <div>
        {this.props.failedRepos.map(failedRepo =>
          <ErrorMessage
            key={failedRepo}
            message={`Failed to load pull request data for ${failedRepo}.`}
          />
        )}
      </div>
    );
  }

  renderBody() {
    if (this.props.error) {
      return <ErrorMessage message={this.props.error} />;
    }

    return (
      <div>
        {this.renderFailedRepos()}
        {this.renderLoading()}
        {this.renderPullRequest()}
      </div>
    );
  }

    renderPullRequest() {
      let users = {};
      let prs = {};
      //
       _.each(this.props.pullRequests,pr => {

           _.each(pr.assignees, assignee => {
                if (!users[assignee.username]){
                    users[assignee.username] = assignee;
                    prs[assignee.username] = []
                }
               prs[assignee.username].push(pr);
            });
        });
        users = _.chain(users).values().flatten().value();
        // return  .map(prs,pr =>
        return _.map(users, user =>
        // const usrPrs = _.values(prs);
        // let i = 0;
        // return usrPrs.map(pr =>
            <div key={user.id}>
                <PullRequestAssignee key={user.id} PullRequestAssignee={{user: user, prs: prs[user.username]}}/>

            </div>
        );
    }

    render() {
    return (
      <div className="container">
        <div className="container-header">
          <h1>{this.props.title}</h1>
          <div id="pr-count" title={`${this.props.pullRequests.length} pull requests`}>
            <img role="presentation" src="images/git-pull-request.svg" />
            &nbsp;
            {this.props.pullRequests.length}
          </div>
          <div id="repo-count" title={`${this.props.repos.length} repositories`}>
            <img role="presentation" src="images/repo.svg" />
            &nbsp;
            {this.props.repos.length}
          </div>
        </div>
        <Toolbar failedRepos={this.props.failedRepos} />
        {this.renderBody()}
        <Footer />
      </div>
    );
  }
}

Main.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  pullRequests: React.PropTypes.array.isRequired,
  repos: React.PropTypes.array.isRequired,
  title: React.PropTypes.string.isRequired,
  failedRepos: React.PropTypes.array.isRequired,
  error: React.PropTypes.string.isRequired
};

export default connect(state => state)(Main);
