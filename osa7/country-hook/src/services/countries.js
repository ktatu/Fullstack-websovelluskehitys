import axios from "axios"

const getCountry = async (name) => {
    const res = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)

    return res.data[0]
}

export default { getCountry }