import axios from "axios";

//wait for delete function 
export const addMemberHandler = async (user) => {
    return await axios.post(process.env.REACT_APP_API_URL + "/addmember", user,{
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const addMemberAndRightHandler = async (user,token) => {
    return await axios.post(process.env.REACT_APP_API_URL + "/addmemberandright", user,{
        headers: {
            authtoken: "bearer " + token,
        }
    });
}

// export const getMember = async (authtoken) => {
//     return await axios.get(process.env.REACT_APP_API_URL + '/get',{
//         headers: {
//             'Content-Type': 'application/json',
//             'authtoken' : 'bearer' + authtoken,
//         }
//     })
// } 