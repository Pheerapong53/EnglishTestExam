import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../src/store/userSilce";
import { militaryData } from "../data/militaryData";
import { searchHandler } from "./functions/user";
import { toast } from "react-toastify";
import { addMemberAndRightHandler } from "./functions/addMember";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function ContentPageAddMember() {
  //Component Declaration
  const { right } = useParams();
  const titlePage = {
    USR01: "ข้อมูลผู้เข้าสอบ",
    USR02: "ข้อมูลผู้ประสานงาน",
    USR03: "ข้อมูลผู้คุมสอบ",
    USR04: "ข้อมูลผู้บังคับบัญชา",
    USR05: "ข้อมูลผู้ดูแลระบบ",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const token = user.token;
  const ranks = militaryData.ranks;
  const corps = militaryData.corps;
  const groups = militaryData.groups;
  const companies = militaryData.companies;
  const renderTitle = () => (
    <Box
      sx={{
        fontSize: 24,
        textAlign: "center",
        fontWeight: "bold",
        marginTop: "10px",
      }}
    >
      เพิ่ม{titlePage[right]}
    </Box>
  );
  const renderAvatar = () => (
    <Box sx={{ display: "flex", justifyContent: "start", padding: "50px" }}>
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
            <Box sx={{ fontSize: 20, textAlign: "center", color: "red" }}>
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
  );
  const renderButtonSubmit = () => (
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
        บันทึก
      </Button>
      {/* </Link> */}
      <Link
        to={`/PageMemberInformation/${right}`}
        style={{
          textDecoration: "none",
          width: "20%",
          marginRight: "5px",
          padding: "10px",
        }}
      >
        <Button variant="outlined" fullWidth>
          ย้อนกลับ
        </Button>
      </Link>
    </Box>
  );

  //Hooks and Logic
  const [values, setValues] = useState([]);
  const [idc, setIdc] = useState("");
  const [officeid, setOfficeId] = useState("");
  const [image, setImage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRegis, setIsregis] = useState(false);
  const initialFormState = () => ({
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
  const [formValues, setFormValues] = useState(initialFormState);

  //Event Handlers
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formFields = Object.keys(formValues);
    let newFormValues = { ...formValues };

    for (let i = 0; i < formFields.length; i++) {
      const currentField = formFields[i];
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
      };
      searchHandler(checkUser)
        .then((res) => {
          setLoading(false);
          setValues(res.data);
          setImage(res.data.img_base64);
          setIdc(res.data.idcard);
          setOfficeId(res.data.officer_id);
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
            setLoading(false);
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
        mem_usrtypeid: right,
      };
      //console.log("user: ", user);

      confirmAlert({
        title: "ยืนยันการบันทึก",
        message: `คุณต้องการที่เพิ่ม ${user.mem_rank}${user.mem_fname} ${user.mem_lname} ใช่หรือไม่`,
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              addMemberAndRightHandler(user, token)
                .then((res) => {
                  setLoading(false);
                  setIsregis(false);
                  toast.success(res.data.msg);
                  navigate(`/PageMemberInformation/${right}`);
                })
                .catch((error) => {
                  if (
                    error.response.status === 401 ||
                    error.response.status === 404
                  ) {
                    console.log("Error: ", error.response);
                    dispatch(logout());
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

  //Render
  return (
    <>
      <Navbar />
      {/*Body*/}
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
          {renderTitle()}

          <Box sx={{ display: "flex" }}>
            {/*Image + Form*/}
            {/*Image*/}
            {renderAvatar()}

            {/*Form*/}
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

                {/*Password*/}
                <TextField
                  sx={{ marginLeft: "20px" }}
                  id="outlined-password-input"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  style={{ width: "80%" }}
                  error=""
                  InputProps={{
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

                {/*Search*/}
                <Button
                  sx={{
                    width: "50%",
                    display: "flex",
                    marginLeft: "20px",
                  }}
                  variant="outlined"
                  component="span"
                  onClick={handleSearch}
                >
                  ค้นหาข้อมูล
                </Button>
              </Box>

              {/*Official_ID*/}
              <Box sx={{ width: "100%", padding: "10px" }}>
                <TextField
                  type="number"
                  id="outlined-basic"
                  label="เลขประจำตัวข้าราชการ"
                  variant="outlined"
                  fullWidth
                  name="officeid"
                  value={officeid || ""}
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
                  onChange={async (e) => {
                    setOfficeId(e.target.value);
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
              <Box sx={{ width: "100%", padding: "10px" }}>
                <TextField
                  type="number"
                  id="outlined-basic"
                  label="เลขประจำตัวประชาชน"
                  variant="outlined"
                  fullWidth
                  name="idc"
                  value={idc || ""}
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
                    required
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
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {ranks.map((rank) => (
                      <MenuItem value={rank} key={rank}>
                        {rank}
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
                    error={formValues.user_orgname.error}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {companies.map((Company) => (
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
                    required
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
                    {corps.map((Perscorp) => (
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
                    required
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
                    {groups.map((PersGrp) => (
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
                  onInput={(e) => {
                    e.target.value = e.target.value.toString().slice(0, 10);
                  }}
                  min={0}
                  required
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
                  onInput={(e) => {
                    e.target.value = e.target.value.toString().slice(0, 5);
                  }}
                  min={0}
                  required
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

          {renderButtonSubmit()}
        </Box>
      </Box>
    </>
  );
}

export default ContentPageAddMember;
