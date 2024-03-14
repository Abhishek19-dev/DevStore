import React, { useEffect, useState } from "react";
import Sell1 from "../../images/sell2.png";
import SellPage3 from "../../images/sellPage3.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyProjects,
  sellProjectAction,
} from "../../Redux/Actions/ProjectAction";
import ProjectDetailsForm from "./SellUtils/ProjectDetailsForm";
import ProjectImages from "./SellUtils/ProjectImages";
import ProjectDescription from "./SellUtils/ProjectDescription";
import PasswordConfirm from "./SellUtils/PasswordConfirm";
import { setId } from "@material-tailwind/react/components/Tabs/TabsContext";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { SELL_PROJECT_RESET } from "../../Redux/ActionType";

const Sell = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [languages, setLanguages] = useState("");
  const [domain, setDomain] = useState("");
  const [password, setPassword] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [idx, setIdx] = useState(0);

  const toast = useToast();
  const navigate = useNavigate();

  const sellProjectSubmitHandler = (e) => {
    e.preventDefault();
  };

  const createProductImagesChange = (event) => {
    // const selectedFiles = event.target.files[0];
    const selectedFiles = event.target.files;
    console.log("selected files", selectedFiles);

    const previews = [];
    const selectedImages = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const preview = URL.createObjectURL(file);
      previews.push(preview);
      const reader = new FileReader();

      reader.onload = (e) => {
        // Access the loaded file data as an ArrayBuffer
        const arrayBuffer = e.target.result;

        // Convert the ArrayBuffer to a Uint8Array
        const uint8Array = new Uint8Array(arrayBuffer);

        // Now you can use the uint8Array as a Buffer-like object
        selectedImages.push({
          file: {
            name: file.name,
            type: file.type,
            size: file.size,
          },
          buffer: uint8Array, // Store the Uint8Array
        });

        // Update the images state with the selected images
        setImages(selectedImages);
      };

      reader.readAsArrayBuffer(file);
    }
    setImagesPreview(previews);
  };

  const handleSellProject = async (e) => {
    if (password == "") {
      toast({
        title: "Please Enter Password",
        status: "error",
        isClosable: true,
      });
    } else {
      e.preventDefault();

      // Convert selected images into the desired format
      const convertedImages = images.map((image) => ({
        fieldname: "files",
        originalname: image.file.name,
        encoding: "7bit", // You can set the appropriate encoding here
        mimetype: image.file.type,
        buffer: image.buffer, // Use the stored buffer
        size: image.file.size,
      }));

      // Create a FormData object and append other form data
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("languages", languages);
      formData.append("domain", domain);
      formData.append("price", price);
      formData.append("password", password);

      // Append the images to the FormData object
      // for (const image of convertedImages) {
      //   formData.append('files', image.buffer, image.originalname); // Make sure 'files' matches your server's field name
      for (const image of images) {
        formData.append("files", new Blob([image.buffer]), image.file.name);
      }
      // console.log(images)
      dispatch(sellProjectAction(formData));
      // dispatch(sellProjectAction(title,description,languages,domain,price,phoneNo,password,images))
      // }
    }
  };

  // useEffect(()=>{
  //   dispatch(getMyProjects())
  // })

  const {
    isSold,
    error: sellError,
    loading: sellProjectLoading,
  } = useSelector((state) => state.sellProject);

  useEffect(() => {
    if (sellError) {
      toast({
        title: sellError,
        status: "error",
        isClosable: true,
      });
    }
  }, []);

  useEffect(() => {
    if (isSold) {
      toast({
        title: "Project ready for sold !",
        status: "success",
        isClosable: true,
      });
      dispatch({
        type: SELL_PROJECT_RESET,
      });
      navigate("/myProjects");
      // dispatch(getMyProjects());
    }
  }, [isSold, getMyProjects]);

  const handlePrevIdx = () => {
    setIdx(idx - 1);
  };
  const handleIdx = () => {
    if (idx === 0) {
      if (title === "" || domain === "" || languages === "" || price === "") {
        toast({
          title: "Please Enter All the fields",
          status: "error",
          isClosable: true,
        });
      } else {
        if (idx >= 3) {
          setIdx(3);
        }
        if (idx < 3) {
          setIdx(idx + 1);
        }
      }
    }

    if (idx === 1) {
      if (description === "") {
        toast({
          title: "Description Cannot Be Empty",
          status: "error",
          isClosable: true,
        });
      } else {
        if (idx >= 3) {
          setIdx(3);
        }
        if (idx < 3) {
          setIdx(idx + 1);
        }
      }
    }

    if (idx === 2) {
      if (images.length === 0) {
        toast({
          title: "Please Select An Image",
          status: "error",
          isClosable: true,
        });
      } else {
        if (idx >= 3) {
          setIdx(3);
        }
        if (idx < 3) {
          setIdx(idx + 1);
        }
      }
    }
  };

  return (
    <>
      <section class="bg-color17  py-10">
        <div class=" container mx-auto ">
          <div className="flex mt-2 pt-0 items-center lg:ml-[30vh] ml-[1rem] mb-[3vh]">
            <img className="w-20 h-20" src={Sell1} alt="" />
            <h2 class="text-4xl pt-10 font-nunito text-black font-semibold mb-6">
              Sell your projects and earn money
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row ">
            <div class="lg:w-1/2">
              <form
                class="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 lg:h-[38rem] h-[42rem]"
                // class="bg-black h-[60%] shadow-2xl rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={sellProjectSubmitHandler}
              >
                {idx === 0 && (
                  <ProjectDetailsForm
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    languages={languages}
                    setLanguages={setLanguages}
                    domain={domain}
                    setDomain={setDomain}
                    price={price}
                    setPrice={setPrice}
                  />
                )}

                {idx === 1 && (
                  <ProjectDescription
                    description={description}
                    setDescription={setDescription}
                  />
                )}

                {idx === 2 && (
                  <ProjectImages
                    createProductImagesChange={createProductImagesChange}
                    imagesPreview={imagesPreview}
                  />
                )}

                {idx === 3 && (
                  <PasswordConfirm
                    password={password}
                    setPassword={setPassword}
                  />
                )}

                <div className="flex pb-[-2rem] flex-row justify-end pr-[2rem]">
                  {idx !== 0 ? (
                    <div class="flex items-center justify-between">
                      <button
                        onClick={handlePrevIdx}
                        class="bg-indigo-500 mr-[2rem] hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                      >
                        Prev
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                  {idx !== 3 ? (
                    <div class="flex items-center justify-between">
                      <button
                        onClick={handleIdx}
                        class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                      >
                        Next
                      </button>
                    </div>
                  ) : !sellProjectLoading ? (
                    <div class="flex items-center justify-between">
                      <button
                        onClick={handleSellProject}
                        class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      class="bg-blue-600 flex items-center justify-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
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
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </div>
            <div class="lg:w-1/2 mt-5">
              <p class=" text-center font-nunito py-5 ml-5 text-lg text-black">
                {" "}
                <span className="mt-5 lg:ml-[11vh] ml-[1rem]  text-4xl font-semibold text-color9">
                  Sell with Confidence{" "}
                </span>{" "}
                <br></br> "Reach the right audience - Our secure platform
                ensures smooth transactions and allows you to set your project's
                price."
              </p>
              <img
                src={SellPage3}
                alt="Sell with Confidence"
                class="lg:w-[100vh] w-[16rem] h-[16rem] lg:h-[90vh] mt-0 ml-10"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sell;
