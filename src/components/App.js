import Header from './Header';
import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import PrivateRoute from './PrivateRoute';

import Login from './Login';
import Register from './Register';
import Settings from './Settings';
import AuthorityManagement from './AuthorityManagement';

@inject('userStore', 'commonStore')
@withRouter
@observer
export default class App extends React.Component {

  componentWillMount() {
    if (!this.props.commonStore.token) {
      this.props.commonStore.setAppLoaded();
    }
  }

  componentDidMount() {
    if (this.props.commonStore.token) {
      this.props.userStore.pullUser()
        .finally(() => this.props.commonStore.setAppLoaded());
    }
  }

  render() {
    if (this.props.commonStore.appLoaded) {
      return (
        <div>
          {/* <Header /> */}
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/authoritymanagement" component={AuthorityManagement} />
          </Switch>
        </div>
      );
    }
    return (
      <Header />
    );
  }
}
