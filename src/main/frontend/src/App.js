import './App.css';
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SearchIdPage from "./pages/SearchIdPage";
import SearchPwPage from "./pages/SearchPwPage";
import SignUpPage from "./pages/signup/SignUpPage";
import SignUpCompletePage from "./pages/signup/SignUpCompletePage";
import ToProfilePage from './pages/signup/ToProfile';
import PersonalInfoModifyPage from './pages/modify/PersonalInfoModifyPage';
import PlaceInfoModifyStart from './pages/modify/PlaceInfoModifyStart';
import PersonalInfoModifyPage2 from './pages/modify/PersonalInfoModifyPage2';
import PlaceInfoModifyPage2 from './pages/modify/PlaceInfoModifyPage2';
import PlaceInfoModifyPage3 from './pages/modify/PlaceInfoModifyPage3';
import PlaceInfoModifyPage4 from './pages/modify/PlaceInfoModifyPage4';
import PlaceInfoModifyPage5 from './pages/modify/PlaceInfoModifyPage5';
import ModifyCompletePage from "./pages/modify/ModifyCompletePage";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";
import HostRegistry from "./pages/hostregistry/HostRegistry";
import HostRegistry2 from "./pages/hostregistry/HostRegistry2";
import HostRegistry3 from "./pages/hostregistry/HostRegistry3";
import HostRegistry5 from "./pages/hostregistry/HostRegistry5";
import HostRegistry4 from "./pages/hostregistry/HostRegistry4";
import HostRegistryComplete from "./pages/hostregistry/HostRegistryComplete";
import GuestRegistry from "./pages/guestregistry/GuestRegistry";
import LoginHandeler from "./pages/LoginHandeler";
import ChefInfoModifyPage from './pages/modify/ChefInfoModifyPage';
import ChefInfoModifyPage2 from './pages/modify/ChefInfoModifyPage2';
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
function App() {
  return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainPage />}/>
        <Route path="/login/oauth2/callback/kakao" element={<LoginHandeler />} />
        <Route path="/searchId" element={<SearchIdPage />} />
        <Route path="/searchPw" element={<SearchPwPage />}/>
        <Route path="/signUp" element={<SignUpPage />}/>
        <Route path="/signUpComplete" element={<SignUpCompletePage />} />
        <Route path="/toProfile" element={<ToProfilePage />} />
        <Route path="/personalInfoModify" element={<PersonalInfoModifyPage />} />
        <Route path="/personalInfoModify2" element={<PersonalInfoModifyPage2 />} />
        <Route path="/placeInfoModifyStart" element={<PlaceInfoModifyStart />} />
        <Route path="/placeInfoModify2" element={<PlaceInfoModifyPage2 />} />
        <Route path="/placeInfoModify3" element={<PlaceInfoModifyPage3 />} />
        <Route path="/placeInfoModify4" element={<PlaceInfoModifyPage4 />} />
        <Route path="/placeInfoModify5" element={<PlaceInfoModifyPage5 />} />
        <Route path="/modifyComplete" element={<ModifyCompletePage />}/>
        <Route path="/hostRegistry" element={<HostRegistry />} />
        <Route path="/hostRegistry2" element={<HostRegistry2 />} />
        <Route path="/hostRegistry3" element={<HostRegistry3 />}/>
        <Route path="/hostRegistry4" element={<HostRegistry4 />}/>
        <Route path="/hostRegistry5" element={<HostRegistry5 />}/>
        <Route path="/hostRegistryComplete" element={<HostRegistryComplete />} />
        <Route path="/guestRegistry" element={<GuestRegistry />}/>
        <Route path="/chefInfoModify" element={<ChefInfoModifyPage />} />
        <Route path="/chefInfoModify2" element={<ChefInfoModifyPage2 />} />
        <Route path="/spaceList" element={<SpaceListViewPage />} />
        <Route path="/rentSpace/:id" element={<RentSpacePage />} />
        <Route path="/rentSpaceInfo1/:id" element={<RentSpaceInfo1 />} />
        <Route path="/rentSpaceInfo2/:id" element={<RentSpaceInfo2 />} />
        <Route path="/rentSpaceInfo3/:id" element={<RentSpaceInfo3 />} />
        <Route path="/chatList" element={<ChatRoomListPage />} />
        <Route path="/chatRoom" element={<ChatRoomPage />} />
            <Route path="/mypost" element={<MyPostPage />} />
        <Route path="/post/:id" element={<PostViewPage />} />
        <Route path="/post/edit" element={<PostEditPage />} />
        <Route path="/popup" element={<PopupBoardPage />} />
        <Route path="/chat" element={<ChatBoardPage />} />
        <Route path="/recipe" element={<RecipeBoardPage />} />
        <Route path="/error" element={<ErrorPage />}/>
      </Routes>
  );
}

export default App;
