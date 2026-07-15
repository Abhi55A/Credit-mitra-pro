import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ApplicationDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;


  const application = await prisma.loanApplication.findUnique({

    where: {
      id: id,
    },

    include: {
      customer: true,
    },

  });



  if (!application) {

    return (

      <main className="min-h-screen bg-gray-100 p-6">

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">

          <h1 className="text-3xl font-bold text-red-600">
            Application Not Found
          </h1>

          <Link
            href="/admin"
            className="inline-block mt-5 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Back Dashboard
          </Link>

        </div>

      </main>

    );

  }



  return (

    <main className="min-h-screen bg-gray-100 p-6">


      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">


        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold text-black">
            Customer Details
          </h1>


          <Link
            href="/admin"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Back
          </Link>


        </div>



        <div className="grid md:grid-cols-2 gap-6">


          <div>
            <h3 className="text-gray-500">
              Full Name
            </h3>

            <p className="text-xl font-semibold text-black">
              {application.customer.fullName}
            </p>
          </div>



          <div>
            <h3 className="text-gray-500">
              Mobile
            </h3>

            <p className="text-xl font-semibold text-black">
              {application.customer.mobile}
            </p>
          </div>



          <div>
            <h3 className="text-gray-500">
              Email
            </h3>

            <p className="text-xl font-semibold text-black">
              {application.customer.email}
            </p>
          </div>



          <div>
            <h3 className="text-gray-500">
              City
            </h3>

            <p className="text-xl font-semibold text-black">
              {application.customer.city}
            </p>
          </div>



          <div>
            <h3 className="text-gray-500">
              Loan Type
            </h3>

            <p className="text-xl font-semibold text-black">
              {application.loanType}
            </p>
          </div>



          <div>
            <h3 className="text-gray-500">
              Loan Amount
            </h3>

            <p className="text-xl font-semibold text-black">
              ₹{application.amount}
            </p>
          </div>



          <div>
            <h3 className="text-gray-500">
              Status
            </h3>

            <p className="text-xl font-semibold text-black">
              {application.status}
            </p>
          </div>



          <div>
            <h3 className="text-gray-500">
              Applied Date
            </h3>

            <p className="text-xl font-semibold text-black">
              {new Date(application.createdAt).toLocaleDateString()}
            </p>
          </div>



        </div>


      </div>


    </main>

  );
}