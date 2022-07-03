import React, {useState, useEffect} from 'react';
import {useNavigate}  from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';


function Admin(props) {

  const navigate = useNavigate();

  const redirectIntro = () => {
    navigate('/')
    }


    const [users, setUsers] = useState(props.usersArray);


    function removeUser(event){
      alert(event.target.id)
      const userID = event.target.id;

      const renderedUsersArray = props.removeUserFromArray(userID);

      setUsers(renderedUsersArray);
    }

  // the HTML:

  return (
    <div className="container">
      <h1 className="SmartHome"> Our Bank!</h1>
      <h1>Hello</h1>
      <h1>Bank Users:</h1>
        <div className="roomBox">
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>ID number</th>
                <th>Current Account</th>
                <th>Expenses</th>
              </tr>
            </thead>
              <tbody>
                {
                  users.map(user => {
                    return (<tr key={user.idNumber}>
                              <td>{user.userName}</td>
                              <td>{user.idNumber}</td>
                              <td>{user.currentAccount}</td>
                               <td>{user.expenses.map(expense => {return <p>{expense.companyName}: {expense.amount}</p> })}</td>
                              <td> <button id={user.idNumber} onClick={removeUser}>Remove User</button></td>
                            </tr>);
                                    })
                }
            </tbody>
          </table>
        </div>

            </div>);
}

export default Admin;
