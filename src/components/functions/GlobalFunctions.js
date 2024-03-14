/*---------------------- FUNC : convertToThDate -----------------------*/
const th_month = [
    'ม.ค.', 'ก.พ', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
];

const th_days = ['วันอาทิตย์ที่', 'วันจันทร์ที่', 'วันอังคารที่', 'วันพุธที่', 'วันพฤหัสบดีที่', 'วันศุกร์ที่', 'วันเสาร์ที่'];

const convertToThaiDate = (date) => {
    let d = date.split('-');
    d[0] = (Number(d[0]) + 543).toString();
    d[1] = th_month[Number(d[1]) - 1];
    return (d.reverse().join(' '));
};

/*--------------- added on 19-11-2023 ----------------*/
const convertToFullThaiDate = (date) => {
    let day = th_days[new Date(date).getDay()];
    let d = date.split('-');
    d[0] = (Number(d[0]) + 543).toString();
    d[1] = th_month[Number(d[1]) - 1];
    return (day + ' ' + d.reverse().join(' '));
};

const convertToEngDate = (thdate) => {
    let d = thdate.split(' ');
    d[1] = (th_month.indexOf(d[1]) + 1) < 10 ? '0'.concat((th_month.indexOf(d[1]) + 1).toString()) : (th_month.indexOf(d[1]) + 1).toString();
    d[2] = (Number(d[2]) - 543).toString();
    return (d.reverse().join('-'));
}

export { convertToThaiDate, convertToFullThaiDate, convertToEngDate };