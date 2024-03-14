import React from "react";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import KeyIcon from "@mui/icons-material/Key";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/userSilce";

// Functions
import { loginHandler } from "../components/functions/user";

function PageLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  // const roleUser = {
  //   Rolecode : "",
  //   Rolechk : "",
  // }
  // const [userRole, setUserrole] = React.useState([])

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const user = {
      email: data.get('email'),
      password: data.get('password'),
    }
    console.log(user);

    loginHandler(user)
    .then((res) => {
      const { mem_rank, mem_fname, mem_lname, mem_email, pers_id, mem_pos, mem_affiliation } = res.data.user
      const  official_id = res.data.user.tbmemberinfos[0].official_id
      
      dispatch(login({
        token : res.data.token,
        rank : mem_rank,
        fname : mem_fname,
        lname : mem_lname,
        email : mem_email,
        pers_id : pers_id,
        official_id : official_id,
        position : mem_pos,
        orgname : mem_affiliation,
        userRole : res.data.userRole,
      }));

      localStorage.setItem("token", res.data.token);
      toast.success("Login Complete");
      navigate("/PageHome");
    })
    .catch((error) => {
      if(error.response){
        toast.error(error.response.data.message);
      }
    }) 
  };

  // console.log("data login: ",process.env.REACT_APP_API_URL);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: 600,
          }}
        >
          <Box sx={{ fontSize: 18, textAlign: "center",fontWeight: "bold" }}>
            ระบบการทดสอบภาษาอังกฤษของกองทัพอากาศ
            <br />
            (RTAF ENGLISH TEST)
          </Box>
          <br />
          <Box
            sx={{
              width: "100%",
            }}
            component="form" onSubmit={handleSubmit}
          >
            <FormControl variant="outlined" fullWidth>
              <TextField
                label="E-mail"
                id="E-mail"
                placeholder="(ไม่ต้องใส่ @ rtaf.mi.th)"
                name="email"
                autoComplete="email"
                autoFocus
                // required
              />
              <br />
            </FormControl>

            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                placeholder="Password"
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                name="password"
                // required
              />
              <br />
            </FormControl>
            
            {/* <Link to="/PageHome" style={{ textDecoration: "none" }}> */}
              <Button type="submit" variant="contained" startIcon={<KeyIcon />} fullWidth>
                เข้าสู่ระบบ
              </Button>
            {/* </Link> */}
          </Box>
          <br />

          <Box
            sx={{
              width: "100%",
            }}
          >
            <Link to="/PageRegister" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                startIcon={<PersonAddAlt1Icon />}
                fullWidth
              >
                ตรวจสอบข้อมูลส่วนบุคคล
              </Button>
            </Link>
          </Box>
          <br />
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
            }}
          >
            <p style={{fontSize: "12px"}}>ติดต่อสอบถาม การใช้งานระบบ หมายเลขโทรศัพท์ 26279 (02-534-6279)</p>
            <p style={{fontSize: "12px"}}>ติดต่อสอบถาม เรื่องการทดสอบ หมายเลขโทรศัพท์ 22965 (02-534-2965), 26276 (02-534-6276)</p>
            <p style={{fontSize: "12px"}}>กรณีลืมรหัสรหัสผ่านอีเมล ทอ. ติดต่อ ศคพ.สอ.ทอ. ทาง Line @rtaf</p>
            <p style={{fontSize: "8px" ,fontWeight: "bold"}}>DESIGN BY SOFTWARE STANDARDS DIVISION  &reg; {new Date().getFullYear()}</p>
            </Box>
        </Box>
      </Box>
    </>
  );
}

export default PageLogin;
