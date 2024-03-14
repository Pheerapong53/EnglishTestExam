import axios from "axios";

export const loginHandler = async (user) => {
    return await axios.post(process.env.REACT_APP_API_URL + "/signin", user,{
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const searchHandler = async (user) => {
    return await axios.post(process.env.REACT_APP_API_URL + "/searchuser", user,{
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const currentUser = async (authtoken) => {
    return await axios.post(process.env.REACT_APP_API_URL + "/current-user",
    {},
     {
        headers: {
            'authtoken' : 'bearer ' + authtoken,
        }
    });
}

export const logoutHandler = async (authtoken, id) => {
    return await axios.delete(process.env.REACT_APP_API_URL + `/signout/${id}`,
     {
        headers: {
            'authtoken' : 'bearer ' + authtoken,
        }
    });
}

export const registerHandler = async (user) => {
    return await axios.post(process.env.REACT_APP_API_URL + "/signup", user,{
        headers: {
            'Content-Type': 'application/json'
        }
    });
}