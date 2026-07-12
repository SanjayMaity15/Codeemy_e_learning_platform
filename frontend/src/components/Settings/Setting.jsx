import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"


export default function Settings() {
  return (
		<>
			<div className="mb-8 rounded-3xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 p-8 text-white shadow-xl">
				<h1 className="text-4xl font-bold">Edit Profile</h1>
				<p className="mt-2 text-white/90">
					Keep your profile updated so students and instructors know
					more about you.
				</p>
			</div>
			{/* Change Profile Picture */}
			<ChangeProfilePicture />
			{/* Profile */}
			<EditProfile />
			{/* Delete Account */}
			<DeleteAccount />
		</>
  );
}
