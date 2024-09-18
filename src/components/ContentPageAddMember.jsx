import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Typography,
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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../src/store/userSilce";
import { militaryData } from "../data/militaryData";
import Footer from "./Footer";
import { searchHandler } from "./functions/user";

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
            <Box sx={{ fontSize: 20, textAlign: "center" }}>Loading...</Box>
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
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //Event Handlers
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleSearch = async (e) => {
    e.preventDefault();
    const checkUser = {
      email: "pheerapong",
      password: "Phee_12699",
    };
    searchHandler(checkUser)
      .then((res) => {
        console.log(res);
        setImage(res.data.img_base64);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmit = async (e) => {
    console.log(e);
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
                  label="Email"
                  variant="outlined"
                  placeholder="(ไม่ต้องใส่ @ rtaf.mi.th)"
                  autoComplete="email"
                  name="email"
                  required
                  fullWidth
                  error=""
                  onChange=""
                  helperText=""
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
                  onChange=""
                  helperText=""
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
                  value=""
                  error=""
                  onInput=""
                  min={0}
                  required
                  onChange=""
                  helperText=""
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
                  value=""
                  error=""
                  onInput=""
                  min={0}
                  required
                  onChange=""
                  helperText=""
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
                    value=""
                    required
                    onChange=""
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
                  value=""
                  required
                  onChange=""
                  error=""
                  helperText=""
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
                  value={""}
                  required
                  onChange=""
                  error=""
                  helperText=""
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
                    value={""}
                    required
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
                    value={""}
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
                    value={""}
                    error={""}
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
                  value={""}
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
                  value={""}
                />
              </Box>
            </Box>
          </Box>

          {renderButtonSubmit()}
        </Box>
      </Box>

      {/*Footer*/}
      <Footer />
    </>
  );
}

export default ContentPageAddMember;
