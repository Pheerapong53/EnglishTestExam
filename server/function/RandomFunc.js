const questiongrp = {
    'L1A1': 8,
    'L1A2': 8,
    'L1B1': 14,
    'L1B2': 15,
    'L1C1': 5,
    'L2A1': 2,
    'L2A2': 2,
    'L2B1': 2,
    'L2B2': 2,
    'L2C1': 2,
    'R1A1': 8,
    'R1A2': 8,
    'R1B1': 9,
    'R1B2': 10,
    'R1C1': 5
};

const ChoiceRndFunc = (source) => {
    const CH_NUM = 4;
    let i = CH_NUM - 1;
    do {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = source[i];
        source[i] = source[j];
        source[j] = tmp;
        i--;
    } while (i > 0);

    return source;
} 

const RndSortFunc = (sourcearr, grplen) => {
    //console.log('sourcearr -----> ', sourcearr);

    let qnlist = sourcearr.reduce((a, b) => {
        if (!a.find((item) => item === b['questioncode'])) {
            a = [...a, b['questioncode']];
        }
        return a;
    },[])

    let i = grplen - 1;
    do {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = qnlist[i];
        qnlist[i] = qnlist[j];
        qnlist[j] = tmp;
        i--;
    } while (i > 0);

    let newsourcearr = qnlist.map(qn => {
        let choicelist = sourcearr.filter(item => item['tbchoices.choicecode'].includes(qn));
        choicelist = ChoiceRndFunc(choicelist);
        return choicelist;
    }).filter(el => !el.some(e => e === undefined));
    
    //console.log('newsourcearr -----> ', newsourcearr, ' : ', newsourcearr.length);
    return newsourcearr;
}

module.exports = { RndSortFunc, questiongrp };
