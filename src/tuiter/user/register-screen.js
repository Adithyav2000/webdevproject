import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { registerthunk } from "../services/auth-thunks";


function RegisterScreen() {
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const handleRegister = async () => {
  try {
    await dispatch(registerthunk({ username, password }));
    navigate('/tuiter/profileinfo');
  } catch (e) {
    alert(e);
  }
 };
 
 return ( 
   <div className="form-container">
    <h1 className="form-header">Register</h1>
    <div className="form-group">
     <label>Username</label>
     <input className="form-control" type="text" value={username}
      onChange={(event) => setUsername(event.target.value)}/>
    </div>
    <div className="form-group">
      <label>Password</label>
      <input className="form-control" type="password" value={password}
        onChange={(event) => setPassword(event.target.value)}/>
    </div>
    <button className="btn btn-primary"
            onClick={handleRegister}>
      Register
    </button>
   </div>
  );
}

export default RegisterScreen;
