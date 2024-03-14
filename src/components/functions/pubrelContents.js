import axios from "axios";

export const addPubrelContents = async (authtoken, contents) => {
    return await axios.post(process.env.REACT_APP_API_URL + "/addcontents", contents,{
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'multipart/form-data',
            'authtoken' : 'bearer ' + authtoken,
        }
    });
}

export const getPubrelContents = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API_URL + "/getallcontents",{
        headers: {
            'Content-Type': 'application/json',
            'authtoken' : 'bearer ' + authtoken,
        }
    });
}

export const getPubrelContentsById = async (authtoken, id) => {
    return await axios.get(process.env.REACT_APP_API_URL + `/getpubrelbyid/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'authtoken' : 'bearer ' + authtoken,
        }
    });
}

export const updatePubrelContents = async (authtoken, updatecontents) => {
    return await axios.put(process.env.REACT_APP_API_URL + `/editcontents`, updatecontents,{
        headers: {
            'Content-Type': 'application/json',
            'authtoken' : 'bearer ' + authtoken,
        }
    });
}

export const delPubrelContents = async (authtoken, id) => {
    // console.log("id function: ", id)
    return await axios.delete(process.env.REACT_APP_API_URL + `/delcontents/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'authtoken' : 'bearer ' + authtoken,
        }
    });
}

export const delContentsMedia = async (authtoken, data) => {
    // console.log("id function: ", data)
    return await axios.post(process.env.REACT_APP_API_URL + `/delmedia`, data,{
        headers: {
            'Content-Type': 'application/json',
            'authtoken' : 'bearer ' + authtoken,
        }
    });
}

export const delPubrela = async (authtoken, id) => {
    // console.log("id function: ", data)
    return await axios.delete(process.env.REACT_APP_API_URL + `/delpubrela/${id}`,{
        headers: {
            'Content-Type': 'application/json',
            'authtoken' : 'bearer ' + authtoken,
        }
    });
}

export const listPubrelContentsBy = async (authtoken, count) => {
    return await axios.get(process.env.REACT_APP_API_URL + `/getlistby/${count}`,{
        headers: {
            'Content-Type': 'application/json',
            'authtoken' : 'bearer ' + authtoken,
        }
    });
}
export const listPubrelContents = async (authtoken, pagination) => {
    return await axios.post(process.env.REACT_APP_API_URL + "/getlist", pagination,{
        headers: {
            'Content-Type': 'application/json',
            'authtoken' : 'bearer ' + authtoken,
        }
    });
}