import React, {useState} from "react"
import {createTuitThunk} from "./services/post-thunks";
import {useDispatch} from "react-redux";
 
const NewPostInput = () => {
 let [currentPostText, setCurrentPostText] = useState('');
 const dispatch = useDispatch();
 const postClickHandler = () => {
    const newPost = {
        tuit: currentPostText
      }
      dispatch(createTuitThunk(newPost));
      setCurrentPostText("");
 }
 return (
   <div className="row">
     <div className="col-auto">
     </div>
     <div className="col-10">
       <textarea value={currentPostText} placeholder="Advertise your product"
               className="form-control border-0"
               onChange={(event) => setCurrentPostText(event.target.value)}>
       </textarea>
       <div>
         <button className="rounded-pill btn btn-primary float-end mt-2 ps-3 pe-3 fw-bold"
                 onClick={postClickHandler}>
           Post
         </button>
       </div>
     </div>
     <div className="col-12"><hr/></div>
   </div>
 );
}
export default NewPostInput;
