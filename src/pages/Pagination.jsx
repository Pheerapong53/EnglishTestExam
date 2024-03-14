import React from 'react'
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';
import Button from "@mui/material/Button";
import { blue } from '@mui/material/colors';
import { red } from '@mui/material/colors';
import { Link } from "react-router-dom";

function Pagination({ postsPerPage, totalPosts, paginate }) {

// console.log(postsPerPage)
// console.log(totalPosts)
// console.log(paginate)


    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
        '&:hover': {
          backgroundColor: blue[700],
        },
      }));

      const ColorRedButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(red[100]),
        backgroundColor: red[100],
        '&:hover': {
          backgroundColor: red[200],
        },
      }));

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
      }

      // console.log(totalPosts)
  return (
    <div>
        <Box sx={{display: "flex",justifyContent: "center",alignItems: "center",flexWrap: 'wrap','& button': { m: '7px' }}}>
        <Box >

{
    pageNumbers.map((number ) => (
   
       number <= 25 ? (<Link  onClick={() => paginate(number)}  to='#' style={{ textDecoration: "none" }} >
       <ColorButton size="small" variant="contained" style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>{number} </ColorButton>
   </Link> ) : (<Link  onClick={() => paginate(number)}  to='#' style={{ textDecoration: "none" }} >
       <ColorRedButton size="small" variant="contained" style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>{number} </ColorRedButton>
   </Link>)
    ))
}
</Box>
        </Box>
    </div>
  )
}

export default Pagination