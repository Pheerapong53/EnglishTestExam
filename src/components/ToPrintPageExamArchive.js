import React, { forwardRef, Fragment, useRef } from "react";
import { styled } from "@mui/material/styles";
import { Button, Table, TableBody, TableHead, TableRow } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import { Print } from "@mui/icons-material";
import { useReactToPrint } from "react-to-print";

const ComponentToPrint = forwardRef((props, ref) => {
  const { dataToPrint } = props;
  return (
    <div ref={ref}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={10} align="center">
              <div style={{ fontSize: 18, fontWeight: "bold" }}>คลังข้อสอบ</div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">
              <div style={{ fontSize: 12, fontWeight: "bold" }}>
                รหัสความสามารถทางภาษาอังกฤษสากล
              </div>
            </TableCell>
            <TableCell align="center">
              <div style={{ fontSize: 12, fontWeight: "bold" }}>
                ระดับความยากง่ายตามกรอบ CEFR
              </div>
            </TableCell>
            <TableCell align="center">
              <div style={{ fontSize: 12, fontWeight: "bold" }}>
                ลักษณะข้อสอบ
              </div>
            </TableCell>
            <TableCell align="center">
              <div style={{ fontSize: 12, fontWeight: "bold" }}>
                ประเภทของการวัดทักษะ
              </div>
            </TableCell>
            <TableCell align="center">
              <div style={{ fontSize: 12, fontWeight: "bold" }}>จำนวนข้อ</div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataToPrint.map((e, i) => {
            return (
              <TableRow key={i}>
                <TableCell align="center">
                  <div style={{ fontSize: 12 }}>{e.id}</div>
                </TableCell>
                <TableCell align="center">
                  <div style={{ fontSize: 12 }}>{e.cerfdifficultylevel}</div>
                </TableCell>
                <TableCell align="center">
                  <div style={{ fontSize: 12 }}>
                    {e.cerfdifficultyleveldesc}
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div style={{ fontSize: 12 }}>{e.cerfleveltype}</div>
                </TableCell>
                <TableCell align="center">
                  <div style={{ fontSize: 12 }}>{e.n_cerfcode}</div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
});


const ToPrintPageExamArchive = (props) => {
    //Component Declaration
    const {toprint} = props;
    const componentRef = useRef();
    const marginTop = '1cm';
    const marginRight = '0.5cm';
    const marginBottom = '1cm';
    const marginLeft = '0.5cm';
    const getPageMargin = () => {
        return (`
            @page{
            size: A4 landscape;
            margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important;
            }
            `)
    }
    //Hooks and Logic
    
    //Event Handlers
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        pageStyle: getPageMargin()
    });
        //Render
  return (
    <Fragment>
            <div style={{ display: 'none' }}>
                <ComponentToPrint ref={componentRef} dataToPrint={toprint} />
            </div>
            <Button
                variant={'contained'}
                endIcon={<Print />}
                onClick={
                    handlePrint
                }
            >
                พิมพ์
            </Button>
        </Fragment>
  );
}

export default ToPrintPageExamArchive;
