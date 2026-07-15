"use client";

import { useState } from "react";

export default function CustomerDocuments() {

  const [message, setMessage] = useState("");

  const [files, setFiles] = useState<any>({});


  const uploadDocuments = async () => {

    try {

      console.log("Upload button clicked");


      const mobile = localStorage.getItem("mobile");


      if (!files.aadhaar && !files.pan && !files.salarySlip && !files.bankStatement) {

        setMessage("Please select at least one document");

        return;
      }



      const formData = new FormData();


      formData.append("mobile", mobile || "");



      if (files.aadhaar) {
        formData.append("aadhaar", files.aadhaar);
      }


      if (files.pan) {
        formData.append("pan", files.pan);
      }


      if (files.salarySlip) {
        formData.append("salarySlip", files.salarySlip);
      }


      if (files.bankStatement) {
        formData.append("bankStatement", files.bankStatement);
      }



      const res = await fetch("/api/customer-documents", {

        method: "POST",

        body: formData,

      });



      const data = await res.json();


      console.log(data);


      setMessage(data.message);



    } catch (error) {


      console.log(error);

      setMessage("Upload failed");

    }

  };




  return (

    <main className="min-h-screen bg-gray-100 p-6">


      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">


        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Upload Documents
        </h1>



        <label className="font-bold">
          Aadhaar Card
        </label>

        <input
          type="file"
          className="w-full border p-3 rounded mb-4"
          onChange={(e)=>
            setFiles({
              ...files,
              aadhaar:e.target.files?.[0]
            })
          }
        />



        <label className="font-bold">
          PAN Card
        </label>

        <input
          type="file"
          className="w-full border p-3 rounded mb-4"
          onChange={(e)=>
            setFiles({
              ...files,
              pan:e.target.files?.[0]
            })
          }
        />



        <label className="font-bold">
          Salary Slip
        </label>

        <input
          type="file"
          className="w-full border p-3 rounded mb-4"
          onChange={(e)=>
            setFiles({
              ...files,
              salarySlip:e.target.files?.[0]
            })
          }
        />



        <label className="font-bold">
          Bank Statement
        </label>

        <input
          type="file"
          className="w-full border p-3 rounded mb-4"
          onChange={(e)=>
            setFiles({
              ...files,
              bankStatement:e.target.files?.[0]
            })
          }
        />



        <button

          onClick={uploadDocuments}

          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"

        >

          Upload Documents

        </button>



        <p className="text-center mt-4 text-green-600">

          {message}

        </p>


      </div>


    </main>

  );

}