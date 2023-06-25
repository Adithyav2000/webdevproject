import { Routes, Route} from "react-router";
import NavigationSidebar from "./navigation-sidebar";
import BookmarksScreen from "./bookmarks-screen";
import HomeScreen from "./home/home-screen";
import ExploreScreen from "./explore-screen";
import ProfileScreen from "./user/profile-screen"
import LoginScreen from "./user/login-screen";
import RegisterScreen from "./user/register-screen";
import authReducer from "./reducers/auth-reducer";
import WhoToFollowList from "./who-to-follow-list";
import whoReducer from "./reducers/who-reducer";
import { configureStore } from '@reduxjs/toolkit';
import {Provider} from "react-redux";
import tuitsReducer from "./reducers/tuits-reducer";
import ProfileInfoScreen from "./user/profile-info";
import TuitSummaryList from "./tuit-summary-list";
import LoggerInfoScreen from "./home/LoggerInfo";
import SearchPage from "./search/search-page";
import FoodDetailsPage from "./search/food-details";
import SellerLoginScreen from "./home/sellerScreen";
import MaintenanceCaloriesPage from "./home/MaintenanceCaloriesPage"
import BuyerCartScreen from "./home/buyer-cart";
import OrderHistoryScreen from "./home/orderHistory";


const store = configureStore(
  {reducer: {who: whoReducer,tuits: tuitsReducer,user:  authReducer},
  
});

function Tuiter() {
 return (
  <Provider store={store}>
   <div>
    <p className="float-left"><NavigationSidebar /></p>
   
     <div className="row">
       <div className="col-8">
         <Routes>
  <Route path="/home" element={<HomeScreen/>} />
  <Route path="/explore" element={<ExploreScreen />} />
  <Route path="/bookmarks" element={<BookmarksScreen />} />
  <Route path="/login"    element={<LoginScreen    />} />
  <Route path="/register" element={<RegisterScreen />} />
  <Route path="/profile"  element={<ProfileScreen />} />
  <Route path="/profileinfo"  element={<ProfileInfoScreen/>} />
  <Route path="/loggerInfo"  element={<LoggerInfoScreen/>} />
  <Route path="/search-page" element={<SearchPage/>} />
  <Route path="/food/:foodId" element={<FoodDetailsPage />} />
  <Route path="/sellerScreen" element= {<SellerLoginScreen/>}/>
  <Route path="/maintenance-calories" element={<MaintenanceCaloriesPage/>} />
  <Route path="/buyer-cart" element={<BuyerCartScreen/>} />
  <Route path="/orderHistory" element={<OrderHistoryScreen/>} />


</Routes>

       </div>
       <div className="col-4">
       <h4 className="header-title mt-2">Recent Reviews</h4>
        <TuitSummaryList/>

       </div>
     </div>
   </div>
   </Provider>
 );
}
export default Tuiter;