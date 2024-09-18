import React from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import command from '../img/command.jpg'
import ImageList  from '@mui/material/ImageListItem';

function ContentTeamDev() {
  return (
    <div>
<Box sx={{display:'flex',justifyContent: 'center',flexDirection:'column'}}>
    <Box>
    <Typography variant="subtitle1" noWrap component="div" sx={{display: 'flex' , justifyContent: 'center',fontSize:'24px',fontWeight:'bold'}}>
            ทีมพัฒนาซอฟต์แวร์   
    </Typography>
    </Box>
    <Box sx={{display:'flex',justifyContent: 'center',flexWrap:'wrap'}}>
        <Box sx={{width:'300px',height:'350px' ,backgroundColor:'rgba(25, 118, 210, 0.6)',margin:'10px',borderRadius:'16px',boxShadow:'0 4px 30px rgba(0, 0, 0, 0.1)',backdropFilter:'blur(20px)',border:'1px solid rgba(25, 118, 210, 0.6)'}}>
        <Box sx={{display:'flex',justifyContent: 'center'}}>
                <ImageList  sx={{ width:'120px', margin:'10px'}}>
        <img src={command} alt="logo" className='imgDev'/>
        </ImageList>
                </Box>
                <Box>
                <Typography variant="subtitle1" noWrap component="div" sx={{display: 'flex' , justifyContent: 'center',fontSize:'16px',fontWeight:'bold'}}>
            ทีมพัฒนาซอฟต์แวร์   
    </Typography>
                </Box>
        </Box>
        <Box sx={{width:'300px',height:'350px' ,backgroundColor:'rgba(25, 118, 210, 0.6)',margin:'10px',borderRadius:'16px',boxShadow:'0 4px 30px rgba(0, 0, 0, 0.1)',backdropFilter:'blur(20px)',border:'1px solid rgba(25, 118, 210, 0.6)'}}>

        </Box>
        <Box sx={{width:'300px',height:'350px' ,backgroundColor:'rgba(25, 118, 210, 0.6)',margin:'10px',borderRadius:'16px',boxShadow:'0 4px 30px rgba(0, 0, 0, 0.1)',backdropFilter:'blur(20px)',border:'1px solid rgba(25, 118, 210, 0.6)'}}>

        </Box>
        <Box sx={{width:'300px',height:'350px' ,backgroundColor:'rgba(25, 118, 210, 0.6)',margin:'10px',borderRadius:'16px',boxShadow:'0 4px 30px rgba(0, 0, 0, 0.1)',backdropFilter:'blur(20px)',border:'1px solid rgba(25, 118, 210, 0.6)'}}>

        </Box>
        <Box sx={{width:'300px',height:'350px' ,backgroundColor:'rgba(25, 118, 210, 0.6)',margin:'10px',borderRadius:'16px',boxShadow:'0 4px 30px rgba(0, 0, 0, 0.1)',backdropFilter:'blur(20px)',border:'1px solid rgba(25, 118, 210, 0.6)'}}>

</Box>
    </Box>
</Box>
    </div>
  )
}

export default ContentTeamDev