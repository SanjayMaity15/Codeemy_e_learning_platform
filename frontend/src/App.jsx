import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/common/ScroolSmooth";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { useSelector } from "react-redux";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Loader from "./components/common/Loader";
import ErrorPage from "./pages/ErrorPage";
import { ACCOUNT_TYPE } from "./utils/constants";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import Chart from "./components/dashboard/Chart";
import AdminCategory from "./components/dashboard/AdminCategory";
import StudentRating from "./components/dashboard/student rating/StudentRating";
import MouseShadow from "./components/mouse/MouseShadow";

// Lazy load pages/components
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./components/auth/Login"));
const Signup = lazy(() => import("./components/auth/Signup"));
const Contact = lazy(() => import("./components/contact/Contact"));
const About = lazy(() => import("./components/about/About"));
const VerifyOTP = lazy(() => import("./components/auth/VerifyOTP"));
const ResetPassword = lazy(() => import("./components/auth/ResetPassword"));
const ForgotPassword = lazy(() => import("./components/auth/ForgotPassword"));
const ChangePassword = lazy(() => import("./components/auth/ChangePassword"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const MyProfile = lazy(() => import("./components/dashboard/MyProfile"));
const EnrolledCourses = lazy(
	() => import("./components/dashboard/EnrolledCourses"),
);
const PurchaseHistory = lazy(
	() => import("./components/dashboard/PurchaseHistory"),
);
const Cart = lazy(() => import("./components/dashboard/Cart/Cart"));
const AddCourse = lazy(
	() => import("./components/dashboard/AddCourse/AddCourse"),
);
const MyCourses = lazy(
	() => import("./components/dashboard/AddCourse/MyCourses"),
);
const EditCourse = lazy(
	() => import("./components/dashboard/AddCourse/EditCourse/EditCourse"),
);
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const CourseDetailsPage = lazy(() => import("./pages/CourseDetailsPage"));
const ViewCourse = lazy(() => import("./pages/ViewCourse"));
const VideoDetails = lazy(() => import("./components/ViewCourse/VideoDetails"));
const Settings = lazy(() => import("./components/Settings/Setting"));
const Instructor = lazy(
	() => import("./components/dashboard/InstructorDashboard/Instructor"),
);



function App() {
	const { user } = useSelector((state) => state.profile);
	console.log(user);

	return (
		<div className="font-inter">
			<Toaster
				position="top-right"
				toastOptions={{
					duration: 3000,
					style: {
						background: "#f9fafb",
						color: "#111827",
						borderRadius: "12px",
						padding: "12px 16px",
						border: "1px solid #e5e7eb",
						boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
						fontWeight: "500",
					},
					success: {
						style: {
							borderLeft: "4px solid #4f46e5",
							background: "#eef2ff",
						},
						iconTheme: {
							primary: "#4f46e5",
							secondary: "#fff",
						},
					},
					error: {
						style: {
							borderLeft: "4px solid #ef4444",
							background: "#fef2f2",
						},
						iconTheme: {
							primary: "#ef4444",
							secondary: "#fff",
						},
					},
				}}
			/>

			<ScrollToTop />
			<MouseShadow/>
			<Navbar />

				<Suspense
					fallback={<Loader/>}
				>
					<Routes>
			
					<Route path="/" element={<Home />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/login" element={<Login />} />
						<Route path="/verify-otp" element={<VerifyOTP />} />
						<Route
							path="/forgot-password"
							element={<ForgotPassword />}
						/>
						<Route
							path="/change-password"
							element={<ChangePassword />}
						/>
						<Route
							path="/update-password/:token"
							element={<ResetPassword />}
						/>
						<Route path="/contact" element={<Contact />} />
						<Route path="/about" element={<About />} />
						<Route
							path="/courses/:category"
							element={<CategoryPage />}
						/>
						<Route
							path="/course/:courseId"
							element={user ? <CourseDetailsPage/> : <Navigate to={"/login"}/> }
						/>

						<Route element={<ProtectedRoute />}>
							<Route path="/dashboard" element={<Dashboard />}>
								<Route path="my-profile" element={<MyProfile />} />
								<Route
									path="enrolled-courses"
									element={<EnrolledCourses />}
								/>
								<Route
									path="purchase-history"
									element={<PurchaseHistory />}
								/>
								<Route path="cart" element={<Cart />} />
								<Route path="settings" element={<Settings />} />
								<Route path="add-course" element={<AddCourse />} />
								<Route path="my-courses" element={<MyCourses />} />
								<Route path="instructor" element={<Instructor />} />
								<Route
									path="edit-course/:courseId"
									element={<EditCourse />}
								/>
								<Route
									path="admin"
									element={user?.accountType === ACCOUNT_TYPE?.ADMIN ? <AdminDashboard /> : <Navigate to="/"/>}
								/>
								<Route
									path="charts"
									element={user?.accountType === ACCOUNT_TYPE?.ADMIN ? <Chart /> : <Navigate to="/"/>}
								/>
								<Route
									path="category"
									element={user?.accountType === ACCOUNT_TYPE?.ADMIN ? <AdminCategory /> : <Navigate to="/"/>}
								/>
								<Route
									path="rating-reviews"
									element={user?.accountType === ACCOUNT_TYPE?.STUDENT ? <StudentRating /> : <Navigate to="/"/>}
								/>
							</Route>
						</Route>

						<Route
							path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
							element={<ViewCourse />}
						>
							<Route index element={<VideoDetails />} />
						</Route>

						<Route path="*" element={<ErrorPage />} />
					</Routes>
				</Suspense>

			<Footer />
		</div>
	);
}

export default App;
