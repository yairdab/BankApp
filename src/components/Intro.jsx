import React, {useState} from 'react';
import {useNavigate}  from "react-router-dom";

import Footer from "./Footer"



function Intro(props) {

  // in order to redirect to other pages:

  const navigate = useNavigate();

  const redirectToSignUp = () => {
    navigate('/signUp')
    }

    // in order to varify if a user is indeed exsit and to redirect to its userPage:

    const [isMember, setIsMember] = useState({
    userName: "",
    password: ""
  });


  // whenever the user types his details in the input bars, the data is being
  // stored in isMember:

  function handleEntry(event) {
    const { name, value } = event.target;
    setIsMember(prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }



  function redirectToUserPage(){

    // for Admin only - in order to get to Admin Page:

    if (isMember.userName == "Admin" && isMember.password == "Admin") {
      window.alert("redirecting to Admin page");
      return navigate('/admin')
    }

    // if the user is exsit, then we should have a match between the data being
    // imported from the usersArray using the props, and the data from isMember:

    const filteredUser = props.usersArray.filter(user => {return user.userName == isMember.userName && user.password == isMember.password});

    if (filteredUser.length == 0) {
      window.alert("User isn't exists");
      return;
    }

    const userID = filteredUser[0].idNumber;

    navigate('/userPage/' + userID)

  }


  return (<div className="container">
  <h1 className="SmartHome"> Our Bank!</h1>
    <h1>
      As Always, Good to Have you Back
    </h1>
    <form>
      <input name="userName" onChange={handleEntry} placeholder="User Name"/>
      <input name="password" onChange={handleEntry} placeholder="Password"/>
      <button onClick={redirectToUserPage}>Submit</button>
      <p onClick={redirectToSignUp}>Create new User</p>
    </form>
    <img className="logo" src="./logo.png" alt="image" />
    <Footer />
  </div>);
}

export default Intro;
