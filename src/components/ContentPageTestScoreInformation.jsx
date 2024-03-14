import React from 'react'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const columns = [
    { field: "id", headerName: "ลำดับ", width: 100 },
    { field: "bookingdate", headerName: "วันที่จอง", width: 400 },
    { field: "bookingtime", headerName: "เวลาที่จอง", width: 400 },
    {field: "management",headerName: "การจัดการ",width: 400, renderCell: (params) => (
      <strong>
        <Link to="/PageTestScoreData" style={{ textDecoration: "none" }}>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
        >
          เข้าดูรายชื่อ
        </Button>
        </Link>
      </strong>
    ),},
  ];
  
  const rows = [
    { id: 1, bookingdate: "1 ก.พ.65", bookingtime: "9.00 น." },
    { id: 2, bookingdate: "1 ก.พ.65", bookingtime: "9.00 น." },
    { id: 3, bookingdate: "1 ก.พ.65", bookingtime: "9.00 น." },
    { id: 4, bookingdate: "1 ก.พ.65", bookingtime: "9.00 น." },
    { id: 5, bookingdate: "1 ก.พ.65", bookingtime: "9.00 น." },
  ];

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
    );
  }

function ContentPageTestScoreInformation() {
    const DrawerHeader = styled("div")(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      }));


  return (
    <>
     <Typography component="div">
        <Box sx={{ textAlign: "center", fontSize: 24, fontWeight: 500 }}>
          ข้อมูลผลคะแนนการทดสอบ
        </Box>
      </Typography>
      <DrawerHeader />
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} initialState={{
          filter: {
            filterModel: {
              items: [],
              quickFilterLogicOperator: GridLinkOperator.Or,
            },
          },
        }}
        components={{ Toolbar: QuickSearchToolbar }} />
    </div>
    </>
  )
}

export default ContentPageTestScoreInformation