import React, { Component } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import FriendsForm from './FriendsForm';

class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      loaded: false,
    }
  }
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axiosWithAuth()
      .get('/friends')
      .then(res => {
        this.setState({
          friends: res.data,
          loaded: true
        });
      })
      .catch(err => console.log(err));
  };

  addFriend = newFriend => {
    axiosWithAuth()
      .post('/friends', newFriend)
      .then(res => {
        this.setState({
          friends: [...this.state.friends, newFriend]
        })
      })
      .catch(err => console.log(err))
  }

  deleteFriend = id => {
    axiosWithAuth()
      .delete(`/friends/${id}`, id)
      .then(res => {
        console.log(id)
        this.setState({
          friends: res.data
        })
      })
  }
  render() {
    return (
      <div>
        {this.state.loaded ?
          (
            this.state.friends.map((friend, index) => (
              <div key={index}>
                <p>Name: {friend.name}</p>
                <p>Age: {friend.age}</p>
                <p>Email: {friend.email}</p>
                <button onClick={() => this.deleteFriend(index)}>Delete Me</button>
              </div>
            ))
          )
          :
          <h1>Loading Friends...</h1>
        }
        <FriendsForm
          getData={this.getData}
          friends={this.state.friends}
          addFriend={this.addFriend}
        />
      </div>
    );
  }
}

export default FriendsList;