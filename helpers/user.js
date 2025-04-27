const baseURL = "https://api.businesswallet.eu/api"

const getUsers = async () => {
    try {
        const response = await fetch(`${baseURL}/Employee`);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

const getUser = async (id) => {
    try {
        const response = await fetch(`${baseURL}/Employee/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

const createUser = async (userData) => {
    try {
        const response = await fetch(`${baseURL}/Employee`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to create user');
        }
        
        const data = await response.json();
        return data.id;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

const createUserFromPID = async (pidData) => {
    try {
        const firstName = pidData.attributes.find(attr => attr.key === 'mock.firstNames')?.value.value || '';
        const lastName = pidData.attributes.find(attr => attr.key === 'mock.lastName')?.value.value || '';
        
        // Extract voorletters from first names
        const voorletters = firstName
            .split(' ')
            .map(name => name.charAt(0))
            .join('');

        // Extract voorvoegsel from last name (common Dutch prefixes)
        const prefixes = ['van', 'de', 'den', 'der', 'ter', 'ten', 'van de', 'van der', 'van den'];
        let voorvoegsel = '';
        let cleanLastName = lastName;
        
        for (const prefix of prefixes) {
            if (lastName.toLowerCase().startsWith(prefix + ' ')) {
                voorvoegsel = prefix;
                cleanLastName = lastName.substring(prefix.length + 1);
                break;
            }
        }

        const userData = {
            firstName: firstName,
            lastName: cleanLastName,
            voorvoegsel: voorvoegsel,
            voorletters: voorletters,
            birthName: pidData.attributes.find(attr => attr.key === 'mock.birthName')?.value.value || '',
            gender: pidData.attributes.find(attr => attr.key === 'mock.gender')?.value.value || '',
            birthDate: new Date(pidData.attributes.find(attr => attr.key === 'mock.birthDate')?.value.value).toISOString(),
            olderThan18: pidData.attributes.find(attr => attr.key === 'mock.olderThan18')?.value.value === 'true',
            birthPlace: pidData.attributes.find(attr => attr.key === 'mock.birthPlace')?.value.value || '',
            birthCountry: pidData.attributes.find(attr => attr.key === 'mock.birthCountry')?.value.value || '',
            married: pidData.attributes.find(attr => attr.key === 'mock.hasSpouseOrPartner')?.value.value === 'true',
            legalName: pidData.issuer.legalName.nl || '',
            category: pidData.issuer.category.nl || '',
            city: pidData.issuer.city.nl || '',
            kvk: pidData.issuer.kvk || '',
            verificationState: 0,
            employeeState: 0,
            //mock data
            phoneNumber: '+31628819729',
            position: '',
            email: 'test@gmail.com',
            publicKey: '',
            laatsteAanmelding: new Date().toISOString()
        };

        const response = await fetch(`${baseURL}/Employee`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to create user from PID data');
        }
        
        const data = await response.json();
        return data.id;
    } catch (error) {
        console.error('Error creating user from PID:', error);
        throw error;
    }
}

export { getUsers, getUser, createUser, createUserFromPID }