import React, {useState, useEffect} from 'react';
import {useNavigate}  from "react-router-dom";
import { useLocation } from 'react-router-dom';


function ChangeDetails(props) {

  const navigate = useNavigate();

  // in order to update user:

  // creating the updatedUser object:

  const [updatedUser, setUpdatedUser] = useState({
    userName: "",
    idNumber: "",
    password: "",
    currentAccount: ""
  });

  console.log(updatedUser);


  // in order to retrieve the data the was delivered from
  // UserPage.jsx:

  const location = useLocation();

  const [transferredUser, setTransferredUser] = useState(location.state.user);

  const userID = transferredUser.idNumber


  // updating the created newUser object:

  function handleUpdateUserChange(event) {
    const { name, value } = event.target;
    setUpdatedUser(prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }


  // delivering the updated data to the usersArray in App.jsx:

  function updateUser(){

    alert("Updating User Details")

    props.updateUserArray(updatedUser, userID);

    navigate('/')

  }


  // the HTML:

  return (<div className="container">
  <h1 className="SmartHome"> Our Bnak!</h1>
  <h1>Change User's Details</h1>
      <input name="userName" onChange={handleUpdateUserChange} placeholder="User Name"/>
      <input name="idNumber" onChange={handleUpdateUserChange} placeholder="ID Number"/>
      <input name="password" onChange={handleUpdateUserChange} placeholder="Password"/>
      <input name="currentAccount" onChange={handleUpdateUserChange} placeholder="Current Account"/>

      <button onClick={updateUser}>Update User Details</button>
  </div>);
}

export default ChangeDetails;
