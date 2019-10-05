import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

class FriendsForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      newFriend: []
    }
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitFriend = e => {
    e.preventDefault()
    let newFriend = {
      name: this.state.name,
      age: this.state.age,
      email: this.state.email
    }
    this.props.addFriend(newFriend)
    this.setState({
      name: "",
      age: "",
      email: ""
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.submitFriend}>
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
          />
          <input
            type="text"
            name="age"
            onChange={this.handleChange}
            value={this.state.age}
          />
          <input
            type="email"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <button>Submit Info</button>
        </form>
      </div>
    )
  }
}

export default FriendsForm