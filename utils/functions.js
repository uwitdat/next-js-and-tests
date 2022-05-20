import axios from "axios";

export const sum = (a, b) => {
    return a + b
}

export const fetchData = async (url) => {
    if (!url) return 'Url was not provided';

    try {
        const { data } = await axios.get(url);
        return data;

    } catch (err) {
        throw new Error(err);
    }
}
