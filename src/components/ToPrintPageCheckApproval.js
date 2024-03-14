import React, { forwardRef, Fragment, useEffect, useRef, useState } from "react";
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
    
    return (
        <div ref={ref} >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={10} align='center'>
                            <div style={{ fontSize: 18, fontWeight: 'bold' }}>
                                รายการการตรวจสอบการอนุมัติวันทดสอบ
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={10} align='center'>
                            <div style={{ fontSize: 14, fontWeight: 'bold' }}>
                                รหัสการจอง { dataToPrint?.resvinfo.resvcode } เข้าทดสอบ วันที่ { dataToPrint?.resvinfo.resvdate } เวลา { dataToPrint?.resvinfo.resvtime }
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
                                เหตุผลขอรับการทดสอบ
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                สถานที่
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                การอนุมัติ
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                                หมายเหตุ
                            </div>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        dataToPrint?.r.map((e, i) => {
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
                                            {e.reason}
                                        </div>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {e.location}
                                        </div>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {e.note === 'อนุมัติแล้ว' ? 'สามารถเข้าทดสอบได้' : 'ไม่สามารถเข้าทดสอบได้'}
                                        </div>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <div style={{ fontSize: 12 }}>
                                            {e.note}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
    );
});

/*------------- Function Component to be called as child component -----------*/
const ToPrintPageCheckApproval = (props) => {
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

export default ToPrintPageCheckApproval;