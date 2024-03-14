
import axios from "axios";
export const addTestResult = async (testResult, token) => {
    return await axios.post(process.env.REACT_APP_API_URL + "/testresult", testResult,{
        headers: {
            authtoken: "bearer " + token,
        }
    });
}