import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";


function Login() {


  const [email,setEmail] = useState("");

  const [password,setPassword] = useState("");


  const navigate = useNavigate();





  const handleLogin = async()=>{


    try{


      const formData = new URLSearchParams();



      formData.append(
        "username",
        email
      );



      formData.append(
        "password",
        password
      );





      const response = await api.post(

        "/auth/login",

        formData

      );





      console.log(
        "Login response:",
        response.data
      );





      // Save token

      localStorage.setItem(

        "token",

        response.data.access_token

      );





      // Save role

      localStorage.setItem(

        "role",

        response.data.role

      );





      console.log(

        "Saved role:",

        localStorage.getItem("role")

      );





      alert(
        "Login Successful!"
      );





      // Role based redirect

      if(

        response.data.role === "recruiter"

      ){

        navigate("/recruiter");


      }

      else{


        navigate("/dashboard");


      }





    }


    catch(error){


      console.log(
        "Login Error:",
        error
      );



      if(error.response){


        console.log(
          error.response.data
        );


      }



      alert(
        "Login Failed!"
      );


    }


  };







  return (


    <div

      style={{

        display:"flex",

        justifyContent:"center",

        alignItems:"center",

        height:"100vh",

        background:"#f4f4f4"

      }}

    >



      <div

        style={{

          width:"350px",

          background:"white",

          padding:"30px",

          borderRadius:"10px",

          boxShadow:
          "0 0 10px rgba(0,0,0,0.1)"

        }}

      >



        <h2 style={{
          textAlign:"center"
        }}>

          AI Resume Analyzer

        </h2>





        <input

          type="email"

          placeholder="Enter Email"

          value={email}

          onChange={(e)=>
            setEmail(e.target.value)
          }

          style={{

            width:"100%",

            padding:"10px",

            marginTop:"20px"

          }}

        />





        <input

          type="password"

          placeholder="Enter Password"

          value={password}

          onChange={(e)=>
            setPassword(e.target.value)
          }

          style={{

            width:"100%",

            padding:"10px",

            marginTop:"15px"

          }}

        />





        <button

          onClick={handleLogin}

          style={{

            width:"100%",

            padding:"10px",

            marginTop:"20px",

            background:"#007bff",

            color:"white",

            border:"none",

            cursor:"pointer"

          }}

        >

          Login

        </button>





        <p style={{
          textAlign:"center"
        }}>

          Don't have an account?

          {" "}

          <Link to="/register">

            Register

          </Link>


        </p>




      </div>



    </div>


  );

}


export default Login;