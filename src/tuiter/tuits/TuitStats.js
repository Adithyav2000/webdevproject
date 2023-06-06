import { AiOutlineRetweet,AiOutlineHeart,AiOutlineUpload } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import {useDispatch} from "react-redux";
import { liked } from "../reducers/tuits-reducer";

 
const TuitStats = (
    {
      tuit = {
      }
    }
   ) => {
   const dispatch = useDispatch();
   const likehandler = (id) => {
     dispatch(liked(id));
   }
   
 return (
<div className="row">
  <div className="col-3 text-left">
    <BiMessageRounded className="me-3" /> {tuit.replies}
  </div>
  <div className="col-3 text-left">
    <AiOutlineRetweet className="me-3" /> {tuit.retuits}
  </div>
  <div className="col-3 text-left" >
    {tuit.liked? <FcLike className="me-3" onClick={() => likehandler(tuit._id)}/>:<AiOutlineHeart className="me-3" onClick={() => likehandler(tuit._id)}/> }
     {tuit.likes}
  </div>
  <div className="col-3 text-left">
    <AiOutlineUpload className="me-3" />
  </div>
</div>

 );
}
export default TuitStats;