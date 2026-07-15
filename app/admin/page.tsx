"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {

  const router = useRouter();

  const [search,setSearch] = useState("");

  const [enquiries,setEnquiries] = useState<any[]>([]);

  const [data,setData] = useState<any>({
    total:0,
    pending:0,
    approved:0,
    rejected:0,
    applications:[]
  });


  const loadData = async()=>{

    const res = await fetch(
      `/api/dashboard?search=${search}`
    );

    const result = await res.json();

    setData(result);



    const enquiryRes = await fetch("/api/contact");

    const enquiryData = await enquiryRes.json();


    if(enquiryData.success){

      setEnquiries(enquiryData.enquiries);

    }

  };



  useEffect(()=>{

    loadData();

  },[search]);



  const updateStatus = async(
    id:string,
    status:string
  )=>{

    await fetch("/api/dashboard",{

      method:"PATCH",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({
        id,
        status
      })

    });


    loadData();

  };



  const deleteApplication = async(id:string)=>{

    if(!confirm("Delete Application?")){
      return;
    }


    await fetch("/api/dashboard",{

      method:"DELETE",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({
        id
      })

    });


    loadData();

  };



  const logout = async()=>{

    await fetch("/api/logout");

    router.push("/login");

  };



return (

<main className="min-h-screen bg-gray-100">


<header className="bg-blue-700 text-white p-5">

<div className="flex justify-between items-center max-w-7xl mx-auto">

<h1 className="text-2xl font-bold">
CreditMitra Pro Admin
</h1>


<button
onClick={logout}
className="bg-white text-blue-700 px-4 py-2 rounded"
>
Logout
</button>


</div>

</header>



<div className="max-w-7xl mx-auto p-6">


<button
onClick={()=>window.open("/api/export","_blank")}
className="bg-green-600 text-white px-4 py-2 rounded mb-5"
>
Export Excel
</button>



<h2 className="text-3xl font-bold mb-5">
Dashboard
</h2>



<input

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="Search Name or Mobile"

className="border p-3 rounded w-96 mb-6 text-black"

/>




<div className="grid md:grid-cols-4 gap-5">


<div className="bg-white p-5 rounded shadow">
Total
<h2 className="text-3xl font-bold">
{data.total}
</h2>
</div>



<div className="bg-white p-5 rounded shadow">
Pending
<h2 className="text-3xl font-bold">
{data.pending}
</h2>
</div>



<div className="bg-white p-5 rounded shadow">
Approved
<h2 className="text-3xl font-bold">
{data.approved}
</h2>
</div>



<div className="bg-white p-5 rounded shadow">
Rejected
<h2 className="text-3xl font-bold">
{data.rejected}
</h2>
</div>


</div>






<div className="bg-white mt-8 p-5 rounded shadow overflow-x-auto">


<h2 className="text-2xl font-bold mb-5">
Loan Applications
</h2>



<table className="w-full border">


<thead className="bg-gray-200">

<tr>

<th className="border p-3">Name</th>
<th className="border p-3">Mobile</th>
<th className="border p-3">Loan</th>
<th className="border p-3">Amount</th>
<th className="border p-3">Status</th>
<th className="border p-3">Documents</th>
<th className="border p-3">Action</th>

</tr>

</thead>




<tbody>

{

data.applications.map((item:any)=>(


<tr key={item.id}>


<td className="border p-3">
{item.fullName}
</td>


<td className="border p-3">
{item.mobile}
</td>


<td className="border p-3">
{item.loanType}
</td>


<td className="border p-3">
₹{item.amount}
</td>


<td className="border p-3">
{item.status}
</td>



<td className="border p-3">

<div className="flex flex-col">


{item.aadhaarUrl &&
<a href={item.aadhaarUrl} target="_blank">
Aadhaar
</a>
}


{item.panUrl &&
<a href={item.panUrl} target="_blank">
PAN
</a>
}


{item.salarySlipUrl &&
<a href={item.salarySlipUrl} target="_blank">
Salary Slip
</a>
}


{item.bankStatementUrl &&
<a href={item.bankStatementUrl} target="_blank">
Bank Statement
</a>
}


</div>

</td>




<td className="border p-3">

<button
onClick={()=>updateStatus(item.id,"Pending")}
className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
>
Pending
</button>


<button
onClick={()=>updateStatus(item.id,"Approved")}
className="bg-green-600 text-white px-3 py-1 rounded mr-2"
>
Approve
</button>



<button
onClick={()=>updateStatus(item.id,"Rejected")}
className="bg-red-600 text-white px-3 py-1 rounded mr-2"
>
Reject
</button>



<button
onClick={()=>deleteApplication(item.id)}
className="bg-gray-700 text-white px-3 py-1 rounded"
>
Delete
</button>


</td>


</tr>


))


}


</tbody>


</table>


</div>





<div className="bg-white mt-8 p-5 rounded shadow overflow-x-auto">


<h2 className="text-2xl font-bold mb-5">
Contact Enquiries
</h2>



<table className="w-full border">


<thead className="bg-gray-200">

<tr>

<th className="border p-3">
Name
</th>

<th className="border p-3">
Mobile
</th>

<th className="border p-3">
Loan Type
</th>

<th className="border p-3">
Date
</th>

</tr>

</thead>



<tbody>


{
enquiries.length===0 ?

<tr>
<td colSpan={4} className="border p-5 text-center">
No Enquiry Found
</td>
</tr>

:

enquiries.map((item:any)=>(

<tr key={item.id}>

<td className="border p-3">
{item.name}
</td>


<td className="border p-3">
{item.mobile}
</td>


<td className="border p-3">
{item.loanType}
</td>


<td className="border p-3">
{new Date(item.createdAt).toLocaleDateString()}
</td>


</tr>

))

}


</tbody>


</table>


</div>



</div>


</main>

);

}