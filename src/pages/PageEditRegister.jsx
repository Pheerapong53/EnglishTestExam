import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  Box,
  Button,
  Avatar,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../src/store/userSilce";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { editMemberHandler } from "../components/functions/editMember";
import { toast } from "react-toastify";
import { militaryData } from "../data/militaryData";

function PageEditRegister() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const token = user.token;
  const Ranks = militaryData.ranks;
  const Perscorps = militaryData.corps;
  const PersGrps = militaryData.groups;
  const Companys = militaryData.companies;
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

  const [values, setValues] = useState(initialstate);
  const [image, setImage] = useState(
    `${location.state.data[0]["tbmemberinfos.memimgpath"]}`
  );
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await new FormData(event.currentTarget);
    const user = await {
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
                navigate(`${location.state.url}`);
              })
              .catch((error) => {
                if (
                  error.response.status === 401 ||
                  error.response.status === 404
                ) {
                  dispatch(logout());
                  navigate("/notfound404", {
                    state: {
                      statusCode: error.response.status,
                      txt: error.response.data,
                    },
                  });
                } else {
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
                  <Avatar
                    variant="square"
                    alt="Remy Sharp"
                    src={`data:image/jpeg;base64,${image}`}
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
              บันทึก
            </Button>
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
                ย้อนกลับ
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
