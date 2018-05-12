import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import { inject, observer } from 'mobx-react';
import Header from './Header';

@inject('authStore')
@observer
export default class Register extends React.Component {

  componentWillUnmount() {
    this.props.authStore.reset();
  }

  handleUsernameChange = e => this.props.authStore.setUsername(e.target.value);
  handlePasswordChange = e => this.props.authStore.setPassword(e.target.value);
  handleSubmitForm = (e) => {
    e.preventDefault();
    this.props.authStore.register()
      .then(() => this.props.history.replace('/'));
  };

  render() {
    const { values, errors, inProgress } = this.props.authStore;

    return (
      <div>
        <Header />
        <div className="auth-page">
          <div className="container page">
            <div className="row">

              <div className="col-md-6 offset-md-3 col-xs-12">
                <h1 className="text-xs-center">注册</h1>
                <p className="text-xs-center">
                  <Link to='/'>
                    已经有账号了?
                </Link>
                </p>

                <ListErrors errors={errors} />

                <form onSubmit={this.handleSubmitForm}>
                  <fieldset>

                    <fieldset className="form-group">
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="用户名"
                        value={values.username}
                        onChange={this.handleUsernameChange}
                      />
                    </fieldset>

                    <fieldset className="form-group">
                      <input
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="密码"
                        value={values.password}
                        onChange={this.handlePasswordChange}
                      />
                    </fieldset>

                    <button
                      className="btn btn-lg btn-primary pull-xs-right"
                      type="submit"
                      disabled={inProgress}
                    >
                      确认
                  </button>

                  </fieldset>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
