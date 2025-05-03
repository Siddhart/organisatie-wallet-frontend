import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { useRouter } from 'next/router';

const DocumentSigningDemo = () => {
  const router = useRouter();
  const [sessionId, setSessionId] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  const [isScanned, setIsScanned] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pollInterval, setPollInterval] = useState(null);

  // Generate session when component mounts
  useEffect(() => {
    const generateSession = async () => {
      try {
        const response = await fetch('/api/qr/generate');
        const data = await response.json();
        setSessionId(data.sessionId);
      } catch (error) {
        console.error('Error generating session:', error);
      }
    };
    generateSession();
  }, []);

  // Handle QR code click
  const handleQRCodeClick = () => {
    if (pollInterval) {
      clearInterval(pollInterval);
      setPollInterval(null);
    }
    setIsScanned(true);
  };

  // Poll for session data
  useEffect(() => {
    if (!sessionId) return;

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/qr/session/${sessionId}`);
        const data = await response.json();

        if (data && data.data) {
          setSessionData(data.data);
          setIsScanned(true);
          clearInterval(interval);
          setPollInterval(null);
        }
      } catch (error) {
        console.error('Error polling session:', error);
      }
    }, 2000); // Poll every 2 seconds

    setPollInterval(interval);
    return () => {
      clearInterval(interval);
      setPollInterval(null);
    };
  }, [sessionId]);

  const handleContinue = () => {
    if (isScanned) {
      setShowSuccess(true);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Document */}
          <div className="lg:w-1/2">
            <div className="h-[calc(100vh-4rem)] overflow-y-auto">
              <div className="bg-white shadow-xl rounded-xl mx-auto h-full flex-1">
                <iframe
                  src={isScanned ? "/documents/contract_filled.pdf#toolbar=0&navpanes=0" : "/documents/contract_unfilled.pdf#toolbar=0&navpanes=0"}
                  className="w-full h-full min-h-[calc(100vh-8rem)] rounded-xl"
                  type="application/pdf"
                />
              </div>
            </div>
          </div>

          {/* Right side - Required Information */}
          <div className="lg:w-1/2 space-y-8">
            {!showSuccess ? (
              <>
                <div className="bg-white rounded-xl shadow-xl p-8 border border-sky-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Ontvangen Informatie</h2>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-sky-50 to-blue-50 p-6 rounded-xl border border-sky-100">
                      <h3 className="font-semibold text-gray-900 mb-2">Bedrijfsgegevens</h3>
                      <p className="text-sm text-gray-600">De volgende gegevens zijn ontvangen uit uw KVK Uitreksel:</p>
                      <ul className="mt-4 space-y-3 text-sm text-gray-600">
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                          Bedrijfsnaam: {isScanned ? (
                            <span className="font-medium ml-1 text-gray-900">ACME B.V.</span>
                          ) : (
                            <span className="text-gray-400 ml-1">Nog niet ontvangen</span>
                          )}
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                          Bedrijfsadres: {isScanned ? (
                            <span className="font-medium ml-1 text-gray-900">Spui 123, 2511 BN te Den Haag</span>
                          ) : (
                            <span className="text-gray-400 ml-1">Nog niet ontvangen</span>
                          )}
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                          KVK Nummer: {isScanned ? (
                            <span className="font-medium ml-1 text-gray-900">87654321</span>
                          ) : (
                            <span className="text-gray-400 ml-1">Nog niet ontvangen</span>
                          )}
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                          IBAN: {isScanned ? (
                            <span className="font-medium ml-1 text-gray-900">NL009998887B01</span>
                          ) : (
                            <span className="text-gray-400 ml-1">Nog niet ontvangen</span>
                          )}
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                          Email: {isScanned ? (
                            <span className="font-medium ml-1 text-gray-900">info@acme.nl</span>
                          ) : (
                            <span className="text-gray-400 ml-1">Nog niet ontvangen</span>
                          )}
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                          Telefoonnummer: {isScanned ? (
                            <span className="font-medium ml-1 text-gray-900">+31 70 123 4567</span>
                          ) : (
                            <span className="text-gray-400 ml-1">Nog niet ontvangen</span>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* QR Code Section - Only show when not scanned */}
                {!isScanned && (
                  <div className="bg-white rounded-xl shadow-xl p-8 border border-sky-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Scan QR Code met uw Business Wallet</h2>
                    <div className="flex flex-col items-center space-y-4">
                      <div 
                        className="p-6 bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl cursor-pointer hover:shadow-lg transition-all duration-300 border border-sky-100"
                        onClick={handleQRCodeClick}
                      >
                        {sessionId && (
                          <QRCode
                            value={JSON.stringify({
                              "pn": "Document Signing",
                              "ep": `${window.location.origin}/api/qr/session/${sessionId}`,
                              "r": "Document Ondertekenen",
                              "ra": [
                                {
                                  "n": "KVK Uitreksel",
                                  "a": ["Bedrijfsnaam", "Bedrijfsadres", "KVK Nummer", "IBAN", "Email", "Telefoonnummer"],
                                  "i": "https://businesswallet.eu/kvk.jpg"
                                }
                              ],
                              "pi": "https://businesswallet.eu/logo.png"
                            })}
                            level="H"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Continue Button */}
                <button
                  onClick={handleContinue}
                  disabled={!isScanned}
                  className={`w-full py-4 px-6 rounded-xl text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 ${
                    isScanned
                      ? 'bg-gradient-to-r from-sky-500 to-blue-500 text-white hover:from-sky-600 hover:to-blue-600'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isScanned ? 'Doorgaan' : 'Wachten op gegevens...'}
                </button>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-xl p-8 border border-sky-100">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center border border-green-200">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Succesvol Verstuurd!</h2>
                  <p className="text-gray-600">
                    Uw contract is succesvol verzonden. U ontvangt het ondertekende contract per e-mail op <span className="font-bold text-gray-900">info@acme.nl</span> zodra het is goedgekeurd.
                  </p>
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="mt-4 text-sky-600 hover:text-sky-700 transition-colors font-medium"
                  >
                    Terug naar contract
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentSigningDemo;