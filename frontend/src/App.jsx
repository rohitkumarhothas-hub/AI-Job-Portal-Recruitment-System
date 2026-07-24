import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";


import Dashboard from "./pages/Dashboard";

import UploadResume from "./pages/UploadResume";

import Analysis from "./pages/Analysis";

import JobMatch from "./pages/JobMatch";

import Jobs from "./pages/Jobs";


import RecruiterDashboard from "./pages/RecruiterDashboard";

import CreateJob from "./pages/CreateJob";


import ProtectedRoute from "./components/ProtectedRoute";



function App() {


  return (


    <BrowserRouter>


      <Routes>



        {/* Login */}

        <Route

          path="/"

          element={<Login />}

        />





        {/* Register */}

        <Route

          path="/register"

          element={<Register />}

        />





        {/* OTP Verification */}

        <Route

          path="/verify-otp"

          element={<VerifyOTP />}

        />







        {/* =====================
            CANDIDATE ROUTES
        ====================== */}




        <Route

          path="/dashboard"

          element={

            <ProtectedRoute allowedRole="candidate">

              <Dashboard />

            </ProtectedRoute>

          }

        />





        <Route

          path="/upload"

          element={

            <ProtectedRoute allowedRole="candidate">

              <UploadResume />

            </ProtectedRoute>

          }

        />





        <Route

          path="/analysis/:id"

          element={

            <ProtectedRoute allowedRole="candidate">

              <Analysis />

            </ProtectedRoute>

          }

        />





        <Route

          path="/jobs"

          element={

            <ProtectedRoute allowedRole="candidate">

              <Jobs />

            </ProtectedRoute>

          }

        />





        <Route

          path="/job-match"

          element={

            <ProtectedRoute allowedRole="candidate">

              <JobMatch />

            </ProtectedRoute>

          }

        />









        {/* =====================
            RECRUITER ROUTES
        ====================== */}





        <Route

          path="/recruiter"

          element={

            <ProtectedRoute allowedRole="recruiter">

              <RecruiterDashboard />

            </ProtectedRoute>

          }

        />





        <Route

          path="/create-job"

          element={

            <ProtectedRoute allowedRole="recruiter">

              <CreateJob />

            </ProtectedRoute>

          }

        />





      </Routes>


    </BrowserRouter>


  );

}



export default App;