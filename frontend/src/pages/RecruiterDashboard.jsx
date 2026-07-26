import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


function RecruiterDashboard() {


  const [applications, setApplications] = useState([]);

  const navigate = useNavigate();



  useEffect(() => {

    fetchApplications();

  }, []);





  const fetchApplications = async () => {

    try {

      const response = await api.get(
        "/applications/all"
      );


      console.log(
        "Applications:",
        response.data
      );


      setApplications(
        response.data
      );


    } catch(error) {

      console.log(error);

    }

  };






  const updateStatus = async (
    applicationId,
    status
  ) => {


    try {


      const response = await api.put(

        `/applications/${applicationId}/status`,

        null,

        {
          params:{
            status:status
          }
        }

      );


      console.log(
        response.data
      );


      alert(
        `Application ${status}`
      );


      fetchApplications();



    } catch(error) {


      console.log(error);


      alert(
        "Status update failed"
      );


    }


  };






  // Open original uploaded PDF resume

  const viewResume = (resumeId) => {


    if(!resumeId){


      alert(
        "Resume not available"
      );


      return;


    }



    window.open(

      `${api.defaults.baseURL}/applications/resume-file/${resumeId}`,

      "_blank"

    );


  };






  return (


    <div

      style={{

        padding:"40px",

        background:"#f4f4f4",

        minHeight:"100vh"

      }}

    >



      <h1>
        Recruiter Dashboard
      </h1>





      <button

        onClick={() =>
          navigate("/create-job")
        }


        style={{

          background:"#007bff",

          color:"white",

          padding:"12px 25px",

          border:"none",

          borderRadius:"5px",

          cursor:"pointer",

          marginBottom:"30px"

        }}

      >

        + Create New Job

      </button>







      {

        applications.length === 0

        ?

        (

          <h3>
            No applications received
          </h3>

        )


        :


        applications.map((app)=>(


          <div

            key={app.application_id}


            style={{

              background:"white",

              padding:"25px",

              marginTop:"20px",

              borderRadius:"10px",

              boxShadow:"0 0 10px rgba(0,0,0,0.1)"

            }}

          >




            <h2>
              {app.candidate_name}
            </h2>




            <p>
              Email: {app.candidate_email}
            </p>




            <h3>
              Applied For: {app.job_title}
            </h3>




            <p>
              Resume: {app.resume_name}
            </p>




            <h2>
              AI Match Score: {app.match_score}%
            </h2>




            <p>

              Status:

              <b>
                {" "}{app.status}
              </b>

            </p>







            <button

              onClick={() =>
                viewResume(app.resume_id)
              }


              style={{

                background:"#007bff",

                color:"white",

                padding:"10px 20px",

                border:"none",

                marginRight:"10px",

                cursor:"pointer",

                borderRadius:"5px"

              }}

            >

              View Resume

            </button>








            <button

              onClick={() =>
                updateStatus(
                  app.application_id,
                  "Shortlisted"
                )
              }


              style={{

                background:"green",

                color:"white",

                padding:"10px 20px",

                border:"none",

                marginRight:"10px",

                cursor:"pointer",

                borderRadius:"5px"

              }}

            >

              Shortlist

            </button>








            <button

              onClick={() =>
                updateStatus(
                  app.application_id,
                  "Rejected"
                )
              }


              style={{

                background:"red",

                color:"white",

                padding:"10px 20px",

                border:"none",

                cursor:"pointer",

                borderRadius:"5px"

              }}

            >

              Reject

            </button>




          </div>


        ))

      }




    </div>


  );


}


export default RecruiterDashboard;