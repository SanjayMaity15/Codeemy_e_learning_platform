import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	instructors: JSON.parse(localStorage.getItem("instructors")) || null,
	students: JSON.parse(localStorage.getItem("students")) || null,
	payments: JSON.parse(localStorage.getItem("payments")) || null,
};

const adminSlice = createSlice({
	name: "admin",
	initialState,
	reducers: {
		setInstructors(state, action) {
			state.instructors = action.payload;
			localStorage.setItem("instructors", JSON.stringify(action.payload));
		},
		setStudents(state, action) {
			state.students = action.payload;
			localStorage.setItem("students", JSON.stringify(action.payload));
		},
		setPayments(state, action) {
			state.payments = action.payload;
			localStorage.setItem("payments", JSON.stringify(action.payload));
		},
		clearAdminData(state) {
			state.instructors = null;
			state.students = null;
			state.payments = null;
			localStorage.removeItem("instructors");
			localStorage.removeItem("students");
			localStorage.removeItem("payments");
		},
	},
});

export const { setInstructors, setStudents, setPayments, clearAdminData } =
	adminSlice.actions;

export default adminSlice.reducer;
