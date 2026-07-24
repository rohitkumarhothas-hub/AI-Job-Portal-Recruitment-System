import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {

  const [resumes, setResumes] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    fetchResumes();
  }, []);



  const fetchResumes = async () => {

    try {

      const response = await api.get(
        "/resume/my-resumes"
      );

      console.log(response.data);

      setResumes(response.data);


    } catch(error){

      console.log(error);

    }

  };



  const deleteResume = async (id) => {

    try {

      await api.delete(
        `/resume/${id}`
      );


      alert("Resume deleted");

      fetchResumes();


    } catch(error){

      console.log(error);

    }

  };



  const averageScore =
    resumes.length > 0
      ? Math.round(
          resumes.reduce(
            (sum, r) => sum + r.ats_score,
            0
          ) / resumes.length
        )
      : 0;



  return (

    <div
      style={{
        padding:"40px",
        background:"#f4f4f4",
        minHeight:"100vh"
      }}
    >

      <h1>
        AI Resume Analyzer Dashboard
      </h1>


      <div
        style={{
          display:"flex",
          gap:"20px",
          marginTop:"30px"
        }}
      >

        <div
          style={{
            background:"white",
            padding:"20px",
            borderRadius:"10px",
            width:"200px"
          }}
        >

          <h3>
            Total Resumes
          </h3>

          <h1>
            {resumes.length}
          </h1>

        </div>



        <div
          style={{
            background:"white",
            padding:"20px",
            borderRadius:"10px",
            width:"200px"
          }}
        >

          <h3>
            Average Score
          </h3>

          <h1>
            {averageScore}%
          </h1>

        </div>


      </div>



      <div style={{marginTop:"30px"}}>


        <button
          onClick={() => navigate("/upload")}
          style={{
            padding:"12px 25px",
            background:"#007bff",
            color:"white",
            border:"none",
            borderRadius:"5px",
            cursor:"pointer",
            marginRight:"15px"
          }}
        >
          Upload New Resume
        </button>



        <button
          onClick={() => navigate("/jobs")}
          style={{
            padding:"12px 25px",
            background:"#6f42c1",
            color:"white",
            border:"none",
            borderRadius:"5px",
            cursor:"pointer",
            marginRight:"15px"
          }}
        >
          Find Jobs
        </button>



        <button
          onClick={() => navigate("/recruiter")}
          style={{
            padding:"12px 25px",
            background:"#28a745",
            color:"white",
            border:"none",
            borderRadius:"5px",
            cursor:"pointer"
          }}
        >
          Recruiter Dashboard
        </button>


      </div>



      <h2 style={{marginTop:"40px"}}>
        Resume History
      </h2>



      {
        resumes.length === 0 ?

        <p>
          No resumes uploaded
        </p>

        :

        resumes.map((resume)=>(

          <div
            key={resume.resume_id}
            style={{
              background:"white",
              padding:"25px",
              marginTop:"20px",
              borderRadius:"10px",
              boxShadow:"0 0 10px rgba(0,0,0,0.1)"
            }}
          >

            <h2>
              📄 {resume.filename}
            </h2>


            <h3>
              ATS Score: {resume.ats_score}%
            </h3>



            <p>
              Skills:
            </p>


            {
              resume.skills.map(
                (skill,index)=>(
                  <span
                    key={index}
                    style={{
                      background:"#e3f2fd",
                      padding:"5px 10px",
                      marginRight:"8px",
                      borderRadius:"20px"
                    }}
                  >
                    {skill}
                  </span>
                )
              )
            }



            <div style={{marginTop:"20px"}}>


              <button
                onClick={() =>
                  navigate(
                    `/analysis/${resume.resume_id}`
                  )
                }
                style={{
                  padding:"8px 15px",
                  marginRight:"10px"
                }}
              >
                View Analysis
              </button>



              <button
                onClick={() =>
                  deleteResume(resume.resume_id)
                }
                style={{
                  padding:"8px 15px",
                  background:"red",
                  color:"white",
                  border:"none"
                }}
              >
                Delete
              </button>


            </div>


          </div>

        ))

      }


    </div>

  );
}


export default Dashboard;