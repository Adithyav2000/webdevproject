import React from "react";
import {useDispatch} from "react-redux";
import {deleteTuit} from "../reducers/tuits-reducer";
import 'bootstrap-icons/font/bootstrap-icons.css';

const TuitItem = (
 {
   tuit = {
   }
 }
) => {
const dispatch = useDispatch();
const deleteTuitHandler = (id) => {
  dispatch(deleteTuit(id));
}

 return(

  <li className="list-group-item">
   <div className="row">
     <div className="col-auto">
       <img className=" float-end rounded-circle " width={50} src={`/images/${tuit.image}`}/>
     </div>
     <div className="col-10"> <div className="float-left">
     <i className="bi bi-x-lg float-end"
            onClick={() => deleteTuitHandler(tuit._id)}></i> 
       <div> <span className="fw-bolder">{tuit.userName} </span> . {tuit.time}</div>
       <div>{tuit.title}</div>
       </div>
     </div>
   </div>
  </li>
 );
};
export default TuitItem;