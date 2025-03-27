import ProgressBar from "./components/ProgressBar";
import Forum from "./components/Forum";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateThread from "./components/CreateThread"
import Thread from "./components/Thread"
import LandingPage from "./components/landingpage"
import Login from "./components/login"
import Signup from "./components/signup"
import PointsPage from "./components/pointpage"
import Medication from "./components/Medication"
import ChatbotEmbed from "./components/Chatbot";
import DashBoard from "./Dashboard";
import MealPlan from "./MealPlan";




function App() {
    return(
      <>
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/points" element={<PointsPage />} /> 
                <Route path="/progressbar" element={<ProgressBar />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/create-thread" element={<CreateThread />} />
                <Route path="/thread/:id" element={<Thread />} />
                <Route path="/medication" element={<Medication />} /> 
                <Route path="/chatbot" element={<ChatbotEmbed />} /> 

                <Route path="/dashboard" element={<DashBoard />} /> 
                <Route path="/mealplan" element={<MealPlan />} /> 
            </Routes>
        </Router>
      </>
    );
}

export default App
