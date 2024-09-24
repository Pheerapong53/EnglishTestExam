import React from "react";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import man from "../img/man.jpg"


function ContentPageAddRemember() {
  const Input = styled("input")({
    display: "none",
  });

  const Ranks = [
    "นาย",
    "นาง",
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
    "ร.ต.หญิง",
    "ร.ท.",
    "ร.ท.หญิง",
    "ร.อ.",
    "ร.อ.หญิง",
    "น.ต.",
    "น.ต.หญิง",
    "น.ท.",
    "น.ท.หญิง",
    "น.อ.",
    "น.อ.หญิง",
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

  return (
    <>
      <Navbar />
      <Box sx={{height:'100%' , width:'100%',display:'flex',justifyContent: "center",alignItems: "center" ,padding:'50px'}}>
          <Box sx={{backgroundColor:'#F7F6F6' ,width:'80vw' ,height:'100%',borderRadius:'10px'}}>
                <Box sx={{ fontSize: 24, textAlign: "center" ,fontWeight:'bold' ,marginTop: '10px'}}>ข้อมูลส่วนบุคคล</Box>
                <Box sx={{display: 'flex'}}>
                <Box sx={{display:'flex',justifyContent:"start",padding:'50px'}}>
                      <Box sx={{width:'200px',height:'200px',display:'flex',justifyContent: "center",flexDirection:'column',textAlign:'center'}}>
                            <p >ภาพถ่ายข้าราชการ</p>
                            <img src={man} alt="img" style={{width:'100%' ,height:'100%'}}/>
                            <Box sx={{marginTop:'10px'}}>
                            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
              />
              <Button variant="contained" component="span" fullWidth>
                  อัพโหลดรูปภาพข้าราชการ
              </Button>
            </label>
                            </Box>
                        
                      </Box>
                </Box>

                <Box sx={{display: 'flex',justifyContent: 'center',flexDirection: 'column',width: '100%'}}>
                <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              padding:'10px'
            }}
          >
            <Box sx={{ width: "75%", display: "flex" }}>
              <TextField
                id="outlined-basic"
                label="E-mail"
                variant="outlined"
                fullWidth
                error
              />
            </Box>
            <Box sx={{ width: "25%", display: "flex" }}>
              <Button variant="outlined" component="span" fullWidth>
                ค้นหาข้อมูล
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              padding:'10px'
            }}
          >
            <TextField
              id="outlined-basic"
              label="เลขประจำตัวประชาชน"
              variant="outlined"
              fullWidth
              error
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              padding:'10px'
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">ยศ</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="ยศ"
                error
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
              padding:'10px'
            }}
          >
            <TextField
              id="outlined-basic"
              label="ชื่อ"
              variant="outlined"
              fullWidth
              error
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              padding:'10px'
            }}
          >
            <TextField
              id="outlined-basic"
              label="นามสกุล"
              variant="outlined"
              fullWidth
              error
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              padding:'10px'
            }}
          >
            <TextField
              id="outlined-basic"
              label="ตำแหน่ง"
              variant="outlined"
              fullWidth
              error
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              padding:'10px'
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">สังกัด</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="สังกัด"
                error
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
              padding:'10px'
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">เหล่า</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="เหล่า"
                error
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
              padding:'10px'
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">จำพวก</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="จำพวก"
                error
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
              padding:'10px'
            }}
          >
            <TextField
              id="outlined-basic"
              label="เบอร์มือถือ"
              variant="outlined"
              fullWidth
              error
            />
          </Box>
          <Box
            sx={{
              width: "100%",
               padding:'10px'
            }}
          >
            <TextField
              id="outlined-basic"
              label="เบอร์ที่ทำงาน"
              variant="outlined"
              fullWidth
              error
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
              padding:'10px'
            }}
          >
                  <Link
              to="/PageExamInformation"
              style={{
                textDecoration: "none",
                width: "20%",
                marginLeft: "5px",
                padding:'10px'
              }}
            >
              <Button variant="contained" fullWidth>
                SAVE
              </Button>
            </Link>
            <Link
              to="/PageExamInformation"
              style={{
                textDecoration: "none",
                width: "20%",
                marginRight: "5px",
                padding:'10px'
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

export default ContentPageAddRemember;
