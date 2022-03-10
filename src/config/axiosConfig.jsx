import { makeUseAxios } from "axios-hooks";
import axios from "axios";

const CRYPTO_API_URL = "http://86.100.240.140:9081";
const NEWS_API_URL = "http://86.100.240.140:9081";

const cryptoApiAxios = axios.create({ baseURL: CRYPTO_API_URL });
const newsApiAxios = axios.create({ baseURL: NEWS_API_URL });

const API = {
    useCryptoApi: makeUseAxios({
        axios: cryptoApiAxios
    }),
    useNewsApi: makeUseAxios({
        axios: newsApiAxios
    }),
}

export { API };
