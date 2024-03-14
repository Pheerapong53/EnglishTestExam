
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// import Typography from '@mui/material/Typography';

// export default function Footer() {
//   return (
//     <footer>
//       <Box
//         px={{ xs: 3, sm: 10 }}
//         py={{ xs: 5, sm: 10 }}
//         bgcolor="#FFFFFF"
//         color="#000000"
//       >
//         <Container maxWidth="lg">
         
//           <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
//           <Box sx={{ width: '100%',display: "flex",justifyContent: 'center',textAlign: "center",marginTop: '10px' }}>   
//          <Typography variant="p" gutterBottom component="div" sx={{fontSize: '18px' ,fontWeight: 'bold'}}>
//         ศูนย์ภาษา กรมยุทธศึกษาทหารอากาศ
//        </Typography>
//        </Box>
//           </Box>
//         </Container>
//       </Box>
//     </footer>
//   );
// }

// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';

const defaultTheme = createTheme();

export default function Footer() {
  return (
  
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',

        }}
      >
        <CssBaseline />

        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor:"#C4C4C4"
          
          }}
        >
          <Container maxWidth="sm">
            <Typography style={{ fontSize: '18px', textAlign: "center", color: "#FFFFFF" }}>
              ศูนย์ภาษา กรมยุทธศึกษาทหารอากาศ
            </Typography>
          
          </Container>
        </Box>
      </Box>
    </ThemeProvider>

  );
}