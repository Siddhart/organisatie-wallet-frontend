import Cookies from "universal-cookie";

const NEXT_PUBLIC_API_HOST = process.env.NEXT_PUBLIC_API_HOST;

async function loginWithEmailAndPassword(email, password) {
    console.log("login user");
    
    try {
        const response = await fetch(`${NEXT_PUBLIC_API_HOST}/wallet-api/auth/login`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                type: "email"
            }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export { loginWithEmailAndPassword };