import './App.css';
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SearchIdPage from "./pages/SearchIdPage";
import SearchPwPage from "./pages/SearchPwPage";
import SignUpPage from "./pages/signup/SignUpPage";
import SignUpCompletePage from "./pages/signup/SignUpCompletePage";


import PlaceInfoModifyStart from './pages/modify/PlaceInfoModifyStart';
import PersonalInfoModifyPage from './pages/modify/PersonalInfoModifyPage';


import PlaceInfoModifyPage2 from './pages/modify/PlaceInfoModifyPage2';
import PlaceInfoModifyPage3 from './pages/modify/PlaceInfoModifyPage3';
import PlaceInfoModifyPage4 from './pages/modify/PlaceInfoModifyPage4';
import PlaceInfoModifyPage6 from './pages/modify/PlaceInfoModifyPage6';
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";
import HostRegistry from "./pages/hostregistry/HostRegistry";
import HostRegistry2 from "./pages/hostregistry/HostRegistry2";
import HostRegistry3 from "./pages/hostregistry/HostRegistry3";
import HostRegistry6 from "./pages/hostregistry/HostRegistry6";
import HostRegistry4 from "./pages/hostregistry/HostRegistry4";

import HostRegistryCheckingPage from './pages/hostregistry/HostRegistryChecking';


import GuestRegistry from "./pages/signup/GuestRegistry";


import LoginHandeler from "./pages/LoginHandeler";
import ChefRegistry from './pages/chefregistry/ChefRegistry';
import ChefRegistryCheckingPage from './pages/chefregistry/ChefRegistryChecking';
import ChefInfoModifyPage from './pages/modify/ChefInfoModifyPage';
import RentSpacePage from "./pages/RentSpace/RentSpacePage";
import RentSpaceInfo1 from "./pages/RentSpace/RentSpaceInfo1";
import RentSpaceInfo2 from "./pages/RentSpace/RentSpaceInfo2";
import RentSpaceInfo3 from "./pages/RentSpace/RentSpaceInfo3";
import PostViewPage from "./pages/board/PostViewPage";
import PopupBoardPage from "./pages/board/PopupBoardPage";
import ChatBoardPage from "./pages/board/ChatBoardPage";
import RecipeBoardPage from "./pages/board/RecipeBoardPage";
import SpaceListViewPage from "./pages/RentSpace/SpaceListViewPage";
import ChatRoomListPage from "./pages/chat/ChatRoomListPage";
import ChatRoomPage from "./pages/chat/ChatRoomPage";
import PostEditPage from "./pages/board/PostEditPage";
import MyPostPage from "./pages/board/MyPostPage";
import HostRegistryStartPage from "./pages/hostregistry/HostRegistryStartPage";
import Notification from './pages/signup/Notification';
import HostRegistry5 from "./pages/hostregistry/HostRegistry5";
import PlaceInfoModifyPage5 from "./pages/modify/PlaceInfoModifyPage5";
import FAQ from "./pages/FAQ";
import EntryPartnership from "./pages/EntryPartnership";


import ProfileModifyPage from "./pages/modify/ProfileModifyPage";
import ProfileViewPage from "./pages/ProfileViewPage";
import AlreadyChef from './components/AlreadyChef';
import RentSpacePage2 from "./pages/RentSpace/RentSpacePage2";
import React from "react";
import RentSpacePage3 from "./pages/RentSpace/RentSpacePage3";
import RentSpaceComplete from "./pages/RentSpace/RentSpaceComplete";
import ReservationListPage from "./pages/Reservation/ReservationListPage";
import AssuranceReady from "./pages/Reservation/AssuranceReady";
import AssuranceReadyView from "./pages/Reservation/AssuranceReadyView";
import AssuranceFinish from "./pages/Reservation/AssuranceFinish";
import PersonalInfoModifyPage2 from "./pages/modify/PersonalInfoModifyPage2";
import ChefInfoModifyCompletePage from "./pages/modify/ChefInfoModifyCompletePage";
import PersonalModifyCompletePage from "./pages/modify/PersonalModifyCompletePage";
import PlaceInfoModifyCompletePage from "./pages/modify/PlaceInfoModifyCompletePage";
import PostListViewPage from "./pages/board/PostListViewPage";
import AllNotifications from "./pages/AllNotifications";
import DeadlineInfo from "./pages/Reservation/DeadlineInfo";
import AdminMainPage from "./pages/admin/AdminMainPage";
import AdminSpaceViewPage1 from "./pages/admin/AdminSpaceViewPage1";
import AdminSpaceViewPage2 from "./pages/admin/AdminSpaceViewPage2";
import AdminSpaceViewPage3 from "./pages/admin/AdminSpaceViewPage3";
import AdminSpaceViewPage4 from "./pages/admin/AdminSpaceViewPage4";
import AdminSpaceViewPage5 from "./pages/admin/AdminSpaceViewPage5";
import AdminSpaceViewPage6 from "./pages/admin/AdminSpaceViewPage6";


