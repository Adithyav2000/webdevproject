import React, { createElement } from "react";
import{ AiOutlineHome,AiOutlineUser} from "react-icons/ai"
import {BsHash,BsEnvelope,BsBookmark} from "react-icons/bs"
import {IoIosNotificationsOutline,IoIosCreate} from "react-icons/io"
import{CiViewList, CiCircleMore} from "react-icons/ci"
import { useSelector } from "react-redux";
import {BiLogIn} from "react-icons/bi"

import { Link, useLocation } from "react-router-dom";
const NavigationSidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
 const { pathname } = useLocation();
 const [ignore, tuiter, active] = pathname.split("/");
 const links = ["home",  "explore",   "notifications", "messages", "bookmarks", "lists",  "more"];
 const nav = [AiOutlineHome, BsHash, IoIosNotificationsOutline, BsEnvelope, BsBookmark, CiViewList, CiCircleMore];
 return (
   <div className="list-group">
     {links.map((link,index) => 

         <Link to={`/tuiter/${link}`} className={`list-group-item text-capitalize ${active === link ? "active" : ""}`}>
          {createElement(nav[index])}
          <span>     </span>
           {link}
         </Link>
     
     )  
     }
      {!currentUser && (
      <Link className="list-group-item text-capitalize" to="/tuiter/login">
        {createElement(BiLogIn)} 
        <span>     </span>

        Login
      </Link>
    )}

{!currentUser && (
      <Link className="list-group-item text-capitalize" to="/tuiter/register">
        {createElement(IoIosCreate)} 
        <span>     </span>
        register
      </Link>
    )}
    
    {currentUser && (
      <Link className="list-group-item text-capitalize" to="/tuiter/profile">
       {createElement(AiOutlineUser)} 
       <span>     </span>
       Profile
      </Link>
    )}  
      
    
   </div>
 );
};
export default NavigationSidebar;