/* eslint max-len: 0 */
import React from 'react';
import {
    Switch,
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';
import PropTypes from 'prop-types';
// import 'react-s-alert/dist/s-alert-default.css';
// import 'react-s-alert/dist/s-alert-css-effects/scale.css';
// import '../css/react-bootstrap-table.css';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import AllUsers from './AllUsers';

class AuthorityManagement extends React.Component {

  static propTypes = {
    children: PropTypes.node
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const examples = [
    {
      text: 'A complex demo',
      href: 'complex'
    }];

    const exampleMenuItems = examples.map((item) => {
      return (
        <li key={ item.href }>
          <a href={ `#/examples/${item.href}` }>{ item.text }</a>
        </li>
      );
    });
    return (
    <Router> 
      <div>
        <nav className='navbar navbar-inverse'>
          <div className='container-fluid'>
            <div className='navbar-header'>
              <a className='navbar-brand'>权限管理</a>
            </div>
            <div className='collapse navbar-collapse'>
              <ul className='nav navbar-nav'>
                <li>
                  {/* <a href='#/getting-started'>Getting Started</a> */}
                  <Link to="/allusers">所有用户</Link>
                </li>
                <li>
                  <a href='https://github.com/AllenFang/react-bootstrap-table'>Github</a>
                </li>
                <li className='dropdown'>
                  <a href='#' className='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>Examples <span className='caret'></span></a>
                  <ul className='dropdown-menu'>
                    { exampleMenuItems }
                  </ul>
                </li>
              </ul>

              <Switch>
              {/* <Route path="#/authoritymanagement/allusers" component={AllUsers}/> */}
              <Route path="/allusers" component={AllUsers}/>
              </Switch>
            </div>
          </div>
        </nav>
        {/* <Grid fluid>
          <Row>
            <Col md={ 12 }>
              { this.props.children }
            </Col>
          </Row>
        </Grid> */}
      </div>
      </Router>
    );
  }
}

export default AuthorityManagement;
