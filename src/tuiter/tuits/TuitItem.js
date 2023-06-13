import React from "react";
import {useDispatch} from "react-redux";
import {deleteTuitThunk} from "../services/tuits-thunks";
import 'bootstrap-icons/font/bootstrap-icons.css';
import TuitStats from "./TuitStats";
import {VscVerifiedFilled} from "react-icons/vsc"
const TuitItem = (
 {
   tuit = {
   }
 }
) => {
const dispatch = useDispatch();
const deleteTuitHandler = (id) => {
  dispatch(deleteTuitThunk(id));
}

 return(
  <div>
  <li className="list-group-item">
   <div className="row">
     <div className="col-auto">
       <img className=" float-end rounded-circle " width={50} src={`/images/${tuit.image}`}/>
     </div>
     <div className="col-10"> <div className="float-left">
     <i className="bi bi-x-lg float-end"
            onClick={() => deleteTuitHandler(tuit._id)}></i> 
       <div> <span className="fw-bolder">{tuit.userName} </span> <VscVerifiedFilled className="md-3" color="blue"/> {tuit.handle} . {tuit.time}</div>
       <div>{tuit.tuit}
       <br/>
   <TuitStats tuit={tuit}/>
       </div>
       </div>
       
     </div>
   </div>
  </li>
  </div>
  
 );
};
export default TuitItem;