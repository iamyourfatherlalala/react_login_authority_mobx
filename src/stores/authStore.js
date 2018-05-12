import { observable, action } from 'mobx';
import { jwt } from 'jsonwebtoken';
import agent from '../agent';
import userStore from './userStore';
import commonStore from './commonStore';

class AuthStore {
  @observable inProgress = false;
  @observable errors = undefined;

  @observable values = {
    username: '',
    password: '',
  };

  @action setUsername(username) {
    this.values.username = username;
  }

  @action setPassword(password) {
    this.values.password = password;
  }

  @action reset() {
    this.values.username = '';
    this.values.password = '';
  }

  @action login() {
    let proxyurl = "https://cors-anywhere.herokuapp.com/";  // could add Headers instead
    let url = `http://yangjh.abc6.net:8325/simple/login?usr=${this.values.username}&psw=${this.values.password}`;
    this.inProgress = true;
    this.errors = undefined;

    // return agent.Auth.login(this.values.username, this.values.password)
    //   .then(({ user }) => commonStore.setToken(user.token))
    //   .then(() => userStore.pullUser())
    //   .catch(action((err) => {
    //     this.errors = err.response && err.response.body && err.response.body.errors;
    //     throw err;
    //   }))
    //   .finally(action(() => { this.inProgress = false; }));

    return fetch((proxyurl + url), {
      method: 'POST',
    })

      .then((response) => {
        response.json().then((data) => {
          // var decoded = jwt.decode(data);
          // console.log(decoded);
          console.log(data);
        });
      })
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        throw err;
      }));

  }

  @action register() {
    this.inProgress = true;
    this.errors = undefined;
    return agent.Auth.register(this.values.username, this.values.password)
      .then(({ user }) => commonStore.setToken(user.token))
      .then(() => userStore.pullUser())
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }

  @action logout() {
    commonStore.setToken(undefined);
    userStore.forgetUser();
    return Promise.resolve();
  }
}

export default new AuthStore();
