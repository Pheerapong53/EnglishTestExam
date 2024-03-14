//filter by usertypeid
function filter(nameKey, myArray){
var members = [];
var j = 1;
for (let i = 0; i < myArray.length; i++) {

    if(myArray[i]["tbaccessrights.usrtypeid"] === nameKey){   
        members.push({
          id: j++,
          idnumber: myArray[i].official_id,
          name: myArray[i]["tbmemberinfos.mem_rank"] + myArray[i]["tbmemberinfos.mem_fname"] +' '+ myArray[i]["tbmemberinfos.mem_lname"],
          position: myArray[i]["tbmemberinfos.mem_pos"],
          affiliation: myArray[i]["tbmemberinfos.mem_affiliation"],
          email: myArray[i]["tbmemberinfos.mem_email"],
        })
         
    }
}

return members;
  }

//filter 2 value
function filterByClick(arr, key_1, value_1, key_2, value_2) {
    return arr.reduce((data, item) => {
      if (item[key_1] === value_1 && item[key_2] === value_2) data.push(item);
      return data;
    }, []);
  }

export {filter, filterByClick}
