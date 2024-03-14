/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
// import { useNavigate } from "react-router-dom";
// import {useLocation} from 'react-router-dom';

function Posts({ posts, postsPerPage, totalPosts, paginate ,pageReadingSixtyOne,currentPage,pageReadingSixtyNine ,pageReadingSeventySeven ,pageReadingEeighty ,pageReadingEeightyFive,pageReadingReadinNinetyTwo, pageSoundFiftySeven,pageSoundFiftyNine,currentTimeS,duration ,resetCondition,time }) {
 
  const [timeS, setTimeS] = useState(0);
  
//    function handleRender(x) {
//         let interval;
//           interval = setInterval(() => {
//                 setTimeS(prevCount => prevCount + 1);
//           }, 1000);
//           return () => clearInterval(interval);               
//   }


  useEffect(() => {
        // handleRender(duration)
        const sss = duration
        console.log(sss);
        let interval;
        if(time === 1){
                setTimeS(timeS + 1);
        }else{
                interval = setInterval(() => {
                        setTimeS(prevCount => prevCount + 1);
                  }, 1000);
        }
        
        return () => clearInterval(interval);   
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [duration,time]);

//   useEffect(() => {
//         let interval;
//         if (time === 1) {
//             setTimeS(0);
//         } else {
//           interval = setInterval(() => {
//                 setTimeS(prevCount => prevCount + 1);
//           }, 1000);
//         }
//         return () => clearInterval(interval);
//       }, [resetCondition]);

//   console.log(timeS)
//   console.log(duration)
//   console.log("timeS",timeS)
// console.log(currentPage)
// console.log(posts)
// const [timesounds , setTimesound] = useState(timeSound)
//   useEffect(() => {
//         // Set up the interval
//         const interval = setInterval(() => {
//                 setTimesound((timesounds) => {
//                 // if(time <= 0){
//                 //         setInterval(() =>{
//                 //                 setTimesound((timesounds) => {
//                 //                         return timesounds - 1;
//                 //                 })
//                 //         } , 1000)
//                 // }
//             // If the time has reached 0, reset it to 10
//         //     if (time === 0) {
//         //       return 5;
//         //     }
//             // Otherwise, decrement the time by 1
//             return timesounds - 1;
//           });
//         }, 1000); // 1000 milliseconds = 1 second
    
        
//         // Clean up the interval when the component unmounts
//         return () => clearInterval(interval);
//       }, []); // Don't re-run the effect
//   const [counter, setCounter] = useState(5);


// console.log(timeSound)
// useEffect(() => {
//         const intervals = setInterval(() => {
//                 setTimesound((timesounds) => {
//                       if(time <= 0){
//                               setInterval(() =>{
//                                       setTimesound((timesounds) => {
//                                               return timesounds - 1;
//                                       })
//                               } , 1000)
//                       }
//                 //   If the time has reached 0, reset it to 10
//                   if (time === 0) {
//                     return 5;
//                   }
//                 //   Otherwise, decrement the time by 1
//                   return timesounds - 1;
//                 });
//               }, 1000); // 1000 milliseconds = 1 second
          
              
//               // Clean up the interval when the component unmounts
//               return () => clearInterval(intervals);
// },[])
// console.log(time)
// console.log(timesounds)
//   useEffect(() => {
//         // counter > 0 && setTimeout(() => setCounter(counter - 1), 1000 ? : clearInterval(counter));
//         counter > 0  ? setTimeout(() => setCounter(counter - 1), 1000) : clearInterval(counter)
//       }, [counter]);
//   const [seconds, setSeconds] = useState(5);

//   useEffect(() => {
//         const interval = setInterval(() => {
//           setSeconds(seconds => seconds - 1);
//         }, 1000);
    
//         return () => clearInterval(interval);
//       }, []);

//       console.log(counter)

const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
      }


  return (
    <>

    {
      currentPage >= 57 && currentPage <= 58 ?
      pageSoundFiftySeven.map((pageReading) => (
              <>
              <Box key={pageReading.id}>
    
              <Box>
               
                          {/* {timeLeft === null ? ( <Typography variant="p" sx={{fontSize: "18px"}} component="div" gutterBottom>
                                   Question {post.id} : {post.questionText}
                           </Typography>) : ''} */}
                           <Typography variant="p" sx={{fontSize: "18px"}} component="div" gutterBottom>
                                   Question {pageReading.id} : {pageReading.sound}
                           </Typography>
                          
              </Box> 
                       <Box>
                       <FormControl>
                               <FormLabel id="demo-radio-buttons-group-label">Select one:</FormLabel>
                               <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female"name="radio-buttons-group">
                                 
                                   {
                                      pageReading.answerOptions.map((answerOption) => (
                                           <FormControlLabel value={answerOption.Choice} control={<Radio />} label={ answerOption.Choice + `.)  ` + answerOption.answerText} />
                                       ))
                                   }
                               </RadioGroup>
                       </FormControl>
                       </Box> 
    
    
              
              </Box>
              <br />
                 
                       </>
            ))
            :
            currentPage >= 59 && currentPage <= 60 ? 
            pageSoundFiftyNine.map((pageReading) => (
              <>
              <Box key={pageReading.id}>
    
              <Box>
               
                          {/* {timeLeft === null ? ( <Typography variant="p" sx={{fontSize: "18px"}} component="div" gutterBottom>
                                   Question {post.id} : {post.questionText}
                           </Typography>) : ''} */}
                           <Typography variant="p" sx={{fontSize: "18px"}} component="div" gutterBottom>
                                   Question {pageReading.id} : {pageReading.sound}
                           </Typography>
                          
              </Box> 
                       <Box>
                       <FormControl>
                               <FormLabel id="demo-radio-buttons-group-label">Select one:</FormLabel>
                               <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female"name="radio-buttons-group">
                                 
                                   {
                                      pageReading.answerOptions.map((answerOption) => (
                                           <FormControlLabel value={answerOption.Choice} control={<Radio />} label={ answerOption.Choice + ".) " + answerOption.answerText} />
                                       ))
                                   }
                               </RadioGroup>
                       </FormControl>
                       </Box> 
    
    
              
              </Box>
              <br />
                 
                       </>
            ))
:
      currentPage >= 61 && currentPage <= 68 ? 
        pageReadingSixtyOne.map((pageReading) => (
          <>
          <Box key={pageReading.id}>

          <Box>
           
                      {/* {timeLeft === null ? ( <Typography variant="p" sx={{fontSize: "18px"}} component="div" gutterBottom>
                               Question {post.id} : {post.questionText}
                       </Typography>) : ''} */}
                       <Typography variant="p" sx={{fontSize: "18px"}} component="div" gutterBottom>
                               Question {pageReading.id} : {pageReading.questionText}
                       </Typography>
                      
          </Box> 
                   <Box>
                   <FormControl>
                           <FormLabel id="demo-radio-buttons-group-label">Select one:</FormLabel>
                           <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female"name="radio-buttons-group">
                             
                               {
                                  pageReading.answerOptions.map((answerOption) => (
                                       <FormControlLabel value={answerOption.Choice} control={<Radio />} label={ answerOption.Choice + ".) " + answerOption.answerText} />
                                   ))
                               }
                           </RadioGroup>
                   </FormControl>
                   </Box> 


          
          </Box>
          <br />
             
                   </>
        ))
        : currentPage >= 69 && currentPage <= 76 ? 
        pageReadingSixtyNine.map((pageReading) => (
          <>
          <Box key={pageReading.id}>

          <Box>
           
                      {/* {timeLeft === null ? ( <Typography variant="p" sx={{fontSize: "18px"}} component="div" gutterBottom>
                               Question {post.id} : {post.questionText}
                       </Typography>) : ''} */}
                       <Typography variant="p" sx={{fontSize: "18px"}} component="div" gutterBottom>
                               Question {pageReading.id} : {pageReading.questionText}
                       </Typography>
                      
          </Box> 
                   <Box>
                   <FormControl>
                           <FormLabel id="demo-radio-buttons-group-label">Select one:</FormLabel>
                           <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female"name="radio-buttons-group">
                             
                               {
                                  pageReading.answerOptions.map((answerOption) => (
                                       <FormControlLabel value={answerOption.Choice} control={<Radio />} label={ answerOption.Choice + ".) " + answerOption.answerText} />
                                   ))
                               }
                           </RadioGroup>
                   </FormControl>
                   </Box> 


          
          </Box>
          <br />
             
                   </>
        )) :
        currentPage >= 77 && currentPage <= 80 ?  pageReadingSeventySeven.map((pageReading) => (
          <>
          <Box key={pageReading.id}>

          <Box>
           
                      {/* {timeLeft === null ? ( <Typography variant="p" sx={{fontSize: "18px"}} component="div" gutterBottom>
                               Question {post.id} : {post.questionText}
                       </Typography>) : ''} */}
                       <Typography variant="p" sx={{fontSize: "18px"}} component="div" gutterBottom>
                               Question {pageReading.id} : {pageReading.questionText}
                       </Typography>
                      
          </Box> 
                   <Box>
                   <FormControl>
                           <FormLabel id="demo-radio-buttons-group-label">Select one:</FormLabel>
                           <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female"name="radio-buttons-group">
                             
                               {
                                  pageReading.answerOptions.map((answerOption) => (
                                       <FormControlLabel value={answerOption.Choice} control={<Radio />} label={ answerOption.Choice + ".) " + answerOption.answerText} />
                                   ))
                               }
                           </RadioGroup>
                   </FormControl>
                   </Box> 


          
          </Box>
          <br />
             
                   </>
        ))
        :  currentPage >= 81 && currentPage <= 84 ?  pageReadingEeighty.map((pageReading) => (
          <>
          <Box key={pageReading.id}>

          <Box>
           
                      {/* {timeLeft === null ? ( <Typography variant="p" sx={{fontSize: "18px"}} component="div" gutterBottom>
                               Question {post.id} : {post.questionText}
                       </Typography>) : ''} */}
                       <Typography variant="p" sx={{fontSize: "18px"}} component="div" gutterBottom>
                               Question {pageReading.id} : {pageReading.questionText}
                       </Typography>
                      
          </Box> 
                   <Box>
                   <FormControl>
                           <FormLabel id="demo-radio-buttons-group-label">Select one:</FormLabel>
                           <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female"name="radio-buttons-group">
                             
                               {
                                  pageReading.answerOptions.map((answerOption) => (
                                       <FormControlLabel value={answerOption.Choice} control={<Radio />} label={ answerOption.Choice + ".) " + answerOption.answerText} />
                                   ))
                               }
                           </RadioGroup>
                   </FormControl>
                   </Box> 


          
          </Box>
          <br />
             
                   </>
        )) : currentPage >= 85 && currentPage <= 91 ?  pageReadingEeightyFive.map((pageReading) => (
          <>
          <Box key={pageReading.id}>

          <Box>
           
                      {/* {timeLeft === null ? ( <Typography variant="p" sx={{fontSize: "18px"}} component="div" gutterBottom>
                               Question {post.id} : {post.questionText}
                       </Typography>) : ''} */}
                       <Typography variant="p" sx={{fontSize: "18px"}} component="div" gutterBottom>
                               Question {pageReading.id} : {pageReading.questionText}
                       </Typography>
                      
          </Box> 
                   <Box>
                   <FormControl>
                           <FormLabel id="demo-radio-buttons-group-label">Select one:</FormLabel>
                           <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female"name="radio-buttons-group">
                             
                               {
                                  pageReading.answerOptions.map((answerOption) => (
                                       <FormControlLabel value={answerOption.Choice} control={<Radio />} label={ answerOption.Choice + ".) " + answerOption.answerText} />
                                   ))
                               }
                           </RadioGroup>
                   </FormControl>
                   </Box> 


          
          </Box>
          <br />
             
                   </>
        ))
        : currentPage >= 92 && currentPage <= 100 ?  pageReadingReadinNinetyTwo.map((pageReading) => (
                <>
                <Box key={pageReading.id}>
      
                <Box>
                 
                            {/* {timeLeft === null ? ( <Typography variant="p" sx={{fontSize: "18px"}} component="div" gutterBottom>
                                     Question {post.id} : {post.questionText}
                             </Typography>) : ''} */}
                             <Typography variant="p" sx={{fontSize: "18px"}} component="div" gutterBottom>
                                     Question {pageReading.id} : {pageReading.questionText}
                             </Typography>
                            
                </Box> 
                         <Box>
                         <FormControl>
                                 <FormLabel id="demo-radio-buttons-group-label">Select one:</FormLabel>
                                 <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female"name="radio-buttons-group">
                                   
                                     {
                                        pageReading.answerOptions.map((answerOption) => (
                                             <FormControlLabel value={answerOption.Choice} control={<Radio />} label={ answerOption.Choice + ".) " + answerOption.answerText} />
                                         ))
                                     }
                                 </RadioGroup>
                         </FormControl>
                         </Box> 
      
      
                
                </Box>
                <br />
                   
                         </>
              ))
        :
        posts.map((post) => (
          <>
          <Box key={post.id}>
<Box>
  {/* {post.sound} */}
</Box>
          <Box>
           
                    
                       {/* {time <= 0 ? <Typography variant="p" sx={{fontSize: "18px"}} component="div" gutterBottom>
                               Question {post.id} : {post.sound}
                       </Typography> : ''} */}
                       {
                        timeS >= 5 ?  <Typography variant="p" sx={{fontSize: "18px"}} component="div" gutterBottom>
                        Question {post.id} : {post.sound}
                </Typography>  : ''
                       }
              {/* <Typography variant="p" sx={{fontSize: "18px"}} component="div" gutterBottom>
                        Question {post.id} : {post.sound}
                </Typography> */}
                      
          </Box> 
                   <Box>
                   <FormControl>
                           <FormLabel id="demo-radio-buttons-group-label">Select one:</FormLabel>
                           <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female"name="radio-buttons-group">
                             
                               {
                                  post.answerOptions.map((answerOption) => (
                                       <FormControlLabel value={answerOption.Choice} control={<Radio />} label={ answerOption.Choice + ".) " + answerOption.answerText} />
                                   ))
                               }
                           </RadioGroup>
                   </FormControl>
                   </Box> 


          
          </Box>
             
                   </>
      ))
      
    }
    
                     

    </>
  )
}

export default Posts