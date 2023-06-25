import React, {useState,  createElement } from "react";
import{ AiOutlineHome,AiOutlineUser, AiOutlineClose} from "react-icons/ai"
import {BsHash,BsEnvelope,BsBookmark} from "react-icons/bs"
import {IoIosNotificationsOutline,IoIosCreate} from "react-icons/io"
import{CiViewList, CiCircleMore} from "react-icons/ci"
import { useSelector } from "react-redux";
import {BiLogIn} from "react-icons/bi"
import { Link, useLocation } from "react-router-dom";
import "../navigation-sidebar/index.css"

const NavigationSidebar = () => {
const [isOpen, setIsOpen] = useState(false);  
const { currentUser } = useSelector((state) => state.user);
 const { pathname } = useLocation();
 const [ignore, tuiter, active] = pathname.split("/");
 const links = ["home",  "explore",   "notifications", "messages", "bookmarks", "lists",  "more"];
 const nav = [AiOutlineHome, BsHash, IoIosNotificationsOutline, BsEnvelope, BsBookmark, CiViewList, CiCircleMore];
 return (
  <>
      <button className="custom-button" onClick={() => setIsOpen(true)}>More</button>
      {isOpen && <div id="overlay" onClick={() => setIsOpen(false)}></div>}
      
      <div id="sidebar" className={`list-group  ${isOpen ? "open" : ""}`}>
        <AiOutlineClose onClick={() => setIsOpen(false)} />
    {links.map((link,index) => 
      <Link to={`/tuiter/${link}`} id="coll"  className={` list-group-item text-capitalize ${active === link ? "active" : ""}`}>
        {createElement(nav[index])}
        <span>     </span>
        {link}
      </Link>
    )  
    }
      {!currentUser && (
      <Link id="coll" className="list-group-item text-capitalize" to="/tuiter/login">
        {createElement(BiLogIn)} 
        <span>     </span>

        Login
      </Link>
    )}

{!currentUser && (
      <Link id="coll" className="list-group-item text-capitalize" to="/tuiter/register">
        {createElement(IoIosCreate)} 
        <span>     </span>
        register
      </Link>
    )}
    
    {currentUser && (
      <Link id="coll" className="list-group-item text-capitalize" to="/tuiter/profile">
       {createElement(AiOutlineUser)} 
       <span>     </span>
       Profile
      </Link>
    )}  

    {currentUser && currentUser.userType==="seller" &&(
      <Link id="coll" className="list-group-item text-capitalize" to="/tuiter/sellerScreen">
       {createElement(AiOutlineUser)} 
       <span>     </span>
       Products to sell
      </Link>
    )}

{currentUser && currentUser.userType==="normal" &&(
      <Link id="coll" className="list-group-item text-capitalize" to="/tuiter/buyer-cart">
       {createElement(AiOutlineUser)} 
       <span>     </span>
       Buyer Cart
      </Link>
    )}

{currentUser && currentUser.userType==="normal" &&(
      <Link id="coll" className="list-group-item text-capitalize" to="/tuiter/orderHistory">
       {createElement(AiOutlineUser)} 
       <span>     </span>
       Order History
      </Link>
    )}
      
    
   </div>
   </>
 );
};
export default NavigationSidebar;