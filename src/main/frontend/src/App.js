import logo from './logo.svg';
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
import PlaceRegisterPage3 from "./pages/PlaceRegisterPage3";
import PlaceRegisterPage4 from "./pages/PlaceRegisterPage4";
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
          <Route path="/placeRegister3" element={<PlaceRegisterPage3 />}/>
          <Route path="/placeRegister4" element={<PlaceRegisterPage4 />}/>



          <Route path="/error" element={<ErrorPage />}/>
          <Route path="/modifyComplete" element={<ModifyCompletePage />}/>
          <Route path="/hostRegistry" element={<HostRegistry />} />
          <Route path="/hostRegistryStart" element={<HostRegistryStart />} />
      </Routes>
  );
}

export default App;
