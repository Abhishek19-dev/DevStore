import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom"
import Home from './components/Screen/Home';
import NavBar from './components/Layout/Navbar/Navbar';
import Footer from './components/Layout/Footer/Footer';
import ProjectScreen from './components/Screen/ProjectScreen';
import ProjectDetails from './components/Layout/ProjectDetails/ProjectDetails';
import Login from './components/Screen/Auth/Login';
import Register from './components/Screen/Auth/Register';
import Sell from './components/Screen/Sell';
import MyProfileScreen from './components/Screen/MyProfileScreen';
import EditProfile from './components/Layout/My_Profile/Edit_Profile';
import MyProject from './components/Screen/MyProject/MyProject';
import EditProjectDetails from './components/Screen/MyProject/EditProjectDetails';
import Buy from './components/Screen/Buy';
import ThankYou from './components/Screen/ThankYou';
import ScrollToTop from './components/ScrollToTop';
// import Getreviews from './components/Reviews';


function App() {
// const navigate = useNavigate()

  return (
    <>
       <ScrollToTop />
        <Routes>
          <Route path="*" element= {<MainLayout /*navigate={navigate}*/ />} />
          <Route path="/login" element= {<Login />} />
          <Route path="/register" element= {<Register />} />
        </Routes>

    </>
  );
}

function MainLayout() {
  // const routesWithNavBarFooter = ["/", "/projects", "/project/:id","/sell" , "/projectReviews/:id"];
  const routesWithNavBarFooter = ["/", "/projects", "/project/:id","/sell","/myProfile","/myProjects","/editProject/:id","/buy","/thankYou"];

  return (
    <>
     <NavBar />
      <Routes>
        <Route path="/" element={<Home  />} />
        <Route path="/projects" element={<ProjectScreen />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/sell" element= {<Sell />} />
        <Route path="/myProfile" element= {<EditProfile />}/>
        <Route path="/myProjects" element= {<MyProject />}/>
        <Route path="/editProject/:id" element= {<EditProjectDetails />}/>
        <Route path="/buy" element= {<Buy />}/>
        <Route path="/thankYou" element= {<ThankYou />}/>
        {/* <Route path="/projectReviews/:id" element= {<Getreviews />} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
