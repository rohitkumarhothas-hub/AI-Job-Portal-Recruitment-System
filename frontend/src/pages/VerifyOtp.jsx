import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";


function VerifyOTP() {


    const location = useLocation();

    const navigate = useNavigate();



    const [email, setEmail] = useState(
        location.state?.email || ""
    );


    const [otp, setOtp] = useState("");


    const [message, setMessage] = useState("");


    const [error, setError] = useState("");





    const verifyOTP = async (e) => {


        e.preventDefault();



        try {


            const response = await api.post(

                "/auth/verify-otp",

                null,

                {

                    params:{

                        email: email,

                        otp: otp

                    }

                }

            );



            setMessage(
                response.data.message
            );



            setTimeout(()=>{


                navigate("/");


            },1500);



        }


        catch(error){


            setError(

                error.response?.data?.detail ||

                "OTP verification failed"

            );


        }


    };






    const resendOTP = async()=>{


        try{


            await api.post(

                "/auth/resend-otp",

                null,

                {

                    params:{

                        email:email

                    }

                }

            );



            setMessage(
                "New OTP sent"
            );



            setError("");



        }


        catch(error){


            setError(

                error.response?.data?.detail ||

                "Failed to resend OTP"

            );


        }


    };






    return (


        <div>


            <h2>
                Verify Email
            </h2>




            <form onSubmit={verifyOTP}>



                <input


                    type="email"


                    placeholder="Email"


                    value={email}


                    onChange={(e)=>

                        setEmail(e.target.value)

                    }


                />





                <input


                    type="text"


                    placeholder="Enter OTP"


                    value={otp}


                    onChange={(e)=>

                        setOtp(e.target.value)

                    }


                />





                <button type="submit">


                    Verify OTP


                </button>



            </form>





            <button onClick={resendOTP}>


                Resend OTP


            </button>






            {

                message &&

                <p>

                    {message}

                </p>

            }





            {

                error &&

                <p>

                    {error}

                </p>

            }



        </div>


    );


}


export default VerifyOTP;