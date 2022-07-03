import React, {useState, useEffect} from 'react';
import {useNavigate}  from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Intro from "./Intro"


function UserPage(props) {

  // in order to retrieve data that was sent to this page
  // in particular using the 'state' in 'navigate':

  const location = useLocation();

  // in order to redirect to other pages:

  const navigate = useNavigate();

  const redirectIntro = () => {
    navigate('/')
    }

  // in order to get the UserID  from the URL navigate:

  const { idFromUrl } = useParams();

  // in order to retrieve the data the was delivered from usersArray
  // which was delivered using props:

  const [transferredUser, setTransferredUser] = useState(
    props.usersArray.filter(user => {return user.idNumber == idFromUrl})[0]
  );

  const [userID, setUserID] = useState(transferredUser.idNumber);



  // creating the Payment array:

  const [newPayment, setNewPayment] = useState({
        companyName: "",
        amount:""
    });


  // updating the Payment array:

  function handlePaymentChange(event) {
    const { name, value } = event.target;
    setNewPayment(prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }


    function addNewPayment(){

        alert("Making New Payment")
        // setUsersArray([...usersArray, newUser]);
        const renderedUsersArray = props.insertPaymentToUsersArray(newPayment, userID);
        // console.log(usersArray);
        // setUsersArray(renderedUsersArray);
        setTransferredUser(
          renderedUsersArray.filter(user => {return user.idNumber == idFromUrl})[0]
        );

      }


      // redirecting + sending user's data to ChangeDetails page through
      // navigate with 'state':

      function redirectToChangeDetails(){

      navigate('/ChangeDetails/' + idFromUrl, {state: {user:transferredUser}})

      }


      // for the 'User's Details' menu to open onClick:

      const [isClicked, setIsClicked] = useState(false);

      function handleIsClicked(){
        setIsClicked(!isClicked)
      }

      // for the 'Make Payment' menu to open onClick:

      const [isReportErrorClicked, setIsReportErrorClicked] = useState(false);

      function handleReportErrorIsClicked(){
        setIsReportErrorClicked(!isReportErrorClicked)
      }


  // the HTML:

  return (
    <div className="container">
      <h1 className="SmartHome"> Our Bank!</h1>
      <h1>Hello {transferredUser.userName}</h1>
      <h1>ID number:{idFromUrl}</h1>
        <div className="roomBox">
          <div style={{textAlign: 'center'}, {display: 'inline-flex'}}>
          <button style={{display: 'inline'}} onClick={handleIsClicked}>User's Details</button>
          <button style={{display: 'inline'}} onClick={redirectToChangeDetails}>Change Details</button>
          <button style={{display: 'inline'}} onClick={redirectIntro}>Exit</button>

          </div>

          {isClicked && <div>

              <p>User Name: {transferredUser.userName}</p>
              <p>User ID Numer: {transferredUser.idNumber}</p>
              <p>User Password: {transferredUser.password}</p>
              <p>User Current Account: {transferredUser.currentAccount}</p>

                </div>}

          <div>
            <p>Add A new Payment:</p>
            <div>
              <button style={{display: 'inline'}} onClick={handleReportErrorIsClicked}>Make Payment</button>

              {isReportErrorClicked && <div>
                <input name="companyName" onChange={handlePaymentChange} placeholder="Company Name"/>
                <input name="amount" onChange={handlePaymentChange} placeholder="Amount"/>
                <button onClick={addNewPayment}>Submit</button>
                </div>}
            </div>
          </div>
        </div>
  </div>);
}

export default UserPage;
