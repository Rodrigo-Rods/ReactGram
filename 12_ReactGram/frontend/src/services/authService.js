import { api, requestConfig } from "../utils/config";

// Registrar um usuário
const register = async (data) => {
    const config = requestConfig("POST", data);

    try {
        const res = await fetch(api + "/users/register", config)
            .then((res) => res.json())
            .catch((err) => err);

        if (res) {
            localStorage.setItem("user", JSON.stringify(res));
        }
        return res;
    } catch (error) {
        console.log('Caught error:', error); // Log any caught errors
    }
};
const authService = {
    register,
}

export default authService;;