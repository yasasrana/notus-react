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
    pawn_item_id: "", // required|exists:pawn_items,id
    amount: 0, // required|numeric
    payment_method: "", // required|string|max:255
    payment_date: new Date(), // required|date
    transaction_reference: "", // nullable|string|max:255
    notes: "", // nullable|string, // required|exists:users,id
  };
};

export default function Payments() {
  const [customers, setCustomers] = useState([]);
  const [scustomers, setsCustomers] = useState([]);
  const [pawn, setPawn] = useState(loadDefaultPawnObj);
  const [pawns, setPawns] = useState([]);
  const [spawns, setsPawns] = useState([]);
  const [user, setUser] = useState('');


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
    console.log(pawn);
  };

  const clearall = () => {
    setPawn(loadDefaultPawnObj);
    setUser('');
  }

  const validatePawnData = (pawn) => {
    if (!pawn.pawn_item_id) return "Pawn item ID is required and must exist.";
    if ( pawn.amount <= 0) return "Amount is required and must be a positive number.";
    if (!pawn.payment_method || typeof pawn.payment_method !== 'string' || pawn.payment_method.length > 255) return "Payment method is required and must be a string with a maximum length of 255 characters.";
    if (!pawn.payment_date || isNaN(new Date(pawn.payment_date).getTime())) return "Payment date is required and must be a valid date.";
    if (pawn.transaction_reference && typeof pawn.transaction_reference !== 'string') return "Transaction reference must be a string.";
    if (pawn.notes && typeof pawn.notes !== 'string') return "Notes must be a string.";
    return null;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validatePawnData(pawn);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    pawn.pawn_item_id = pawn.pawn_item_id.value;
    const toastId = toast.loading("Saving...");
    try {
      console.log('yes', pawn);
      // props.changeLoader(true);
      const pawnData = {
        pawn_item_id: pawn.pawn_item_id,
        amount: pawn.amount,
        payment_method: pawn.payment_method,
        payment_date: pawn.payment_date,
        transaction_reference: pawn.transaction_reference,
        notes: pawn.notes,
      };
  
      const response = await axios.post("/api/payment-transactions", pawnData, {
        headers: { "Content-Type": "application/json" },
      });
      toast.dismiss(toastId); // Dismiss the loading toast
      toast.success("Saving Successful");
      //fetchScans(currentPage);
      clearall();
      //  props.changeLoader(false);
    } catch (error) {
      console.log(error);
      toast.dismiss(toastId);
      toast.error("Error", error);
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
  const getPawnItems = async (customerId) => {
    try {
      const response = await axios.get(`/api/customers/${customerId}/pawn-items`);
      setPawns(response.data);
      const options = response.data.map((pawn) => ({
        value: pawn.id,
        label: pawn.itemNo +' - '+ pawn.description,
        data: pawn
      }));
      setsPawns(options);
      toast.success("Pawn items loaded successfully");
    } catch (error) {
      console.error("There was an error fetching the pawn items!", error);
      toast.error("There was an error fetching the pawn items!");
    }
  };

  const checkpawns = (e) => { 
    setPawn(loadDefaultPawnObj);
    setUser(e);
    getPawnItems(e.value);
  }
  

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
                      <Select
                      value={user}
                      onChange={(e)=>checkpawns(e)} options={scustomers} 
                      />

                    </div>
                  </div>
                
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                      Pawn Item <span className="required-star">*</span>
                      </label>
                      <Select value={pawn.pawn_item_id} options={spawns} 
                     
                      onChange={(e) =>{
                        setPawnDetails(e, "pawn_item_id")
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
                        disabled
                        style={{backgroundColor: 'rgb(227 227 227)'}}
                        value={ parseFloat(pawn?.pawn_item_id?.data?.payable_amount ?? 0).toFixed(2)}
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
                      Amount <span className="required-star">*</span>
                      </label>
                      <input
                         className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                         type="number"
                         value={pawn.amount}
                         onChange={(e) =>
                           setPawnDetails(e.target.value, "amount")
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
                     Payment Method <span className="required-star">*</span>
                      </label>
                      <input
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        type="text"
                        value={pawn.payment_method}
                        onChange={(e) =>
                          setPawnDetails(e.target.value, "payment_method")
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
                      Notes <span className="required-star">*</span>
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={pawn.notes}
                        onChange={(e) =>
                          setPawnDetails(e.target.value, "notes")
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
                      Payment Date <span className="required-star">*</span>
                      </label>
                     
                      <DatePicker
                        id="datePicker-1"
                        value={pawn.payment_date}
                        onChange={(e) =>
                          setPawnDetails(e, "payment_date")
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
