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

async function getCredentials() {
    const cookies = new Cookies();
    const session = cookies.get("session");
    if (!session?.token) return [];
    
    const wallet_id = await getWalletAdress();
    if (!wallet_id) return [];

    try {
        const response = await fetch(`${NEXT_PUBLIC_API_HOST}/wallet-api/wallet/${wallet_id}/credentials?showDeleted=false&showPending=false`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${session.token}`,
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

async function getCredentialData(credential_id) {
    const cookies = new Cookies();
    const session = cookies.get("session");
    if (!session?.token) return null;
    
    const wallet_id = await getWalletAdress();
    if (!wallet_id) return null;

    try {
        const response = await fetch(`${NEXT_PUBLIC_API_HOST}/wallet-api/wallet/${wallet_id}/credentials/${credential_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${session.token}`,
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function resolveCredential(openIdCredentialOffer) {
    const cookies = new Cookies();
    const session = cookies.get("session");
    if (!session?.token) return null;
    
    const wallet_id = await getWalletAdress();
    if (!wallet_id) return null;

    try {
        const response = await fetch(`${NEXT_PUBLIC_API_HOST}/wallet-api/wallet/${wallet_id}/exchange/resolveCredentialOffer`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${session.token}`,
            },
            body: openIdCredentialOffer
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function getIssuerMetadata(issuer) {
    const cookies = new Cookies();
    const session = cookies.get("session");
    if (!session?.token) return null;
    
    const wallet_id = await getWalletAdress();
    if (!wallet_id) return null;

    try {
        const response = await fetch(`${NEXT_PUBLIC_API_HOST}/wallet-api/wallet/${wallet_id}/exchange/resolveIssuerOpenIDMetadata?issuer=${issuer}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${session.token}`,
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function addCredential(did, openIdCredentialOffer) {
    const cookies = new Cookies();
    const session = cookies.get("session");
    if (!session?.token) throw new Error('No session token available');
    
    const wallet_id = await getWalletAdress();
    if (!wallet_id) throw new Error('No wallet ID available');

    try {
        const response = await fetch(`${NEXT_PUBLIC_API_HOST}/wallet-api/wallet/${wallet_id}/exchange/useOfferRequest?did=${did}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${session.token}`,
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

async function getDid() {
    const cookies = new Cookies();
    const session = cookies.get("session");
    if (!session?.token) throw new Error('No session token available');
    
    const wallet_id = await getWalletAdress();
    if (!wallet_id) throw new Error('No wallet ID available');

    try {
        const response = await fetch(`${NEXT_PUBLIC_API_HOST}/wallet-api/wallet/${wallet_id}/dids`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${session.token}`,
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function deleteCredential(urn) {
    const cookies = new Cookies();
    const session = cookies.get("session");
    if (!session?.token) throw new Error('No session token available');
    
    const wallet_id = await getWalletAdress();
    if (!wallet_id) throw new Error('No wallet ID available');

    try {
        const response = await fetch(`${NEXT_PUBLIC_API_HOST}/wallet-api/wallet/${wallet_id}/credentials/${urn}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${session.token}`,
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