import axios from "api/axios";
import FooterSmall from "components/Footers/FooterSmall";
import Navbar from "components/Navbars/AuthNavbar";
import useAuth from "hooks/useAuth";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login =()=> {

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const userRef = useRef("");
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const LOGIN_URL = "/api/login";
  const from = "/admin/dashboard";

  

    useEffect(() => {
    
      
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(
          LOGIN_URL,
          JSON.stringify({ email: user, password: pwd }),
          {
            headers: { "Content-Type": "application/json" },
            // withCredentials: true
          }
        );
  
        const accessToken = response?.data?.access_token;
        const newUser = response?.data?.user;
        const customer_id = response?.data?.customer_id;
  
        localStorage.setItem(
          "user",
          JSON.stringify({ user, newUser, accessToken })
        );
        console.log(JSON.stringify({ user, newUser, accessToken,customer_id }));
        const userData = { user, newUser, accessToken,customer_id };
        setAuth(userData);
  
        navigate(from);
        toast.info("Login Successful");
      } catch (err) {
        if (!err?.response) {
          console.log(err);
          setErrMsg("No Server Response");
          toast.error("No Server Response", err);
        } else if (err.response?.status === 400) {
          setErrMsg("Missing Username or Password");
          toast.error("Missing Username or Password", err);
        } else if (err.response?.status === 401) {
          setErrMsg("Unauthorized");
          toast.error("Unauthorized", err);
        } else {
          setErrMsg("Login Failed");
          toast.error("Login Failed", err);
        }
      }
    };
  
    const tos =()=>{
      toast.success("Login Successfull");
    }
  return (
    <>
   
                <div className="container mx-auto px-4 h-full">
                  <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                        <div className="rounded-t mb-0 px-6 py-6">
                         
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                          <div className="text-blueGray-400 text-center mb-3 font-bold">
                            <small>sign in with credentials</small>
                          </div>
                          <form onSubmit={handleSubmit}>
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Email"
                                autoComplete="new-email"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                              />
                            </div>

                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Password
                              </label>
                              <input
                                type="password"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="Password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                autoComplete="new-password"
                              />
                            </div>
                            <div>
                              <label className="inline-flex items-center cursor-pointer">
                                <input
                                  id="customCheckLogin"
                                  type="checkbox"
                                  className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                />
                                <span className="ml-2 text-sm font-semibold text-blueGray-600">
                                  Remember me
                                </span>
                              </label>
                            </div>
                            <div className="text-center mt-6">
                              <button
                                className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                type="submit"
                             >
                                Sign In
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="flex flex-wrap mt-6 relative">
                        <div className="w-1/2">
                          <a
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            className="text-blueGray-200"
                          >
                            <small>Forgot password?</small>
                          </a>
                        </div>
                        <div className="w-1/2 text-right">
                          <Link to="/auth/register" className="text-blueGray-200">
                            <small>Create new account</small>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              
    </>
  );
}
export default Login;