import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import validator from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { registerAction } from 'store/actions/auth';

import bg from 'assets/images/loginbg.png';
import bg1 from 'assets/images/loginbg2.png';
import logo from 'assets/images/logo.svg';
import loader from 'assets/images/loader.svg';

import './style.scss';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      name: '',
      email: '',
      password: '',
      organizationName: '',
      jobTitle: '',
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onChangeField = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    try {
      const {
        firstName,
        lastName,
        name,
        email,
        password,
        organizationName,
        jobTitle,
      } = this.state;
      const { history, register } = this.props;

      await register({
        first_name: firstName,
        last_name: lastName,
        name,
        email,
        password,
        organization_name: organizationName,
        job_title: jobTitle,
      });

      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  isDisabled = () => {
    const {
      firstName,
      lastName,
      name,
      email,
      password,
      organizationName,
      jobTitle,
    } = this.state;

    return validator.isEmpty(firstName)
      || validator.isEmpty(lastName)
      || validator.isEmpty(name)
      || !validator.isEmail(email)
      || validator.isEmpty(password)
      || validator.isEmpty(organizationName)
      || validator.isEmpty(jobTitle);
  }

  renderError = () => {
    const { error } = this.props;
    if (error && typeof error === 'object' && error.errors && error.errors.length > 0) {
      return (
        <p className="error-msg alert alert-danger" role="alert">
          {error.errors[0]}
        </p>
      );
    }
  };

  render() {
    const {
      firstName,
      lastName,
      name,
      email,
      password,
      organizationName,
      jobTitle,
    } = this.state;
    const { isLoading } = this.props;

    return (
      <div className="auth-page">
        <img className="auth-header-logo" src={logo} alt="" />

        <div className="auth-container">
          <h1 className="auth-title">Register to Curriki Studio</h1>
          <h2 className="auth-subtitle">Powering the creation of the world’s most immersive learn experiences</h2>
          <h3 className="auth-description">
            CurrikiStudio is changing the way learning experiences are
            designed, created, and delivered to a new generation of learners.
          </h3>

          <form
            onSubmit={this.onSubmit}
            autoComplete="off"
            className="auth-form"
          >
            <div className="form-group d-flex">
              <div className="input-wrapper">
                <FontAwesomeIcon icon="user" />
                <input
                  autoFocus
                  className="input-box"
                  type="text"
                  name="firstName"
                  placeholder="First Name*"
                  value={firstName}
                  onChange={this.onChangeField}
                />
              </div>

              <div className="input-wrapper">
                <FontAwesomeIcon icon="user" />
                <input
                  autoFocus
                  className="input-box"
                  type="text"
                  name="lastName"
                  placeholder="Last Name*"
                  value={lastName}
                  onChange={this.onChangeField}
                />
              </div>
            </div>

            <div className="form-group">
              <FontAwesomeIcon icon="user" />
              <input
                autoFocus
                className="input-box"
                type="text"
                name="name"
                placeholder="Username*"
                value={name}
                onChange={this.onChangeField}
              />
            </div>

            <div className="form-group">
              <FontAwesomeIcon icon="user" />
              <input
                autoFocus
                className="input-box"
                type="email"
                name="email"
                placeholder="Email*"
                value={email}
                onChange={this.onChangeField}
              />
            </div>

            <div className="form-group">
              <FontAwesomeIcon icon="lock" />
              <input
                className="password-box"
                type="password"
                name="password"
                placeholder="Password*"
                value={password}
                onChange={this.onChangeField}
              />
            </div>

            <div className="form-group d-flex">
              <div className="input-wrapper">
                <FontAwesomeIcon icon="user" />
                <input
                  autoFocus
                  className="input-box"
                  type="text"
                  name="organizationName"
                  placeholder="Organization Name*"
                  value={organizationName}
                  onChange={this.onChangeField}
                />
              </div>

              <div className="input-wrapper">
                <FontAwesomeIcon icon="user" />
                <input
                  autoFocus
                  className="input-box"
                  type="text"
                  name="jobTitle"
                  placeholder="Job Title*"
                  value={jobTitle}
                  onChange={this.onChangeField}
                />
              </div>
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary login-submit"
                disabled={isLoading || this.isDisabled()}
              >
                {isLoading ? (
                  <img src={loader} alt="" />
                ) : (
                  'Register'
                )}
              </button>
            </div>

            {this.renderError()}

            <div className="form-group text-center">
              Already have an account?
              {' '}
              <Link to="/login">Login</Link>
            </div>
          </form>
        </div>

        <img src={bg} className="bg1" alt="" />
        <img src={bg1} className="bg2" alt="" />
      </div>
    );
  }
}

RegisterPage.propTypes = {
  history: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  register: PropTypes.func.isRequired,
};

RegisterPage.defaultProps = {
  error: null,
};

const mapDispatchToProps = (dispatch) => ({
  register: (data) => dispatch(registerAction(data)),
});

const mapStateToProps = (state) => ({
  isLoading: state.auth.isSigningUp,
  error: state.auth.error,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RegisterPage),
);
