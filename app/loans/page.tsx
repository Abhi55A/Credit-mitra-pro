export default function Loans(){

return(

<main className="min-h-screen bg-gray-50">


{/* Header */}

<section className="bg-blue-700 text-white py-16">

<div className="max-w-6xl mx-auto px-6">

<h1 className="text-5xl font-bold">
Our Loan Services
</h1>

<p className="mt-4 text-lg">
Choose the right loan solution according to your financial needs.
</p>

</div>

</section>




{/* Loan Cards */}

<section className="max-w-6xl mx-auto px-6 py-16">


<div className="grid md:grid-cols-3 gap-8">



<a
href="/customer-login"
className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition"
>


<h2 className="text-2xl font-bold text-blue-700">
Personal Loan
</h2>


<p className="mt-4 text-gray-600">
Quick approval with minimum documentation and flexible repayment options.
</p>


<button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg">
Apply Now
</button>


</a>





<a
href="/customer-login"
className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition"
>


<h2 className="text-2xl font-bold text-blue-700">
Business Loan
</h2>


<p className="mt-4 text-gray-600">
Get financial support to grow and expand your business.
</p>


<button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg">
Apply Now
</button>


</a>






<a
href="/customer-login"
className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition"
>


<h2 className="text-2xl font-bold text-blue-700">
Home Loan
</h2>


<p className="mt-4 text-gray-600">
Affordable home financing solutions with expert guidance.
</p>


<button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg">
Apply Now
</button>


</a>




</div>


</section>



{/* WhatsApp Button */}

<a
href="https://wa.me/919547650815"
target="_blank"
className="fixed bottom-5 right-5 bg-green-500 text-white px-5 py-3 rounded-full shadow-lg font-semibold"
>
WhatsApp Support
</a>



</main>

);

}