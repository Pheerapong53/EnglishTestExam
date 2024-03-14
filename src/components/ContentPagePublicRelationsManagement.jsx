/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Link, useNavigate } from 'react-router-dom'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { blue, red, yellow } from '@mui/material/colors'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import moment from 'moment'
import ConfirmDialogBox from '../components/ConfirmDialogBox'
import AlertDialog from '../components/AlertDialog';
import { toast } from 'react-toastify'
// import ModalDetailPagePublicRelationsManagement from '../components/ModalDetailPagePublicRelationsManagement'

// Functions
import { getPubrelContents, delPubrela } from '../components/functions/pubrelContents'
import { logout } from "../../src/store/userSilce";

import { useSelector, useDispatch } from 'react-redux'

require('moment/locale/th')

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: yellow[500],
    },
    third: {
      main: blue[800],
    },
  },
})





function ContentPagePublicRelationsManagement() {
  const { user } = useSelector((state) => ({ ...state }))
  const userLogin = user.user
  const token = user.user.token

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [publicRelations, setPublicRelations] = useState([])
  const [delRowsNm, setDelRowsNm] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [delflag, setDelFlag] = useState(false)
  const [confirmDel, setConfirmDel] = useState(false)
  const [delDetailId, setDeldetailid] = useState('')
  const [confirmDelImg, setConfirmDelImg] = useState(false)
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const onShowConfirmDialog = () => {
    setOpenDialog(true)
  }

  function deleteHandler(id) {
    // console.log("id: ", id)
    setDeldetailid(id)
    // setDelRowsNr(i + 1)
    onShowConfirmDialog()
    // console.log("data: ",image)
  }

  useEffect(() => {
    loadPublicRelations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmDel, confirmDelImg])

  useEffect(() => {
    if (confirmDel) {
      // console.log("del id delDetailId: ", delDetailId)
      // console.log("token: ", token)
      delPubrela(token, delDetailId)
        .then((res) => {
          setConfirmDel(false)
          toast.success(res.data.msg)
          loadPublicRelations().catch((err) => console.log("getPubrelUeff: ",err))
          setOpenAlertDialog(true);
        })
        .catch((err) => {
          setConfirmDel(false)
          if (err.response) {
            setConfirmDel(false)
            toast.error(err.response.data.message)

            if(err.response.status === 401) {
              dispatch(logout());
              navigate('/notfound404', { state: {statusCode: err.response.status, txt: err.response.data} })
            } else if(err.response.status === 404) {
              dispatch(logout());
              navigate('/notfound404', { state: {statusCode: err.response.status, txt: err.response.data} })
            }
          }
        })
    }
  },[confirmDel, confirmDelImg])

  const loadPublicRelations = async () => {
    try {
      const res = await getPubrelContents(token)
      setPublicRelations(res.data)
    } catch (err) {
      if(err.response.status === 401) {
        dispatch(logout());
        navigate('/notfound404', { state: {statusCode: err.response.status, txt: err.response.data} })
      } else if(err.response.status === 404) {
        dispatch(logout());
        navigate('/notfound404', { state: {statusCode: err.response.status, txt: err.response.data} })
      }
      console.log("getPubrelContents: ",err)
    }
    // getPubrelContents(token)
    //   .then((res) => {
        // setPublicRelations(data)
    //     // console.log(res.data);
    //   })
  }

  const columns = [
    {
      field: 'id',
      headerName: 'ลำดับ',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) => params.api.getRowIndex(params.row.pubrel_id) + 1,
    },
    {
      field: 'pubrel_createddate',
      headerName: 'วันที่ลง',
      width: 200,
      headerAlign: 'center',
      type: 'date',
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            {moment(cellValues.value).add(543, 'year').format('ll')}
          </div>
        )
      },
    },
    { field: 'pubrel_title', headerName: 'หัวข้อ', width: 400 },
    // { field: "detail", headerName: "รายละเอียด", width: 300 , renderCell: (params) => {
    //   return (
    //     <>
    //     <ModalDetailPagePublicRelationsManagement />
    //     </>
    //   )
    // } },
    {
      field: 'management',
      headerName: 'การจัดการ',
      width: 300,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <div>
          {/* {console.log(params.row.pubrel_title)} */}
          <ThemeProvider theme={theme}>
            <Link
              to="/PageEditPublicRelation"
              state={{ id : params.id}}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <Button
                variant="contained"
                color="secondary"
                size="small"
                style={{ marginLeft: 16, color: '#000' }}
                startIcon={<EditIcon />}
              >
                EDIT
              </Button>
            </Link>
          </ThemeProvider>
  
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() =>
                {deleteHandler(
                    params.id,
                  );
                  setDelRowsNm(params.row.pubrel_title)
                }
              }
              style={{ marginLeft: 16 }}
              startIcon={<DeleteForeverIcon />}
            >
              DELETE
            </Button>
          </ThemeProvider>
        </div>
        )  
      },
    },
  ]
  
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
              .split(',')
              .map((value) => value.trim())
              .filter((value) => value !== '')
          }
        />
      </Box>
    )
  }

  return (
    <>
      <p>
        ยินดีต้อนรับ {userLogin.rank} {userLogin.fname} {userLogin.lname}
      </p>
      {/* <DrawerHeader /> */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link
          to="/PageAddPublicRelation"
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <Button variant="outlined" startIcon={<ControlPointIcon />}>
            เพิ่มการประชาสัมพันธ์
          </Button>
        </Link>
      </Box>
      <div style={{ height: 400, width: '100%' }}>
        <Typography
          sx={{ textAlign: 'start', fontWeight: 'bold' }}
          variant="h6"
          component="h2"
        >
          การจัดการประชาสัมพันธ์
        </Typography>
        <DataGrid
          getRowId={(row) => row.pubrel_id}
          rows={publicRelations}
          columns={columns}
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
      <ConfirmDialogBox
        title="ยืนยันการลบข้อมูลประชาสัมพันธ์"
        content={`คุณต้องการลบข่าวเรื่อง ${delRowsNm} ที่เลือกหรือไม่?`}
        setDelFlag={setDelFlag}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        setConfirmDel={setConfirmDel}
        setConfirmDelImg={setConfirmDelImg}
      />
      {
        openAlertDialog &&
        <AlertDialog
          title='แจ้งผลการลบข้อมูล'
          content={`ข้อมูลประชาสัมพันธ์เรื่อง ${delRowsNm} ถูกลบเรียบร้อยแล้ว`}
          openDialog={openAlertDialog}
          setOpenDialog={setOpenAlertDialog}
        />
      }
    </>
  )
}

export default ContentPagePublicRelationsManagement
