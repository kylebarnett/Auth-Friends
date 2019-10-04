import React, { Component } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      loaded: false
    }
  }
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axiosWithAuth()
      .get('/friends')
      .then(res => {
        console.log(res)
        this.setState({
          friends: res.data.map(friend => {
            return friend.name
          }),
          loaded: true
        });
      })
      .catch(err => console.log(err));
  };
  render() {
    console.log(this.state.friends)
    return (
      <div>
        {this.state.loaded ?
          (
            this.state.friends.map((friend, i) => (
              <p key={i}>{friend}</p>
            ))
          )
          :
          <h1>Loading Friends...</h1>
        }
      </div>
    );
  }
}

export default FriendsList;