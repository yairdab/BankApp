import React, {useState, useEffect} from 'react';
import {useNavigate}  from "react-router-dom";


function SignUp(props) {

  const navigate = useNavigate();

// in order to create new user:

  // creating the newUser object:

  const [newUser, setNewUser] = useState({
    userName: "",
    idNumber: "",
    password: "",
    currentAccount: "",
    expenses:[]
  });

  console.log(newUser);

    // updating the created newUser object:

  function handleNewUserChange(event) {
    const { name, value } = event.target;
    setNewUser(prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  // ------------------------------------------------------------------------
  // crearing the usersArray in order to store the users' objects:

    // to be saved in App.jsx so the data won't be lost after page refresh
    // and will be redirected later to signIn:

    // const [usersArray, setUsersArray] = useState([]);

  // ------------------------------------------------------------------------

  // delivering the newUser data to the usersArray in App.jsx:

  function addNewUser(){

    if(newUser.userName.length < 1){
      window.alert("User's name is too short!");
      return;
    }

    if(newUser.idNumber.length < 9){
      window.alert("User's id number is too short!");
      return;
    }

    if(isNaN(newUser.idNumber)){
      window.alert("User's id number is not a number!");
      return;
    }


    const filteredList = props.usersArray.filter(user => {return user.idNumber == newUser.idNumber});

    if (filteredList.length > 0) {
    window.alert("User is already exists with that ID");
    return;
    }

    props.saveNewUser(newUser);
    navigate('/')

  }


  // the HTML:

  return (<div className="container">
  <h1 className="SmartHome"> Our Garage!</h1>
  <h1>Create New User</h1>
      <input type="text" name="userName" onChange={handleNewUserChange} placeholder="User Name"/>
      <input type="number" name="idNumber" onChange={handleNewUserChange} placeholder="ID Number"/>
      <input name="password" onChange={handleNewUserChange} placeholder="Password"/>
      <input name="currentAccount" onChange={handleNewUserChange} placeholder="Current Account"/>

      <button onClick={addNewUser}>Create New User</button>
  </div>);
}

export default SignUp;
