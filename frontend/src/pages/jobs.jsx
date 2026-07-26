import { useEffect, useState } from "react";
import api from "../services/api";

function Jobs() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const [appliedJobs, setAppliedJobs] = useState([]);

    useEffect(() => {

        fetchJobs();
        fetchAppliedJobs();

    }, []);




    const fetchJobs = async () => {

        try {

            const response = await api.get("/jobs/");

            console.log("Jobs:", response.data);

            setJobs(response.data);

        }
        catch (error) {

            console.log("Job Error:", error);

        }
        finally {

            setLoading(false);

        }

    };




    const fetchAppliedJobs = async () => {

        try {

            const response = await api.get(
                "/applications/my-applications"
            );

            const ids = response.data.map(app => app.application_id);

            const appliedTitles = response.data.map(app => app.job_title);

            setAppliedJobs(appliedTitles);

        }
        catch (error) {

            console.log(error);

        }

    };





    const applyJob = async (jobId, jobTitle) => {

        try {

            const response = await api.post(
                `/applications/apply/${jobId}`
            );

            alert(response.data.message);

            setAppliedJobs(prev => [...prev, jobTitle]);

        }
        catch (error) {

            console.log(error);

            if (error.response?.data?.message === "Already applied for this job") {

                setAppliedJobs(prev => [...prev, jobTitle]);

                alert("Already Applied");

            } else {

                alert(
                    error.response?.data?.detail ||
                    "Application failed"
                );

            }

        }

    };





    if (loading) {

        return <h2>Loading Jobs...</h2>;

    }





    return (

        <div
            style={{
                padding: "40px",
                background: "#f4f4f4",
                minHeight: "100vh"
            }}
        >

            <h1>
                💼 Available Jobs
            </h1>

            {

                jobs.map((job) => {

                    const applied = appliedJobs.includes(job.title);

                    return (

                        <div
                            key={job.id}
                            style={{
                                background: "white",
                                padding: "25px",
                                marginTop: "20px",
                                borderRadius: "10px",
                                boxShadow: "0 0 10px rgba(0,0,0,0.1)"
                            }}
                        >

                            <h2>{job.title}</h2>

                            <h3>{job.company}</h3>

                            <p>📍 {job.location}</p>

                            <p>{job.description}</p>

                            <p>
                                <b>Required Skills:</b>{" "}
                                {job.required_skills}
                            </p>

                            <button

                                disabled={applied}

                                onClick={() =>
                                    applyJob(job.id, job.title)
                                }

                                style={{

                                    background: applied
                                        ? "#ffc107"
                                        : "#007bff",

                                    color: applied
                                        ? "black"
                                        : "white",

                                    padding: "10px 20px",

                                    border: "none",

                                    borderRadius: "5px",

                                    cursor: applied
                                        ? "not-allowed"
                                        : "pointer"

                                }}

                            >

                                {applied ? "Applied" : "Apply Now"}

                            </button>

                        </div>

                    );

                })

            }

        </div>

    );

}

export default Jobs;