function App() {
  return (
      <Routes>
        <Route path="/admin" element={<AdminMainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainPage />}/>
            <Route path="/allNotifications" element={<AllNotifications />}/>

            <Route path="/login/oauth2/callback/kakao" element={<LoginHandeler />} />
        <Route path="/searchId" element={<SearchIdPage />} />
        <Route path="/searchPw" element={<SearchPwPage />}/>
        <Route path="/signUp" element={<SignUpPage />}/>
        <Route path="/signUpComplete" element={<SignUpCompletePage />} />
        <Route path="/personalInfoModify" element={<PersonalInfoModifyPage />} />
        <Route path="/personalInfoModify2" element={<PersonalInfoModifyPage2 />} />
        <Route path="/placeInfoModifyStart" element={<PlaceInfoModifyStart />} />
        <Route path="/placeInfoModify2" element={<PlaceInfoModifyPage2 />} />
        <Route path="/placeInfoModify3" element={<PlaceInfoModifyPage3 />} />
        <Route path="/placeInfoModify4" element={<PlaceInfoModifyPage4 />} />
        <Route path="/placeInfoModify5" element={<PlaceInfoModifyPage5 />} />
        <Route path="/placeInfoModify6" element={<PlaceInfoModifyPage6 />} />

        <Route path="/chefInfoModifyComplete" element={<ChefInfoModifyCompletePage />}/>
        <Route path="/personalModifyComplete" element={<PersonalModifyCompletePage />}/>
        <Route path="/placeInfoModifyComplete" element={<PlaceInfoModifyCompletePage />}/>

        <Route path="/hostRegistryStart" element={<HostRegistryStartPage />}/>
        <Route path="/hostRegistry" element={<HostRegistry />} />
        <Route path="/hostRegistry2" element={<HostRegistry2 />} />
        <Route path="/hostRegistry3" element={<HostRegistry3 />}/>
        <Route path="/hostRegistry4" element={<HostRegistry4 />}/>
        <Route path="/hostRegistry5" element={<HostRegistry5 />}/>
        <Route path="/hostRegistry6" element={<HostRegistry6 />}/>
        <Route path="/hostRegistryChecking" element={<HostRegistryCheckingPage />} />
        <Route path="/guestRegistry" element={<GuestRegistry />}/>


        <Route path="/profileModify" element={<ProfileModifyPage />}/>
        <Route path="/chefInfoModify" element={<ChefInfoModifyPage />} />
        <Route path="/spaceList" element={<SpaceListViewPage />} />
        <Route path="/rentSpace/:id" element={<RentSpacePage />} />
        <Route path="/rentSpaceInfo1/:id" element={<RentSpaceInfo1 />} />
        <Route path="/rentSpaceInfo2/:id" element={<RentSpaceInfo2 />} />
        <Route path="/rentSpaceInfo3/:id" element={<RentSpaceInfo3 />} />
        <Route path="/rentSpace2" element={<RentSpacePage2 />} />
        <Route path="/rentSpace3" element={<RentSpacePage3 />} />
        <Route path="/rentSpaceComplete" element={<RentSpaceComplete />} />
        <Route path="/chatList" element={<ChatRoomListPage />} />
        <Route path="/chatRoom" element={<ChatRoomPage />} />
        <Route path="/profile/:id" element={<ProfileViewPage />} />
        <Route path="/mypost" element={<MyPostPage />} />


        <Route path="/chatList" element={<ChatRoomListPage />} />
        <Route path="/chatRoom" element={<ChatRoomPage />} />
        <Route path="/postList" element={<PostListViewPage />} />
        <Route path="/post/:id" element={<PostViewPage />} />
        <Route path="/post/edit" element={<PostEditPage />} />
        <Route path="/popup" element={<PopupBoardPage />} />
        <Route path="/chat" element={<ChatBoardPage />} />
        <Route path="/recipe" element={<RecipeBoardPage />} />
        <Route path="/error" element={<ErrorPage />}/>
        <Route path="/notification" element={<Notification />}/>
        <Route path="/chefRegistry" element={<ChefRegistry />} />
        <Route path="/chefRegistryChecking" element={<ChefRegistryCheckingPage />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/EntryPartnership" element={<EntryPartnership />} />
        <Route path="/alreadyChef" element={<AlreadyChef />} />
        <Route path="/reservationList" element={<ReservationListPage />} />
        <Route path="/assuranceReady" element={<AssuranceReady />} />
        <Route path="/assuranceReadyView" element={<AssuranceReadyView />} />
         <Route path="/assuranceFinish" element={<AssuranceFinish />} />
            <Route path="/deadlineInfo" element={<DeadlineInfo />} />

            <Route path="/adminspaceViewPage1" element={<AdminSpaceViewPage1 />} />
            <Route path="/adminspaceViewPage2" element={<AdminSpaceViewPage2 />} />
            <Route path="/adminspaceViewPage3" element={<AdminSpaceViewPage3 />}/>
            <Route path="/adminspaceViewPage4" element={<AdminSpaceViewPage4 />}/>
            <Route path="/adminspaceViewPage5" element={<AdminSpaceViewPage5 />}/>
            <Route path="/adminspaceViewPage6" element={<AdminSpaceViewPage6 />}/>
      </Routes>
  );
}

export default App;
