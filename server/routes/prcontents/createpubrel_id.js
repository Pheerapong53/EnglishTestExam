// สร้างเลขที่ข่าวประชาสัมพันธ์
const createpubrel_id = (body) => {
    let num_arr = [];
    let num_arr1 = [];
    let num_arr2 = [];
    let num_arr3 = [];
    let num_arr4 = [];

    body.forEach((e) => {
        num_arr.push(parseInt(e.pubrel_id.substring((e.pubrel_id.search('R') + 5), e.pubrel_id.length))); //PR00001
    });
    body.forEach((e) => {
        num_arr1.push(parseInt(e.pubrel_id.substring((e.pubrel_id.search('R') + 4), e.pubrel_id.length))); //PR00010
    });
    body.forEach((e) => {
        num_arr2.push(parseInt(e.pubrel_id.substring((e.pubrel_id.search('R') + 3), e.pubrel_id.length))); //PR00100
    });
    body.forEach((e) => {
        num_arr3.push(parseInt(e.pubrel_id.substring((e.pubrel_id.search('R') + 2), e.pubrel_id.length))); //PR01000
    });
    body.forEach((e) => {
        num_arr4.push(parseInt(e.pubrel_id.substring((e.pubrel_id.search('R') + 1), e.pubrel_id.length))); //PR10000
    });
    
    
    let pluspubId = num_arr.length === 0 ? 1 : (Math.max(...num_arr) + 1)       //1-9
    let pluspubId1 = num_arr1.length === 0 ? 1 : (Math.max(...num_arr1) + 1)    //10-99
    let pluspubId2 = num_arr2.length === 0 ? 1 : (Math.max(...num_arr2) + 1)    //100-999
    let pluspubId3 = num_arr3.length === 0 ? 1 : (Math.max(...num_arr3) + 1)    //1000-9999
    let pluspubId4 = num_arr4.length === 0 ? 1 : (Math.max(...num_arr4) + 1)    //10000+
    
    if (pluspubId <= 9) {
        return 'PR0000' + pluspubId //PR00001
    } else if (pluspubId > 9 && pluspubId1 <= 99) {
        body.forEach((e) => {
            num_arr.push(parseInt(e.pubrel_id.substring((e.pubrel_id.search('R') + 4), e.pubrel_id.length))); //PR00010
        });
        let no = num_arr.length === 0 ? 1 : (Math.max(...num_arr) + 1)
        // let no = num_arr.length === 0 ? 1 : 99 //ทดสอบใส่เลขที่ข่าว 99
        return 'PR000' + no
    } else if (pluspubId2 >= 100 && pluspubId2 <= 999) {
        body.forEach((e) => {
            num_arr.push(parseInt(e.pubrel_id.substring((e.pubrel_id.search('R') + 3), e.pubrel_id.length))); //PR00100
        });
        let no = num_arr.length === 0 ? 1 : (Math.max(...num_arr) + 1)
        // let no = num_arr.length === 0 ? 1 : 999 //ทดสอบใส่เลขที่ข่าว 999
        return 'PR00' + no
    } else if (pluspubId3 >= 1000 && pluspubId3 <= 9999) {
        body.forEach((e) => {
            num_arr.push(parseInt(e.pubrel_id.substring((e.pubrel_id.search('R') + 2), e.pubrel_id.length))); //PR01000
        });
        let no = num_arr.length === 0 ? 1 : (Math.max(...num_arr) + 1)
        // let no = num_arr.length === 0 ? 1 : 9999 //ทดสอบใส่เลขที่ข่าว 9999
        return 'PR0' + no
    } else if (pluspubId4 >= 10000) {
        body.forEach((e) => {
            num_arr.push(parseInt(e.pubrel_id.substring((e.pubrel_id.search('R') + 1), e.pubrel_id.length))); //PR10000
        });
        let no = num_arr.length === 0 ? 1 : (Math.max(...num_arr) + 1)
        return 'PR' + no
    }
}

module.exports = createpubrel_id;