// /* eslint-disable eqeqeq */
// import React, { useState, useRef, useEffect } from "react";
// import Box from "@mui/material/Box";
// import { styled } from "@mui/material/styles";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import { Link, useNavigate } from "react-router-dom";
// import TextFieldsIcon from "@mui/icons-material/TextFields";
// import CircularProgress from '@mui/material/CircularProgress';
// import VideoCallIcon from "@mui/icons-material/VideoCall";
// import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
// // import { Editor } from '@tinymce/tinymce-react'
// // import '../App.css'

// import { useDispatch } from "react-redux";
// import { logout } from "../../src/store/userSilce";

// // Functions
// import {
//   addPubrelContents,
//   getPubrelContents,
// } from "../components/functions/pubrelContents";
// import UploadImage from "./UploadImage";
// import UploadVideo from "./UploadVideo";

// // const initialstate = {
// //   pubrel_title: '',
// //   pubrel_creator: '',
// //   pubrelcontentsText: [], // table detail tbpublicerelationcontents
// //   prImage: [], // table key tbprimge
// //   prVideo: [], // table key tbprimge
// // }

// function PageAddPublicRelation() {
//   const inputRef = useRef();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => ({ ...state }));
//   const token = user.user.token;
//   const pers_id = user.user.pers_id;
//   const [val, setVal] = useState([]);
//   // const [selectedImages, setSelectedImages] = useState([]);
//   // const [source, setSource] = useState([]);

//   const initialstate = {
//     // pubrel_id: "PR0001",
//     // pubrel_title: "Test 123",
//     // pubrel_createddate: "2023-05-25",
//     // pubrelcon_creator: "1779800065026",
//     // pubrelcontents: [],
//     img: [],
//     vdo: [],
//   };
//   // const [isAddcontent, setIsaddcontent] = useState(false);
//   const [values, setValues] = useState(initialstate);
//   const [loading,setLoading] = useState(false);

//   const [publicRelations, setPublicRelations] = useState([]);

//   const [img, setImg] = useState([]);
//   const [vdo, setVdo] = useState([]);

//   // const handleChange = (e) => {
//   //   setValues({ ...values, [e.target.name]: e.target.value });
//   // };

//   const handleChange = (e,i) => {
//     const { name, value } = e.target;
//     const inputdata = [...val];
//     inputdata[i] = value;
//     setVal(inputdata);

//     setFormValues({
//       ...formValues,
//       [name]: {
//         ...formValues[name],
//         value,
//       },
//     });

//     // setIsaddcontent(true);
//     // console.log("formValues.pubrel_title.value: ",formValues.pubrel_title.value);
//     if ([formValues.pubrel_title] != "") {
//       setFormValues((prevState) => ({
//         ...prevState,
//         pubrel_title: {
//           ...prevState.pubrel_title,
//           error: false,
//         },
//       }));
//     }
//     if ([formValues.pubrelcontents] != "") {
//       setFormValues((prevState) => ({
//         ...prevState,
//         pubrelcontents: {
//           ...prevState.pubrelcontents,
//           error: false,
//         },
//       }));
//     }
//   };

//   useEffect(() => {
//     loadPublicRelations();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const loadPublicRelations = async () => {
//     getPubrelContents(token)
//       .then((res) => {
//         setPublicRelations(res.data);
//         // console.log(res.data);
//       })
//       .catch((err) => {
//         if(err.response.status === 401) {
//           dispatch(logout());
//           navigate('/notfound404', { state: {statusCode: err.response.status, txt: err.response.data} })
//         } else if(err.response.status === 404) {
//           dispatch(logout());
//           navigate('/notfound404', { state: {statusCode: err.response.status, txt: err.response.data} })
//         }
//         console.log("listPubrelContents PageAddPublic: ",err);
//       });
//   };

//   // const handleFileChange = (event) => {
//   //   const lenghtFilevideo = event.target.files.length
//   //   if (lenghtFilevideo <= 1) {
//   //     const selectedFile = event.target.files[0];
//   //         if (selectedFile) {
//   //           const newVideo = {
//   //             file: selectedFile,
//   //             preview: URL.createObjectURL(selectedFile),
//   //           };
//   //           setVdo([...vdo, newVideo.file]);
//   //           setSource((previousVideos) => previousVideos.concat(newVideo.preview));
//   //         }
//   //   } else {
//   //   const inputdata = [...vdo];
//   //   inputdata[0] = event.target.files;
//   //   // console.log("video data: ",inputdata[0])
//   //   setVdo(inputdata[0]);
//   //   const fileArray = Array.from(inputdata[0]);
//   //   // console.log("fileArray: ",fileArray)

