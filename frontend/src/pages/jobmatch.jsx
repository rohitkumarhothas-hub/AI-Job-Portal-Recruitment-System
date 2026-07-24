import { useState } from "react";
import api from "../services/api";


function JobMatch(){

  const [resumeId,setResumeId] = useState("");
  const [jobId,setJobId] = useState("");

  const [result,setResult] = useState(null);



  const handleMatch = async()=>{

    try{

      const token = localStorage.getItem("token");


      const response = await api.post(
        `/analysis/job-match/${resumeId}/${jobId}`,
        {},
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


      console.log(response.data);


      setResult(response.data);


    }
    catch(error){

      console.log(error);

      alert("Matching failed");

    }

  };



  return(

    <div
      style={{
        padding:"40px",
        background:"#f4f4f4",
        minHeight:"100vh"
      }}
    >

      <h1>
        🎯 Resume Job Matching
      </h1>


      <div
        style={{
          background:"white",
          padding:"30px",
          borderRadius:"15px"
        }}
      >

        <input
          placeholder="Enter Resume ID"
          value={resumeId}
          onChange={(e)=>setResumeId(e.target.value)}
        />


        <br/><br/>


        <input
          placeholder="Enter Job ID"
          value={jobId}
          onChange={(e)=>setJobId(e.target.value)}
        />


        <br/><br/>


        <button
          onClick={handleMatch}
        >
          Analyze Match
        </button>


      </div>



      {
        result &&

        <div
          style={{
            marginTop:"30px",
            background:"white",
            padding:"30px",
            borderRadius:"15px"
          }}
        >

          <h2>
            Result
          </h2>

          <pre>
            {result.analysis}
          </pre>


        </div>

      }


    </div>

  );

}


export default JobMatch;