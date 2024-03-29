import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const FormWrapper = styled.div`
  min-width: 400px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormInput = styled.input`
  padding: 10px;
  border: 1px solid black;
  font-size: 1.6rem;
  margin-bottom: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  a {
      color: white;
  }
`;

const FormButton = styled.button`
cursor: pointer;
  margin-top: 15px;
  width: 48%;

  &:hover {
      background: green;
  }
`;

const CancelButton = styled(FormButton)`
&:hover {
    background: red;
}`;

const FriendForm = props => {
  function conditionalSubmit(e) {
    e.preventDefault();
    if (props.isUpdating) {
      props.updateFriendInfo();
    } else {
      props.addFriendToList();
    }
  }

  // constructor(props) {
  //     super(props);
  //     this.state = {
  //         friend: {
  //             name: "",
  //             age: "",
  //             email: ""
  //         }
  //     }
  // }

  // handleChange = e => {
  //     if (e.target.name === "age") {
  //         let numberValue = Number(e.target.value);

  //         this.setState({
  //             friend: {
  //                 ...this.state.friend,
  //                 [e.target.name]: numberValue
  //             }
  //         })
  //     } else {
  //         this.setState({
  //             friend: {
  //                 ...this.state.friend,
  //                 [e.target.name]: e.target.value
  //             }
  //         })
  //     }

  // }

  // addFriendToList = e => {
  //     e.preventDefault();
  //     this.props.addFriendToList(this.state.friend);
  //     this.setState({
  //         friend: {
  //             name: "",
  //             age: "",
  //             email: ""
  //         }
  //     }, console.log("addFriendToList in FriendForm", this.state))

  // }

  return (
    <FormWrapper>
      {/* <form onSubmit={this.addFriendToList}> */}
      <Form onSubmit={conditionalSubmit}>
        <FormInput
          type="text"
          value={props.friend.name}
          name="name"
          placeholder="Name"
          onChange={props.handleChange}
        />
        <FormInput
          type="number"
          value={props.friend.age}
          name="age"
          placeholder="Age"
          onChange={props.handleChange}
        />
        <FormInput
          type="email"
          value={props.friend.email}
          name="email"
          placeholder="Email"
          onChange={props.handleChange}
        />
        <ButtonWrapper>
          <FormButton type="submit">
            {props.isUpdating ? "Update Info" : "Add Friend"}
          </FormButton>
          
            <CancelButton onClick={e => props.resetFormRoute(e)}>Cancel</CancelButton>
          
        </ButtonWrapper>
      </Form>
    </FormWrapper>
  );
};

export default FriendForm;
