import React from 'react';
import { NavLink } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      credentials: {
        username: "",
        password: ""
      }
    }
  }
  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/login', this.state.credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        this.props.history.push('/friends');
      })
      .catch(err => console.log(err));
    this.setState({
      credentials: {
        username: "",
        password: ""
      }
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Username"
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>Login</button>
        </form>
        <NavLink to="/">Welcome Page!</NavLink>
      </div>
    )
  }
}

export default Login