//   //   const videoArray = fileArray.map((file) => {
//   //     return URL.createObjectURL(file);
//   //   });

//   //   setSource((previousVideos) => previousVideos.concat(videoArray));
//   // }
//   // };

//   // const handleChoose = (event) => {
//   //   inputRef.current.click();
//   // };

//   const handleAddExplain = () => {
//     // const detail_pub = [...values.pubrelcontents, []];
//     // setValues({ ...values, pubrelcontents: detail_pub });
//     const abc = [...val, []];
//     setVal(abc);
//   };

//   // const handleChange = (onChangeValue, i) => {
//   //   const { name, value } = onChangeValue.target;
//   //   const inputdata = [...val];
//   //   inputdata[i] = value;
//   //   setVal(inputdata);

//   //   setFormValues({
//   //     ...formValues,
//   //     [name]: {
//   //       ...formValues[name],
//   //       value,
//   //     },
//   //   });

//   //   // setIsaddcontent(true);
//   //   // console.log("formValues.pubrel_title.value: ",formValues.pubrel_title.value);
//   //   if ([formValues.pubrel_title] != "") {
//   //     setFormValues((prevState) => ({
//   //       ...prevState,
//   //       pubrel_title: {
//   //         ...prevState.pubrel_title,
//   //         error: false,
//   //       },
//   //     }));
//   //   }
//   //   if ([formValues.pubrelcontents] != "") {
//   //     setFormValues((prevState) => ({
//   //       ...prevState,
//   //       pubrelcontents: {
//   //         ...prevState.pubrelcontents,
//   //         error: false,
//   //       },
//   //     }));
//   //   }
//   // };

//   const handleDelete = (i) => {
//     const deletVal = [...val];
//     deletVal.splice(i, 1);
//     setVal(deletVal);
//     // const deletVal = [...values.pubrelcontents];
//     // deletVal.splice(i, 1);
//     // setValues({...values, pubrelcontents: deletVal});
//   };

//   // const onSelectFile = (event) => {
//   //   const lenghtFile = event.target.files.length
//   //   if (lenghtFile <= 1) {
//   //     const selectedFile = event.target.files[0];
//   //         if (selectedFile) {
//   //           const newImage = {
//   //             file: selectedFile,
//   //             preview: URL.createObjectURL(selectedFile),
//   //           };
//   //           setImg([...img, newImage.file]);
//   //           setSelectedImages((previousImages) => previousImages.concat(newImage.preview));
//   //         }
//   //   } else {
//   //   const inputdata = [...img];
//   //   inputdata[0] = event.target.files;
//   //   // console.log("data IMG: ",inputdata[0])
//   //   setImg(inputdata[0]);
//   //   const selectedFilesArray = Array.from(inputdata[0]);

//   //   const imagesArray = selectedFilesArray.map((file) => {
//   //     return URL.createObjectURL(file);
//   //   });

//   //   setSelectedImages((previousImages) => previousImages.concat(imagesArray));
//   // }
//   // };

//   // function deleteHandler(image) {
//   //   // console.log('deleteHandler', image);
//   //   setSelectedImages(selectedImages.filter((e) => e !== image));
//   //   // setDetailIMG(selectedImages.filter((e) => e !== image))
//   //   setImg(selectedImages.filter((e) => e !== image));
//   //   URL.revokeObjectURL(image);
//   // }

//   // async function deleteVideo(videos, index) {
//   //   const updatedVdo = await [...vdo];
//   //   updatedVdo.splice(index, 1);
//   //   setVdo(updatedVdo);
//   //   setSource(updatedVdo);
//   //   // setSource(source.filter((e) => e !== videos));
//   //   // setVdo(updatedVdo.filter((e) => e !== videos));
//   //   URL.revokeObjectURL(videos);

//   //   console.log("index: ",index)
//   //   console.log("Source: ",source)
//   //   console.log("vdo: ",vdo)
//   // }

