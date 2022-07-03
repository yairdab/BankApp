import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Intro from './components/Intro'
import SignUp from './components/SignUp'
import UserPage from './components/UserPage'
import ChangeDetails from './components/ChangeDetails'
import Admin from './components/Admin'
import Footer from './components/Footer'


import './styles/common.css';

// --------------------------------------------------------------------------//


function App() {

  // From SignUp - crearing the usersArray in order to store the users' objects:

  const [usersArray, setUsersArray] = useState([]);

  // creating here the function 'saveNewUser' that will be sent to SignUp.jsx
  // as props in the Route. That way we could transfer data upwards from
  // SignUp.jsx to App.jsx:

  function saveNewUser(newUser) {
    alert(newUser)
    setUsersArray([...usersArray, newUser])
  }

  // creating here the function 'updateUserArray' that will be sent to ChangeDetails.jsx
  // as props in the Route. That way we could transfer data upwards from
  // ChangeDetails.jsx to App.jsx. This function ultimately updates usersArray using setUsersArray:

  function updateUserArray(updatedUser, userID){

    const newUsersArray = usersArray.map(user => {
      if (user.idNumber == userID) {

        return {
          userName:updatedUser.userName,
          idNumber:updatedUser.idNumber,
          password:updatedUser.password,
          currentAccount: updatedUser.currentAccount,
          expenses:[{
            companyName: user.companyName,
            amount:user.amount
            }]
        };
      }

      // 👇️ otherwise return object as is
      return user;
    });

    setUsersArray(newUsersArray);

  }

  // creating here the function 'insertPaymentToUsersArray' that will be sent to UserPage.jsx
  // as props in the Route. That way we could transfer data upwards from
  // UserPage.jsx to App.jsx. This function ultimately updates usersArray using setUsersArray:

  function insertPaymentToUsersArray(newPayment, userID){

    const newUsersArray = usersArray.map(user => {
      if (user.idNumber == userID) {
      let payments = [...user.expenses, newPayment];

        return {
          userName:user.userName,
          idNumber:user.idNumber,
          password:user.password,
          currentAccount: user.currentAccount - newPayment.amount,
          expenses: payments
        };
      }

      // 👇️ otherwise return object as is
      return user;
    });

    setUsersArray(newUsersArray);

    return newUsersArray;
  }


  // creating here the function 'removeUserFromArray' that will be sent to Admin.jsx
  // as props in the Route. The function return a reducedArray without the selected array
  // that was selected to be removed, and then it updates usersArray using setUsersArray:


  function removeUserFromArray(userID){

    const reducedArray = usersArray.filter(user => {return user.idNumber !== userID});

    setUsersArray(reducedArray);

    return reducedArray;

  }


 return (
   <div className="App">
    <Router>
         <Routes>
          <Route exact path="/" element={<Intro usersArray={usersArray}/>} />
          <Route path="/signup" element={<SignUp saveNewUser={saveNewUser} usersArray={usersArray} />} />
          <Route path="/userPage/:idFromUrl" element={<UserPage usersArray={usersArray} insertPaymentToUsersArray={insertPaymentToUsersArray} />} />
          <Route path="/ChangeDetails/:idFromUrl" element={<ChangeDetails usersArray={usersArray} updateUserArray={updateUserArray}/>} />
          <Route path="/admin" element={<Admin usersArray={usersArray} removeUserFromArray={removeUserFromArray}/>} />

        </Routes>
       </Router>
   </div>
 );
}

export default App;
