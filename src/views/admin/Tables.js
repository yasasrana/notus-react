import React, { useRef } from "react";

// components
import { FaRegFilePdf } from "react-icons/fa6";
import CardTable from "components/Cards/CardTable.js";
import CardTable2 from "components/Cards/CardTable2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "react-rainbow-components";

export default function Tables() {

  const cusRef = useRef();


  const exportToPDF = () => {
    let input = cusRef.current; // Reference to the table
    let pdfname = "Employee_Report";
  
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Create a new jsPDF document in landscape orientation, A4 size
      const pdf = new jsPDF("landscape", "mm", "a4");

      // Get the width and height of the PDF page
      const pdfWidth = pdf.internal.pageSize.getWidth(); // A4 width in landscape
      const pdfHeight = pdf.internal.pageSize.getHeight(); // A4 height in landscape

      // Calculate the aspect ratio of the canvas to maintain proportions
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const aspectRatio = canvasHeight / canvasWidth;

      // Calculate the height to fit the image into the PDF while keeping the aspect ratio
      const imgHeight = pdfWidth * aspectRatio;

      // Add the image to the PDF, keeping it at the top left corner (x: 0, y: 0)
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);

      // Get the current date and time for naming the file
      const now = new Date();
      const formattedDate = now.toISOString().slice(0, 10); // YYYY-MM-DD format
      const formattedTime = now.toTimeString().slice(0, 8).replace(/:/g, "-"); // HH-MM-SS format
      const finalFileName = `${pdfname}_${formattedDate}_${formattedTime}.pdf`;

      // Save the PDF
      pdf.save(finalFileName);
    });
  };

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable cusRef={cusRef} exportToPDF={exportToPDF}/>
        </div>
        <div className="w-full mb-12 px-4">
          <CardTable2 />
        </div>
        {/* <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div> */}
      </div>
    </>
  );
}
