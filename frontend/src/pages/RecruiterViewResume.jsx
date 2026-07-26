import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";


function RecruiterViewResume() {


  const { resumeId } = useParams();

  const navigate = useNavigate();


  const [resume,setResume] = useState(null);



  useEffect(()=>{

    fetchResume();

  },[]);



  const fetchResume = async()=>{

    try{

      const response = await api.get(
        `/applications/resume/${resumeId}`
      );


      setResume(response.data);


    }
    catch(error){

      console.log(error);

      alert("Unable to load resume");

    }

  };



  if(!resume){

    return <h2>Loading Resume...</h2>;

  }



  return (

    <div

      style={{

        padding:"40px",

        background:"#f4f4f4",

        minHeight:"100vh"

      }}

    >


      <button

        onClick={()=>navigate(-1)}

        style={{

          padding:"10px 20px",

          background:"#333",

          color:"white",

          border:"none",

          borderRadius:"5px",

          cursor:"pointer"

        }}

      >

        ⬅ Back to Applications

      </button>



      <div

        style={{

          background:"white",

          padding:"30px",

          marginTop:"20px",

          borderRadius:"10px"

        }}

      >


      <h1>
        Candidate Resume
      </h1>


      <h3>
        📄 {resume.filename}
      </h3>


      <h2>
        ATS Score: {resume.ats_score}%
      </h2>



      <h2>
        Skills
      </h2>

      <p>
        {resume.skills}
      </p>




      <h2>
        Missing Skills
      </h2>

      <p>
        {resume.missing_skills}
      </p>




      <h2>
        AI Feedback
      </h2>

      <pre>

        {resume.ai_feedback}

      </pre>




      <h2>
        Resume Text
      </h2>


      <p>

        {resume.resume_text}

      </p>



      </div>


    </div>

  );

}


export default RecruiterViewResume;