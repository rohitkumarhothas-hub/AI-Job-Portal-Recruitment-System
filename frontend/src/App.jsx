import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "./pages/login";
import Register from "./pages/register";
import VerifyOTP from "./pages/VerifyOtp";


import Dashboard from "./pages/dashboard";

import UploadResume from "./pages/UploadResume";

import Analysis from "./pages/Analysis";

import JobMatch from "./pages/jobmatch";

import Jobs from "./pages/jobs";


import RecruiterDashboard from "./pages/RecruiterDashboard";

import CreateJob from "./pages/CreateJob";

import RecruiterViewResume from "./pages/RecruiterViewResume";


import ProtectedRoute from "./components/ProtectedRoute";



function App( {


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





        <Route

          path="/recruiter/resume/:resumeId"

          element={

            <ProtectedRoute allowedRole="recruiter">

              <RecruiterViewResume />

            </ProtectedRoute>

          }

        />





      </Routes>


    </BrowserRouter>


  );

}



export default App;