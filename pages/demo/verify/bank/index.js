import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function BankLogin() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('personal');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberUsername, setRememberUsername] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  const handleNLWalletClick = () => {
    setShowQRCode(true);
  };

  const handleQRCodeClick = () => {
    // Redirect to hypothetical banking dashboard
    router.push('/demo/verify/bank/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Head>
        <title>Login - ING Bank Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
        <div className="h-8">
          <img src="/assets/logo-white.svg" alt="ING Logo" className="h-full" />
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
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to ING</h1>
                    <p className="text-gray-600">Choose your preferred login method</p>
                  </div>

                  <div className="space-y-6">
                    {/* NL Wallet Login Button - Prominent */}
                    <button
                      type="button"
                      onClick={handleNLWalletClick}
                      className="w-full flex items-center justify-center gap-3 bg-[#383EDE] text-white py-4 rounded-xl hover:bg-[#2f33c0] transition-colors shadow-md"
                    >
                      <img src="/assets/logo-white.svg" className="h-6" alt="NL Wallet" />
                      <span className="font-medium">Login with NL Wallet</span>
                    </button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">or continue with</span>
                      </div>
                    </div>

                    {/* Traditional Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                          Username
                        </label>
                        <input
                          type="text"
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6200] focus:border-transparent"
                          placeholder="Enter your username"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6200] focus:border-transparent"
                          placeholder="Enter your password"
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
                            Remember me
                          </label>
                        </div>
                        <a href="#" className="text-sm text-[#ff6200] hover:underline">
                          Forgot password?
                        </a>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#ff6200] text-white py-4 rounded-xl hover:bg-[#e65800] transition-colors shadow-md"
                      >
                        Sign in
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="text-center space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">Scan QR Code</h2>
                  <p className="text-gray-600">Use your NL Wallet app to scan this QR code</p>
                  
                  {/* QR Code Placeholder - Clickable */}
                  <div 
                    onClick={handleQRCodeClick}
                    className="mx-auto w-64 h-64 bg-gray-100 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2">📱</div>
                      <p className="text-sm text-gray-500">Click to simulate scan</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowQRCode(false)}
                    className="text-[#ff6200] hover:text-[#e65800] transition-colors"
                  >
                    Back to login
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
