import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


import IconBtn from "../../common/IconBtn"
import { BuyCourse } from "../../../apis/studentFeaturesAPI"

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id)
    BuyCourse(token, courses, user, navigate, dispatch)
  }

  return (
    <div className="min-w-70 rounded-md shadow-sm bg-white p-6">
      <p className="mb-1 text-xl font-semibold">Total:</p>
      <p className="mb-6 text-2xl font-semibold text-pink-600">₹ {total}</p>
      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>
  )
}
