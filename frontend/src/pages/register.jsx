import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";


function Register() {


  const [name,setName] = useState("");

  const [email,setEmail] = useState("");

  const [password,setPassword] = useState("");

  const [role,setRole] = useState("candidate");


  const navigate = useNavigate();




  const handleRegister = async()=>{


    if(!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){

      alert("Enter a valid email address");

      return;

    }



    try{


      const response = await api.post(

        "/auth/register",

        {

          name:name,

          email:email,

          password:password,

          role:role

        }

      );



      console.log(response.data);



      alert(
        "OTP sent to your email"
      );



      navigate(

        "/verify-otp",

        {

          state:{

            email:email

          }

        }

      );



    }


    catch(error){


      console.log(error);



      alert(

        error.response?.data?.detail ||

        "Registration Failed"

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

          borderRadius:"10px"

        }}

      >


        <h2>
          Create Account
        </h2>




        <input

          placeholder="Name"

          value={name}

          onChange={(e)=>setName(e.target.value)}

          style={{

            width:"100%",

            padding:"10px",

            marginTop:"10px"

          }}

        />




        <input

          placeholder="Email"

          value={email}

          onChange={(e)=>setEmail(e.target.value)}

          style={{

            width:"100%",

            padding:"10px",

            marginTop:"10px"

          }}

        />




        <input

          type="password"

          placeholder="Password"

          value={password}

          onChange={(e)=>setPassword(e.target.value)}

          style={{

            width:"100%",

            padding:"10px",

            marginTop:"10px"

          }}

        />





        <select

          value={role}

          onChange={(e)=>setRole(e.target.value)}

          style={{

            width:"100%",

            padding:"10px",

            marginTop:"10px"

          }}

        >


          <option value="candidate">

            Candidate

          </option>


          <option value="recruiter">

            Recruiter

          </option>


        </select>






        <button

          onClick={handleRegister}

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

          Register

        </button>





        <p>

          Already have account?

          {" "}

          <Link to="/">

            Login

          </Link>


        </p>




      </div>


    </div>


  );

}


export default Register;