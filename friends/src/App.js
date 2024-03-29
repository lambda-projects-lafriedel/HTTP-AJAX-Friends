import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import styled from "styled-components";

import FriendsList from "./components/Friends/FriendsList";
import FriendForm from "./components/Friends/FriendForm";
import Navigation from "./components/Navigation/Navigation";

const AppWrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
`;

const DataWrapperDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FormWrapperDiv = styled.div`
display: flex;
justify-content: center;

width: 100%;
`;



class App extends Component {
  state = {
    friends: [],
    error: "",
    isUpdating: false,
    friend: {
      name: "",
      age: "",
      email: ""
    }
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/friends")
      .then(res => {
        this.setState({
           friends: res.data 
        }, console.log("CDM", res))
    })
      .catch(() => this.setState({ error: "There has been an error." }));
  }

  handleChange = e => {
    if (e.target.name === "age") {
        let numberValue = Number(e.target.value);

        this.setState({
            friend: {
                ...this.state.friend,
                [e.target.name]: numberValue
            }
        })
    } else {
        this.setState({
            friend: {
                ...this.state.friend,
                [e.target.name]: e.target.value
            }
        })
    }

}

  addFriendToList = () => {
    axios.post("http://localhost:5000/friends", this.state.friend)
    .then(res => {
      console.log("addFriendToList", res);
      this.setState({
        friends: res.data,
        friend: {
          name: "",
          age: "",
          email: ""
        }
      });
      this.props.history.push("/");
    })
    .catch(err => console.log(err))
  }

  updateFriendInfo = () => {
    axios.put(`http://localhost:5000/friends/${this.state.friend.id}`, this.state.friend)
    .then(res => {
      console.log("addFriendToList", res);
      this.setState({
        friends: res.data,
        friend: {
          name: "",
          age: "",
          email: ""
        },
        isUpdating: false
      });
      this.props.history.push("/");
    })
    .catch(err => console.log(err))
  }

  // updateStateWithNewData() {
  //   axios.get("http://localhost:5000/friends")
  //     .then(res => {
  //       this.setState({
  //         friends: res.data,
  //         error: ""
  //         },
  //         console.log("updateStateWithNewData", res)
  //       )
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       this.setState({
  //         error: "There has been an error."
  //       })
  //     });
  // }

  populateForm = (e, id) => {
    e.preventDefault();
    this.setState({
      isUpdating: true,
      friend: this.state.friends.find(friend => friend.id === id)
    });
    this.props.history.push("/form");
  }

  resetFormRoute = e => {
    e.preventDefault();
    if (this.state.isUpdating) {
      this.setState({
        isUpdating: false,
        friend: {
          name: "",
          age: "",
          email: ""
        }
      })
    }
    this.props.history.push("/");

  }

  deleteFriend = (e, id) => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/friends/${id}`)
      .then(res => {
        this.setState({
          friends: res.data
        });
        this.props.history.push("/");
      })
      .catch(err => console.log(err))
  }

  render() {
    console.log("render in App", this.state);
    return (
      <AppWrapperDiv>
        {this.state.error && `${this.state.error}`}
        <div>
          <Navigation isUpdating={this.state.isUpdating} />
        </div>

        <DataWrapperDiv>
          <div>
            <Route
              path="/"
              render={props => (
                <FriendsList {...props} friends={this.state.friends} populateForm={this.populateForm} deleteFriend={this.deleteFriend} />
              )}
            />
          </div>
          <FormWrapperDiv>
            <Route
              path="/form"
              render={props => <FriendForm {...props} addFriendToList={this.addFriendToList}
              updateFriendInfo={this.updateFriendInfo}
              friend={this.state.friend}
              handleChange={this.handleChange}
              isUpdating={this.state.isUpdating}
              resetFormRoute={this.resetFormRoute} />}
            />
          </FormWrapperDiv>
        </DataWrapperDiv>
      </AppWrapperDiv>
    );
  }
}

export default App;