//   // const BoxButton = styled(Box)({
//   //   boxShadow: "none",
//   //   textTransform: "none",
//   //   fontSize: "14px",
//   //   fontWeight: "bold",
//   //   padding: "6px 12px",
//   //   border: "1px solid",
//   //   lineHeight: 1.5,
//   //   backgroundColor: "#1976D2",
//   //   borderColor: "#1976D2",
//   //   color: "#FFFFFF",
//   //   borderRadius: "4px",
//   //   fontFamily: [
//   //     "-apple-system",
//   //     "BlinkMacSystemFont",
//   //     '"Segoe UI"',
//   //     "Roboto",
//   //     '"Helvetica Neue"',
//   //     "Arial",
//   //     "sans-serif",
//   //     '"Apple Color Emoji"',
//   //     '"Segoe UI Emoji"',
//   //     '"Segoe UI Symbol"',
//   //   ].join(","),
//   //   "&:hover": {
//   //     backgroundColor: "#1565C0",
//   //     borderColor: "#1565C0",
//   //     boxShadow:
//   //       "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px ,rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
//   //   },
//   //   "&:active": {
//   //     boxShadow: "none",
//   //     backgroundColor: "#0062cc",
//   //     borderColor: "#005cbf",
//   //   },
//   //   "&:focus": {
//   //     boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
//   //   },
//   // });

//   const [formValues, setFormValues] = useState({
//     pubrel_title: {
//       value: "",
//       error: false,
//       errorMessage: "You must enter a Title",
//     },
//     pubrelcontents: {
//       value: "",
//       error: false,
//       errorMessage: "You must enter a Contents",
//     },
//   });

//   const handleSubmit = async (event) => {
//     // console.log("formValues.pubrel_title.error: ",formValues.pubrel_title.error);
//     event.preventDefault();

//     const formFields = Object.keys(formValues);
//     let newFormValues = { ...formValues };
//     // console.log("values: ", newFormValues);
//     // const { officeid, mem_cellphone, mem_offtel, email, rtafbranch,rtafbranchgrp } = formValues;
//     for (let index = 0; index < formFields.length; index++) {
//       const currentField = formFields[index];
//       const currentValue = formValues[currentField].value;
//       if (!currentValue || currentValue==="") {
//         // console.log("currentValue: ", currentValue);
//         newFormValues = {
//           ...newFormValues,
//           [currentField]: {
//             ...newFormValues[currentField],
//             error: true,
//           },
//         };
//         setFormValues(newFormValues);
//       } else if (formValues.pubrelcontents.value === "") {
//         toast.error(
//           "Please enter news or public relations details."
//         );
//         setFormValues((prevState) => ({
//           ...prevState,
//           pubrelcontents: {
//             ...prevState.pubrelcontents,
//             error: true,
//           },
//         }));
//         return;
//       } else {
//         // setIsaddcontent(true);
//         newFormValues = {
//           ...newFormValues,
//           [currentField]: {
//             ...newFormValues[currentField],
//             error: false,
//           },
//         };
//         setFormValues(newFormValues);
//       }
//     }

//     if (formValues.pubrel_title.value !== "" && formValues.pubrelcontents.value !== "") {
//       const data = await new FormData(event.currentTarget);

//       const pubrelcontents = []; //table เนื้อหาข่าว
//       // const primage = []; //table รูป ข่าว
//       // const arrayImg = []
//       const pubrel_id = await
//         publicRelations == []
//           ? "PR0001"
//           : `PR000${publicRelations.length + 1}` === `${publicRelations[0].pubrel_id}` ? `PR000${publicRelations.length + 2}` : `PR000${publicRelations.length + 1}`;
//       // const pub_id = pubrel_id === undefined ? `PR000${publicRelations.length+1}` : pubrel_id
//       console.log("pub_id: " + pubrel_id)
//       // console.log("pub_id 11: " + `${publicRelations[0].pubrel_id}`)
//       // for (var pair of data.entries()) {
//       //   console.log(pair[0]+ ', ' + pair[1]);
//       // }

//       data.append("pubrelcon_creator", pers_id);
//       data.append("pubrel_id", pubrel_id);
//       // data.append(`vdo`, privideo);

//       // console.log("val", val.length)
//       Object.keys(pubrelcontents).forEach((key) => {
//         if (key === "pubrelcontents") {
//           let contents = Array.from(pubrelcontents.contents[0]); //needed to access the first array first
//           for (let i = 0; i < contents.length; i++) {
//             data.append("pubrelcontents", pubrelcontents[i]);
//           }
//         } else {
//           data.append(key, pubrelcontents[key]);
//         }
//       });

//       // console.log("img: ",img)
//       // console.log("vdo: ",vdo)
//       Object.keys(values.img).forEach((key) => {
//         // console.log("key img: ",key)
//         if (key === "img") {
//           // let images = Array.from(img); //needed to access the first array first
//           for (let i = 0; i < values.img.length; i++) {
//             data.append(`img`, values.img[i]);
//           }
//         } else {
//           data.append("img", values.img.map((item) => item.file));
//           // console.log("img[key]: ",img[key])
//         }
//       });

