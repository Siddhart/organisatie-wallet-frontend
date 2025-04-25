import Head from 'next/head';

export default function BankDashboard() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Head>
                <title>Dashboard - GlobalBank Demo</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="border-b border-gray-200 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className='text-2xl font-bold'>Global Bank</h1>
                        <a href='/demo/verify/bank/login' className='rounded-md w-fit h-10 px-4 text-white flex items-center justify-center font-bold bg-black'>
                            Sign Out
                        </a>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="space-y-8">
                        {/* Welcome Section */}
                        <div className="border-b border-gray-200 pb-6">
                            <h1 className="text-2xl font-semibold text-gray-900">Welkom terug, WebSloth</h1>
                            <p className="text-gray-600">Hier is een overzicht van uw rekeningen</p>
                        </div>

                        {/* Account Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="border border-gray-200 bg-white p-6">
                                <h2 className="text-base font-medium text-gray-700 mb-2">Betaalrekening</h2>
                                <p className="text-2xl font-semibold text-gray-900">€4.567,89</p>
                                <p className="text-sm text-gray-500">NL12 GLOB 1234 5678 90</p>
                            </div>
                            <div className="border border-gray-200 bg-white p-6">
                                <h2 className="text-base font-medium text-gray-700 mb-2">Spaarrekening</h2>
                                <p className="text-2xl font-semibold text-gray-900">€1.901,23</p>
                                <p className="text-sm text-gray-500">NL12 GLOB 9012 3456 78</p>
                            </div>
                            <div className="border border-gray-200 bg-white p-6">
                                <h2 className="text-base font-medium text-gray-700 mb-2">Beleggingsrekening</h2>
                                <p className="text-2xl font-semibold text-gray-900">€5.678,90</p>
                                <p className="text-sm text-gray-500">NL12 GLOB 3456 7890 12</p>
                            </div>
                        </div>

                        {/* Recent Transactions */}
                        <div className="border border-gray-200 bg-white">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-medium text-gray-900">Recente transacties</h2>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div className="px-6 py-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium text-gray-900">Office Supplies</p>
                                            <p className="text-sm text-gray-500">Vandaag, 14:30</p>
                                        </div>
                                        <p className="text-red-600 font-medium">-€145,67</p>
                                    </div>
                                </div>
                                <div className="px-6 py-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium text-gray-900">Client Payment</p>
                                            <p className="text-sm text-gray-500">Gisteren, 09:00</p>
                                        </div>
                                        <p className="text-green-600 font-medium">+€1.456,78</p>
                                    </div>
                                </div>
                                <div className="px-6 py-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium text-gray-900">Website Hosting</p>
                                            <p className="text-sm text-gray-500">2 dagen geleden, 00:00</p>
                                        </div>
                                        <p className="text-red-600 font-medium">-€29,99</p>
                                    </div>
                                </div>
                                <div className="px-6 py-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium text-gray-900">Business Insurance</p>
                                            <p className="text-sm text-gray-500">3 dagen geleden, 15:45</p>
                                        </div>
                                        <p className="text-red-600 font-medium">-€250,00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
