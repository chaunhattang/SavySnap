import axios from "axios";
import { url } from "inspector";
import { ENDPOINT } from "../endpoint";

export class AuthService {
    static Login() {
        await axios.post(
            url: ENDPOINT.AUTH.LOGIN;
        )
    }
}