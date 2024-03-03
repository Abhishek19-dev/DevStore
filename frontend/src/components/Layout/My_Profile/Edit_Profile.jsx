import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useNavigation } from "react-router-dom";
import AvatarProfile from "../../../images/avatar_profile_pic.jpg";
import {
  logoutAction,
  registerAction,
} from "../../../Redux/Actions/authAction";
import {
  editProfileAction,
  editProfileReset,
  getUserDetailsAction,
  updatePasswordAction,
  updatePasswordReset,
} from "../../../Redux/Actions/UserAction";
import { useToast } from "@chakra-ui/react";
import { EDIT_PROFILE_RESET, UPDATE_PASSWORD_RESET } from "../../../Redux/ActionType";
const EditProfile = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  //dispatch functions
  const { isRegistered } = useSelector((state) => state.registerAuth);
  const { user } = useSelector((state) => state.userDetails);
  const {
    avatar,
    name: userName,
    email: userEmail,
    phoneNo: userPhoneNo,
    whatsAppNo: userWhatsappNo,
    address: userAddress,
    bio: userBio,
  } = user;
  const {
    message,
    isUpdated,
    error: updatePasswordError,
    loading: updatePasswordLoading,
  } = useSelector((state) => state.updatePassword);

  useEffect(() => {
    if (updatePasswordError !== "") {
      toast({
        title: updatePasswordError,
        status: "error",
        isClosable: true,
      });
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [updatePasswordError]);

  useEffect(() => {
    if (isUpdated) {
      toast({
        title: "Password Updated Successfully , Please Login Again!",
        status: "success",
        isClosable: true,
      });
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
      // navigate('/login')
    }
  });

  //use state function
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [phoneNo, setPhoneNo] = useState(userPhoneNo);
  const [whatsAppNo, setWhatsAppNo] = useState(userWhatsappNo);
  const [address, setAddress] = useState(userAddress);
  const [bio, setBio] = useState(userBio);
  const [gender, setGender] = useState(userBio);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [editBio, setEditBio] = useState(false);

  //for eye button in password
  function toggleOldPasswordVisibility() {
    setIsOldPasswordVisible((prevState) => !prevState);
  }
  function toggleNewPasswordVisibility() {
    setIsNewPasswordVisible((prevState) => !prevState);
  }
  function toggleConfirmPasswordVisibility() {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  }
  const handleEditBio = () => {
    setEditBio(!editBio);
    if (editBio) {
      dispatch(
        editProfileAction(
          name,
          email,
          phoneNo,
          whatsAppNo,
          address,
          bio,
          gender
        )
      );
      dispatch({
        type:EDIT_PROFILE_RESET
      })
    }
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updatePasswordAction(oldPassword, newPassword, confirmNewPassword)
    );

    setOldPassword("");
    setConfirmNewPassword("");
    setNewPassword("");
  };

  //handle save changes button
  const saveChanges = () => {
    dispatch(
      editProfileAction(name, email, phoneNo, whatsAppNo, address, bio, gender)
    );
  };

   useEffect(()=>{
    if(isEdited){
      toast({
        title:"Profile Updated Successfully !",
        status:"success",
        isClosable:true
      })
      dispatch({
        type:EDIT_PROFILE_RESET
      })
    }
   })

  //to extract changes from edited profile.
  const {
    isEdited,
    error: editError,
    loading: editProfileLoading,
  } = useSelector((state) => state.editProfile);

  return (
    <>
      <div class="flex bg-gradient-to-t from-slate-100 to-blue-50 mb-10">
        <div className="flex flex-col">
          <div class="w-[80vh] h-fit mb-10 ml-[9vh] mt-[7vh] rounded-lg shadow-lg bg-white  border">
            <div class="flex flex-col">
              <div class="flex  p-4">
                <div>
                  <img
                    src={avatar ? avatar.url : ""}
                    alt="profile Pic"
                    className="w-[28vh] h-[28vh] rounded-md mr-4"
                  />
                </div>
                <div className="mt-5">
                  <span class="text-xl pl-2 font-nunito font-bold">
                    {userName}
                  </span>
                  {/* to change and edit bio */}
                  <p className="p-3 font-lg text-md font-nunito text-black">
                    {editBio ? (
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        type="textarea"
                        id="skills"
                        class="border bg-gradient-to-t from-slate-100 to-blue-50 border-gray-300 py-2 px-4 rounded-sm h-[20vh] w-[40vh]"
                      />
                    ) : (
                      userBio &&
                      userBio
                        .split("\n")
                        .map((line, index) => <p key={index}>{line}</p>)
                    )}
                  </p>
                  <button class="bg-indigo-500 mx-2 text-white rounded px-2 py-1 mt-2">
                    Edit Photo
                  </button>
                  <button
                    onClick={handleEditBio}
                    class="bg-indigo-500 mx-2 text-white rounded px-2 py-1 mt-2"
                  >
                    {!editBio ? (userBio ? "Edit Bio" : "Add Bio") : "Save Bio"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[80vh] h-fit mb-10 ml-[9vh] mt-[2vh] rounded-lg shadow-lg bg-white  border">
            <h2 className="text-3xl font-nunito text-white font-semibold bg-indigo-500 mb-4 py-3 text-center">
              Update Password
            </h2>
            <form class="mt-4">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="ml-5 font-nunito font-semibold text-lg text-black"
                >
                  Old Password
                </label>
                <input
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  type={isOldPasswordVisible ? "text" : "password"}
                  id="name"
                  className="border bg-gradient-to-t from-slate-100 to-blue-50 border-gray-300 py-2 px-4 rounded-sm w-[70vh] mx-4 my-2"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="ml-5 font-nunito font-semibold text-lg text-black"
                >
                  New Password
                </label>
                <input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type={isNewPasswordVisible ? "text" : "password"}
                  id="name"
                  className="border bg-gradient-to-t from-slate-100 to-blue-50 border-gray-300 py-2 px-4 rounded-sm w-[70vh] mx-4 my-2"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="ml-5 font-nunito font-semibold text-lg text-black"
                >
                  Confirm Password
                </label>
                <input
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  type="text"
                  id="name"
                  className="border bg-gradient-to-t from-slate-100 to-blue-50 border-gray-300 py-2 px-4 rounded-sm w-[70vh] mx-4 my-2"
                />
              </div>

              <button
                onClick={handlePasswordUpdate}
                class="ml-[60vh] w-fit mx-[30vh] flex items-center justify-center bg-indigo-500 text-white rounded mb-4 px-3 py-1 mt-1"
              >
                {updatePasswordLoading ? (
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="mr-2 animate-spin"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                  </svg>
                ) : (
                  ""
                )}
                Update
              </button>
            </form>
          </div>
        </div>
        <div className="w-[90vh] h-fit  ml-[3vh] mt-[7vh] rounded-lg shadow-lg bg-white  border">
          <h2 className="text-3xl font-nunito text-white font-semibold bg-indigo-500 mb-4 py-3 text-center">
            Edit Details
          </h2>
          <form class="mt-4">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="ml-5 font-nunito font-semibold text-lg text-black"
              >
                Developers Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                className="border bg-gradient-to-t from-slate-100 to-blue-50 border-gray-300 py-2 px-4 rounded-sm w-[85vh] mx-4 my-2"
              />
            </div>
            <div class="mb-4">
              <label
                for="email"
                class="ml-5 font-nunito font-semibold text-lg text-black"
              >
                Email Id
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                class="border bg-gradient-to-t from-slate-100 to-blue-50 border-gray-300 py-2 px-4 rounded-sm w-[85vh] mx-4 my-2"
              />
            </div>
            <div class="mb-4">
              <label
                for="phone"
                class="ml-5 font-nunito font-semibold text-lg text-black"
              >
                Phone No
              </label>
              <input
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                type="tel"
                id="phone"
                class="border bg-gradient-to-t from-slate-100 to-blue-50 border-gray-300 py-2 px-4 rounded-sm w-[85vh] mx-4 my-2"
              />
            </div>
            <div class="mb-4">
              <label
                for="whatsapp"
                class="ml-5 font-nunito font-semibold text-lg text-black"
              >
                Whatsapp No
              </label>
              <input
                value={whatsAppNo}
                onChange={(e) => setWhatsAppNo(e.target.value)}
                type="tel"
                id="whatsapp"
                class="border bg-gradient-to-t from-slate-100 to-blue-50 border-gray-300 py-2 px-4 rounded-sm w-[85vh] mx-4 my-2"
              />
            </div>
            <div class="mb-4">
              <label
                for="address"
                class="ml-5 font-nunito font-semibold text-lg text-black"
              >
                Address
              </label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                id="address"
                class="border bg-gradient-to-t from-slate-100 to-blue-50 border-gray-300 py-2 px-4 rounded-sm w-[85vh] mx-4 my-2"
              />
            </div>
            <div class="mb-4">
              <label class="ml-5 font-nunito font-semibold text-lg text-black">
                Gender
              </label>
              <div class="flex">
                <label class="flex items-center mr-4 ml-5 font-nunito font-semibold text-lg text-color6">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    class="mr-2"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Male
                </label>
                <label class="flex items-center ml-5 font-nunito font-semibold text-lg text-color6">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    class="mr-2"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Female
                </label>
              </div>
            </div>
          </form>

          <button
            onClick={saveChanges}
            class=" ml-[70vh] w-fit flex items-center justify-center  bg-indigo-500 text-white rounded mb-4 px-3 py-1"
          >
            {editProfileLoading ? (
              <svg
                width="20"
                height="20"
                fill="currentColor"
                class="mr-2 animate-spin"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
              </svg>
            ) : (
              ""
            )}
            Save Changes
          </button>
        </div>
        {/* <div class="w-1/4">
    <button class="bg-indigo-500 text-white rounded px-4 py-2">Logout</button>
    <div class="mt-4">
      <span>Support Us</span>
     
    </div>
  </div> */}
      </div>
    </>
  );
};

export default EditProfile;
