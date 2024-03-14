/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import "../App.css";
import ConfirmDialogBox from "../components/ConfirmDialogBox";
import ConfirmDialogBoxImg from "../components/ConfirmDialogBoxImg";
import ConfirmDialogBoxVdo from "../components/ConfirmDialogBoxVdo";
import AlertDialog from "../components/AlertDialog";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../src/store/userSilce";

// Functions
import {
  getPubrelContentsById,
  updatePubrelContents,
  delPubrelContents,
  delContentsMedia,
} from "../components/functions/pubrelContents";

function PageEditPublicRelation() {
  const inputRef = React.useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state }));
  const token = user.user.token;
  const pers_id = user.user.pers_id;

  const [val, setVal] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [source, setSource] = useState([]);

  const [news, setNews] = useState([]);
  const [imgs, setImgs] = useState([]); //set ค่าจาก database ที่ดึงมา
  const [pubTitle, setPubtitle] = useState("");

  const [img, setImg] = useState([]); //set ค่าใหม่
  const [vdo, setVdo] = useState([]);
  const [multiVideo, setMultiVideo] = useState([]);

  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogImg, setOpenDialogImg] = useState(false);
  const [openDialogVdo, setOpenDialogVdo] = useState(false);
  const [delflag, setDelFlag] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [confirmDelImg, setConfirmDelImg] = useState(false);
  const onShowConfirmDialog = () => {
    setOpenDialog(true);
  };
  const onShowConfirmDialoImg = () => {
    setOpenDialogImg(true);
  };
  const onShowConfirmDialogVdo = () => {
    setOpenDialogVdo(true);
  };

  const onConfirmDel = () => {
    setConfirmDel(false);
    setConfirmDelImg(false);
  };

  const [delRowNr, setDelRowsNr] = useState(0);
  const [delDetailId, setDeldetailid] = useState("");
  const [delDetailIdImg, setDeldetailidImg] = useState([]);

  const location = useLocation();
  const { id } = location.state;

  useEffect(() => {
    loadPublicRelations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmDel, confirmDelImg]);

  const loadPublicRelations = async () => {
    await getPubrelContentsById(token, id)
      .then((res) => {
        setVal(res.data.news);
        setImgs(res.data.pathimg);
        setPubtitle(res.data.news[0].pubrel_title);
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
        console.log("listPubrelContents PageEditPublic: ", err);
      });
  };

  const handleFileChange = async (event) => {
    const lenghtFilevideo = await event.target.files.length;
    if (lenghtFilevideo <= 1) {
      const selectedFile = await event.target.files[0];
      // console.log("data video: ",selectedFile)
      if (selectedFile) {
        const newVideo = {
          file: selectedFile,
          preview: URL.createObjectURL(selectedFile),
        };
        setVdo([...vdo, newVideo.file]);
        setSource((previousVideos) => previousVideos.concat(newVideo.preview));
      }
    } else {
      const inputdata = await [...vdo];
      inputdata[0] = await event.target.files;
      // console.log("data video: ",inputdata)
      console.log("data video1: ", inputdata[0]);
      const fileArray = await Array.from(inputdata[0]);
      setVdo(inputdata[0]);
      setMultiVideo(inputdata[0]);

      const videoArray = await fileArray.map((file) => {
        return URL.createObjectURL(file);
      });

      setSource((previousVideos) => previousVideos.concat(videoArray));
    }
  };
  // console.log("data multiVideo: ", multiVideo);

  const handleChoose = (event) => {
    inputRef.current.click();
  };

  const handleAddExplain = () => {
    const def = [...val, []];
    setVal(def);
  };

  const handleChange = (onChangeValue, index) => {
    const inputdata = [...val];
    inputdata[index].pubrelcontents = onChangeValue.target.value;
    setVal(inputdata);
    setNews(inputdata[index].pubrelcontents);
  };

  const onSelectFile = (event) => {
    const lenghtFile = event.target.files.length;
    if (lenghtFile <= 1) {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        const newImage = {
          file: selectedFile,
          preview: URL.createObjectURL(selectedFile),
        };
        setImg([...img, newImage.file]);
        setSelectedImages((previousImages) =>
          previousImages.concat(newImage.preview)
        );
      }
    } else {
      const inputdata = [...img];
      inputdata[0] = event.target.files;
      setImg(inputdata[0]);
      const selectedFilesArray = Array.from(inputdata[0]);

      const imagesArray = selectedFilesArray.map((file) => {
        return URL.createObjectURL(file);
      });

      setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    }
  };

  const handleDelete = (i, no) => {
    setDelRowsNr(no + 1);
    setDeldetailid(i);
    onShowConfirmDialog();
  };

  useEffect(() => {
    if (confirmDel) {
      delPubrelContents(token, delDetailId)
        .then((res) => {
          onConfirmDel();
          toast.success(res.data.msg);
          loadPublicRelations();
          setNews(null);
        })
        .catch((err) => {
          onConfirmDel();
          if (err.response) {
            onConfirmDel();
            toast.error(err.response.data.message);

            if (err.response.status === 401) {
              dispatch(logout());
              navigate("/notfound404", {
                state: {
                  statusCode: err.response.status,
                  txt: err.response.data,
                },
              });
            } else if (err.response.status === 404) {
              dispatch(logout());
              navigate("/notfound404", {
                state: {
                  statusCode: err.response.status,
                  txt: err.response.data,
                },
              });
            }
          }
        });
    }
    if (confirmDelImg) {
      delContentsMedia(token, delDetailIdImg)
        .then((res) => {
          onConfirmDel();
          toast.success(res.data.msg);
          loadPublicRelations();
        })
        .catch((err) => {
          onConfirmDel();
          if (err.response) {
            onConfirmDel();
            setSelectedImages(
              selectedImages.filter((e) => e !== selectedImages[delRowNr - 1])
            );
            setImgs(imgs.filter((e) => e !== imgs[delRowNr - 1]));
            setImg(img.filter((e) => e !== img[delRowNr - 1]));
            setVdo(Object.values(vdo).filter((e) => e !== vdo[delRowNr - 1]));
            setMultiVideo(
              Object.values(multiVideo).filter(
                (e) => e !== multiVideo[delRowNr - 1]
              )
            );
            setSource(source.filter((e) => e !== source[delRowNr - 1]));
            toast.error(err.response.data.message);

            if (err.response.status === 401) {
              dispatch(logout());
              navigate("/notfound404", {
                state: {
                  statusCode: err.response.status,
                  txt: err.response.data,
                },
              });
            } else if (err.response.status === 404) {
              dispatch(logout());
              navigate("/notfound404", {
                state: {
                  statusCode: err.response.status,
                  txt: err.response.data,
                },
              });
            }
          }
        });
    }
  }, [confirmDel, val, confirmDelImg, imgs, source, vdo /*, delrowsid*/]);

  function deleteHandler(image, path, i) {
    if (image === undefined) {
      setSelectedImages(selectedImages.filter((e) => e !== image));
      setImgs(imgs.filter((e) => e !== imgs));
      URL.revokeObjectURL(image);
    }
    const detail = {
      id: image,
      pathmedia: path,
    };
    setDeldetailidImg(detail);
    setDelRowsNr(i + 1);
    onShowConfirmDialoImg();
    // console.log("data: ",image)
  }

  async function deleteVideo(videos, path, i) {
    if (videos === undefined && confirmDelImg) {
      let filterVideo = await vdo.filter((item, j) => {
        return item[j] !== i;
      });

      let filterVideoMul = await multiVideo.filter((item, j) => {
        return item[j] !== delRowNr - 1;
      });

      setVdo({ ...vdo, filterVideo });
      setSource({ ...source, filterVideo });
      setMultiVideo({ ...multiVideo, filterVideoMul });
      URL.revokeObjectURL(filterVideo);
    }

    const detail = {
      id: videos,
      pathmedia: path,
    };
    setDeldetailidImg(detail);
    setDelRowsNr(i + 1);
    onShowConfirmDialogVdo();
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await new FormData(event.currentTarget);

    const pubrelcontents = []; //table เนื้อหาข่าว

    data.append("pubrelcon_creator", pers_id);
    data.append("pubrel_id", id);
    data.append("lenvideo", vdo.length);

    Object.keys(val).forEach((key) => {
      if (key === "val") {
        let contents = Array.from(val); //needed to access the first array first
        for (let i = 0; i < contents.length; i++) {
          data.append("pubrelcont_id", val[i].pubrelcont_id);
        }
      } else {
        data.append("pubrelcont_id", val[key].pubrelcont_id);
      }
    });

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
          data.append(`img`, img[i]);
        }
      } else {
        data.append("img", img[key]);
      }
    });

    Object.keys(vdo).forEach((key) => {
      if (key === "vdo") {
        let videos = vdo.length; //needed to access the first array first
        for (let i = 0; i < videos.length; i++) {
          data.append(`vdo`, vdo[i]);
        }
      } else {
        data.append("vdo", vdo[key - 1]); // upload one clip at a time
        // }
      }
    });

    // const formDataObject = {};
    // for (const entry of data.entries()) {
    //   const [name, value] = entry;
    //   formDataObject[name] = value;
    // }
    // console.log(formDataObject);

    await updatePubrelContents(token, data)
      .then((res) => {
        toast.success(res.data.msg);
        navigate("/PagePublicRelationsManagement");
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        }
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
      });
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
            แก้ไขการประชาสัมพันธ์
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
              name="pubtitle"
              value={pubTitle}
              // onChange={handleChange}
              onChange={(e) => setPubtitle(e.target.value)}
              fullWidth
            />
          </Box>

          {val.map((data, i) => {
            return (
              <Box key={i} sx={{ width: "100%" }}>
                <ConfirmDialogBox
                  title="ยืนยันการลบข้อมูลประชาสัมพันธ์"
                  content={`คุณต้องการลบเรื่อง ${data.pubrel_title} รายละเอียดที่ ${delRowNr} ที่เลือกหรือไม่?`}
                  setDelFlag={setDelFlag}
                  openDialog={openDialog}
                  setOpenDialog={setOpenDialog}
                  setConfirmDel={setConfirmDel}
                  setConfirmDelImg={setConfirmDelImg}
                  // id={data.pubrelcont_id}
                />
                <br />
                <Box sx={{ display: "flex" }}>
                  <TextField
                    id="outlined-multiline-static"
                    label="รายละเอียด"
                    multiline
                    rows={4}
                    fullWidth
                    name="pubrelcontents"
                    defaultValue={
                      data.pubrelcontents ? data.pubrelcontents : ""
                    }
                    value={data.pubrelcontents ? data.pubrelcontents : ""}
                    onChange={(e) => handleChange(e, i)}
                  />
                  <Button
                    onClick={() => handleDelete(data.pubrelcont_id, i)}
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
          {imgs &&
            // path === "I" &&
            imgs.map((image, index) => {
              const chkImg = imgs[index].primgcode.includes("IMG");
              // const chkImg = imgs[index].primgcode.slice(-4,-3) === 'G' ? true : false
              return chkImg ? (
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
                      src={
                        process.env.REACT_APP_API_URL_IMG +
                        imgs[index].primgfilepath
                      }
                      height="200"
                      alt="upload"
                    />
                    <Button
                      onClick={() =>
                        deleteHandler(
                          image.primgcode,
                          image.primgfilepath,
                          index
                        )
                      }
                      sx={{ color: "#ffffff" }}
                      variant="contained"
                      color="error"
                    >
                      x
                    </Button>
                  </Box>
                </Box>
              ) : (
                ""
              );
            })}

          {selectedImages &&
            selectedImages.map((image, index) => {
              return (
                <Box
                  key={image}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <ConfirmDialogBoxImg
                    title="ยืนยันการลบข้อมูลประชาสัมพันธ์"
                    content={`คุณต้องการลบรูปที่ ${delRowNr} ในหัวข้อข่าวเรื่อง ${pubTitle} ที่เลือกหรือไม่?`}
                    setDelFlag={setDelFlag}
                    openDialogImg={openDialogImg}
                    setOpenDialogImg={setOpenDialogImg}
                    setConfirmDelImg={setConfirmDelImg}
                  />
                  <br />
                  <Box sx={{ display: "flex" }}>
                    <img src={image} height="200" alt="upload" />
                    <Button
                      onClick={() =>
                        deleteHandler(
                          image.primgcode,
                          image.primgfilepath,
                          index
                        )
                      }
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

          <input
            ref={inputRef}
            className="VideoInput_input"
            type="file"
            id="vdo"
            name="vdo"
            // multiple
            onChange={handleFileChange}
            accept=".mov,.mp4"
          />
          {imgs &&
            imgs.map((videos, index) => {
              // const id = imgs[index].primgcode.search("-")
              // const chkImg =
              //   imgs[index].primgcode.slice(-4,-3) === 'G' ? true : false
              const chkImg = imgs[index].primgcode.includes("IMG");
              return !chkImg ? (
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
                  <ConfirmDialogBoxVdo
                    title="ยืนยันการลบข้อมูลประชาสัมพันธ์"
                    content={`คุณต้องการลบวีดีโอที่ ${delRowNr} ในหัวข้อข่าวเรื่อง ${pubTitle} ที่เลือกหรือไม่?`}
                    setDelFlag={setDelFlag}
                    openDialogVdo={openDialogVdo}
                    setOpenDialogVdo={setOpenDialogVdo}
                    setConfirmDelImg={setConfirmDelImg}
                  />
                  <br />
                  <Box sx={{ display: "flex" }}>
                    <video
                      className="VideoInput_video"
                      height="200"
                      controls
                      src={
                        process.env.REACT_APP_API_URL_IMG +
                        imgs[index].primgfilepath
                      }
                    />
                    <Button
                      onClick={() =>
                        deleteVideo(
                          videos.primgcode,
                          videos.primgfilepath,
                          index
                        )
                      }
                      sx={{ color: "#ffffff" }}
                      variant="contained"
                      color="error"
                    >
                      x
                    </Button>
                  </Box>
                </Box>
              ) : (
                ""
              );
            })}
          {source &&
            source.map((videos, index) => {
              return (
                <Box
                  key={videos}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <ConfirmDialogBoxVdo
                    title="ยืนยันการลบข้อมูลประชาสัมพันธ์"
                    content={`คุณต้องการลบวีดีโอที่ ${delRowNr} ในหัวข้อข่าวเรื่อง ${pubTitle} ที่เลือกหรือไม่?`}
                    setDelFlag={setDelFlag}
                    openDialogVdo={openDialogVdo}
                    setOpenDialogVdo={setOpenDialogVdo}
                    setConfirmDelImg={setConfirmDelImg}
                  />
                  <br />
                  <Box sx={{ display: "flex" }}>
                    <video
                      className="VideoInput_video"
                      height="200"
                      controls
                      src={videos}
                    />
                    <Button
                      onClick={() =>
                        deleteVideo(
                          videos.primgcode,
                          videos.primgfilepath,
                          index
                        )
                      }
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

          <p style={{ marginRight: "450px" }}>อัพโหลดรูปภาพ/วีดีโอ</p>

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
                    name="images"
                    id="images"
                    onChange={onSelectFile}
                    // multiple
                    accept="image/png , image/jpeg, image/webp"
                  />
                </BoxButton>
              </label>
            </Box>
            <br />

            <Box sx={{ margin: "10px" }}>
              <Button
                startIcon={<VideoCallIcon />}
                variant="contained"
                onClick={handleChoose}
              >
                แนบวีดีโอ
              </Button>
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
            <Button type="submit" variant="contained" fullWidth>
              SAVE
            </Button>
            <Link
              to="/PagePublicRelationsManagement"
              style={{
                textDecoration: "none",
                width: "100%",

                marginLeft: "5px",
              }}
            >
              <Button variant="outlined" fullWidth>
                BLACK
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
      <ConfirmDialogBoxImg
        title="ยืนยันการลบข้อมูลประชาสัมพันธ์"
        content={`คุณต้องการลบรูปที่ ${delRowNr} ในหัวข้อข่าวเรื่อง ${pubTitle} ที่เลือกหรือไม่?`}
        setDelFlag={setDelFlag}
        openDialogImg={openDialogImg}
        setOpenDialogImg={setOpenDialogImg}
        setConfirmDelImg={setConfirmDelImg}
        setConfirmDel={setConfirmDel}
      />

      {openAlertDialog && (
        <AlertDialog
          title="แจ้งผลการลบข้อมูล"
          content={`รายละเอียดข่าว ${pubTitle} ถูกลบเรียบร้อยแล้ว`}
          openDialog={openAlertDialog}
          setOpenDialog={setOpenAlertDialog}
        />
      )}
    </>
  );
}

export default PageEditPublicRelation;
