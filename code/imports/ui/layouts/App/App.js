/* eslint-disable jsx-a11y/no-href */

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import Navigation from '../../components/Navigation/Navigation';
import Authenticated from '../../components/Authenticated/Authenticated';
import Public from '../../components/Public/Public';
import Index from '../../pages/Index/Index';
import Documents from '../../pages/Documents/Documents';
import NewDocument from '../../pages/NewDocument/NewDocument';
import ViewDocument from '../../pages/ViewDocument/ViewDocument';
import EditDocument from '../../pages/EditDocument/EditDocument';
import Signup from '../../pages/Signup/Signup';
import Login from '../../pages/Login/Login';
import Logout from '../../pages/Logout/Logout';
import VerifyEmail from '../../pages/VerifyEmail/VerifyEmail';
import RecoverPassword from '../../pages/RecoverPassword/RecoverPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import Profile from '../../pages/Profile/Profile';
import NotFound from '../../pages/NotFound/NotFound';
import Footer from '../../components/Footer/Footer';
import Terms from '../../pages/Terms/Terms';
import Privacy from '../../pages/Privacy/Privacy';
import ExamplePage from '../../pages/ExamplePage/ExamplePage';
import VerifyEmailAlert from '../../components/VerifyEmailAlert/VerifyEmailAlert';
import getUserName from '../../../modules/get-user-name';
import { onLogin, onLogout } from '../../../modules/redux/actions';

if (Meteor.isClient) import './App.scss';

class App extends React.Component {
  componentDidMount() {
    const { handleOnLogin, handleOnLogout } = this.props;
    Accounts.onLogin(() => handleOnLogin());
    Accounts.onLogout(() => handleOnLogout());
  }

  render() {
    const { props } = this;
    return (
      <div className="App">
        {props.authenticated ?
          <VerifyEmailAlert
            userId={props.userId}
            emailVerified={props.emailVerified}
            emailAddress={props.emailAddress}
          />
          : ''}
        <Navigation {...props} />
        <Grid>
          <Switch>
            <Route exact name="index" path="/" component={Index} />
            <Authenticated exact path="/documents" component={Documents} {...props} />
            <Authenticated exact path="/documents/new" component={NewDocument} {...props} />
            <Route exact path="/documents/:_id" component={ViewDocument} {...props} />
            <Authenticated exact path="/documents/:_id/edit" component={EditDocument} {...props} />
            <Authenticated exact path="/profile" component={Profile} {...props} />
            <Public path="/signup" component={Signup} {...props} />
            <Public path="/login" component={Login} {...props} />
            <Route path="/logout" component={Logout} {...props} />
            <Route name="verify-email" path="/verify-email/:token" component={VerifyEmail} />
            <Route name="recover-password" path="/recover-password" component={RecoverPassword} />
            <Route name="reset-password" path="/reset-password/:token" component={ResetPassword} />
            <Route name="terms" path="/terms" component={Terms} />
            <Route name="privacy" path="/privacy" component={Privacy} />
            <Route name="examplePage" path="/example-page" component={ExamplePage} />
            <Route component={NotFound} />
          </Switch>
        </Grid>
        <Footer />
      </div>
    );
  }
}

App.defaultProps = {
  userId: '',
  emailAddress: '',
};

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  userId: PropTypes.string,
  emailAddress: PropTypes.string,
  emailVerified: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({
  handleOnLogin: data => dispatch(onLogin(data)),
  handleOnLogout: data => dispatch(onLogout(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
