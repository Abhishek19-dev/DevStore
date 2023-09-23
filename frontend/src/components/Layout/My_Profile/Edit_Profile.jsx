import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useNavigation } from "react-router-dom";
import AvatarProfile from "../../../images/avatar_profile_pic.jpg";
import { registerAction } from "../../../Redux/Actions/authAction";
import {
  editProfileAction,
  editProfileReset,
  getUserDetailsAction,
  updatePasswordAction,
  updatePasswordReset,
} from "../../../Redux/Actions/UserAction";
const EditProfile = () => {
  const dispatch = useDispatch();

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
  const { message, isUpdated, error } = useSelector(
    (state) => state.updatePassword
  );

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

  const [editBio , setEditBio] = useState(false)

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
  const handleEditBio = ()=>{
    setEditBio(!editBio)
    if(editBio)
    {
      dispatch(
        editProfileAction(name, email, phoneNo, whatsAppNo, address, bio, gender)
      );
      setTimeout(()=>{
        dispatch(editProfileReset())
       },30000)
    }
  }

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
      dispatch(updatePasswordAction(oldPassword, newPassword, confirmNewPassword));

    //to reset updated password and remove error
    setTimeout(() => {
      dispatch(updatePasswordReset())
    }, 30000)
    
    setOldPassword("");
    setConfirmNewPassword("");
    setNewPassword("");
  };

  //handle save changes button
  const saveChanges = () => {
    dispatch(
      editProfileAction(name, email, phoneNo, whatsAppNo, address, bio, gender)
    );
    setTimeout(()=>{
     dispatch(editProfileReset())
     console.log("inside reset")
    },30000)
  };

  //to make user back to login page if not logged in
  const navigate = useNavigate();
  useEffect(() => {
    if (!isRegistered) {
      navigate("/login");
    }
  }, [isRegistered]);

 
  //to extract changes from edited profile.
  const {isEdited,error:editError} = useSelector((state)=>state.editProfile) 

  return (
    <>
      <div class="flex bg-gradient-to-t from-slate-100 to-blue-50 mb-10">
        <div className="flex flex-col">
          <div class="w-[80vh] h-fit mb-10 ml-[9vh] mt-[7vh] rounded-lg shadow-lg bg-white  border">
            <div class="flex flex-col">
              <div class="flex  p-4">
                <div>
                  <img
                    src={avatar.url}
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
                    {editBio ?  <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                type="textarea"
                id="skills"
                class="border bg-gradient-to-t from-slate-100 to-blue-50 border-gray-300 py-2 px-4 rounded-sm h-[20vh] w-[40vh]"
               />: ( userBio &&
                userBio.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))
              )}
                 
                   </p>
                  <button class="bg-indigo-500 mx-2 text-white rounded px-2 py-1 mt-2">
                    Edit Photo
                  </button>
                  <button onClick = {handleEditBio} class="bg-indigo-500 mx-2 text-white rounded px-2 py-1 mt-2">
                  {!editBio ? userBio ? "Edit Bio" :"Add Bio" : "Save Bio"} 
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
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  id="name"
                  className="border bg-gradient-to-t from-slate-100 to-blue-50 border-gray-300 py-2 px-4 rounded-sm w-[70vh] mx-4 my-2"
                />
              </div>
              {isUpdated ? (
                <div
                  class="font-regular relative block w-[70vh] ml-5 rounded-lg bg-green-500 px-4 py-4 text-base text-white"
                  data-dismissible="alert"
                >
                  <div class="absolute top-4 left-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      class="mt-px h-6 w-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div class="ml-8 mr-12">
                    <h5 class="block font-sans text-xl font-semibold leading-snug tracking-normal text-white antialiased">
                      Success
                    </h5>
                    <p class="mt-2 block font-sans text-base font-normal leading-relaxed text-white antialiased">
                      Password Updated Successfully !
                    </p>
                  </div>
                  <div
                    data-dismissible-target="alert"
                    data-ripple-dark="true"
                    class="absolute top-3 right-3 w-max rounded-lg transition-all hover:bg-white hover:bg-opacity-20"
                  >
                  </div>
                </div>
              ) : (error &&
                <div
                  class="w-[70vh] mx-4 my-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong class="font-bold">Alert! </strong>
                  <span class="block sm:inline">{error}</span>
                  <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg
                      class="fill-current h-6 w-6 text-red-500"
                      role="button"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <title>Close</title>
                      <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                    </svg>
                  </span>
                </div>
              )}

              <button
                onClick={handlePasswordUpdate}
                class="ml-[60vh] w-fit mx-[30vh] bg-indigo-500 text-white rounded mb-4 px-3 py-1 mt-1"
              >
                Update
              </button>
            </form>
          </div>
        </div>
        <div className="w-[90vh] h-fit  ml-[9vh] mt-[7vh] rounded-lg shadow-lg bg-white  border">
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
          {isEdited ?    <div role="alert" class="rounded-xl w-[60vh]  ml-6  border border-gray-100 bg-white p-4">
  <div class="flex items-start gap-4">
    <span class="text-green-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </span>

    <div class="flex-1">
      <strong class="block font-medium text-gray-900"> Changes saved </strong>

      <p class="mt-1 text-sm text-gray-700">
        Your  changes have been saved.
      </p>
    </div>

  
  </div>
 
</div> : editError && <div
                  class="w-[70vh] mx-4 my-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong class="font-bold">Alert! </strong>
                  <span class="block sm:inline">{editError}</span>
                  <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg
                      class="fill-current h-6 w-6 text-red-500"
                      role="button"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <title>Close</title>
                      <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                    </svg>
                  </span>
                </div>  }
        
<button
            onClick={saveChanges}
            class=" ml-[70vh] w-fit  bg-indigo-500 text-white rounded mb-4 px-3 py-1"
          >
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
