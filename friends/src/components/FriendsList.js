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
  render() {
    return (
      <div>
        {this.state.loaded ?
          (
            this.state.friends.map((friend, i) => (
              <div key={friend.id}>
                <p>Name: {friend.name}</p>
                <p>Age: {friend.age}</p>
                <p>Email: {friend.email}</p>
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