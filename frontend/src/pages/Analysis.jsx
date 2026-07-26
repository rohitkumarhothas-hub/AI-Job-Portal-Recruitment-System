import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";


function Analysis() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [resume, setResume] = useState(null);



  useEffect(() => {

    fetchResume();

  }, []);



  const fetchResume = async () => {

    try {

      const response = await api.get(
        `/resume/${id}`
      );


      console.log(
        "Analysis Data:",
        response.data
      );


      setResume(response.data);


    } catch(error) {

      console.log(
        "Analysis Error:",
        error
      );

    }

  };



  if(!resume){

    return (

      <h2 style={{padding:"40px"}}>

        Loading Analysis...

      </h2>

    );

  }



  return (

    <div

      style={{

        padding:"40px",

        background:"#f4f4f4",

        minHeight:"100vh"

      }}

    >


      {/* BACK BUTTON */}

      <button

        onClick={() => navigate("/dashboard")}

        style={{

          padding:"10px 20px",

          background:"#007bff",

          color:"white",

          border:"none",

          borderRadius:"8px",

          cursor:"pointer",

          marginBottom:"20px"

        }}

      >

        ← Back to Dashboard

      </button>




      <h1>
        🤖 AI Resume Analysis
      </h1>





      {/* ATS SCORE */}

      <div

        style={{

          background:"white",

          padding:"30px",

          marginTop:"30px",

          borderRadius:"15px",

          textAlign:"center"

        }}

      >

        <h2>
          ATS Score
        </h2>


        <h1

          style={{

            fontSize:"50px",

            color:"#007bff"

          }}

        >

          {resume.ats_score}%

        </h1>


      </div>







      {/* DETECTED SKILLS */}


      <div

        style={{

          background:"white",

          padding:"30px",

          marginTop:"30px",

          borderRadius:"15px"

        }}

      >

        <h2>
          💻 Detected Skills
        </h2>


        {

          (resume.skills || []).map(

            (skill,index)=>(


              <span

                key={index}

                style={{

                  display:"inline-block",

                  background:"#d4edda",

                  padding:"8px 15px",

                  margin:"8px",

                  borderRadius:"20px"

                }}

              >

                {skill}

              </span>


            )

          )

        }


      </div>









      {/* MISSING SKILLS */}


      <div

        style={{

          background:"white",

          padding:"30px",

          marginTop:"30px",

          borderRadius:"15px"

        }}

      >

        <h2>
          📚 Missing Skills
        </h2>



        {

          (resume.missing_skills || []).length === 0 ?


          (

            <p>
              🎉 Great! No missing skills found.
            </p>

          )


          :


          (

            resume.missing_skills.map(

              (skill,index)=>(


                <span

                  key={index}

                  style={{

                    display:"inline-block",

                    background:"#f8d7da",

                    padding:"8px 15px",

                    margin:"8px",

                    borderRadius:"20px"

                  }}

                >

                  {skill}

                </span>


              )

            )

          )

        }


      </div>









      {/* AI FEEDBACK */}


      <div

        style={{

          background:"white",

          padding:"30px",

          marginTop:"30px",

          borderRadius:"15px"

        }}

      >


        <h2>
          🤖 AI Feedback
        </h2>



        {

          resume.ai_feedback &&

          typeof resume.ai_feedback === "object"

          ?

          <>


            <h3>
              Summary
            </h3>


            <p>

              {resume.ai_feedback.summary || 
              "No summary available"}

            </p>





            <h3>
              ✅ Strengths
            </h3>


            {

              (resume.ai_feedback.strengths || []).map(

                (item,index)=>(

                  <p key={index}>
                    • {item}
                  </p>

                )

              )

            }







            <h3>
              ⚠️ Weaknesses
            </h3>


            {

              (resume.ai_feedback.weaknesses || []).map(

                (item,index)=>(

                  <p key={index}>
                    • {item}
                  </p>

                )

              )

            }








            <h3>
              🚀 Suggestions
            </h3>


            {

              (resume.ai_feedback.suggestions || []).map(

                (item,index)=>(

                  <p key={index}>
                    • {item}
                  </p>

                )

              )

            }



          </>


          :


          <p>

            {resume.ai_feedback || 
            "AI feedback unavailable"}

          </p>


        }


      </div>



    </div>

  );

}


export default Analysis;