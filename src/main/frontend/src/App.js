import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SearchIdPage from "./pages/SearchIdPage";
import SearchPwPage from "./pages/SearchPwPage";
import SignUpPage from "./pages/signup/SignUpPage";
import SignUpPage2 from "./pages/signup/SignUpPage2";
import SignUpCompletePage from "./pages/signup/SignUpCompletePage";
import PersonalInfoModifyPage from './pages/modify/PersonalInfoModifyPage';
import PlaceInfoModifyPage from './pages/modify/PlaceInfoModifyPage';
import PersonalInfoModifyPage2 from './pages/modify/PersonalInfoModifyPage2';
import PlaceInfoModifyPage2 from './pages/modify/PlaceInfoModifyPage2';
import ModifyCompletePage from "./pages/modify/ModifyCompletePage";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";
import HostRegistry from "./pages/hostregistry/HostRegistry";
import HostRegistryStart from "./pages/hostregistry/HostRegistryStart";
import HostRegistry2 from "./pages/hostregistry/HostRegistry2";
import HostRegistry3 from "./pages/hostregistry/HostRegistry3";
import HostRegistry5 from "./pages/hostregistry/HostRegistry5";
import HostRegistry4 from "./pages/hostregistry/HostRegistry4";
import HostRegistry6 from "./pages/hostregistry/HostRegistry6";
import GuestRegistryStart from "./pages/guestregistry/GuestRegistryStart";
import GuestRegistry from "./pages/guestregistry/GuestRegistry";
function App() {
  return (
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />}/>
          <Route path="/searchId" element={<SearchIdPage />} />
          <Route path="/searchPw" element={<SearchPwPage />}/>
          <Route path="/signUp" element={<SignUpPage />}/>
          <Route path="/signUp2" element={<SignUpPage2 />}/>
          <Route path="/signUpComplete" element={<SignUpCompletePage />} />
          <Route path="/personalInfoModify" element={<PersonalInfoModifyPage />} />
          <Route path="/personalInfoModify2" element={<PersonalInfoModifyPage2 />} />
          <Route path="/placeInfoModify" element={<PlaceInfoModifyPage />} />
          <Route path="/placeInfoModify2" element={<PlaceInfoModifyPage2 />} />
          <Route path="/modifyComplete" element={<ModifyCompletePage />}/>
              <Route path="/hostRegistry" element={<HostRegistry />} />
              <Route path="/hostRegistryStart" element={<HostRegistryStart />} />
              <Route path="/hostRegistry2" element={<HostRegistry2 />} />
          <Route path="/hostRegistry3" element={<HostRegistry3 />}/>
          <Route path="/hostRegistry4" element={<HostRegistry4 />}/>
          <Route path="/hostRegistry5" element={<HostRegistry5 />}/>
          <Route path="/hostRegistry6" element={<HostRegistry6 />}/>
          <Route path="/error" element={<ErrorPage />}/>
          <Route path="/modifyComplete" element={<ModifyCompletePage />}/>
          <Route path="/guestRegistryStart" element={<GuestRegistryStart />}/>
            <Route path="/guestRegistry" element={<GuestRegistry />}/>
      </Routes>
  );
}

export default App;
