import { useEffect, useState } from "react";
import api from "../services/api";


function Jobs(){

    const [jobs,setJobs] = useState([]);

    const [loading,setLoading] = useState(true);



    useEffect(()=>{

        fetchJobs();

    },[]);




    const fetchJobs = async()=>{

        try{

            const response = await api.get(
                "/jobs/"
            );


            console.log(
                "Jobs:",
                response.data
            );


            setJobs(response.data);


        }
        catch(error){

            console.log(
                "Job Error:",
                error
            );

        }
        finally{

            setLoading(false);

        }

    };





    const applyJob = async(jobId)=>{


        try{


            const resumeId = prompt(
                "Enter Resume ID to apply"
            );


            const token =
            localStorage.getItem("token");



            const response = await api.post(

                `/applications/apply/${jobId}?resume_id=${resumeId}`,

                {},

                {
                    headers:{
                        Authorization:
                        `Bearer ${token}`
                    }
                }

            );



            alert(
                response.data.message
            );



        }
        catch(error){


            console.log(
                error
            );


            alert(
                "Application failed"
            );


        }


    };





    if(loading){

        return <h2>Loading Jobs...</h2>

    }





    return(

        <div
        style={{
            padding:"40px",
            background:"#f4f4f4",
            minHeight:"100vh"
        }}
        >


            <h1>
                💼 Available Jobs
            </h1>




            {
                jobs.map(job=>(


                    <div
                    key={job.id}
                    style={{
                        background:"white",
                        padding:"25px",
                        marginTop:"20px",
                        borderRadius:"10px"
                    }}
                    >


                        <h2>
                            {job.title}
                        </h2>


                        <h3>
                            {job.company}
                        </h3>


                        <p>
                            📍 {job.location}
                        </p>


                        <p>
                            {job.description}
                        </p>


                        <p>
                            <b>
                            Required Skills:
                            </b>

                            {" "}

                            {job.required_skills}

                        </p>




                        <button

                        onClick={()=>applyJob(job.id)}

                        style={{

                            background:"#007bff",

                            color:"white",

                            padding:"10px 20px",

                            border:"none",

                            borderRadius:"5px",

                            cursor:"pointer"

                        }}

                        >

                        Apply Now

                        </button>



                    </div>


                ))
            }



        </div>


    );

}


export default Jobs;