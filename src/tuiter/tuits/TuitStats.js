import { AiOutlineRetweet,AiOutlineHeart,AiOutlineUpload } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import {useDispatch} from "react-redux";
import { updateTuitThunk } from "../services/tuits-thunks";
import {BsHandThumbsDown,BsHandThumbsDownFill} from "react-icons/bs"
 
const TuitStats = (
    {
      tuit = {
      }
    }
   ) => {
   const dispatch = useDispatch();

   
 return (
  
<div className="row">
  <div className="col-2 text-left">
    
    <BiMessageRounded className="me-3" /> {tuit.replies}
  </div>
  <div className="col-2 text-left">
    <AiOutlineRetweet className="me-3" /> {tuit.retuits}
  </div>
  <div className="col-2 text-left" >
    
    {tuit.liked? <FcLike className="me-3" onClick={() => dispatch(updateTuitThunk({ ...tuit, likes: tuit.likes -1,liked:false }))}/>:<AiOutlineHeart className="me-3" onClick={() => dispatch(updateTuitThunk({ ...tuit, likes: tuit.likes +1,liked:true }))}/> }
     {tuit.likes}
  </div>
  <div className="col-2 text-center">
    <AiOutlineUpload className="me-3" />
  </div>
  <div className="col-2 text-left">

    {tuit.disliked? <BsHandThumbsDownFill className="me-3" onClick={() => dispatch(updateTuitThunk({ ...tuit, dislikes: tuit.dislikes -1,disliked:false }))}/>:<BsHandThumbsDown className="me-3" onClick={() => dispatch(updateTuitThunk({ ...tuit, dislikes: tuit.dislikes +1,disliked:true }))}/> } {tuit.dislikes}
  </div>
</div>

 );
}
export default TuitStats;