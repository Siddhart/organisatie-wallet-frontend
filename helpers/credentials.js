import Cookies from "universal-cookie";

const NEXT_PUBLIC_API_HOST = process.env.NEXT_PUBLIC_API_HOST;

async function getCredentials(wallet_id = "awd") {
    const cookies = new Cookies();
    const { token } = cookies.get("session");

    try {
        const response = await fetch(`${NEXT_PUBLIC_API_HOST}/wallet-api/wallet/${wallet_id}/credentials?showDeleted=false&showPending=false`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return []
    }
}

async function getCredentialData(credential_id, wallet_id = "awd") {
    const cookies = new Cookies();
    const { token } = cookies.get("session");

    try {
        const response = await fetch(`${NEXT_PUBLIC_API_HOST}/wallet-api/wallet/${wallet_id}/credentials/${credential_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        const data = await response.json();
        console.log(data);

        return data;
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}

async function resolveCredential(openIdCredentialOffer, wallet_id = "awd") {
    const cookies = new Cookies();
    const { token } = cookies.get("session");

    try {
        const response = await fetch(`${NEXT_PUBLIC_API_HOST}/wallet-api/wallet/${wallet_id}/exchange/resolveCredentialOffer`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: openIdCredentialOffer
        });
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}

async function getIssuerMetadata(issuer) {
    const cookies = new Cookies();
    const { token } = cookies.get("session");

    try {
        const response = await fetch(`${NEXT_PUBLIC_API_HOST}/wallet-api/wallet/awd/exchange/resolveIssuerOpenIDMetadata?issuer=${issuer}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}

async function addCredential(did, openIdCredentialOffer, wallet_id = "awd") {
    const cookies = new Cookies();
    const { token } = cookies.get("session");

    try {
        const response = await fetch(`${NEXT_PUBLIC_API_HOST}/wallet-api/wallet/${wallet_id}/exchange/useOfferRequest?did=${did}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: openIdCredentialOffer
        });
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function getDid(wallet_id = "awd") {
    const cookies = new Cookies();
    const { token } = cookies.get("session");

    try {
        const response = await fetch(`${NEXT_PUBLIC_API_HOST}/wallet-api/wallet/${wallet_id}/dids`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function deleteCredential(urn, wallet_id = "awd") {
    const cookies = new Cookies();
    const { token } = cookies.get("session");

    try {
        const response = await fetch(`${NEXT_PUBLIC_API_HOST}/wallet-api/wallet/${wallet_id}/credentials/${urn}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        if (!response.ok) {
            throw new Error('Failed to delete credential');
        }
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export { getCredentials, getCredentialData, resolveCredential, getIssuerMetadata, addCredential, getDid, deleteCredential };