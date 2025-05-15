import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import QRCode from 'react-qr-code';

export default function BankLogin() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('personal');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberUsername, setRememberUsername] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [sessionData, setSessionData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  const handleNLWalletClick = () => {
    setShowQRCode(true);
  };

  const handleQRCodeClick = () => {
    router.push('/demo/verify/bank/dashboard');
  };

  // Generate session when QR code is shown
  useEffect(() => {
    if (showQRCode) {
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
    }
  }, [showQRCode]);

  // Poll for session data
  useEffect(() => {
    if (!sessionId) return;

    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/qr/session/${sessionId}`);
        const data = await response.json();

        if (data && data.data) {
          setSessionData(data.data);
          clearInterval(pollInterval);
          // Redirect to dashboard when session data is received
          router.push('/demo/verify/bank/dashboard');
        }
      } catch (error) {
        console.error('Error polling session:', error);
      }
    }, 2000); // Poll every 2 seconds

    return () => clearInterval(pollInterval);
  }, [sessionId, router]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Head>
        <title>Inloggen - GlobalBank Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
        <div className="h-8">
          <img src="/assets/logo-white.svg" alt="GlobalBank Logo" className="h-full" />
        </div>
        <div className="space-x-2">
          <button className="px-2 py-1 text-gray-600 hover:text-[#ff6200]">NL</button>
          <button className="px-2 py-1 text-gray-600 hover:text-[#ff6200]">EN</button>
        </div>
      </header>

      <main className="flex-1 flex justify-center items-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              {!showQRCode ? (
                <>
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Welkom bij GlobalBank</h1>
                    <p className="text-gray-600">Kies uw inlogmethode</p>
                  </div>

                  <div className="space-y-6">
                    {/* NL Wallet Login Button - Prominent */}
                    <button
                      type="button"
                      onClick={handleNLWalletClick}
                      className="w-full flex items-center justify-center gap-3 bg-[#383EDE] text-white py-4 rounded-xl hover:bg-[#2f33c0] transition-colors shadow-md"
                    >
                      <img src="/assets/logo-white.svg" className="h-6" alt="NL Wallet" />
                      <span className="font-medium">Login met NL Business Wallet</span>
                    </button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">of ga verder met</span>
                      </div>
                    </div>

                    {/* Traditional Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                          Gebruikersnaam
                        </label>
                        <input
                          type="text"
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6200] focus:border-transparent"
                          placeholder="Voer uw gebruikersnaam in"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                          Wachtwoord
                        </label>
                        <input
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6200] focus:border-transparent"
                          placeholder="Voer uw wachtwoord in"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="remember"
                            checked={rememberUsername}
                            onChange={(e) => setRememberUsername(e.target.checked)}
                            className="w-4 h-4 accent-[#ff6200] rounded"
                          />
                          <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                            Onthoud mijn gebruikersnaam
                          </label>
                        </div>
                        <a href="#" className="text-sm text-[#ff6200] hover:underline">
                          Wachtwoord vergeten?
                        </a>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#ff6200] text-white py-4 rounded-xl hover:bg-[#e65800] transition-colors shadow-md"
                      >
                        Inloggen
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">Scan QR Code</h2>
                  <p className="text-gray-600">Gebruik uw NL Wallet app om deze QR code te scannen</p>

                  {/* QR Code Placeholder - Clickable */}
                  <div 
                    onClick={handleQRCodeClick}
                    className="mx-auto w-64 h-64 bg-gray-100 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                  >
                    {sessionId && (
                      <QRCode
                        value={
                          JSON.stringify({ 
                            "pn": "GlobalBank", 
                            "ep": `${window.location.origin}/api/qr/session/${sessionId}`, 
                            "r": "Inloggen", 
                            "ra": [
                              { 
                                "n": "Persoonsgegevens", 
                                "a": ["Voornaam", "Achternaam", "Geboortedatum", "BSN Nummer"], 
                                "i": "https://businesswallets.eu/ro.png" 
                              },
                              { 
                                "n": "KVK Uitreksel", 
                                "a": ["KVK Nummer"], 
                                "i": "https://businesswallets.eu/kvk.jpg" 
                              }
                            ], 
                            "pi": "https://businesswallets.eu/logo.png" 
                          })
                        }
                        level="L"
                        style={{ width: '225px', height: '225px' }}
                      />
                    )}
                  </div>

                  <button
                    onClick={() => setShowQRCode(false)}
                    className="text-[#ff6200] hover:text-[#e65800] transition-colors"
                  >
                    Terug naar inloggen
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
