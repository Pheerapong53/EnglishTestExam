/* eslint-disable array-callback-return */
import React, { forwardRef, Fragment, useRef, useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { Button, Table, TableBody, TableHead, TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Print } from "@mui/icons-material";
import { useReactToPrint } from "react-to-print";

/*------------- Style for Table -----------*/
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        fontSize: 18,
        fontWeight: 'bold',
        //backgroundColor: theme.palette.common.black,
        //color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        //fontSize: 18,
        fontWeight: 'bold',
    },
}));

/*------------- Function Component to be called by ToPrintPageBookTestDate-----------*/
const ComponentToPrint = forwardRef((props, ref) => {
    const { dataToPrint } = props;
    const [printinfo, setPrintInfo] = useState([]);

    // console.log('dataToPrint --> ', dataToPrint);

    useEffect(() => {
        let arr = [];
        dataToPrint.tbrows?.map((rw, i) => {
            let tmp = {
                'id': rw[0],
                'bookingcode': rw[1],
                'bookingdate': rw[2],
                'bookingtime': rw[3],
                'examcode': rw[5],
            };
            arr.push(tmp);
        });
        setPrintInfo(arr);
    }, [dataToPrint]);

    return (
        <div ref={ref} >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={10} align='center'>
                            <div style={{ fontSize: 18, fontWeight: 'bold' }}>
                                รายงานการจัดการทดสอบ
                            </div>
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
                                รหัสการจอง
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                วันที่จอง
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                เวลาที่จอง
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                รหัสการสอบ
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                ผู้คุมสอบ
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                รูปแบบการทดสอบ
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                แสดงเกณฑ์การผ่าน
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                อนุมัติการจองวันทดสอบ
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
                                            {e.bookingcode}
                                        </div>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {e.bookingdate}
                                        </div>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {e.bookingtime}
                                        </div>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {e.examcode}
                                        </div>
                                    </TableCell>
                                    <TableCell align='center'>
                                        {
                                            dataToPrint.subtbrows.length !== 0 &&
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell
                                                            style={{
                                                                fontSize: 10,
                                                                fontWeight: 'bold',
                                                            }}
                                                            align='center'
                                                        >ห้องสอบ</TableCell>
                                                        <TableCell
                                                            style={{
                                                                fontSize: 10,
                                                                fontWeight: 'bold',
                                                            }}
                                                            align='center'
                                                        >ชื่อผู้คุมสอบ</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        dataToPrint.subtbrows.map((r, i) => {
                                                            if (r.resvcode === e.bookingcode) {
                                                                return (
                                                                    <TableRow key={i}>
                                                                        <TableCell
                                                                            style={{
                                                                                fontSize: 10,
                                                                            }}
                                                                            align='center'
                                                                        >
                                                                            {
                                                                                r.labroom?.toUpperCase()
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell
                                                                            style={{
                                                                                fontSize: 10,
                                                                            }}
                                                                            align='center'
                                                                        >
                                                                            {
                                                                                dataToPrint?.invigilator?.filter(el => 
                                                                                    el.pers_id === r.invigilatorid
                                                                                )[0]?.name
                                                                            }
                                                                        </TableCell>
                                                                    </TableRow>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </TableBody>
                                            </Table>
                                        }
                                    </TableCell>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {
                                                e.examcode.includes('APRV') ?
                                                    ['เลือกรูปแบบการสอบ', 'Random Test', 'Adaptive Test'][
                                                    dataToPrint?.testtype.filter(
                                                        el => el.resvcode === e.bookingcode
                                                    )[0]?.testtype
                                                    ] : '-'
                                            }
                                        </div>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {
                                                e.examcode.includes('APRV') ?
                                                    dataToPrint?.testtype.filter(
                                                        el => el.resvcode === e.bookingcode
                                                    )[0]?.scoringshowed === 0 ? 'ไม่แสดง' : 'แสดง'
                                                    : '-'
                                            }
                                        </div>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {
                                                e.examcode.includes('APRV') ? 'อนุมัติ' : 'ไม่อนุมัติ'
                                            }
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div >
    );
});

/*------------- Function Component to be called as child component -----------*/
const ToPrintPageTestManagement = (props) => {
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

export default ToPrintPageTestManagement;