import Cookies from "universal-cookie";

const NEXT_PUBLIC_API_HOST = process.env.NEXT_PUBLIC_API_HOST;

async function getWalletAdress() {
    const cookies = new Cookies();
    const session = cookies.get("session");
    if (!session?.token) return null;

    try {
        const response = await fetch(`${NEXT_PUBLIC_API_HOST}/wallet-api/wallet/accounts/wallets`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${session.token}`,
            }
        });
        const data = await response.json();
        return data?.wallets[0]?.id;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export { getWalletAdress }