import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/dashboard/Sidebar"
import PageTitle from "../components/common/HelmetForTitle"
import { FiSidebar } from "react-icons/fi"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  if (profileLoading || authLoading) {
	return (
	  <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
		<div className="spinner"></div>
	  </div>
	)
  }

  return (
	  <div className="relative flex min-h-screen">
		  <PageTitle title={"Dashboard"} />
		  <button className="sm:hidden md:hidden absolute left-3"><FiSidebar/></button>
	  <Sidebar />
	  <div className="flex-1 overflow-auto">
		<div className="mx-auto w-11/12 max-w-250 py-10">
		  <Outlet />
		</div>
	  </div>
	</div>
  )
}

export default Dashboard
