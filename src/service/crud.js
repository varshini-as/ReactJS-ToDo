import axios from "axios";

export const url = "http://localhost:3003/Users";

export const getUser = async (user) => {
    const res = await axios
        .get(`${url}?user=${user}`)
        .then((res) => res.data);
    return res;
}

export const getTasks = async (user) => {
    const res = await axios
        .get(`${url}?user=${user}`)
        .then((res) => res.data);
    console.log(res[0].Tasks);
    return res[0].Tasks;
}