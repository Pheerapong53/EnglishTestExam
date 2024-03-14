import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
//import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {logout} from "../../src/store/userSilce";

//confirmDialog
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

//Functions
import { editMemberHandler } from "../components/functions/editMember";
import { toast } from "react-toastify";

function PageEditRegister() {
  const location = useLocation();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => ({...state}));
  const token = user.user.token;
  console.log("data PageEdit: ",location.state.data);
  const initialstate = {
    memimgpath: location.state.data[0]["tbmemberinfos.memimgpath"],
    email: location.state.data[0]["tbmemberinfos.mem_email"],
    official_id: location.state.data[0].official_id,
    pers_id: location.state.data[0].pers_id,
    mem_rank: location.state.data[0]["tbmemberinfos.mem_rank"],
    mem_fname: location.state.data[0]["tbmemberinfos.mem_fname"],
    mem_lname: location.state.data[0]["tbmemberinfos.mem_lname"],
    mem_pos: location.state.data[0]["tbmemberinfos.mem_pos"],
    mem_affiliation: location.state.data[0]["tbmemberinfos.mem_affiliation"],
    rtafbranch: location.state.data[0]["tbmemberinfos.rtafbranch"],
    rtafbranchgrp: location.state.data[0]["tbmemberinfos.rtafbranchgrp"],
    mem_cellphone: location.state.data[0]["tbmemberinfos.mem_cellphone"],
    mem_offtel: location.state.data[0]["tbmemberinfos.mem_offtel"],
  };

  //console.log("user: ", user);
  // const Input = styled("input")({
  //   display: "none",
  // });

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
  const [image, setImage] = useState(
    `${location.state.data[0]["tbmemberinfos.memimgpath"]}`
  );
  
  //const [error, setError] = useState("");
  //console.log(image);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const user = await {
      // mem_email: data.get("email"),
      mem_email: initialstate.email,
      pers_id: data.get("pers_id"),
      official_id: data.get("official_id"),
      mem_rank: data.get("mem_rank"),
      mem_fname: data.get("mem_fname"),
      mem_lname: data.get("mem_lname"),
      mem_pos: data.get("mem_pos"),
      mem_affiliation: data.get("mem_affiliation"),
      rtafbranch: data.get("rtafbranch"),
      rtafbranchgrp: data.get("rtafbranchgrp"),
      mem_cellphone: data.get("mem_cellphone"),
      mem_offtel: data.get("mem_offtel"),

      //upload image disable
      //memimgpath: image,
      // mem_token: "",
      // mem_usrtypeid: "USR01",
      // password: data.get('password'),
    };

    //console.log("user: ", user);
    confirmAlert({
      title: "ยืนยันการบันทึก",
      message: "คุณต้องการที่จะแก้ไขข้อมูลใช่หรือไม่",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            editMemberHandler(user, token)
              .then((res) => {
                toast.success(res.data.msg);
                // console.log(res.data);
                navigate(`${location.state.url}`);
              })
              .catch((error) => {
                if(error.response.status === 401 || error.response.status === 404){
                  dispatch(logout());
                  navigate('/notfound404', { state: {statusCode: error.response.status, txt: error.response.data} })
                }else{
                  toast.error(error.response.data.message);
                } 
              });
            //navigate(`${location.state.url}`);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
    // editMemberHandler(user)
    // .then((res) => {
    //   console.log(res.data);
    // })
    // navigate(`${location.state.url}`);
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  //   let img = (image.split(',')[1]);
  // console.log(img);

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
                  <Avatar
                    variant="square"
                    alt="Remy Sharp"
                    src={`data:image/jpeg;base64,${image}`}
                    //src={image}
                    sx={{ width: "100px", height: "130px" }}
                  />
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
                <Box sx={{ width: "100%", display: "flex" }}>
                  <TextField
                    id="outlined-basic"
                    label="E-mail"
                    variant="outlined"
                    name="email"
                    value={values.email}
                    fullWidth
                    error={values.email === undefined ? true : false}
                    //onChange={handleChange}
                    disabled
                  />
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
                      .slice(0, 12);
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
                  //disabled
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
                    name="mem_rank"
                    value={values.mem_rank || "ไม่ระบุ"}
                    required
                    onChange={handleChange}
                    error={values.mem_rank === undefined ? true : false}
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
                  name="mem_fname"
                  value={values.mem_fname || ""}
                  required
                  onChange={handleChange}
                  error={values.mem_fname === undefined ? true : false}
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
                  name="mem_lname"
                  value={values.mem_lname || ""}
                  required
                  onChange={handleChange}
                  error={values.mem_lname === undefined ? true : false}
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
                  name="mem_pos"
                  required
                  value={values.mem_pos || ""}
                  onChange={handleChange}
                  error={values.mem_pos === undefined ? true : false}
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
                    name="mem_affiliation"
                    value={values.mem_affiliation || ""}
                    required
                    onChange={handleChange}
                    error={values.mem_affiliation === undefined ? true : false}
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
              to={`${location.state.url}`}
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
              // fullWidth
            >
              SAVE
            </Button>
            {/* </Link> */}
            <Link
              to={`${location.state.url}`}
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

export default PageEditRegister;
