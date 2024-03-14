import React from "react";
import Navbar from "./Navbar";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

//For TextField PassWord
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

import Select from "@mui/material/Select";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { toast } from "react-toastify";

//Functions
import { searchHandler } from "./functions/user";
import { addMemberHandler } from "./functions/addMember";
import { useState } from "react";

//confirmDialog
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const initialstate = {
  email: "",
  pers_id: "",
  official_id: "",
  rank: "",
  fname: "",
  lname: "",
  user_position: "",
  user_orgname: "",
  rtafbranch: "",
  rtafbranchgrp: "",
  mem_cellphone: "",
  mem_offtel: "",
};

function ContentPageAddSuperVisor() {
  const navigate = useNavigate();

  const Input = styled("input")({
    display: "none",
  });

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

  const [values, setValues] = useState(initialstate);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleSearch = (e) => {
    e.preventDefault();
    const checkUser = {
      email: values.email,
      password: values.password,
    };

    searchHandler(checkUser)
      .then((res) => {
        //console.log('regis: ', res.data)
        setValues(res.data.user);
        // var img = (res.data.image);
        //img from API is only Base64
        // setImage(`data:image/jpeg;base64,${img}`);
        // console.log(image);
        setImage(res.data.image);
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const user = await {
      mem_email: data.get("email"),
      pers_id: data.get("pers_id"),
      official_id: data.get("official_id"),
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
      mem_usrtypeid: "USR04",
      // password: data.get('password'),
    };

    //console.log("user: ", user);

    confirmAlert({
      title: "ยืนยันการแก้ไข",
      message: `คุณต้องการที่เพิ่ม ${user.mem_rank}${user.mem_fname} ${user.mem_lname} ใช่หรือไม่`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            addMemberHandler(user)
              .then((res) => {
                //setLoading(false);
                toast.success(res.data.msg);
                navigate("/PageSuperVisor");
              })
              .catch((error) => {
                //setLoading(false);
                toast.error(error.response.data.message);
              });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const maxSize = 2 * 1024 * 1024;

    if (file) {
      if (file.size > maxSize) {
        setError("File size exceeds 2 mb.");
      } else {
        const base64 = await convertBase64(e.target.files[0]);
        //console.log(base64);
        var img = base64.split(",")[1];
        setImage(img);
        setError("");
      }
    }

    // const base64 = await convertBase64(e.target.files[0])
    // console.log(base64);
    // var img = base64.split(',')[1]
    // setImage(img);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
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
        onSubmit={handleSubmit}
      >
        <Box
          sx={{
            backgroundColor: "#F7F6F6",
            width: "80vw",
            height: "100%",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              fontSize: 24,
              textAlign: "center",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            ข้อมูลส่วนบุคคล
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{ display: "flex", justifyContent: "start", padding: "50px" }}
            >
              <Box
                sx={{
                  width: "200px",
                  height: "200px",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <p>ภาพถ่ายข้าราชการ</p>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <Avatar
                    variant="square"
                    alt="Remy Sharp"
                    src={`data:image/jpeg;base64,${image}`}
                    //src={image}
                    sx={{ width: "100px", height: "130px" }}
                  />
                </Box>
                <Box sx={{ marginTop: "10px" }}>
                  <label htmlFor="contained-button-file">
                    <Input
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={handleImageChange}
                    />
                    <Button variant="contained" component="span" fullWidth>
                      อัพโหลดรูปภาพข้าราชการ
                    </Button>
                  </label>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  padding: "10px",
                }}
              >
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
                    error
                    onChange={handleChange}
                  />
                </Box>

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
                    //required
                    style={{ width: "80%" }}
                    error
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
                    onChange={handleChange}
                  />
                </Box>

                <Box sx={{ width: "25%", display: "flex" }}>
                  <Button
                    variant="outlined"
                    component="span"
                    fullWidth
                    onClick={handleSearch}
                  >
                    ค้นหาข้อมูล
                  </Button>
                </Box>
              </Box>
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
                  name="official_id"
                  value={values.official_id || ""}
                  error={values.official_id === undefined ? true : false}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 10);
                  }}
                  min={0}
                  required
                  onChange={handleChange}
                />
              </Box>
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
                  name="pers_id"
                  type="number"
                  value={values.pers_id || ""}
                  error={values.pers_id === undefined ? true : false}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 13);
                  }}
                  min={0}
                  required
                  onChange={handleChange}
                />
              </Box>
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
                    value={values.rank || ""}
                    required
                    onChange={handleChange}
                    error={values.rank === undefined ? true : false}
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
                  onChange={handleChange}
                  error={values.fname === undefined ? true : false}
                />
              </Box>
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
                  onChange={handleChange}
                  error={values.lname === undefined ? true : false}
                />
              </Box>
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
                  onChange={handleChange}
                  error={values.user_position === undefined ? true : false}
                />
              </Box>
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
                    onChange={handleChange}
                    error={values.user_orgname === undefined ? true : false}
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
                </FormControl>
              </Box>
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
                    error={values.rtafbranch === undefined ? true : false}
                    required
                    onChange={handleChange}
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
                </FormControl>
              </Box>
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
                    error={values.rtafbranchgrp === undefined ? true : false}
                    required
                    onChange={handleChange}
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
                </FormControl>
              </Box>
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
                  error={values.mem_cellphone === undefined ? true : false}
                  onInput={(e) => {
                    e.target.value = e.target.value.toString().slice(0, 10);
                  }}
                  min={0}
                  required
                  onChange={handleChange}
                />
              </Box>
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
                  error={values.mem_offtel === undefined ? true : false}
                  onInput={(e) => {
                    e.target.value = e.target.value.toString().slice(0, 5);
                  }}
                  min={0}
                  required
                  onChange={handleChange}
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
            {/* <Link
              to="/PageExamInformation"
              style={{
                textDecoration: "none",
                width: "20%",
                marginLeft: "5px",
                padding: "10px",
              }}
            > */}
            <Button
              type="submit"
              variant="contained"
              style={{
                textDecoration: "none",
                width: "20%",
                marginLeft: "5px",
                padding: "10px",
              }}
            >
              SAVE
            </Button>
            {/* </Link> */}
            <Link
              to="/PageSuperVisor"
              style={{
                textDecoration: "none",
                width: "20%",
                marginRight: "5px",
                padding: "10px",
              }}
            >
              <Button variant="outlined" fullWidth>
                BACK
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default ContentPageAddSuperVisor;
