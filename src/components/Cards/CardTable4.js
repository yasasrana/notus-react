import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// components

import TableDropdown from "components/Dropdowns/TableDropdown.js";
import axios from "api/axios";
import { FaRegFilePdf } from "react-icons/fa6";
import { Button } from "react-rainbow-components";
import useAuth from "hooks/useAuth";
const headers = ["TransactionId","pawn_item_id","amount","payment_date","payment_method", "notes" ];

 const CardTable4 =({ color ,cusRef,exportToPDF})=> {

  const [pawns, setPawns] = useState([]);
    const { setAuth, auth } = useAuth();
  const getPawns = async () => {
    try {
      const customerId =  auth?.customer_id ?? "";
      const response = await axios.get(`/api/customers/${customerId}/payment-transactions`);
      setPawns(response.data);
    } catch (error) {
      console.error("There was an error fetching the pawns!", error);
    }
  };

  useEffect(() => {
    getPawns();
  }, []);

  return (
    <>
      <div ref={cusRef}
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Transactions
              </h3>
            </div>
          </div>
        </div>
          <Button className="pdfbtn" onClick={() => exportToPDF()}>
          <FaRegFilePdf style={{ fontSize: "17px" }} /> Pdf
          </Button>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    {header}
                  </th>
                ))}
                
              </tr>
            </thead>
            <tbody>
            {pawns.map((pawn, index) => (
                <tr key={index}>
                 
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {pawn.id}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {pawn.pawn_item_id}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {pawn.amount}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                    {pawn.payment_date}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                    {pawn.payment_method}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                    {pawn.notes}
                  </td>
                  
                </tr>
              ))}
              

            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default CardTable4;

CardTable4.defaultProps = {
  color: "light",
};

CardTable4.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
