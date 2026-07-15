export default function Home(){

return(

<main className="min-h-screen bg-gray-50">


{/* Header */}

<header className="bg-white shadow">

<div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-5">



<div className="flex items-center gap-3">

<img
src="/logo/logo.png"
alt="CreditMitra Pro Logo"
className="w-14 h-14 object-contain"
/>


<div>

<h1 className="text-3xl font-bold text-blue-700">
CreditMitra Pro
</h1>


<p className="text-sm text-gray-500">
Fast, Secure & Transparent Loan Assistance
</p>


</div>


</div>


<nav className="flex flex-wrap justify-center gap-4">


<a href="/">
Home
</a>


<a href="#loans">
Loans
</a>


<a href="/about">
About
</a>


<a href="/contact">
Contact
</a>


<a
href="/customer-login"
className="bg-blue-600 text-white px-4 py-2 rounded-lg"
>
Customer Login
</a>


<a
href="/login"
className="bg-gray-700 text-white px-4 py-2 rounded-lg"
>
Admin Login
</a>


</nav>


</div>

</header>





{/* Hero */}

<section className="bg-blue-700 text-white py-20">


<div className="max-w-7xl mx-auto px-6">


<h2 className="text-5xl font-bold">
Fast, Secure & Trusted Loan Services
</h2>


<p className="text-xl mt-5">
Personal Loan, Business Loan and Home Loan
with professional assistance.
</p>



<a
href="/customer-login"
className="inline-block mt-8 bg-white text-blue-700 px-10 py-3 rounded-lg font-bold"
>

Apply Now

</a>


</div>


</section>





{/* Trust */}

<section className="max-w-7xl mx-auto px-6 py-12">


<div className="grid md:grid-cols-4 gap-6">


<div className="bg-white p-6 rounded-xl shadow text-center">

<h3 className="font-bold text-xl">
100% Guidance
</h3>

<p>
Expert loan support
</p>

</div>



<div className="bg-white p-6 rounded-xl shadow text-center">

<h3 className="font-bold text-xl">
Secure Process
</h3>

<p>
Safe document handling
</p>

</div>



<div className="bg-white p-6 rounded-xl shadow text-center">

<h3 className="font-bold text-xl">
Fast Support
</h3>

<p>
Quick customer assistance
</p>

</div>



<div className="bg-white p-6 rounded-xl shadow text-center">

<h3 className="font-bold text-xl">
Transparent
</h3>

<p>
Clear loan information
</p>

</div>


</div>

</section>






{/* Loan Services */}

<section id="loans" className="max-w-7xl mx-auto px-6 py-12">


<h2 className="text-4xl font-bold text-center">
Our Loan Services
</h2>



<div className="grid md:grid-cols-3 gap-8 mt-10">



<a href="/customer-login">

<div className="bg-white p-8 rounded-xl shadow hover:shadow-xl">


<h3 className="text-2xl font-bold text-blue-700">
Personal Loan
</h3>


<p className="mt-3">
Quick approval support with minimum documentation.
</p>


</div>

</a>





<a href="/customer-login">

<div className="bg-white p-8 rounded-xl shadow hover:shadow-xl">


<h3 className="text-2xl font-bold text-blue-700">
Business Loan
</h3>


<p className="mt-3">
Funding assistance for business growth.
</p>


</div>

</a>






<a href="/customer-login">

<div className="bg-white p-8 rounded-xl shadow hover:shadow-xl">


<h3 className="text-2xl font-bold text-blue-700">
Home Loan
</h3>


<p className="mt-3">
Affordable home financing guidance.
</p>


</div>

</a>



</div>


</section>







{/* Terms */}

<section className="bg-white py-12">


<div className="max-w-7xl mx-auto px-6">


<h2 className="text-3xl font-bold">
Terms & Conditions
</h2>


<ul className="mt-5 text-gray-700 space-y-2">


<li>
• Loan approval depends on customer eligibility and lender policies.
</li>


<li>
• CreditMitra Pro provides loan assistance and application support.
</li>


<li>
• Interest rate, processing fee and charges depend on respective lenders.
</li>


<li>
• Submission of documents does not guarantee loan approval.
</li>


</ul>


</div>


</section>







{/* Disclaimer */}

<section className="bg-gray-100 py-8">


<div className="max-w-7xl mx-auto px-6 text-sm text-gray-600">


<h3 className="font-bold">
Disclaimer
</h3>


<p className="mt-2">

CreditMitra Pro is a loan assistance platform.
We help customers connect with suitable financial service providers.
We are not a bank or NBFC unless officially registered and authorized.

</p>


</div>


</section>






{/* WhatsApp */}

<a

href="https://wa.me/919547650815"

target="_blank"

className="fixed bottom-5 right-5 bg-green-500 text-white px-5 py-3 rounded-full shadow-lg font-bold"

>

WhatsApp Support

</a>






{/* Loan Process */}

<section className="max-w-7xl mx-auto px-6 py-16">

<h2 className="text-4xl font-bold text-center">
How It Works
</h2>


<div className="grid md:grid-cols-4 gap-6 mt-10">


<div className="bg-white p-6 rounded-xl shadow text-center">

<h3 className="text-xl font-bold text-blue-700">
1. Apply Online
</h3>

<p className="mt-3">
Fill your basic loan application details.
</p>

</div>



<div className="bg-white p-6 rounded-xl shadow text-center">

<h3 className="text-xl font-bold text-blue-700">
2. Upload Documents
</h3>

<p className="mt-3">
Submit required documents securely.
</p>

</div>



<div className="bg-white p-6 rounded-xl shadow text-center">

<h3 className="text-xl font-bold text-blue-700">
3. Verification
</h3>

<p className="mt-3">
Application details are verified.
</p>

</div>



<div className="bg-white p-6 rounded-xl shadow text-center">

<h3 className="text-xl font-bold text-blue-700">
4. Loan Decision
</h3>

<p className="mt-3">
Get loan status update.
</p>

</div>


</div>

</section>





{/* Required Documents */}

<section className="bg-white py-16">


<div className="max-w-7xl mx-auto px-6">


<h2 className="text-4xl font-bold text-center">
Required Documents
</h2>



<div className="grid md:grid-cols-4 gap-6 mt-10">


<div className="p-6 bg-gray-50 rounded-xl shadow">
<h3 className="font-bold">
Aadhaar Card
</h3>
<p>
Identity verification document
</p>
</div>



<div className="p-6 bg-gray-50 rounded-xl shadow">
<h3 className="font-bold">
PAN Card
</h3>
<p>
Financial verification document
</p>
</div>




<div className="p-6 bg-gray-50 rounded-xl shadow">
<h3 className="font-bold">
Bank Statement
</h3>
<p>
Bank transaction details
</p>
</div>




<div className="p-6 bg-gray-50 rounded-xl shadow">
<h3 className="font-bold">
Income Proof
</h3>
<p>
Salary slip or business proof
</p>
</div>


</div>


</div>


</section>






{/* FAQ */}

<section className="max-w-7xl mx-auto px-6 py-16">


<h2 className="text-4xl font-bold text-center">
Frequently Asked Questions
</h2>



<div className="mt-8 space-y-5">



<div className="bg-white p-6 rounded-xl shadow">

<h3 className="font-bold text-xl">
How can I apply for a loan?
</h3>

<p className="mt-2 text-gray-600">
Click Apply Now, login using mobile OTP and complete your application.
</p>

</div>




<div className="bg-white p-6 rounded-xl shadow">

<h3 className="font-bold text-xl">
Is loan approval guaranteed?
</h3>

<p className="mt-2 text-gray-600">
Loan approval depends on eligibility and lender verification.
</p>

</div>





<div className="bg-white p-6 rounded-xl shadow">

<h3 className="font-bold text-xl">
Are my documents secure?
</h3>

<p className="mt-2 text-gray-600">
Documents are handled securely for loan processing.
</p>

</div>



</div>


</section>{/* Footer */}

<footer className="bg-blue-700 text-white py-6 text-center">


<p>
© 2026 CreditMitra Pro. All Rights Reserved.
</p>


<p className="text-sm mt-2">
Loan Assistance | Customer Support | Financial Guidance
</p>


</footer>



</main>

)

}