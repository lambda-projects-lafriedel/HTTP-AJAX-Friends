import React from 'react';

const FriendDetails = props => {
    // let details = props.friend.match.params.id;
    console.log("FriendDetails props", props)
    return (
        <div>
            {props.friend.age}
            {props.friend.email}
            <button onClick={(e) => props.populateForm(e, props.friend.id)}>Update Info</button>
            <button onClick={(e) =>props.deleteFriend(e, props.friend.id)}>Delete Friend</button>
        </div>
    )
}

export default FriendDetails;