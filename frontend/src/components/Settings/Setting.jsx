import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"


export default function Settings() {
  return (
    <>
      <h1 className="mb-14 text-2xl font-semibold">
        Edit Profile
      </h1>
      {/* Change Profile Picture */}
      <ChangeProfilePicture />
      {/* Profile */}
      <EditProfile />
      {/* Delete Account */}
      <DeleteAccount />
    </>
  )
}
