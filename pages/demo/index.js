import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChevronRight } from 'lucide-react';

const DemoCard = ({ title, description, onClick }) => (
  <div 
    onClick={onClick}
    className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden"
  >
    <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4 text-sm">{description}</p>
      <div className="flex items-center text-[#383EDE] group-hover:translate-x-1 transition-transform">
        <span className="text-sm font-medium">Bekijk demo</span>
        <ChevronRight size={16} className="ml-1" />
      </div>
    </div>
  </div>
);

const DemoSection = ({ title, description, demos }) => (
  <div className="mb-12">
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600 text-base">{description}</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {demos.map((demo, index) => (
        <DemoCard
          key={index}
          title={demo.title}
          description={demo.description}
          onClick={demo.onClick}
        />
      ))}
    </div>
  </div>
);

export default function DemoPage() {
  const router = useRouter();

  const issuanceDemos = [
    {
      title: 'KVK Uitreksel',
      description: 'Vraag en ontvang een KVK uittreksel direct in uw wallet. Deze demo laat zien hoe bedrijven eenvoudig hun officiële bedrijfsgegevens kunnen delen.',
      onClick: () => router.push('/demo/issue/kvk')
    },
  ];

  const verifyingDemos = [
    {
      title: 'Bank Login',
      description: 'Ervaar veilig inloggen bij uw bank met de NL Wallet. Deze demo simuleert het inloggen bij uw bankrekening met behulp van verifieerbare gegevens.',
      onClick: () => router.push('/demo/verify/bank')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Head>
        <title>Demo's - Organisatie Wallet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">Organisatie Wallet Demo's</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-[#383EDE] text-white px-8 py-4 rounded-xl hover:bg-[#2f33c0] transition-colors text-lg font-medium shadow-sm hover:shadow-md"
          >
            Ga naar Business Wallet
          </button>
        </div>

        <DemoSection
          title="Uitgifte van Gegevens"
          description="Demo's die laten zien hoe organisaties gegevens kunnen uitgeven aan gebruikers"
          demos={issuanceDemos}
        />

        <DemoSection
          title="Verificatie van Gegevens"
          description="Demo's die laten zien hoe organisaties gegevens kunnen verifiëren"
          demos={verifyingDemos}
        />
      </main>
    </div>
  );
}
