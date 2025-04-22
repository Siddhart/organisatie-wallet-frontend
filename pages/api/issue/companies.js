export const kvkData = [
    {
        name: 'WebSloth',
        kvkNumber: '89595157',
        description: 'Bouwen van websites: ontwikkelen en programmeren van websites.',
        type: 'Eenmanszaak',
        vestigingsnummer: '000055380085',
        address: 'Abraham Bloemaertstraat 65, 2526LN \'s-Gravenhage',
        tradeName: 'WebSloth',
        authorized_users: [111222333]
    },
    {
        name: 'TechCorp Solutions B.V.',
        kvkNumber: '12345678',
        description: 'IT-diensten en consultancy: advies en ondersteuning op het gebied van informatie- en communicatietechnologie.',
        type: 'Besloten Vennootschap',
        vestigingsnummer: '000012345678',
        address: 'Stationsplein 10, 3013AJ Rotterdam',
        tradeName: 'TechCorp IT Services',
        authorized_users: [222333444, 333444555]
    },
    {
        name: 'Innovate Solutions Nederland',
        kvkNumber: '87654321',
        description: 'Software ontwikkeling: het ontwikkelen en implementeren van maatwerk software oplossingen.',
        type: 'Besloten Vennootschap',
        vestigingsnummer: '000087654321',
        address: 'Herengracht 182, 1016BR Amsterdam',
        tradeName: 'Innovate Solutions',
        authorized_users: [444555666, 555666777, 666777888]
    },
    {
        name: 'Digital Marketing Pro',
        kvkNumber: '23456789',
        description: 'Digitale marketing en online strategie: het ontwikkelen en uitvoeren van digitale marketingcampagnes.',
        type: 'Eenmanszaak',
        vestigingsnummer: '000023456789',
        address: 'Vredenburg 40, 3511BD Utrecht',
        tradeName: 'Digital Marketing Pro',
        authorized_users: [777888999]
    }
];

export default function handler(req, res) {
    res.status(200).json(kvkData);
}
