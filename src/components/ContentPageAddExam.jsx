/* eslint-disable eqeqeq */
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../src/store/userSilce";

// Functions
import { searchHandler } from "../components/functions/user";
import { addMemberAndRightHandler } from "./functions/addMember";

//confirmDialog
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function ContentPageAddExam() {
  const { right } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const token = user.user.token;
  //console.log(token);

  const Ranks = [
    "ไม่ระบุ",
    "นาย",
    "นาง",
    "นางสาว",
    "จ.ต.",
    "จ.ต.หญิง",
    "จ.ท.",
    "จ.ท.หญิง",
    "จ.อ.",
    "จ.อ.หญิง",
    "พ.อ.ต.",
    "พ.อ.ต.หญิง",
    "พ.อ.ท.",
    "พ.อ.ท.หญิง",
    "พ.อ.อ.",
    "พ.อ.อ.หญิง",
    "ร.ต.",
    "ว่าที่ ร.ต.",
    "ร.ต.หญิง",
    "ว่าที่ ร.ต.หญิง",
    "ร.ท.",
    "ว่าที่ ร.ท.",
    "ร.ท.หญิง",
    "ว่าที่ ร.ท.หญิง",
    "ร.อ.",
    "ว่าที่ ร.อ.",
    "ร.อ.หญิง",
    "ว่าที่ ร.อ.หญิง",
    "น.ต.",
    "ว่าที่ น.ต.",
    "น.ต.หญิง",
    "ว่าที่ น.ต.หญิง",
    "น.ท.",
    "ว่าที่ น.ท.",
    "น.ท.หญิง",
    "ว่าที่ น.ท.หญิง",
    "น.อ.",
    "ว่าที่ น.อ.",
    "น.อ.หญิง",
    "ว่าที่ น.อ.หญิง",
    "พล.อ.ต.",
    "พล.อ.ต.หญิง",
    "พล.อ.ท.",
    "พล.อ.ท.หญิง",
    " พล.อ.อ.",
    "พล.อ.อ.หญิง",
  ];

  const Perscorps = [
    "ถร.",
    "ชอ.",
    "ชย.",
    "กง.",
    "สบ.",
    "ส.",
    "พธ.",
    "สพ.",
    "พ.",
    "ขส.",
    "วศ.",
    "อย.",
    "สห.",
    "พด.",
    "ดย.",
    "ผท.",
    "อต.",
    "ตห.",
  ];

  const PersGrps = [
    "ผู้ทำการในอากาศ",
    "ยุทธการ",
    "นักบิน",
    "วิทยาศาสตร์",
    "อุตุนิยมวิทยา",
    "ควบคุมการปฏิบัติทางอากาศ",
    "นิรภัย",
    "สารสนเทศและสงครามอิเล็กทรอนิกส์",
    "สื่อสารอิเล็กทรอนิกส์",
    "สรรพาวุธ",
    "ช่างอากาศ",
    "ส่งกำลังบำรุง",
    "ช่างพาหนะ",
    "ช่างโยธา",
    "แผนที่",
    "ขนส่ง",
    "พลาธิการ",
    "พัสดุ",
    "การเงิน",
    "ปลัดบัญชี",
    "ตรวจสอบภายใน",
    "สารบรรณ",
    "ลาดตระเวนทางอากาศ",
    "กำลังพล",
    "สวัสดิการ",
    "การศึกษาและการฝึก",
    "ดุริยางค์",
    "สารวัตร",
    "อากาศโยธิน",
    "กิจการพลเรือนและประชาสัมพันธ์",
    "อนุศาสนาจารย์",
    "บริการแพทย์",
    "พยาบาล",
    "การข่าวกรอง",
    "พระธรรมนูญ",
    "ผู้ชำนาญการแพทย์เฉพาะอย่าง",
    "เภสัชกร",
    "แพทย์",
    "ทันตแพทย์",
    "ผู้บังคับอากาศยานไร้คนขับ",
    "ปฏิบัติการทางอวกาศ",
    "ไม่ระบุจำพวก",
  ];

  const Companys = [
    "ศบพ.",
    "ศฮพ.",
    "ศกอ.",
    "สพร.ทอ.",
    "สคม.ทอ.",
    "สลก.ทอ.",
    "สบ.ทอ.",
    "กพ.ทอ.",
    "ขว.ทอ.",
    "ยก.ทอ.",
    "กบ.ทอ.",
    "กร.ทอ.",
    "ทสส.ทอ.",
    "สปช.ทอ.",
    "กง.ทอ.",
    "จร.ทอ.",
    "สตน.ทอ.",
    "สนภ.ทอ.",
    "สธน.ทอ.",
    "ศซบ.ทอ.",
    "สบน.ทอ.",
    "คปอ.ทอ.",
    "อย.",
    "รร.การบิน",
    "บน.1",
    "บน.2",
    "บน.3",
    "บน.4",
    "บน.5",
    "บน.7",
    "บน.6",
    "บน.23",
    "บน.21",
    "บน.41",
    "บน.46",
    "บน.56",
    "ศปอว.ทอ.",
    "พธ.ทอ.",
    "ชอ.",
    "สอ.ทอ.",
    "สพ.ทอ.",
    "พอ.",
    "ขส.ทอ.",
    "ชย.ทอ.",
    "ศซว.ทอ.",
    "ยศ.ทอ.",
    "รร.นนก.",
    "ศวอ.ทอ.",
    "สก.ทอ.",
    "สน.ผบ.ดม.",
    "สวบ.ทอ.",
  ];

  const [values, setValues] = useState([]);
  const [image, setImage] = useState("");
  const [idc, setIdc] = useState("");
  const [officeid, setOffice] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegis, setIsregis] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [formValues, setFormValues] = useState({
    email: {
      value: "",
      error: false,
      errorMessage: "You must enter a Email",
    },
    password: {
      value: "",
      error: false,
      errorMessage: "You must enter a Password",
    },
    officeid: {
      value: "",
      error: false,
      errorMessage:
        "You must enter at least 12 digits. If it is 10 digits, add 00 to the last 2 digits.",
    },
    idc: {
      value: "",
      error: false,
      errorMessage: "You must enter a number of at least 13 digits.",
    },
    fname: {
      value: "",
      error: false,
      errorMessage: "You must enter a first name",
    },
    lname: {
      value: "",
      error: false,
      errorMessage: "You must enter a last name",
    },
    user_position: {
      value: "",
      error: false,
      errorMessage: "You must enter a position",
    },
    user_orgname: {
      value: "",
      error: false,
      errorMessage: "You must enter a organization name",
    },
    rtafbranch: {
      value: "",
      error: false,
      errorMessage: "You must enter a rtaf branch name",
    },
    rtafbranchgrp: {
      value: "",
      error: false,
      errorMessage: "You must enter a rtaf branch group name",
    },
    mem_cellphone: {
      value: "",
      error: false,
      errorMessage: "You must enter a cell phone number of at least 10 digits.",
    },
    mem_offtel: {
      value: "",
      error: false,
      errorMessage:
        "You must enter a office phone number of at least 5 digits.",
    },
  });

  const handleSearch = async (e) => {
    e.preventDefault();

    const formFields = Object.keys(formValues);
    let newFormValues = { ...formValues };
    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];
      const currentValue = formValues[currentField].value;

      if (currentValue.email === "" && currentValue.password === "") {
        setFormValues((prevState) => ({
          ...prevState,
          email: {
            ...prevState.email,
            error: true,
          },
        }));
        setFormValues((prevState) => ({
          ...prevState,
          password: {
            ...prevState.password,
            error: true,
          },
        }));

        setFormValues(newFormValues);
        return;
      } else {
        // console.log(checkUser)
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

    if (values.email !== "" || values.password !== "") {
      const checkUser = {
        email: values.email,
        password: values.password,
        // pers_id: values.pers_id,
      };
      searchHandler(checkUser)
        .then((res) => {
          //console.log('search person: ', res.data)
          setValues(res.data);
          setImage(res.data.img_base64);
          setIdc(res.data.idcard);
          setOffice(res.data.officer_id);
          setFormValues((prevState) => ({
            ...prevState,
            officeid: {
              ...prevState.officeid,
              value: res.data.officer_id,
            },
            idc: {
              ...prevState.idc,
              value: res.data.idcard,
            },
            fname: {
              ...prevState.fname,
              value: res.data.fname,
            },
            lname: {
              ...prevState.lname,
              value: res.data.lname,
            },
            user_position: {
              ...prevState.user_position,
              value: res.data.user_position,
            },
            user_orgname: {
              ...prevState.user_orgname,
              value: res.data.user_orgname,
            },
            rtafbranch: {
              ...prevState.rtafbranch,
              value: res.data.rtafbranch,
            },
            rtafbranchgrp: {
              ...prevState.rtafbranchgrp,
              value: res.data.rtafbranchgrp,
            },
          }));
          setIsregis(false);
        })
        .catch((error) => {
          if (error.response) {
            setIsregis(false);
            toast.error(error.response.data.message);
          }
        });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formFields = Object.keys(formValues);
    let newFormValues = { ...formValues };
    const {
      officeid,
      mem_cellphone,
      mem_offtel,
      email,
      user_orgname,
      rtafbranch,
      rtafbranchgrp,
    } = formValues;

    const numberPattern = /^\d+$/;
    const englishPattern = /^[a-zA-Z0-9_.-]*$/;

    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];
      const currentValue = formValues[currentField].value;

      if (!currentValue) {
        newFormValues = {
          ...newFormValues,
          [currentField]: {
            ...newFormValues[currentField],
            error: true,
          },
        };
        setFormValues(newFormValues);
      } else if (officeid.value.length < 12) {
        setFormValues((prevState) => ({
          ...prevState,
          officeid: {
            ...prevState.officeid,
            error: true,
          },
        }));
        return;
      } else if (idc.length < 13) {
        setFormValues((prevState) => ({
          ...prevState,
          idc: {
            ...prevState.idc,
            error: true,
          },
        }));
        return;
      } else if (rtafbranch.value === "" || rtafbranchgrp.value === "") {
        setFormValues((prevState) => ({
          ...prevState,
          rtafbranch: {
            ...prevState.rtafbranch,
            error: true,
          },
          rtafbranchgrp: {
            ...prevState.rtafbranchgrp,
            error: true,
          },
        }));
        return;
      } else if (user_orgname.value === "") {
        setFormValues((prevState) => ({
          ...prevState,
          user_orgname: {
            ...prevState.user_orgname,
            error: true,
          },
        }));
      } else if (mem_cellphone.value.length < 10) {
        setFormValues((prevState) => ({
          ...prevState,
          mem_cellphone: {
            ...prevState.mem_cellphone,
            error: true,
          },
        }));
        return;
      } else if (mem_offtel.value.length < 5) {
        setFormValues((prevState) => ({
          ...prevState,
          mem_offtel: {
            ...prevState.mem_offtel,
            error: true,
          },
        }));
        return;
      } else if (numberPattern.test(values.fname)) {
        setFormValues((prevState) => ({
          ...prevState,
          fname: {
            ...prevState.fname,
            error: true,
          },
        }));
        return;
      } else if (numberPattern.test(values.lname)) {
        setFormValues((prevState) => ({
          ...prevState,
          lname: {
            ...prevState.lname,
            error: true,
          },
        }));
        return;
      } else if (!englishPattern.test(email.value)) {
        toast.error(
          "Email must contain only English characters or numbers (., _, -)"
        );
        return;
      } else {
        setIsregis(true);
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

    if (isRegis) {
      const data = new FormData(event.currentTarget);
      // eslint-disable-next-line no-console
      const user = {
        email: data.get("email"),
        pers_id: data.get("idc"),
        official_id: data.get("officeid"),
        mem_rank: data.get("rank"),
        mem_fname: data.get("fname"),
        mem_lname: data.get("lname"),
        mem_pos: data.get("user_position"),
        mem_affiliation: data.get("user_orgname"),
        rtafbranch: data.get("rtafbranch"),
        rtafbranchgrp: data.get("rtafbranchgrp"),
        mem_cellphone: data.get("mem_cellphone"),
        mem_offtel: data.get("mem_offtel"),
        memimgpath: image,
        mem_token: "",
        mem_usrtypeid: "USR01",
        // password: data.get('password'),
      };
      // console.log("user: ", user);

      confirmAlert({
        title: "ยืนยันการบันทึก",
        message: `คุณต้องการที่เพิ่ม ${user.mem_rank}${user.mem_fname} ${user.mem_lname} ใช่หรือไม่`,
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              // registerHandler(user)
              addMemberAndRightHandler(user, token)
                .then((res) => {
                  //console.log(res);
                  setLoading(false);
                  setIsregis(false);
                  toast.success(res.data.msg);
                  navigate("/PageExamInformation");
                })
                .catch((error) => {
                  if (
                    error.response.status === 401 ||
                    error.response.status === 404
                  ) {
                    console.log("Error: ", error.response);
                    dispatch(logout());
                    // navigate('/notfound404', { state: {statusCode: error.response.status, txt: error.response.data} })
                  } else {
                    setLoading(false);
                    setIsregis(false);
                    toast.error(error.response.data.message);
                  }
                });
            },
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
      });
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value,
      },
    });
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px",
        }}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Box
          sx={{
            backgroundColor: "#F7F6F6",
            width: "70vw",
            height: "100%",
            borderRadius: "10px",
          }}
        >
          {/*renderTitle()*/}
          <Box
            sx={{
              fontSize: 24,
              textAlign: "center",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            ข้อมูลส่วนบุคคล {right}
          </Box>

          <Box sx={{ display: "flex" }}>
            {/*have 2 Box*/}
            {/*Box1 For Image*/}
            <Box
              sx={{ display: "flex", justifyContent: "start", padding: "50px" }}
            >
              <Box
                sx={{
                  width: "200px",
                  height: "100px",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <p>
                  {!loading ? (
                    <Box sx={{ textAlign: "center" }}>ภาพถ่ายข้าราชการ</Box>
                  ) : (
                    <Box sx={{ fontSize: 20, textAlign: "center" }}>
                      Loading...
                    </Box>
                  )}
                </p>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Avatar
                    variant="square"
                    alt="Remy Sharp"
                    src={`data:image/jpeg;base64,${image}`}
                    sx={{ width: "100px", height: "130px" }}
                  />
                </Box>
              </Box>
            </Box>

            {/*Box2 For Content*/}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                width: "100%",
              }}
            >
              {/*Email,Password,Search*/}
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  padding: "10px",
                }}
              >
                {/*Email*/}
                <Box sx={{ width: "75%", display: "flex" }}>
                  <TextField
                    id="outlined-basic"
                    label="E-mail"
                    variant="outlined"
                    placeholder="(ไม่ต้องใส่ @ rtaf.mi.th)"
                    autoComplete="email"
                    name="email"
                    required
                    fullWidth
                    error={formValues.email.error}
                    // onChange={handleChange}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        [e.target.name]: e.target.value,
                      });
                      setFormValues({
                        ...formValues,
                        [e.target.name]: {
                          ...formValues[e.target.name],
                          value: e.target.value,
                        },
                      });
                      setIsregis(true);
                      if ([formValues.email] != "") {
                        setFormValues((prevState) => ({
                          ...prevState,
                          email: {
                            ...prevState.email,
                            error: false,
                          },
                        }));
                      }
                    }}
                    helperText={
                      formValues.email.error && formValues.email.errorMessage
                    }
                  />
                </Box>

                {/*Password*/}
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <TextField
                    sx={{ marginLeft: "20px" }}
                    id="outlined-password-input"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    required
                    style={{ width: "80%" }}
                    error={formValues.password.error}
                    InputProps={{
                      // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    // onChange={handleChange}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        [e.target.name]: e.target.value,
                      });
                      setFormValues({
                        ...formValues,
                        [e.target.name]: {
                          ...formValues[e.target.name],
                          value: e.target.value,
                        },
                      });
                      setIsregis(true);
                      if ([formValues.password] != "") {
                        setFormValues((prevState) => ({
                          ...prevState,
                          password: {
                            ...prevState.password,
                            error: false,
                          },
                        }));
                      }
                    }}
                    helperText={
                      formValues.password.error &&
                      formValues.password.errorMessage
                    }
                  />
                </Box>

                {/*Search*/}
                <Box sx={{ width: "50%", display: "flex", marginRight: "5px" }}>
                  <Button
                    variant="outlined"
                    component="span"
                    onClick={handleSearch}
                  >
                    ค้นหาข้อมูล
                  </Button>
                </Box>
              </Box>

              {/*Official_ID*/}
              <Box
                sx={{
                  width: "100%",
                  padding: "10px",
                }}
              >
                <TextField
                  type="number"
                  id="outlined-basic"
                  label="เลขประจำตัวข้าราชการ"
                  variant="outlined"
                  fullWidth
                  name="officeid"
                  value={officeid || ""}
                  // value={officeid}
                  // error={officeid === undefined ? true : false}
                  error={
                    formValues.officeid.error &&
                    formValues.officeid.value.length < 12
                  }
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 12);
                  }}
                  min={0}
                  required
                  // onChange={handleChange}
                  onChange={async (e) => {
                    setOffice(e.target.value);
                    setFormValues({
                      ...formValues,
                      [e.target.name]: {
                        ...formValues[e.target.name],
                        value: e.target.value,
                      },
                    });
                    setIsregis(true);
                    if (
                      officeid !== "" &&
                      officeid.length < 12 &&
                      formValues.officeid.value.length < 12
                    ) {
                      setFormValues((prevState) => ({
                        ...prevState,
                        officeid: {
                          ...prevState.officeid,
                          error: false,
                        },
                      }));
                    }
                  }}
                  helperText={
                    formValues.officeid.error &&
                    formValues.officeid.errorMessage
                  }
                />
              </Box>

              {/*Personel_ID*/}
              <Box
                sx={{
                  width: "100%",
                  padding: "10px",
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="เลขประจำตัวประชาชน"
                  variant="outlined"
                  fullWidth
                  name="idc"
                  type="number"
                  value={idc || ""}
                  // error={idc === undefined ? true : false}
                  error={
                    formValues.idc.error && formValues.idc.value.length < 13
                  }
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 13);
                  }}
                  min={0}
                  required
                  // onChange={handleChange}
                  onChange={async (e) => {
                    setIdc(e.target.value);
                    setFormValues({
                      ...formValues,
                      [e.target.name]: {
                        ...formValues[e.target.name],
                        value: e.target.value,
                      },
                    });
                    setIsregis(true);
                    // console.log("length: ", formValues.pers_id.value.length);
                    // const count = formValues.pers_id.value.length
                    if (
                      idc !== "" &&
                      idc.length < 13 &&
                      formValues.idc.value.length < 13
                    ) {
                      setFormValues((prevState) => ({
                        ...prevState,
                        idc: {
                          ...prevState.idc,
                          error: false,
                        },
                      }));
                    }
                  }}
                  helperText={
                    formValues.idc.error && formValues.idc.errorMessage
                  }
                />
              </Box>

              {/*Rank*/}
              <Box
                sx={{
                  width: "100%",
                  padding: "10px",
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">ยศ</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="ยศ"
                    name="rank"
                    value={values.rank || "ไม่ระบุ"}
                    // defaultValue={values.rank}
                    required
                    onChange={handleChange}
                    // error={values.rank === undefined ? true : false}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {Ranks.map((Rank) => (
                      <MenuItem value={Rank} key={Rank}>
                        {Rank}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/*Name*/}
              <Box
                sx={{
                  width: "100%",
                  padding: "10px",
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="ชื่อ"
                  variant="outlined"
                  fullWidth
                  name="fname"
                  value={values.fname || ""}
                  required
                  // onChange={handleChange}
                  onChange={(e) => {
                    setValues({
                      ...values,
                      [e.target.name]: e.target.value,
                    });
                    setFormValues({
                      ...formValues,
                      [e.target.name]: {
                        ...formValues[e.target.name],
                        value: e.target.value,
                      },
                    });
                    setIsregis(true);
                    // const numberPattern = /^\d+$/;
                    if (formValues.fname !== "") {
                      setFormValues((prevState) => ({
                        ...prevState,
                        fname: {
                          ...prevState.fname,
                          error: false,
                        },
                      }));
                    }
                  }}
                  // error={values.fname === undefined ? true : false}
                  error={formValues.fname.error}
                  helperText={
                    formValues.fname.error && formValues.fname.errorMessage
                  }
                />
              </Box>

              {/*SurName*/}
              <Box
                sx={{
                  width: "100%",
                  padding: "10px",
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="นามสกุล"
                  variant="outlined"
                  fullWidth
                  name="lname"
                  value={values.lname || ""}
                  required
                  // onChange={handleChange}
                  onChange={(e) => {
                    setValues({
                      ...values,
                      [e.target.name]: e.target.value,
                    });
                    setFormValues({
                      ...formValues,
                      [e.target.name]: {
                        ...formValues[e.target.name],
                        value: e.target.value,
                      },
                    });
                    setIsregis(true);
                    // const numberPattern = /^\d+$/;
                    if (formValues.lname !== "") {
                      setFormValues((prevState) => ({
                        ...prevState,
                        lname: {
                          ...prevState.lname,
                          error: false,
                        },
                      }));
                    }
                  }}
                  // error={values.lname === undefined ? true : false}
                  error={formValues.lname.error}
                  helperText={
                    formValues.lname.error && formValues.lname.errorMessage
                  }
                />
              </Box>

              {/*UserPosition*/}
              <Box
                sx={{
                  width: "100%",
                  padding: "10px",
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="ตำแหน่ง"
                  variant="outlined"
                  fullWidth
                  name="user_position"
                  required
                  value={values.user_position || ""}
                  // onChange={handleChange}
                  onChange={(e) => {
                    setValues({
                      ...values,
                      [e.target.name]: e.target.value,
                    });
                    setFormValues({
                      ...formValues,
                      [e.target.name]: {
                        ...formValues[e.target.name],
                        value: e.target.value,
                      },
                    });
                    setIsregis(true);
                    // const numberPattern = /^\d+$/;
                    if (formValues.user_position !== "") {
                      setFormValues((prevState) => ({
                        ...prevState,
                        user_position: {
                          ...prevState.user_position,
                          error: false,
                        },
                      }));
                    }
                  }}
                  // error={values.user_position === undefined ? true : false}
                  error={formValues.user_position.error}
                  helperText={
                    formValues.user_position.error &&
                    formValues.user_position.errorMessage
                  }
                />
              </Box>

              {/*UserOrgName*/}
              <Box
                sx={{
                  width: "100%",
                  padding: "10px",
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">สังกัด</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="สังกัด"
                    name="user_orgname"
                    value={values.user_orgname || ""}
                    required
                    // onChange={handleChange}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        [e.target.name]: e.target.value,
                      });
                      setFormValues({
                        ...formValues,
                        [e.target.name]: {
                          ...formValues[e.target.name],
                          value: e.target.value,
                        },
                      });
                      setIsregis(true);
                      // const numberPattern = /^\d+$/;
                      if (formValues.user_orgname !== "") {
                        setFormValues((prevState) => ({
                          ...prevState,
                          user_orgname: {
                            ...prevState.user_orgname,
                            error: false,
                          },
                        }));
                      }
                    }}
                    // error={values.user_orgname === undefined ? true : false}
                    error={formValues.user_orgname.error}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {Companys.map((Company) => (
                      <MenuItem value={Company} key={Company}>
                        {Company}
                      </MenuItem>
                    ))}
                  </Select>
                  {formValues.user_orgname.error &&
                  formValues.user_orgname.errorMessage ? (
                    <FormHelperText
                      sx={{ color: "#bf3333", marginLeft: "16px !important" }}
                    >
                      {formValues.user_orgname.error &&
                        formValues.user_orgname.errorMessage}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Box>

              {/*Perscorps*/}
              <Box
                sx={{
                  width: "100%",
                  padding: "10px",
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">เหล่า</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="เหล่า"
                    name="rtafbranch"
                    value={values.rtafbranch || ""}
                    error={formValues.rtafbranch.error}
                    // error={values.rtafbranch === undefined ? true : false}
                    required
                    // onChange={handleChange}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        [e.target.name]: e.target.value,
                      });
                      setFormValues({
                        ...formValues,
                        [e.target.name]: {
                          ...formValues[e.target.name],
                          value: e.target.value,
                        },
                      });
                      setIsregis(true);
                      // const numberPattern = /^\d+$/;
                      if (formValues.rtafbranch !== "") {
                        setFormValues((prevState) => ({
                          ...prevState,
                          rtafbranch: {
                            ...prevState.rtafbranch,
                            error: false,
                          },
                        }));
                      }
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {Perscorps.map((Perscorp) => (
                      <MenuItem value={Perscorp} key={Perscorp}>
                        {Perscorp}
                      </MenuItem>
                    ))}
                  </Select>
                  {formValues.rtafbranch.error &&
                  formValues.rtafbranch.errorMessage ? (
                    <FormHelperText
                      sx={{ color: "#bf3333", marginLeft: "16px !important" }}
                    >
                      {formValues.rtafbranch.error &&
                        formValues.rtafbranch.errorMessage}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Box>

              {/*Group*/}
              <Box
                sx={{
                  width: "100%",
                  padding: "10px",
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">จำพวก</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="จำพวก"
                    name="rtafbranchgrp"
                    value={values.rtafbranchgrp || ""}
                    error={formValues.rtafbranchgrp.error}
                    // error={values.rtafbranchgrp === undefined ? true : false}
                    required
                    // onChange={handleChange}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        [e.target.name]: e.target.value,
                      });
                      setFormValues({
                        ...formValues,
                        [e.target.name]: {
                          ...formValues[e.target.name],
                          value: e.target.value,
                        },
                      });
                      setIsregis(true);
                      // const numberPattern = /^\d+$/;
                      if (formValues.rtafbranchgrp !== "") {
                        setFormValues((prevState) => ({
                          ...prevState,
                          rtafbranchgrp: {
                            ...prevState.rtafbranchgrp,
                            error: false,
                          },
                        }));
                      }
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {PersGrps.map((PersGrp) => (
                      <MenuItem value={PersGrp} key={PersGrp}>
                        {PersGrp}
                      </MenuItem>
                    ))}
                  </Select>
                  {formValues.rtafbranchgrp.error &&
                  formValues.rtafbranchgrp.errorMessage ? (
                    <FormHelperText
                      sx={{ color: "#bf3333", marginLeft: "16px !important" }}
                    >
                      {formValues.rtafbranchgrp.error &&
                        formValues.rtafbranchgrp.errorMessage}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Box>

              {/*Telephone*/}
              <Box
                sx={{
                  width: "100%",
                  padding: "10px",
                }}
              >
                <TextField
                  type="number"
                  id="outlined-basic"
                  label="เบอร์มือถือ"
                  variant="outlined"
                  fullWidth
                  name="mem_cellphone"
                  value={values.mem_cellphone || ""}
                  // error={values.mem_cellphone === undefined ? true : false}
                  onInput={(e) => {
                    e.target.value = e.target.value.toString().slice(0, 10);
                  }}
                  min={0}
                  required
                  // onChange={handleChange}
                  onChange={(e) => {
                    setValues({
                      ...values,
                      [e.target.name]: e.target.value,
                    });
                    setFormValues({
                      ...formValues,
                      [e.target.name]: {
                        ...formValues[e.target.name],
                        value: e.target.value,
                      },
                    });
                    setIsregis(true);
                    // const numberPattern = /^\d+$/;
                    if (formValues.mem_cellphone !== "") {
                      setFormValues((prevState) => ({
                        ...prevState,
                        mem_cellphone: {
                          ...prevState.mem_cellphone,
                          error: false,
                        },
                      }));
                    }
                  }}
                  error={formValues.mem_cellphone.error}
                  helperText={
                    formValues.mem_cellphone.error &&
                    formValues.mem_cellphone.errorMessage
                  }
                />
              </Box>

              {/*OfficePhone*/}
              <Box
                sx={{
                  width: "100%",
                  padding: "10px",
                }}
              >
                <TextField
                  type="number"
                  id="outlined-basic"
                  label="เบอร์ที่ทำงาน"
                  variant="outlined"
                  fullWidth
                  name="mem_offtel"
                  value={values.mem_offtel || ""}
                  // error={values.mem_offtel === undefined ? true : false}
                  onInput={(e) => {
                    e.target.value = e.target.value.toString().slice(0, 5);
                  }}
                  min={0}
                  required
                  // onChange={handleChange}
                  onChange={(e) => {
                    setValues({
                      ...values,
                      [e.target.name]: e.target.value,
                    });
                    setFormValues({
                      ...formValues,
                      [e.target.name]: {
                        ...formValues[e.target.name],
                        value: e.target.value,
                      },
                    });
                    setIsregis(true);
                    // const numberPattern = /^\d+$/;
                    if (formValues.mem_offtel !== "") {
                      setFormValues((prevState) => ({
                        ...prevState,
                        mem_offtel: {
                          ...prevState.mem_offtel,
                          error: false,
                        },
                      }));
                    }
                  }}
                  error={formValues.mem_offtel.error}
                  helperText={
                    formValues.mem_offtel.error &&
                    formValues.mem_offtel.errorMessage
                  }
                />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              padding: "10px",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              style={{
                textDecoration: "none",
                width: "20%",
                marginLeft: "5px",
                padding: "6px",
              }}
            >
              SAVE
            </Button>
            {/* </Link> */}
            <Link
              to="/PageExamInformation"
              style={{
                textDecoration: "none",
                width: "20%",
                marginRight: "5px",
                padding: "10px",
              }}
            >
              <Button variant="outlined" fullWidth>
                BLACK
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default ContentPageAddExam;
