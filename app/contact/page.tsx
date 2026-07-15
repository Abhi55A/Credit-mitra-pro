"use client";

import { useState } from "react";


export default function Contact(){

const [name,setName] = useState("");
const [mobile,setMobile] = useState("");
const [loanType,setLoanType] = useState("");

const [message,setMessage] = useState("");



const submitEnquiry = async(e:any)=>{

e.preventDefault();


const res = await fetch("/api/contact",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name,
mobile,
loanType

})

});


const data = await res.json();


if(data.success){

setMessage("Enquiry submitted successfully");

setName("");
setMobile("");
setLoanType("");

}else{

setMessage("Something went wrong");

}


};



return(

<main className="min-h-screen bg-gray-50">


<section className="bg-blue-700 text-white py-16">

<div className="max-w-6xl mx-auto px-6">

<h1 className="text-5xl font-bold">
Contact CreditMitra Pro
</h1>

<p className="mt-4 text-lg">
Trusted loan assistance and customer support.
</p>

</div>

</section>





<section className="max-w-6xl mx-auto px-6 py-16">


<div className="grid md:grid-cols-2 gap-8">



<div className="bg-white p-8 rounded-xl shadow">


<h2 className="text-3xl font-bold">
Loan Support
</h2>


<p className="mt-4 text-gray-700">

For Personal Loan, Business Loan and Home Loan assistance contact us.

</p>


<a

href="https://wa.me/919547650815"

target="_blank"

className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-lg"

>

WhatsApp Support

</a>


</div>






<div className="bg-white p-8 rounded-xl shadow">


<h2 className="text-3xl font-bold">
Send Enquiry
</h2>



<form
onSubmit={submitEnquiry}
className="mt-5 space-y-4"
>



<input

value={name}

onChange={(e)=>setName(e.target.value)}

placeholder="Your Name"

className="w-full border p-3 rounded-lg"

/>




<input

value={mobile}

onChange={(e)=>setMobile(e.target.value)}

placeholder="Mobile Number"

className="w-full border p-3 rounded-lg"

/>




<select

value={loanType}

onChange={(e)=>setLoanType(e.target.value)}

className="w-full border p-3 rounded-lg"

>


<option value="">
Select Loan Type
</option>


<option>
Personal Loan
</option>


<option>
Business Loan
</option>


<option>
Home Loan
</option>


</select>




<button

className="bg-blue-700 text-white px-6 py-3 rounded-lg font-bold"

>

Submit Enquiry

</button>



</form>



<p className="mt-4 text-green-600 font-bold">
{message}
</p>


</div>



</div>


</section>


</main>

)

}