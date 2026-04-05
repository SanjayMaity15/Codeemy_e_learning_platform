import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/common/ScroolSmooth";
import { useSelector } from "react-redux";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Loader from "./components/common/Loader";
import ErrorPage from "./pages/ErrorPage";
import { ACCOUNT_TYPE } from "./utils/constants";
import MouseShadow from "./components/mouse/MouseShadow";

// Layouts
import MainLayout from "./components/Layouts/MainLayout";
import AuthLayout from "./components/Layouts/AuthLayout";
import Support from "./components/dashboard/Support";

// Lazy load
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
const AdminDashboard = lazy(
	() => import("./components/dashboard/AdminDashboard"),
);
const Chart = lazy(() => import("./components/dashboard/Chart"));
const AdminCategory = lazy(
	() => import("./components/dashboard/AdminCategory"),
);
const StudentRating = lazy(
	() => import("./components/dashboard/student rating/StudentRating"),
);

function App() {
	const { user } = useSelector((state) => state.profile);

	return (
		<div className="font-inter">
			<Toaster position="top-right" />
			<ScrollToTop />
			<MouseShadow />

			<Suspense fallback={<Loader />}>
				<Routes>
					{/* ❌ NO Navbar/Footer */}
					<Route element={<AuthLayout />}>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
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
						<Route path="*" element={<ErrorPage />} />
					</Route>

					{/* ✅ WITH Navbar/Footer */}
					<Route element={<MainLayout />}>
						<Route path="/" element={<Home />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/about" element={<About />} />
						<Route
							path="/courses/:category"
							element={<CategoryPage />}
						/>

						<Route
							path="/course/:courseId"
							element={
								user ? (
									<CourseDetailsPage />
								) : (
									<Navigate to="/login" />
								)
							}
						/>

						{/* Protected Routes */}
						<Route element={<ProtectedRoute />}>
							<Route path="/dashboard" element={<Dashboard />}>
								<Route
									path="my-profile"
									element={<MyProfile />}
								/>
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
								<Route
									path="add-course"
									element={<AddCourse />}
								/>
								<Route
									path="my-courses"
									element={<MyCourses />}
								/>
								<Route
									path="instructor"
									element={<Instructor />}
								/>
								<Route
									path="edit-course/:courseId"
									element={<EditCourse />}
								/>

								<Route
									path="admin"
									element={
										user?.accountType ===
										ACCOUNT_TYPE.ADMIN ? (
											<AdminDashboard />
										) : (
											<Navigate to="/" />
										)
									}
								/>

								<Route
									path="charts"
									element={
										user?.accountType ===
										ACCOUNT_TYPE.ADMIN ? (
											<Chart />
										) : (
											<Navigate to="/" />
										)
									}
								/>
								<Route
									path="support"
									element={
										user?.accountType ===
										ACCOUNT_TYPE.ADMIN ? (
											<Support />
										) : (
											<Navigate to="/" />
										)
									}
								/>

								<Route
									path="category"
									element={
										user?.accountType ===
										ACCOUNT_TYPE.ADMIN ? (
											<AdminCategory />
										) : (
											<Navigate to="/" />
										)
									}
								/>

								<Route
									path="rating-reviews"
									element={
										user?.accountType ===
										ACCOUNT_TYPE.STUDENT ? (
											<StudentRating />
										) : (
											<Navigate to="/" />
										)
									}
								/>
							</Route>
						</Route>

						<Route
							path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
							element={<ViewCourse />}
						>
							<Route index element={<VideoDetails />} />
						</Route>
					</Route>
				</Routes>
			</Suspense>
		</div>
	);
}

export default App;
