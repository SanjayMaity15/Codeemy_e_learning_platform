import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/authSlice"
import profileReducer from "../feature/profileSlice"
import  cartReducer from "../feature/cartSlice"
import courseReducer from "../feature/courseSlice"
import viewCourseReducer from "../feature/viewCourseSlice"
import adminSlice from "../feature/adminSlice"
export const store = configureStore({
	reducer: {
		auth: authReducer,
		profile: profileReducer,
		cart: cartReducer,
		course: courseReducer,
		viewCourse: viewCourseReducer,
		admin: adminSlice

	},
});
