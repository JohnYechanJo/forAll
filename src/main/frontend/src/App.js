import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SearchIdPage from "./pages/SearchIdPage";
import SearchPwPage from "./pages/SearchPwPage";
import SignUpPage from "./pages/SignUpPage";
import SignUpPage2 from "./pages/SignUpPage2";
import SignUpCompletePage from "./pages/SignUpCompletePage";
import PersonalInfoModifyPage from './pages/PersonalInfoModifyPage';
import PlaceInfoModifyPage from './pages/PlaceInfoModifyPage';
import PersonalInfoModifyPage2 from './pages/PersonalInfoModifyPage2';
import PlaceInfoModifyPage2 from './pages/PlaceInfoModifyPage2';
import ModifyCompletePage from "./pages/ModifyCompletePage";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";
import HostRegistry from "./pages/HostRegistry";
import HostRegistryStart from "./pages/HostRegistryStart";
import HostRegistry2 from "./pages/HostRegistry2";
import HostRegistry3 from "./pages/HostRegistry3";
import HostRegistry5 from "./pages/HostRegistry5";
import HostRegistry4 from "./pages/HostRegistry4";
import HostRegistry6 from "./pages/HostRegistry6";
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
      </Routes>
  );
}

export default App;
