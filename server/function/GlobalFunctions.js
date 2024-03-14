/*---------------------- FUNC : convertToThDate -----------------------*/
const th_month = [
    'ม.ค.', 'ก.พ', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
];
const convertToThaiDate = (date) => {
    let d = date.split('-');
    d[0] = (Number(d[0]) + 543).toString();
    d[1] = th_month[Number(d[1]) - 1];
    return (d.reverse().join(' '));
};

const convertToEngDate = (thdate) => {
    let d = thdate.split(' ');
    d[1] = (th_month.indexOf(d[1]) + 1) < 10 ? '0'.concat((th_month.indexOf(d[1]) + 1).toString()) : (th_month.indexOf(d[1]) + 1).toString();
    d[2] = (Number(d[2]) - 543).toString();
    // console.log("d: ",d);
    return (d.reverse().join('-'));
}

module.exports = { convertToThaiDate, convertToEngDate };