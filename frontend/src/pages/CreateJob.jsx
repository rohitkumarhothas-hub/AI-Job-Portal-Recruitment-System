import { useState } from "react";
import api from "../services/api";


function CreateJob(){

    const [job,setJob] = useState({

        title:"",
        company:"",
        location:"",
        description:"",
        required_skills:"",
        apply_link:""

    });



    const handleChange = (e)=>{

        setJob({

            ...job,

            [e.target.name]: e.target.value

        });

    };





    const createJob = async()=>{


        try{


            const token = localStorage.getItem("token");



            const response = await api.post(

                "/jobs/",

                job,

                {

                    headers:{

                        Authorization:
                        `Bearer ${token}`,

                        "Content-Type":
                        "application/json"

                    }

                }

            );



            console.log(
                "Job Created:",
                response.data
            );



            alert(
                "Job Created Successfully"
            );



            setJob({

                title:"",
                company:"",
                location:"",
                description:"",
                required_skills:"",
                apply_link:""

            });


        }



        catch(error){


            console.log(
                "Create Job Error:",
                error.response?.data
            );


            alert(
                "Job Creation Failed"
            );


        }


    };







    return(

        <div
        style={{
            padding:"40px"
        }}
        >


            <h1>
                Create Job
            </h1>



            <input

            name="title"

            placeholder="Job Title"

            value={job.title}

            onChange={handleChange}

            />

            <br/><br/>




            <input

            name="company"

            placeholder="Company Name"

            value={job.company}

            onChange={handleChange}

            />

            <br/><br/>




            <input

            name="location"

            placeholder="Location"

            value={job.location}

            onChange={handleChange}

            />

            <br/><br/>




            <textarea

            name="description"

            placeholder="Job Description"

            value={job.description}

            onChange={handleChange}

            />


            <br/><br/>




            <input

            name="required_skills"

            placeholder="Required Skills"

            value={job.required_skills}

            onChange={handleChange}

            />

            <br/><br/>




            <input

            name="apply_link"

            placeholder="Apply Link"

            value={job.apply_link}

            onChange={handleChange}

            />

            <br/><br/>




            <button

            onClick={createJob}

            style={{

                padding:"10px 20px",

                background:"blue",

                color:"white",

                border:"none",

                cursor:"pointer"

            }}

            >

            Create Job

            </button>



        </div>

    );

}



export default CreateJob;