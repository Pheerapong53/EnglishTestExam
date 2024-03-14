import React, { forwardRef, Fragment, useRef, useMemo, useState } from "react";
import { Button, Table, TableBody, TableHead, TableRow, Grid, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import { Print } from "@mui/icons-material";
import { useReactToPrint } from "react-to-print";

/*------------------ Style ----------------------------*/
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFF',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    fontFamily: 'THSarabunNew',
    color: theme.palette.text.secondary
}));

/*------------- Function Component to be called by ToPrintPageBookTestDate-----------*/
const ComponentToPrint = forwardRef((props, ref) => {
    const { dataToPrint } = props;
    const [printinfo, setPrintInfo] = useState([]);
    useMemo(() => {
        setPrintInfo(dataToPrint);
        //console.log('printinfo --> ', dataToPrint);
    }, [dataToPrint]);

    /*--------------------------- RETURN -------------------------*/
    return (
        <div ref={ref} >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={10} align='center'>
                            <div style={{ fontSize: 20, fontWeight: 'bold' }}>
                                รายงานการจัดการทดสอบ
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={10} align='center'>
                            <div style={{ fontSize: 18, fontWeight: 'bold' }}>
                                หน่วย {printinfo[0]?.unit} รหัสการจอง {printinfo[0]?.resvcode} วันทดสอบ {printinfo[0]?.date} เวลา {printinfo[0]?.time.split(':')[0] + printinfo[0]?.time.split(':')[1]}
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={10} align='center'>
                            <div style={{ fontSize: 18, fontWeight: 'bold' }}>
                                รหัสการสอบ {printinfo[0]?.resvcode}
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={10} align='center'>
                            <Grid container justifyContent={'center'}>
                                <Grid item xs={4}>
                                    ที่นั่งคงเหลือ
                                </Grid>
                                <Grid item xs={2}>
                                    {printinfo[0]?.remainseat[0]}
                                </Grid>
                                <Grid item xs={2}>
                                    {printinfo[0]?.remainseat[1]}
                                </Grid>
                                <Grid item xs={2}>
                                    {printinfo[0]?.remainseat[2]}
                                </Grid>
                                <Grid item xs={2}>
                                    {printinfo[0]?.remainseat[3]}
                                </Grid>
                                <Grid item xs={4}>
                                    ผู้คุมสอบ
                                </Grid>
                                <Grid item xs={2}>
                                    {
                                        printinfo[0]?.invigilator['lab1'] !== '' ?
                                            printinfo[0]?.invigilator['lab1'] : '-'
                                    }
                                </Grid>
                                <Grid item xs={2}>
                                    {
                                        printinfo[0]?.invigilator['lab2'] !== '' ?
                                            printinfo[0]?.invigilator['lab2'] : '-'
                                    }
                                </Grid>
                                <Grid item xs={2}>
                                    {
                                        printinfo[0]?.invigilator['lab3'] !== '' ?
                                            printinfo[0]?.invigilator['lab3'] : '-'
                                    }
                                </Grid>
                                <Grid item xs={2}>
                                    {
                                        printinfo[0]?.invigilator['lab6'] !== '' ?
                                            printinfo[0]?.invigilator['lab6'] : '-'
                                    }
                                </Grid>
                            </Grid>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                ลำดับ
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                เลขประจำตัว
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                ยศ ชื่อ นามสกุล
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                รูปแบบการทดสอบ
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                ฟอร์ม
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                สถานที่สอบ
                            </div>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        printinfo.map((e, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {e.id}
                                        </div>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {e.idnumber}
                                        </div>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {e.name}
                                        </div>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {['ยังไม่กำหนด', 'Random Test', 'Adaptive Test'][e.testtype]}
                                        </div>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {e.indvtfrm}
                                        </div>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {e.labroom}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )//end return
                        })//end map
                    }
                </TableBody>
            </Table>
        </div >
    );
});

/*------------- Function Component to be called as child component -----------*/
const ToPrintPageExamManagement = (props) => {
    const { toprint } = props;
    const componentRef = useRef();

    const marginTop = '1cm';
    const marginRight = '0.5cm';
    const marginBottom = '1cm';
    const marginLeft = '0.5cm';

    const getPageMargin = () => {
        return (`
            @page {
                size: A4 landscape;
                margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important;
            }
        `);
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        pageStyle: getPageMargin()
    });

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

export default ToPrintPageExamManagement;