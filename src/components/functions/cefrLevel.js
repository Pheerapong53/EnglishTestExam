import axios from "axios";

export const editCefrLevelHandler = async (cefrLevel, token) => {
    return await axios.put(process.env.REACT_APP_API_URL + "/editcefrlevel", cefrLevel,{
        headers: {
            'Content-Type': 'application/json',
            authtoken: "bearer " + token,
        }
    });
}

export const editQuestionAndChoice = async(questionAndChoice, token) => {
    return await axios.put(process.env.REACT_APP_API_URL + "/editquestionandchoice", questionAndChoice,{
        headers: {
            'Content-Type': 'application/json',
            authtoken: "bearer " + token,
        }
    });
}

export const editChoice = async(choiceUpdate, token) => {
    return await axios.put(process.env.REACT_APP_API_URL + "/editchoice", choiceUpdate,{
        headers: {
            'Content-Type': 'application/json',
            authtoken: "bearer " + token,
        }
    });
}

export const addCefrLevelHandler = async (cefrlevel, token) => {
    return await axios.post(process.env.REACT_APP_API_URL + "/addcefrlevel", cefrlevel,{
        headers: {
            authtoken: "bearer " + token,
        }
    });
}

export const addExamOneHandler = async (exam, token) => {
    return await axios.post(process.env.REACT_APP_API_URL + "/addexamone", exam,{
        headers: {
            authtoken: "bearer " + token,
        }
    });
}

export const addManyExam = async (exam, token) => {
    return await axios.post(process.env.REACT_APP_API_URL + "/addmanyexam", exam,{
        headers: {
            authtoken: "bearer " + token,
        }
    });
}