//       Object.keys(values.vdo).forEach((key) => {
//         // console.log("key vdo: ",key)
//         if (key === "vdo") {
//           // let videos = Array.from(vdo); //needed to access the first array first
//           for (let i = 0; i < values.vdo.length; i++) {
//             // privideo.push(vdo[i-1]);
//             data.append(`vdo`, values.vdo[i])
//           }
//         } else {
//           // data.append('vdo', vdo[key]);
//           // console.log("vdo[key]: ",vdo[key])
//           // privideo.push(vdo[key-1]);
//           data.append("vdo", values.vdo.map((item) => item.file))
//         }
//       });

//       // console.log("vdo: ", values.vdo.map((item) => item[key].file));

//       // console.log("index s: ",index)
//     // console.log("Source s: ",source)
//     // console.log("vdo s: ",vdo)

//     // if (vdo.length <= 0) {
//     //   data.delete("vdo")
//     // }

//     const formDataObject = {};
//     for (const entry of data.entries()) {
//       const [name, value] = entry;
//       formDataObject[name] = value;
//     }
//     console.log("data",formDataObject);

//     // const setdata = {
//     //   pubrel_id: pubrel_id,
//     //   pubrel_title: formValues.pubrel_title.value,
//     //   // pubrel_createddate: "2023-05-25",
//     //   pubrelcon_creator: pers_id,
//     //   pubrelcontents: val,
//     //   img: values.img.map((item) => item.file),
//     //   vdo: values.vdo,
//     // }

//     // console.log("dataset",setdata);

//       await addPubrelContents(token, data)
//       .then((res) => {
//         // setLoading(false);
//           //  setIsaddcontent(false);
//         toast.success(res.data.msg);
//         navigate("/PagePublicRelationsManagement");
//       })
//       .catch((error) => {
//         // setLoading(false);
//           //  setIsaddcontent(false);
//         if(error.response){
//           toast.error(error.response.data.message);
//         }
//       })
//     }
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           flexGrow: 1,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           // height: "100%",
//           margin: "100px 0",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             // justifyContent: "center",
//             // alignItems: "center",
//             flexDirection: "column",
//             width: 600,
//             height: "100%",
//           }}
//           component="form"
//           onSubmit={handleSubmit}
//           enctype="multipart/form-data"
//         >
//           <Box sx={{ fontSize: 20, textAlign: "center" }}>
//           {loading
//             ? <h4>Loading...<CircularProgress /></h4>//true
//             : "เพิ่มการประชาสัมพันธ์"//false
//           }

//           </Box>
//           <br />
//           <Box
//             sx={{
//               width: "100%",
//             }}
//           >
//             <TextField
//               id="outlined-basic"
//               label="หัวข้อ"
//               variant="outlined"
//               name="pubrel_title"
//               error={formValues.pubrel_title.error}
//               onChange={handleChange}
//               fullWidth
//               helperText={
//                 formValues.pubrel_title.error &&
//                 formValues.pubrel_title.errorMessage
//               }
//             />
//           </Box>
//           <br />
//           <p style={{ marginRight: "450px" }}>รายละเอียด</p>

//           {/* <input type="file" multiple /> */}
//           {/* {selectedImages &&
//             selectedImages.map((image, index) => {
//               return (
//                 <Box
//                   key={image}
//                   sx={{
//                     width: "100%",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     flexDirection: "column",
//                   }}
//                 >
//                   <br />
//                   <Box sx={{ display: "flex" }}>
//                     <img src={image} height="200" alt="upload" />
//                     <Button
//                       onClick={() => deleteHandler(image)}
//                       sx={{ color: "#ffffff" }}
//                       variant="contained"
//                       color="error"
//                     >
//                       x
//                     </Button>
//                   </Box>
//                 </Box>
//               );
//             })} */}

//           {/* <input
//             ref={inputRef}
//             className="VideoInput_input"
//             type="file"
//             id="vdo"
//             name="vdo"
//             multiple
//             onChange={(e) => handleFileChange(e)}
//             accept=".mov,.mp4"
//           /> */}
//           {/* {source &&
//             source.map((videos, index) => {
//               return (
//                 <Box
//                   key={videos}
//                   sx={{
//                     width: "100%",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     flexDirection: "column",
//                   }}
//                 >
//                   <br />
//                   <Box sx={{ display: "flex" }}>
//                     <video
//                       className="VideoInput_video"
//                       height="200"
//                       controls
//                       src={videos}
//                     />
//                     <Button
//                       onClick={() => deleteVideo(videos, index)}
//                       sx={{ color: "#ffffff" }}
//                       variant="contained"
//                       color="error"
//                     >
//                       x
//                     </Button>
//                   </Box>
//                 </Box>
//               );
//             })} */}

