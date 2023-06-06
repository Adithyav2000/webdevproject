import React, { createElement } from "react";
import{ AiOutlineHome,AiOutlineUser} from "react-icons/ai"
import {BsHash,BsEnvelope,BsBookmark} from "react-icons/bs"
import {IoIosNotificationsOutline} from "react-icons/io"
import{CiViewList, CiCircleMore} from "react-icons/ci"

import { Link, useLocation } from "react-router-dom";
const NavigationSidebar = () => {
 const { pathname } = useLocation();
 const [ignore, tuiter, active] = pathname.split("/");
 const links = ["home",  "explore",   "notifications", "messages", "bookmarks", "lists", "profile",  "more"];
 const nav = [AiOutlineHome, BsHash, IoIosNotificationsOutline, BsEnvelope, BsBookmark, CiViewList, AiOutlineUser, CiCircleMore];
 return (
   <div className="list-group">
     {links.map((link,index) => 

         <Link to={`/tuiter/${link}`} className={`list-group-item text-capitalize ${active === link ? "active" : ""}`}>
          {createElement(nav[index])}
          <span>     </span>
           {link}
         </Link>
     )}
   </div>
 );
};
export default NavigationSidebar;