export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { kvkNumber, bsnNumber } = req.body;

        if (!kvkNumber || !bsnNumber) {
            return res.status(400).json({ error: 'KVK number and BSN number are required' });
        }

        // Fetch companies data from the companies endpoint
        const companiesResponse = await fetch(`https://businesswallet.eu/api/issue/companies`);
        if (!companiesResponse.ok) {
            throw new Error('Failed to fetch companies data');
        }
        const kvkData = await companiesResponse.json();

        // Find the company
        const company = kvkData.find(comp => comp.kvkNumber === kvkNumber);

        if (!company) {
            return res.status(404).json({ type: "error", message: 'Company not found' });
        }

        // Check if BSN is authorized
        if (!company.authorized_users.includes(parseInt(bsnNumber))) {
            return res.status(403).json({ type: "error", message: 'User not authorized for this company' });
        }

        // Make request to issuer
        const issuerResponse = await fetch('https://issuer.businesswallet.eu/openid4vc/jwt/issue', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "issuerDid": "did:jwk:eyJrdHkiOiJPS1AiLCJjcnYiOiJFZDI1NTE5Iiwia2lkIjoiUkE0T2w4RV8zR1RvcE9STUtUYXZkVEw5MkZpVW0xUGNDSTNvZ25zelN5OCIsIngiOiJVU094RlBhZXhJb2FZM0h4WWdOM2pjRXMtbkZOZTZyVDFaYWFDbjRlVUo0In0",
                "issuerKey": {
                    "type": "jwk",
                    "jwk": {
                        "kty": "OKP",
                        "d": "LKsZuHOSLXS0sTPV3N6erO55VlI220Q_qqbRytum2Jc",
                        "crv": "Ed25519",
                        "kid": "RA4Ol8E_3GTopORMKTavdTL92FiUm1PcCI3ognszSy8",
                        "x": "USOxFPaexIoaY3HxYgN3jcEs-nFNe6rT1ZaaCn4eUJ4"
                    }
                },
                "credentialConfigurationId": "KVKUitreksel_jwt_vc_json",
                "credentialData": {
                    "@context": [
                        "https://www.w3.org/2018/credentials/v1"
                    ],
                    "type": [
                        "VerifiableCredential",
                        "KVKUitreksel"
                    ],
                    "issuer": {
                        "type": [
                            "Profile"
                        ],
                        "name": "Kamer van Koophandel",
                        "url": "https://kvk.nl/",
                        "image": "https://www.kvk.nl/apple-touch-icon.png"
                    },
                    "credentialSubject": {
                        "KVKNummer": kvkNumber,
                        "RSINNummer": "",
                        "naam": company.name,
                        "handelsnamen": company.tradeName,
                        "typeEigenaar": "NatuurlijkPersoon",
                        "rechtsVormen": company.type,
                        "adres": company.address,
                        "emailadres": "contact@siddhart.dev",
                        "telefoonnummer": "",
                        "SBIActiviteit": "6201, Ontwikkelen, produceren en uitgeven van software",
                        "aanvangsdatumVanDeRegistratie": "29-01-2023",
                        "datumVanUitschrijving": "",
                        "einddatumVanDeRegistratie": "",
                        "bijzondereRechtstoestanden": "",
                        "beperkingInRechtshandelingen": "",
                        "buitenlandseRechtstoestand": ""
                    }
                },
                "mapping": {
                    "id": "<uuid>",
                    "issuer": {
                        "id": "<issuerDid>"
                    },
                    "issuanceDate": "<timestamp>",
                    "expirationDate": "<timestamp-in:365d>"
                },
                "authenticationMethod": "PRE_AUTHORIZED",
                "standardVersion": "DRAFT13"
            })
        });

        if (!issuerResponse.ok) {
            return res.status(issuerResponse.status).json({ type: "error", message: "Something went wrong!" });
        }

        // Get the response text which contains the URL
        const credentialOfferUrl = await issuerResponse.text();

        // Return the credential offer URL
        return res.status(200).json({
            type: "success",
            credentialOfferUrl,
            message: "Successfully issued credential"
        });

    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({ type: "error", message: 'Internal server error' });
    }
}