//           {/* <br /> */}
//           <Box sx={{ marginRight: "0px" }}>
//           <Box sx={{ margin: "10px" }}>
//           <Button
//                 onClick={() => handleAddExplain()}
//                 startIcon={<TextFieldsIcon />}
//                 variant="contained"
//               >
//                 ข้อความ/อธิบาย
//               </Button>
//               {val &&
//               val.map((data, i) => {
//             // let allContentText = val
//             // allContentText.push(data);
//             // console.log('allContentText in map: ', allContentText)
//             return (
//               <Box key={i} sx={{ width: "100%" }}>
//                 <br />
//                 <Box sx={{ display: "flex" }}>
//                   <TextField
//                     id="pubrelcontents"
//                     label="รายละเอียด"
//                     multiline
//                     rows={4}
//                     fullWidth
//                     helperText={
//                       formValues.pubrelcontents.error &&
//                       formValues.pubrelcontents.errorMessage
//                     }
//                     // name={`pubrelcontents${i}`}
//                     name="pubrelcontents"
//                     error={formValues.pubrelcontents.error}
//                     value={data}
//                     onChange={(e) => handleChange(e, i)}
//                   />
//                   {/* <input value={data} onChange={e=>handleChange(e,i)} /> */}
//                   <Button
//                     onClick={() => handleDelete(i)}
//                     sx={{ color: "#ffffff" }}
//                     variant="contained"
//                     color="error"
//                   >
//                     x
//                   </Button>
//                 </Box>
//               </Box>
//             );
//           })}
//           </Box>
//           <br />
//           <Box sx={{ margin: "10px" }}>
//               <UploadImage loading={loading}
//             setLoading={setLoading}
//             values={values}
//             setValues={setValues} />
//           </Box>
//           <br />
//             <Box sx={{ margin: "10px" }}>
//             <UploadVideo loading={loading}
//             setLoading={setLoading}
//             values={values}
//             setValues={setValues} />
//             </Box>
//           </Box>
//           {/* <p style={{ marginRight: '450px'}}>รายละเอียด</p> */}

//           {/* <Box
//             sx={{
//               display: "flex",
//               justifyContent: "left",
//               alignItems: "center",
//               margin: "10px",
//               flexDirection: "column",
//             }}
//           > */}
//             {/* <Box sx={{ margin: "10px" }}> */}

//             {/* </Box> */}

//             {/* <Box sx={{ margin: "10px" }}> */}

//             {/* </Box> */}
//             {/* <Box sx={{ margin: "10px" }}>
//               <label>
//                 <BoxButton>
//                   <AddAPhotoIcon
//                     sx={{ fontSize: "16px", marginRight: "7px" }}
//                   />
//                   แนบรูปภาพ
//                   <input
//                     type="file"
//                     id="images"
//                     name="images"
//                     // name={`images${i}`}
//                     // onChange={onSelectFile}
//                     onChange={(e) => onSelectFile(e)}
//                     // onChange={(e) => {
//                     //   setImg(e.target.files);
//                     // }}
//                     multiple
//                     accept="image/png , image/jpeg, image/webp"
//                   />
//                 </BoxButton>
//               </label>
//             </Box> */}
//             <br />

//             {/* <Box sx={{ margin: "10px" }}> */}

//             {/* </Box> */}
//             {/* <Box sx={{ margin: "10px" }}>
//               <Button
//                 startIcon={<VideoCallIcon />}
//                 variant="contained"
//                 onClick={handleChoose}
//               >
//                 แนบวีดีโอ
//               </Button>
//             </Box> */}
//           {/* </Box> */}

//           <br />
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               width: "100%",
//             }}
//           >
//             {/* <Link
//               to="/PagePublicRelationsManagement"
//               style={{
//                 textDecoration: 'none',
//                 width: '100%',
//                 marginRight: '5px',
//               }}
//             > */}
//             <Button type="submit" variant="contained" fullWidth>
//               SAVE
//             </Button>
//             {/* </Link> */}
//             <Link
//               to="/PagePublicRelationsManagement"
//               style={{
//                 textDecoration: "none",
//                 width: "100%",

