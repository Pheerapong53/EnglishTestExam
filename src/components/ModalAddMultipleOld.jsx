/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useCallback, useState } from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import {
  ControlPoint,
  FileDownload,
  DeleteForever,
  Description,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, red, yellow } from "@mui/material/colors";
import ModalEditExamArchiveLookExam from "./ModalEditExamArchiveLookExam";
import * as XLSX from "xlsx";
import { addManyExam } from "./functions/cefrLevel";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSilce";

//กำหนด theme สี
const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: yellow[500],
    },
    third: {
      main: blue[500],
    },
  },
});

//กำหนด style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

//function Search
function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter
        quickFilterParser={(searchInput) =>
          searchInput
            .split(",")
            .map((value) => value.trim())
            .filter((value) => value !== "")
        }
      />
    </Box>
  );
}

//เพิ่มหลายข้อ
function ModalAddMultipleOld(props) {
  //Component Declaration
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const token = user.token;

  //แก้ไขข้อมูลในแต่ละแถว
  const editRow = (newvalue) => {
    for (let i = 0; i < fileExcel.length; i++) {
      if (fileExcel[i].id === newvalue.id) {
        fileExcel[i].questioncode = newvalue.questioncode;
        fileExcel[i].problem = newvalue.problem;
        fileExcel[i].question = newvalue.question;
        fileExcel[i].choicecodeT = newvalue.choicecodeT;
        fileExcel[i].choiceTextT = newvalue.choiceTextT;
        fileExcel[i].choicecodeF1 = newvalue.choicecodeF1;
        fileExcel[i].choiceTextF1 = newvalue.choiceTextF1;
        fileExcel[i].choicecodeF2 = newvalue.choicecodeF2;
        fileExcel[i].choiceTextF2 = newvalue.choiceTextF2;
        fileExcel[i].choicecodeF3 = newvalue.choicecodeF3;
        fileExcel[i].choiceTextF3 = newvalue.choiceTextF3;
        fileExcel[i].cerfcode = newvalue.cerfcode;
        fileExcel[i].formcode = newvalue.formcode;
      }
    }
  };

  //ลบข้อมูลในแต่ละแถว
  const deleteRow = (params) => {
    setFileExcel(
      fileExcel.filter((val) => {
        return val.id != params;
      })
    );
    console.log(params);
  };

  //column ใน Data Grid หลังจากกดบันทึก
  const columnSS = [
    { field: "id", headerName: "ลำดับ", width: 50 },
    { field: "questioncode", headerName: "รหัสโจทย์", width: 200 },
    { field: "problem", headerName: "ไฟล์โจทย์", width: 200 },
    { field: "question", headerName: "โจทย์", width: 200 },
    { field: "choicecodeT", headerName: "รหัสตัวเลือก (ถูก)", width: 150 },
    { field: "choiceTextT", headerName: "ตัวเลือก(ถูก)", width: 200 },
    { field: "choicecodeF1", headerName: "รหัสตัวเลือก", width: 150 },
    { field: "choiceTextF1", headerName: "ตัวเลือก", width: 200 },
    { field: "choicecodeF2", headerName: "รหัสตัวเลือก", width: 150 },
    { field: "choiceTextF2", headerName: "ตัวเลือก", width: 200 },
    { field: "choicecodeF3", headerName: "รหัสตัวเลือก", width: 150 },
    { field: "choiceTextF3", headerName: "ตัวเลือก", width: 200 },
    {
      field: "cerfcode",
      headerName: "รหัสความสามารถทางภาษาอังกฤษสากล",
      width: 100,
    },
    { field: "formcode", headerName: "รหัสฟอร์มข้อสอบ", width: 200 },
    {
      field: "manage",
      headerName: "การจัดการ",
      width: 250,
      renderCell: (params) => {
        return (
          <strong>
            <ModalEditExamArchiveLookExam
              params={params}
              onRowValueChange={editRow}
            />

            <ThemeProvider theme={theme}>
              {/* เพิ่มฟังก์ชัน Onclick */}
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                startIcon={<DeleteForever />}
                onClick={() => {
                  deleteRow(params.row.id);
                }}
              >
                DELETE
              </Button>
            </ThemeProvider>
          </strong>
        );
      },
    },
  ];

  //Hook and Logic
  const [fileExcel, setFileExcel] = useState();
  const [fileName, setFileName] = useState();
  //open-close Datagrid when press button
  const [check, setCheck] = React.useState(false);
  const onDrop = useCallback((acceptedFiles) => {
    const fileExtension = acceptedFiles[0].name.split(".").pop();
    //console.log(acceptedFiles[0].name);
    if (fileExtension === "xlsx") {
      const reader = new FileReader();
      reader.onload = () => {
        const data = reader.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const workSheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils
          .sheet_to_json(workSheet, { header: 1 })
          .slice(2);
        //console.log(excelData);
        setFileName(acceptedFiles[0].name);

        var dataQuestion = [];
        for (let i = 0; i < excelData.length; i++) {
          if (excelData[i].length !== 0) {
            dataQuestion.push({
              questioncode: excelData[i][0],
              problem: excelData[i][1],
              question: excelData[i][2],
              choicecodeT: excelData[i][3],
              choiceTextT: excelData[i][4],
              choicecodeF1: excelData[i][5],
              choiceTextF1: excelData[i][6],
              choicecodeF2: excelData[i][7],
              choiceTextF2: excelData[i][8],
              choicecodeF3: excelData[i][9],
              choiceTextF3: excelData[i][10],
              cerfcode: excelData[i][11],
              formcode: excelData[i][12],
              id: excelData[i][13],
            });
          }
        }

        if (dataQuestion.length !== 0) {
          setFileExcel(
            dataQuestion
              .filter(
                (question) =>
                  question.id !== undefined &&
                  question.questioncode !== undefined
              )
              .map((item) => ({
                questioncode: item.questioncode,
                problem: item.problem,
                question: item.question,
                choicecodeT: item.choicecodeT,
                choiceTextT: item.choiceTextT,
                choicecodeF1: item.choicecodeF1,
                choiceTextF1: item.choiceTextF1,
                choicecodeF2: item.choicecodeF2,
                choiceTextF2: item.choiceTextF2,
                choicecodeF3: item.choicecodeF3,
                choiceTextF3: item.choiceTextF3,
                cerfcode: item.cerfcode,
                formcode: item.formcode,
                id: item.id,
              }))
          );
        }
      };
      reader.readAsBinaryString(acceptedFiles[0]);
    } else {
      toast.error("accept only File .xlsx");
    }
  });

  //const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".xlsx",
  });

  //open-close dialog เพิ่มโจทย์ข้อสอบ
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setCheck(false);
    setOpen(false);
  };

  // const [confirm, SetConfirm] = React.useState(false);
  const handleClickCheck = () => {
    if (fileExcel === undefined) {
      toast.error("Please Select File");
    } else if (fileName !== undefined) {
      const fileExtension = fileName.split(".").pop();
      if (fileExtension === "xlsx") {
        setCheck(true);
      } else {
        toast.error("accept only File .xlsx");
      }
    } else if (fileExcel !== undefined) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  //Insert Data in Many Row
  const handleConfirm = () => {
    if (fileExcel !== undefined && fileExcel.length !== 0) {
      addManyExam(fileExcel, token)
        .then((res) => {
          toast.success(res.data.msg, { onClose: () => navigate(0) });
        })
        .catch((error) => {
          if (error.response.status === 401 || error.response.status === 404) {
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
      // addManyExam(fileExcel).then((res) => {
      //   console.log(res);
      // });
      // // handleClose();
      // // SetConfirm(value => !value)
      // window.location.replace("/PageExamArchive");
    } else {
      toast.error("Please Select New File");
    }
  };

  const handleDownloadFile = () => {
    const fileUrl = process.env.REACT_APP_API_URL + "/download";
    const a = document.createElement("a");
    a.href = fileUrl;
    a.click();
  };

  //ยังไม่ได้ใช้
  // const handleFileChange = (event) => {
  //   const files = event.target.files;
  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     const data = e.target.result;
  //     const workbook = XLSX.read(data, { type: "binary" });
  //     const sheetName = workbook.SheetNames[0];
  //     const workSheet = workbook.Sheets[sheetName];
  //     const excelData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
  //     console.log(excelData);
  //   };
  //   reader.readAsBinaryString(files[0]);
  // };

  return (
    <>
      <Button
        sx={{ width: "200px" }}
        variant="contained"
        onClick={handleOpen}
        startIcon={<ControlPoint />}
      >
        เพิ่มหลายโจทย์
      </Button>

      {/* เพิ่มโจทย์ข้อสอบใช้วิธีโยนไฟล์ */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            sx={{ textAlign: "center" }}
            variant="h6"
            component="h2"
          >
            เพิ่มโจทย์ข้อสอบ
          </Typography>

          {/* อัปโหลดไฟล์ For Multiple File */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "10px",
            }}
          >
            <Box>
              <section className="container" style={{ display: "flex" }}>
                {/* Label For DropZone */}
                <div>
                  <p>
                    อัพโหลดไฟล์
                    <Description
                      sx={{
                        color: "#ffeb3b",
                        fontSize: "24px",
                        cursor: "pointer",
                      }}
                    />
                    <br /> (กรุณาใช้ฟอร์มของระบบ)
                  </p>
                  <Button
                    sx={{ width: "150px" }}
                    variant="contained"
                    onClick={handleDownloadFile}
                    startIcon={<FileDownload />}
                  >
                    Download
                  </Button>
                </div>

                {/* <input type="file" onChange={handleFileChange} /> */}

                {/* DROPZONE */}
                <div>
                  <div
                    {...getRootProps({ className: "dropzone" })}
                    style={{
                      width: "30vw",
                      height: "50px",
                      borderStyle: "dashed",
                      borderColor: "#000",
                      borderWidth: "3px",
                    }}
                  >
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                  <aside>
                    <h4>Files</h4>
                    <ul>{fileName}</ul>
                  </aside>
                </div>
              </section>
            </Box>
          </Box>

          {check === true ? (
            ""
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <Box sx={{ paddingRight: "20px" }}>
                {/* <Link to="#" style={{ textDecoration: "none" }}> */}
                <Button variant="contained" onClick={handleClickCheck}>
                  ตรวจสอบข้อมูล
                </Button>

                {/* </Link> */}
              </Box>
            </Box>
          )}

          {check === true ? (
            <Box
              sx={{
                height: "100%",
                width: "100%",
                backgroundColor: "#EEEEEE",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                padding: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "50px",
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                  กรุณาตรวจสอบความถูกต้อง
                </p>
              </Box>
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={fileExcel}
                  columns={columnSS}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  initialState={{
                    filter: {
                      filterModel: {
                        items: [],
                        quickFilterLogicOperator: GridLinkOperator.Or,
                      },
                    },
                  }}
                  components={{ Toolbar: QuickSearchToolbar }}
                />
              </div>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <Box sx={{ paddingRight: "20px" }}>
                  <Link to="#" style={{ textDecoration: "none" }}>
                    <Button variant="contained" onClick={handleConfirm}>
                      บันทึก
                    </Button>
                    <Button variant="contained" onClick={() => setCheck(false)}>
                      cancle
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Box>
          ) : (
            ""
          )}
        </Box>
      </Modal>
    </>
  );
}

export default ModalAddMultipleOld;
