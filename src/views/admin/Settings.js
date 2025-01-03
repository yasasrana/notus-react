import React, { useEffect, useState } from "react";

// components

import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";
import axios from "api/axios";
import { Toaster,toast } from "react-hot-toast";
import { DatePicker } from "react-rainbow-components";


const loadDefaultCustomerObj = () => {
  return {
    CustomerID:-1, // required|unique:customers,CustomerID|max:255
    FullName: "", // required|max:255
    Username:"",
    NIC: "", // required|max:20
    DOB: new Date(), // required|date
    Gender: "Male", // required|max:10
    StreetAddress: "", // required|max:255
    City: "", // required|max:100
    State: "", // required|max:100
    ZipCode: "", // required|max:10
    PrimaryPhoneNumber: "", // required|max:15
    Email: "", // required|email|unique:customers,Email
    DeliveryMethod: "", // required|max:50
    EmergencyContactName: "", // required|max:255
    EmergencyContactPhone: "", // required|max:15
    password: "",
  };
};

 const Settings=()=> {
  const [customer, setCustomer] = useState(loadDefaultCustomerObj);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .required-star {
        color: red;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const setCustomerDetails = (e, state) => {
    setCustomer({ ...customer, [state]: e });
  };

  const clearall = () => {
    setCustomer(loadDefaultCustomerObj);
  }

  const validateCustomerData = (customer) => {
    if (!customer.CustomerID) return "CustomerID is required.";
    if (!customer.FullName) return "FullName is required.";
    if (!customer.NIC) return "NIC is required.";
    if (!customer.DOB) return "DOB is required.";
    if (!customer.Gender) return "Gender is required.";
    if (!customer.StreetAddress) return "StreetAddress is required.";
    if (!customer.City) return "City is required.";
    if (!customer.State) return "State is required.";
    if (!customer.ZipCode) return "ZipCode is required.";
    if (!customer.PrimaryPhoneNumber) return "PrimaryPhoneNumber is required.";
    if (!customer.Email) return "Email is required.";
    if (!customer.DeliveryMethod) return "DeliveryMethod is required.";
    if (!customer.EmergencyContactName) return "EmergencyContactName is required.";
    if (!customer.EmergencyContactPhone) return "EmergencyContactPhone is required.";
    if (!customer.Username) return "Username is required.";
    if (!customer.password) return "Password is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateCustomerData(customer);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    const customerData = {
      CustomerID: customer.CustomerID,
      FullName: customer.FullName,
      NIC: customer.NIC,
      DOB: customer.DOB,
      Gender: customer.Gender,
      StreetAddress: customer.StreetAddress,
      City: customer.City,
      State: customer.State,
      ZipCode: customer.ZipCode,
      PrimaryPhoneNumber: customer.PrimaryPhoneNumber,
      Email: customer.Email,
      email: customer.Email,
      DeliveryMethod: customer.DeliveryMethod,
      EmergencyContactName: customer.EmergencyContactName,
      EmergencyContactPhone: customer.EmergencyContactPhone,
      name: customer.Username,
      password: customer.password,
    };
  
    console.log('yes2', customerData);
  
    const toastId = toast.loading("Saving...");
    try {
      console.log('yes', customer);
      // props.changeLoader(true);
      const response = await axios.post("/api/customers", customerData, {
        headers: { "Content-Type": "application/json" },
      });
      toast.dismiss(toastId); // Dismiss the loading toast
      toast.success("Saving Successful");
      //fetchScans(currentPage);
      setCustomer(loadDefaultCustomerObj());
      //  props.changeLoader(false);
    } catch (error) {
      console.log(error)
      toast.dismiss(toastId); 
      toast.error("Error",error);
    }
  };


  

  return (
    <>
    <Toaster />
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">Customer Registration</h6>
                
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Personal Information
                </h6>
                <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                      Full Name <span className="required-star">*</span>
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Employee Full Name"
                        value={customer.FullName}
                        onChange={(e) =>
                          setCustomerDetails(e.target.value, "FullName")
                        }
                      />
                    </div>
                  </div>
                
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Username <span className="required-star">*</span>
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Employee Username"
                        value={customer.Username}
                        onChange={(e) =>
                          setCustomerDetails(e.target.value, "Username")
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                        
                      >
                        Email address <span className="required-star">*</span>
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={customer.Email}
                        onChange={(e) =>
                          setCustomerDetails(e.target.value, "Email")
                        }
                      />
                    </div>
                  </div>
                  
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                      NIC <span className="required-star">*</span>
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={customer.NIC}
                        onChange={(e) =>
                          setCustomerDetails(e.target.value, "NIC")
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                      Date of Birth <span className="required-star">*</span>
                      </label>
                      <DatePicker
                        id="datePicker-1"
                        value={customer.DOB}
                        onChange={(e) =>
                          setCustomerDetails(e, "DOB")
                        }
                        formatStyle="large"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                      Gender <span className="required-star">*</span>
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={customer.Gender}
                        onChange={(e) =>
                          setCustomerDetails(e.target.value, "Gender")
                        }
                      />
                    </div>
                  </div>
                  
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Contact Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Address <span className="required-star">*</span>
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={customer.StreetAddress}
                        onChange={(e) =>
                          setCustomerDetails(e.target.value, "StreetAddress")
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Province <span className="required-star">*</span>
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={customer.State}
                        onChange={(e) =>
                          setCustomerDetails(e.target.value, "State")
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        City <span className="required-star">*</span>
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={customer.City}
                        onChange={(e) =>
                          setCustomerDetails(e.target.value, "City")
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Postal Code <span className="required-star">*</span>
                      </label>
                      <input
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={customer.ZipCode}
                        onChange={(e) =>
                          setCustomerDetails(e.target.value, "ZipCode")
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Phone Number <span className="required-star">*</span>
                      </label>
                      <input
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={customer.PrimaryPhoneNumber}
                        onChange={(e) =>
                          setCustomerDetails(e.target.value, "PrimaryPhoneNumber")
                        }
                      />
                    </div>
                  </div>
                 
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Account Security
                </h6>
                <div className="flex flex-wrap">
                  
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Password <span className="required-star">*</span>
                      </label>
                      <input
                        type="password"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={customer.password}
                        onChange={(e) =>
                          setCustomerDetails(e.target.value, "password")
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Confirm Password <span className="required-star">*</span>
                      </label>
                      <input
                        type="password"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={customer.password}
                        onChange={(e) =>
                          setCustomerDetails(e.target.value, "password")
                        }
                      />
                    </div>
                  
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Delivery Method <span className="required-star">*</span>
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={customer.DeliveryMethod}
                        onChange={(e) =>
                          setCustomerDetails(e.target.value, "DeliveryMethod")
                        }
                      />
                    </div>
                  
                  </div>
                </div>

                
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Emergency Contact
                </h6>
                <div className="flex flex-wrap">
                  
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Contact Name <span className="required-star">*</span>
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={customer.EmergencyContactName}
                        onChange={(e) =>
                          setCustomerDetails(e.target.value, "EmergencyContactName")
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Contact Phone Number <span className="required-star">*</span>
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={customer.EmergencyContactPhone}
                        onChange={(e) =>
                          setCustomerDetails(e.target.value, "EmergencyContactPhone")
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap  items-center">
                <button className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                 onClick={handleSubmit}
                >
                  <i className="fas fa-save"></i> Save
                </button>
                <button className="bg-warmGray-700 text-warmGray-800 active:bg-warmGray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                  onClick={clearall}>
                  <i className="fas fa-rotate"></i> Clear
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Settings;