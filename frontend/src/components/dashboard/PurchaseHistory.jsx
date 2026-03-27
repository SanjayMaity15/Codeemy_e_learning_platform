import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import Loader from '../common/Loader'

const PurchaseHistory = () => {



  const [history, setHistory] = useState(null)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}payment/purchase-history`,
          { withCredentials: true }
        )

        setHistory(res.data.data)
      } catch (error) {
        console.log("Failed to fetch purchase history")
      }
    }

    fetchHistory()
  }, [])


  console.log(history);
  
  if (!history) {
    return <Loader/>
  }

  if (!history?.length) {
    return <p className="text-center mt-10">No purchase history</p>
  }

  return (
		<div className="max-w-5xl mx-auto my-10 px-4">
			<h2 className="text-2xl font-semibold mb-6">Purchase History</h2>

			<div className="grid gap-6">
				{history?.map((item) => (
					<div
						key={item._id}
						className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm"
					>
						{/* Thumbnail */}
						<img
							src={item?.course?.thumbnail}
							alt="course"
							className="w-20 h-20 rounded-lg object-cover"
						/>

						{/* Details */}
						<div className="flex-1">
							<h3 className="text-lg font-semibold text-gray-800">
								{item?.course?.courseName}
							</h3>

							<p className="text-sm text-gray-500">
								<span className="text-black">Order ID:</span>{" "}
								{item?.orderId}
							</p>

							<p className="text-sm text-gray-500">
								<span className='text-black'>Payment ID:</span> {item?.paymentId}
							</p>

							<p className="text-sm text-pink-600">
								Date:{" "}
								{new Date(item?.createdAt).toLocaleDateString(
									"en-GB",
									{
										day: "2-digit",
										month: "2-digit",
										year: "2-digit",
										hour: "2-digit",
										minute: "2-digit",
										hour12: true,
									},
								)}
							</p>
						</div>

						{/* Amount */}
						<div className="text-indigo-600 font-bold text-lg">
							₹{item?.amount}
						</div>
					</div>
				))}
			</div>
		</div>
  );
}

export default PurchaseHistory

