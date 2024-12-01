import React, { useEffect, useState } from "react";

// components

import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";
import toast, { Toaster } from "react-hot-toast";
import axios from "api/axios";
import Select from 'react-select'
import { DatePicker } from "react-rainbow-components";

const loadDefaultPawnObj = () => {
  return {
    description: "", // required
    category: "", // required
    details: "", // required
    DMR: "", // required
    weight: 0, // required|number
    quantity: 0, // required|number
    market_value: 0.00, // required|number
    payable_amount: 0.00, // required|number
    loan_amount: 0.00, // required|number
    interest_rate: 0.00, // required|number
    pawn_date: new Date(), // required|date
    due_date: new Date(), // required|date
    service_charge: 0.00, // required|number
    user_id: -1, // required|number
  };
};
export default function Payments() {
  const [customers, setCustomers] = useState([]);
  const [scustomers, setsCustomers] = useState([]);
  const [pawn, setPawn] = useState(loadDefaultPawnObj);


  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .required-star {
        color: red;
      }
    `;
    getCustomers();
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);


  const setPawnDetails = (e, state) => {
    setPawn({ ...pawn, [state]: e });
  };

  const clearall = () => {
    setPawn(loadDefaultPawnObj);
  }

  const validatePawnData = (pawn) => {
    if (!pawn.description) return "Description is required.";
    if (!pawn.category) return "Category is required.";
    if (!pawn.details) return "Details are required.";
    if (!pawn.DMR) return "DMR is required.";
    if (pawn.weight <= 0) return "Weight must be greater than 0.";
    if (pawn.quantity <= 0) return "Quantity must be greater than 0.";
    if (pawn.market_value <= 0) return "Market value must be greater than 0.";
    if (pawn.payable_amount <= 0) return "Payable amount must be greater than 0.";
    if (pawn.loan_amount <= 0) return "Loan amount must be greater than 0.";
    if (pawn.interest_rate <= 0) return "Interest rate must be greater than 0.";
    if (!pawn.pawn_date) return "Pawn date is required.";
    if (!pawn.due_date) return "Due date is required.";
    if (pawn.service_charge < 0) return "Service charge cannot be negative.";
    if (pawn.user_id <= 0) return "User ID must be greater than 0.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validatePawnData(pawn);
    if (validationError) {
      toast.error(validationError);
      return;
    }  
    const toastId = toast.loading("Saving...");
    try {
      console.log('yes', pawn);
      // props.changeLoader(true);
      const pawnData = {
        description: pawn.description,
        category: pawn.category,
        details: pawn.details,
        DMR: pawn.DMR,
        weight: pawn.weight,
        quantity: pawn.quantity,
        market_value: pawn.market_value,
        payable_amount: pawn.payable_amount,
        loan_amount: pawn.loan_amount,
        interest_rate: pawn.interest_rate,
        pawn_date: pawn.pawn_date,
        due_date: pawn.due_date,
        service_charge: pawn.service_charge,
        customer_id: pawn.user_id.value,
      };

      const response = await axios.post("/api/pawn-items", pawnData, {
        headers: { "Content-Type": "application/json" },
      });
      toast.dismiss(toastId); // Dismiss the loading toast
      toast.success("Saving Successful");
      //fetchScans(currentPage);
      setPawn(loadDefaultPawnObj());
      //  props.changeLoader(false);
    } catch (error) {
      console.log(error)
      toast.dismiss(toastId); 
      toast.error("Error",error);
    }
  };

  const getCustomers = async () => {
    try {
      const response = await axios.get(`/api/customers`);
      setCustomers(response.data);

      const options = response.data.map((customer) => ({
        value: customer.CustomerID,
        label: customer.FullName,
      }));
      setsCustomers(options);
      //toast.success("Customer data loaded successfully");
    } catch (error) {
      console.error("There was an error fetching the customer data!", error);
      toast.error("There was an error fetching the customer data!");
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
                <h6 className="text-blueGray-700 text-xl font-bold">Pawn Payment</h6>
                
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Pawn Information
                </h6>
                <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                      Customer <span className="required-star">*</span>
                      </label>
                      <Select options={scustomers} 
                     
                      onChange={(e) =>
                        setPawnDetails(e, "user_id")
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
                        Market Value <span className="required-star">*</span>
                      </label>
                      <input
                        type="number"
                        min={0}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={pawn.market_value}
                        onChange={(e) =>{
                          const value = parseFloat(e.target.value);
                          //if (value >= 0) {
                            setPawnDetails(value, "market_value");
                          //}
                        }
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
                     Payable Amount <span className="required-star">*</span>
                      </label>
                      <input
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        type="number"
                        min={0}
                        value={pawn.payable_amount}
                        onChange={(e) =>
                          setPawnDetails(e.target.value, "payable_amount")
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
                      Description <span className="required-star">*</span>
                      </label>
                      <input
                         className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                         type="text"
                         value={pawn.description}
                         onChange={(e) =>
                           setPawnDetails(e.target.value, "description")
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
                      Loan amount <span className="required-star">*</span>
                      </label>
                      <input
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        type="number"
                        value={pawn.loan_amount}
                        onChange={(e) =>
                          setPawnDetails(e.target.value, "loan_amount")
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
                      Category <span className="required-star">*</span>
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={pawn.category}
                        onChange={(e) =>
                          setPawnDetails(e.target.value, "category")
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
                      Details
                      </label>
                      <input
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={pawn.details}
                        onChange={(e) =>
                          setPawnDetails(e.target.value, "details")
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
                      Interest Rate <span className="required-star">*</span>
                      </label>
                      <input
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={pawn.interest_rate}
                        onChange={(e) =>
                          setPawnDetails(e.target.value, "interest_rate")
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
                      DMR <span className="required-star">*</span>
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={pawn.DMR}
                        onChange={(e) =>
                          setPawnDetails(e.target.value, "DMR")
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
                      Weight <span className="required-star">*</span>
                      </label>
                      <input
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={pawn.weight}
                        onChange={(e) =>
                          setPawnDetails(e.target.value, "weight")
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
                      Quantity <span className="required-star">*</span>
                      </label>
                      <input
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={pawn.quantity}
                        onChange={(e) =>
                          setPawnDetails(e.target.value, "quantity")
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
                      Service Charge <span className="required-star">*</span>
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={pawn.service_charge}
                        onChange={(e) =>
                          setPawnDetails(e.target.value, "service_charge")
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
                      Pawn Date <span className="required-star">*</span>
                      </label>
                     
                      <DatePicker
                        id="datePicker-1"
                        value={pawn.pawn_date}
                        onChange={(e) =>
                          setPawnDetails(e, "pawn_date")
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
                      Due Date <span className="required-star">*</span>
                      </label>
                      <DatePicker
                        id="datePicker-1"
                        value={pawn.due_date}
                        onChange={(e) =>
                          setPawnDetails(e, "due_date")
                        }
                        formatStyle="large"
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
