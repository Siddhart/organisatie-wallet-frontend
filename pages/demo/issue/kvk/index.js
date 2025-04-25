import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import QRCode from 'react-qr-code';
import { Copy } from 'lucide-react';
import { toast } from 'react-toastify';

const steps = [
  { id: 1, name: 'Bedrijf selecteren' },
  { id: 2, name: 'Autorisatie' },
];

// Progress Steps Component
const ProgressSteps = ({ steps, currentStep }) => (
  <div className="border-t border-gray-200">
    <div className="max-w-[400px] mx-auto px-4 py-3">
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-4 left-[60px] right-[60px] h-0.5 bg-gray-200">
          <div
            className="h-full bg-[#AA418C] transition-all duration-300 ease-in-out"
            style={{ width: currentStep === 1 ? '0%' : '100%' }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center w-28">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                transition-all duration-300 ease-in-out
                ${currentStep >= step.id
                  ? 'bg-[#AA418C] text-white'
                  : 'bg-white border-2 border-gray-300'
                }
              `}>
                <span className="text-sm font-medium">
                  {step.id}
                </span>
              </div>
              <span className={`
                mt-1.5 text-sm font-medium text-center
                ${currentStep >= step.id ? 'text-[#AA418C]' : 'text-gray-500'}
              `}>
                {step.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Business Search Component
const BusinessSearch = ({ searchTerm, setSearchTerm, loading, error }) => (
  <>
    <div className="text-center mb-8">
      <h1 className="text-2xl font-bold text-[#AA418C]">KvK Handelsregister</h1>
      <p className="mt-2 text-gray-600">Zoek een onderneming op naam of KvK-nummer</p>
    </div>

    <div className="mb-6">
      <input
        type="text"
        placeholder="Voer een bedrijfsnaam of KvK-nummer in"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#AA418C] focus:border-transparent"
      />
    </div>

    {loading && (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#AA418C] border-t-transparent"></div>
        <p className="mt-2 text-gray-600">Bedrijven laden...</p>
      </div>
    )}

    {error && (
      <div className="text-center py-8">
        <p className="text-red-600">Er is een fout opgetreden bij het laden van de bedrijven: {error}</p>
      </div>
    )}
  </>
);

// Business Card Component
const BusinessCard = ({ business, isSelected, onSelect }) => (
  <div
    className={`p-6 border rounded-md cursor-pointer transition-colors ${
      isSelected ? 'border-[#AA418C] bg-[#AA418C]/5' : 'border-gray-200 hover:bg-gray-50'
    }`}
    onClick={() => onSelect(business)}
  >
    <h3 className="text-lg font-medium text-[#AA418C] hover:underline mb-2">{business.name}</h3>
    <p className="text-gray-700 mb-4">{business.description}</p>

    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <svg className="w-5 h-5 mt-0.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-sm text-gray-600">
          <span className="font-medium">KVK-nummer:</span> {business.kvkNumber}
        </p>
      </div>

      {business.type && (
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 mt-0.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <p className="text-sm text-gray-600">{business.type}</p>
        </div>
      )}

      {business.vestigingsnummer && (
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 mt-0.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <div className="text-sm text-gray-600">
            <p className="font-medium">Hoofdvestiging</p>
            <p>Vestigingsnummer: {business.vestigingsnummer}</p>
          </div>
        </div>
      )}

      {business.address && (
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 mt-0.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-sm text-gray-600">{business.address}</p>
        </div>
      )}

      {business.tradeName && business.tradeName !== business.name && (
        <div className="flex items-start gap-3 mt-4 pt-4 border-t">
          <svg className="w-5 h-5 mt-0.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-gray-600">
            <p className="font-medium">Handelsnaam:</p>
            <p>{business.tradeName}</p>
          </div>
        </div>
      )}
    </div>
  </div>
);

// Credential Issue Component
const CredentialIssue = ({ credentialOfferUrl, isRequesting, onQRClick, onCopy, onBack }) => (
  <div className="text-center bg-white p-8 rounded-lg shadow-sm relative">
    <button
      onClick={onBack}
      className="absolute left-4 top-4 text-[#AA418C] hover:text-[#AA418C]/80 flex items-center gap-2"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
      </svg>
      Terug
    </button>

    {!credentialOfferUrl && (
      <div>
        <h2 className="text-xl font-bold text-[#AA418C] mb-4">Scan deze QR code met je NL Wallet</h2>
        <div
          className="inline-block p-4 bg-white rounded-lg shadow-md mb-8 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={onQRClick}
        >
          <div className="w-48 h-48 bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
            {isRequesting ? (
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#AA418C] border-t-transparent"></div>
            ) : (
              <QRCode
                value={`${window.location.origin}/api/issue/`}
                level="H"
              />
            )}
          </div>
        </div>
      </div>
    )}

    <p className="text-gray-600 max-w-md mx-auto mt-4">
      Wij kijken in het handelsregister of jij een geautoriseerde gebruiker bent. Als dit zo is wordt het KVK uittreksel naar uw wallet geïssued.
    </p>

    {credentialOfferUrl && (
      <div style={{
        backgroundColor: credentialOfferUrl.type === "success" ? "#f9fafb" : "#fef2f2"
      }} className="mt-4 rounded-md">
        {credentialOfferUrl.type === "success" && (
          <span className='flex flex-row gap-4'>
            <p className="text-sm text-gray-600 break-all py-4 pl-4">{credentialOfferUrl.offer}</p>
            <div onClick={onCopy} className='w-16 flex items-center justify-center hover:bg-gray-100 cursor-pointer rounded-r-md'>
              <Copy className='w-4 h-full' />
            </div>
          </span>
        )}
        {credentialOfferUrl.message && (
          <p className="text-sm text-red-600 break-all h-10 flex items-center justify-center">
            {credentialOfferUrl.message}
          </p>
        )}
      </div>
    )}
  </div>
);

// Main Component
const KVK = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [credentialOfferUrl, setCredentialOfferUrl] = useState(null);
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch('/api/issue/companies');
        if (!response.ok) {
          throw new Error('Failed to fetch companies');
        }
        const data = await response.json();
        setBusinesses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  const handleQRClick = async () => {
    if (!selectedBusiness) return;

    setIsRequesting(true);
    try {
      const response = await fetch('/api/issue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          kvkNumber: selectedBusiness.kvkNumber,
          bsnNumber: '111222333'
        })
      });

      if (!response.ok) {
        setCredentialOfferUrl({ type: "error", message: "Je bent niet bevoegd voor dit bedrijf!" });
        throw new Error('Failed to get credential offer');
      }

      const data = await response.json();
      setCredentialOfferUrl({ type: "success", offer: data.credentialOfferUrl });
    } catch (err) {
      console.error(err);
    } finally {
      setIsRequesting(false);
    }
  };

  const handleCopyToClipboard = async () => {
    if (credentialOfferUrl?.type === "success") {
      try {
        await navigator.clipboard.writeText(credentialOfferUrl.offer);
        toast.success('URL gekopieerd naar klembord', {
          autoClose: 2000,
          closeButton: false
        });
      } catch (err) {
        console.error('Failed to copy text: ', err);
        toast.error('Kon URL niet kopiëren', {
          autoClose: 2000,
          closeButton: false
        });
      }
    }
  };

  const filteredBusinesses = businesses.filter(business =>
    business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    business.kvkNumber.includes(searchTerm)
  );

  const handleContinue = () => {
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
    setSelectedBusiness(null);
    setCredentialOfferUrl(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="h-20 mx-auto px-4 py-4 flex items-center">
          <img
            src="https://www.kvk.nl/logo.svg"
            alt="KVK Logo"
            className="h-6 w-auto"
          />
        </div>
      </div>

      <ProgressSteps steps={steps} currentStep={currentStep} />

      <div className="max-w-3xl mx-auto px-4 py-8">
        {currentStep === 1 && (
          <>
            <BusinessSearch 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              loading={loading}
              error={error}
            />

            {searchTerm && (
              <div className="space-y-3">
                {filteredBusinesses.map((business) => (
                  <BusinessCard
                    key={business.kvkNumber}
                    business={business}
                    isSelected={selectedBusiness?.kvkNumber === business.kvkNumber}
                    onSelect={setSelectedBusiness}
                  />
                ))}
              </div>
            )}

            {selectedBusiness && (
              <button
                onClick={handleContinue}
                className="mt-6 w-full bg-[#AA418C] text-white py-3 px-4 rounded-md hover:bg-[#AA418C]-dark transition-colors"
              >
                Doorgaan
              </button>
            )}
          </>
        )}

        {currentStep === 2 && (
          <CredentialIssue
            credentialOfferUrl={credentialOfferUrl}
            isRequesting={isRequesting}
            onQRClick={handleQRClick}
            onCopy={handleCopyToClipboard}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
};

export default KVK;