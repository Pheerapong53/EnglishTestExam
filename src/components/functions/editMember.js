import axios from "axios";

export const editMemberHandler = async (user, token) => {
    return await axios.put(process.env.REACT_APP_API_URL + "/editmember", user,{
        headers: {
            // 'Content-Type': 'application/json'
            authtoken: "bearer " + token,
        }
    });
}