//                 marginLeft: "5px",
//               }}
//             >
//               <Button variant="outlined" fullWidth>
//                 BLACK
//               </Button>
//             </Link>
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// }

// export default PageAddPublicRelation;

/* eslint-disable eqeqeq */
import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
// import { Editor } from '@tinymce/tinymce-react'
// import '../App.css'

import { useDispatch } from "react-redux";
import { logout } from "../../src/store/userSilce";

// Functions
import {
  addPubrelContents,
  getPubrelContents,
} from "../components/functions/pubrelContents";

function PageAddPublicRelation() {
  const inputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const token = user.user.token;
  const pers_id = user.user.pers_id;
  const [val, setVal] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [source, setSource] = useState([]);
  // const [isAddcontent, setIsaddcontent] = useState(false);

  const [publicRelations, setPublicRelations] = useState([]);

  const [img, setImg] = useState([]);
  const [vdo, setVdo] = useState([]);

  // const privideo = []; //table วีดีโอ ข่าว

  // const [formData, setFormData] = useState([]);

  useEffect(() => {
    loadPublicRelations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadPublicRelations = async () => {
    getPubrelContents(token)
      .then((res) => {
        setPublicRelations(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch(logout());
          navigate("/notfound404", {
            state: { statusCode: err.response.status, txt: err.response.data },
          });
        } else if (err.response.status === 404) {
          dispatch(logout());
          navigate("/notfound404", {
            state: { statusCode: err.response.status, txt: err.response.data },
          });
        }
        console.log("listPubrelContents PageAddPublic: ", err);
      });
  };

  const handleFileChange = async (event) => {
    const selectedFile = await event.target.files[0];
    if (selectedFile) {
      const newVideo = await {
        file: selectedFile,
        preview: URL.createObjectURL(selectedFile),
      };
      setVdo([...vdo, newVideo]);
      setSource((previousVideos) => previousVideos.concat(newVideo));
    }
  };

  // const handleChoose = (event) => {
  //   inputRef.current.click();
  // };

  const handleAddExplain = () => {
    const abc = [...val, []];
    setVal(abc);
  };

  const handleChange = (onChangeValue, i) => {
    const { name, value } = onChangeValue.target;
    const inputdata = [...val];
    inputdata[i] = value;
    setVal(inputdata);

    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value,
      },
    });

    // setIsaddcontent(true);
    // console.log("formValues.pubrel_title.value: ",formValues.pubrel_title.value);
    if ([formValues.pubrel_title] != "") {
      setFormValues((prevState) => ({
        ...prevState,
        pubrel_title: {
          ...prevState.pubrel_title,
          error: false,
        },
      }));
    }
    if ([formValues.pubrelcontents] != "") {
      setFormValues((prevState) => ({
        ...prevState,
        pubrelcontents: {
          ...prevState.pubrelcontents,
          error: false,
        },
      }));
    }
  };

  const handleDelete = (i) => {
    const deletVal = [...val];
    deletVal.splice(i, 1);
    setVal(deletVal);
  };

  const onSelectFile = async (event) => {
    const selectedFile = await event.target.files[0];
    if (selectedFile) {
      const newImage = await {
        file: selectedFile,
        preview: URL.createObjectURL(selectedFile),
      };
      setImg([...img, newImage]);
      setSelectedImages((previousImages) => previousImages.concat(newImage));
    }
  };

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    setImg(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  async function deleteVideo(videos, index) {
    // const updatedVdo = await [...vdo];
    // updatedVdo.splice(index, 1);
    // setVdo(updatedVdo);
    // setSource(updatedVdo);
    // setSource(source.filter((e) => e !== videos));
    // setVdo(source.filter((e) => e !== videos));
    // URL.revokeObjectURL(videos);
    setSource(source.filter((e) => e !== videos));
    setVdo(source.filter((e) => e !== videos));
    URL.revokeObjectURL(videos);
  }

  const BoxButton = styled(Box)({
    boxShadow: "none",
    textTransform: "none",
    fontSize: "14px",
    fontWeight: "bold",
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#1976D2",
    borderColor: "#1976D2",
    color: "#FFFFFF",
    borderRadius: "4px",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: "#1565C0",
      borderColor: "#1565C0",
      boxShadow:
        "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px ,rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  });

  const [formValues, setFormValues] = useState({
    pubrel_title: {
      value: "",
      error: false,
      errorMessage: "You must enter a Title",
    },
    pubrelcontents: {
      value: "",
      error: false,
      errorMessage: "You must enter a Contents",
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formFields = Object.keys(formValues);
    let newFormValues = { ...formValues };
    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];
      const currentValue = formValues[currentField].value;
      if (!currentValue || currentValue === "") {
        newFormValues = {
          ...newFormValues,
          [currentField]: {
            ...newFormValues[currentField],
            error: true,
          },
        };
        setFormValues(newFormValues);
      } else if (formValues.pubrelcontents.value === "") {
        toast.error("Please enter news or public relations details.");
        setFormValues((prevState) => ({
          ...prevState,
          pubrelcontents: {
            ...prevState.pubrelcontents,
            error: true,
          },
        }));
        return;
      } else {
        // setIsaddcontent(true);
        newFormValues = {
          ...newFormValues,
          [currentField]: {
            ...newFormValues[currentField],
            error: false,
          },
        };
        setFormValues(newFormValues);
      }
    }

    if (
      formValues.pubrel_title.value !== "" &&
      formValues.pubrelcontents.value !== ""
    ) {
      const data = await new FormData(event.currentTarget);

      const pubrelcontents = []; //table เนื้อหาข่าว
      const pubrel_id =
        publicRelations == []
          ? "PR0001"
          : `PR000${publicRelations.length + 1}` ===
            `${publicRelations[0]?.pubrel_id}`
          ? `PR000${publicRelations.length + 2}`
          : `PR000${publicRelations.length + 1}`;

      data.append("pubrelcon_creator", pers_id);
      data.append("pubrel_id", pubrel_id);
      data.append("lenvideo", vdo.length);

      Object.keys(pubrelcontents).forEach((key) => {
        if (key === "pubrelcontents") {
          let contents = Array.from(pubrelcontents.contents[0]); //needed to access the first array first
          for (let i = 0; i < contents.length; i++) {
            data.append("pubrelcontents", pubrelcontents[i]);
          }
        } else {
          data.append(key, pubrelcontents[key]);
        }
      });

      Object.keys(img).forEach((key) => {
        if (key === "images") {
          let images = Array.from(img); //needed to access the first array first
          for (let i = 0; i < images.length; i++) {
            data.append(`img`, img[i].file || img[i]);
          }
        } else {
          // console.log("key img: ",img[key])
          data.append("img", img[key].file || img[key]);
        }
      });

      // Object.keys(vdo).forEach((key) => {
      //   if (key === "vdo") {
      //     let video = Array.from(vdo); //needed to access the first array first
      //     for (let i = 0; i < video.length; i++) {
      //       data.append(`vdo`, vdo.file);
      //     }
      //   } else {
      //     // if(vdo.length === 0) {
      //     //   // let val = data.get('vdo')
      //     //   console.log("vdo set: ",data.get(`vdo`))
      //     // } else {
      //     data.append("vdo", vdo[key]);
      //     // data.append("vdo", vdo[key] || vdo[key].file);
      //     // }
      //     console.log("key img: ",vdo[key].file)
      //     console.log("vdo.file : ",vdo.file )
      //   }
      // });

      let videos = Array.from(vdo); //needed to access the first array first
      for (let i = 0; i < videos.length; i++) {
        data.append(`vdo`, vdo[i].file);
      }

    // const formDataObject = {};
    // for (const entry of data.entries()) {
    //   const [name, value] = entry;
    //   formDataObject[name] = value;
    // }
    // console.log("data",formDataObject);

      // console.log("videos.length: ",vdo.length)
      // console.log("img: ",img)
      // console.log("vdo: ",vdo)
      // console.log("vdo: ", data.get(`video`));
      // console.log("img: ", data.get(`img`));

      addPubrelContents(token, data)
        .then((res) => {
          // setLoading(false);
          //  setIsaddcontent(false);
          toast.success(res.data.msg);
          navigate("/PagePublicRelationsManagement");
        })
        .catch((error) => {
          // setLoading(false);
          //  setIsaddcontent(false);
          if (error.response) {
            toast.error(error.response.data.message);
          }
        });
    }
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          high: "100%",
          margin: "100px 0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: 600,
            height: "100%",
          }}
          component="form"
          onSubmit={handleSubmit}
          enctype="multipart/form-data"
        >
          <Box sx={{ fontSize: 20, textAlign: "center" }}>
            เพิ่มการประชาสัมพันธ์
          </Box>
          <br />
          <Box
            sx={{
              width: "100%",
            }}
          >
            <TextField
              id="outlined-basic"
              label="หัวข้อ"
              variant="outlined"
              name="pubrel_title"
              error={formValues.pubrel_title.error}
              onChange={handleChange}
              fullWidth
              helperText={
                formValues.pubrel_title.error &&
                formValues.pubrel_title.errorMessage
              }
            />
          </Box>
          <br />
          <p style={{ marginRight: "450px" }}>รายละเอียด</p>

          {val.map((data, i) => {
            return (
              <Box key={i} sx={{ width: "100%" }}>
                <br />
                <Box sx={{ display: "flex" }}>
                  <TextField
                    id="outlined-multiline-static"
                    label="รายละเอียด"
                    multiline
                    rows={4}
                    fullWidth
                    helperText={
                      formValues.pubrelcontents.error &&
                      formValues.pubrelcontents.errorMessage
                    }
                    // name={`pubrelcontents${i}`}
                    name="pubrelcontents"
                    error={formValues.pubrelcontents.error}
                    value={data}
                    onChange={(e) => handleChange(e, i)}
                  />
                  {/* <input value={data} onChange={e=>handleChange(e,i)} /> */}
                  <Button
                    onClick={() => handleDelete(i)}
                    sx={{ color: "#ffffff" }}
                    variant="contained"
                    color="error"
                  >
                    x
                  </Button>
                </Box>
              </Box>
            );
          })}

          {/* <input type="file" multiple /> */}
          {selectedImages &&
            selectedImages.map((image, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <br />
                  <Box sx={{ display: "flex" }}>
                    <img
                      src={image.preview || image}
                      height="200"
                      alt="upload"
                    />
                    <Button
                      onClick={() => deleteHandler(image)}
                      sx={{ color: "#ffffff" }}
                      variant="contained"
                      color="error"
                    >
                      x
                    </Button>
                  </Box>
                </Box>
              );
            })}

          {source &&
            source.map((videos, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <br />
                  <Box sx={{ display: "flex" }}>
                    <video
                      className="VideoInput_video"
                      height="200"
                      controls
                      src={videos.preview || videos}
                    />
                    <Button
                      onClick={() => deleteVideo(videos, index)}
                      sx={{ color: "#ffffff" }}
                      variant="contained"
                      color="error"
                    >
                      x
                    </Button>
                  </Box>
                </Box>
              );
            })}

          <br />

          {/* <p style={{ marginRight: '450px'}}>รายละเอียด</p> */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "10px",
            }}
          >
            <Box sx={{ margin: "10px" }}>
              <Button
                onClick={() => handleAddExplain()}
                startIcon={<TextFieldsIcon />}
                variant="contained"
              >
                ข้อความ/อธิบาย
              </Button>
            </Box>

            <Box sx={{ margin: "10px" }}>
              <label>
                <BoxButton>
                  <AddAPhotoIcon
                    sx={{ fontSize: "16px", marginRight: "7px" }}
                  />
                  แนบรูปภาพ
                  <input
                    type="file"
                    id="img"
                    name="img"
                    // name={`images${i}`}
                    // onChange={onSelectFile}
                    onChange={(e) => onSelectFile(e)}
                    // onChange={(e) => {
                    //   setImg(e.target.files);
                    // }}
                    // multiple
                    accept="image/png , image/jpeg, image/webp"
                  />
                </BoxButton>
              </label>
            </Box>
            <br />

            <Box sx={{ margin: "10px" }}>
            <label>
              <BoxButton
                // startIcon={<VideoCallIcon />}
                // variant="contained"
                // onClick={handleChoose}
              >
                <VideoCallIcon
                    sx={{ fontSize: "16px", marginRight: "7px" }}
                  />
                แนบวีดีโอ
                <input
                  // ref={inputRef}
                  className="VideoInput_input"
                  type="file"
                  id="vdo"
                  name="vdo"
                  // multiple
                  onChange={(e) => handleFileChange(e)}
                  accept=".mov,.mp4"
                />
              </BoxButton>
            </label>
            </Box>
          </Box>

          <br />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* <Link
              to="/PagePublicRelationsManagement"
              style={{
                textDecoration: 'none',
                width: '100%',
                marginRight: '5px',
              }}
            > */}
            <Button type="submit" variant="contained" fullWidth>
              บันทึก
            </Button>
            {/* </Link> */}
            <Link
              to="/PagePublicRelationsManagement"
              style={{
                textDecoration: "none",
                width: "100%",

                marginLeft: "5px",
              }}
            >
              <Button variant="outlined" fullWidth>
                ย้อนกลับ
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default PageAddPublicRelation;
