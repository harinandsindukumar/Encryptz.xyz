
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { encryptText, decryptText, validateDecryption } from '@/lib/encryption-utils';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'encrypt' | 'decrypt'>('decrypt');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleProcess = () => {
    if (!inputText.trim()) {
      setError('Please enter some text to process');
      return;
    }

    setError('');
    setSuccess('');

    try {
      if (activeTab === 'encrypt') {
        // For demo encryption, we'll use a simple ID
        const result = encryptText(inputText, 'demo-encryption-id');
        setOutputText(result);
        setSuccess('Text encrypted successfully!');
      } else {
        // For demo decryption, we'll validate and decrypt
        if (!validateDecryption(inputText, 'demo-encryption-id')) {
          setError('This text cannot be decrypted with our demo encryption. Try encrypting first or use text encrypted with our service.');
          return;
        }
        
        const result = decryptText(inputText, 'demo-encryption-id');
        setOutputText(result);
        setSuccess('Text decrypted successfully!');
      }
    } catch (err) {
      console.error('Error processing text:', err);
      setError('An error occurred while processing the text. Please try again.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    setSuccess('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-amber-900 font-serif">Encryptz</h1>
          <p className="text-lg md:text-xl text-amber-800 max-w-2xl mx-auto font-light">
            Create your own secret language and share it with friends using a single private link
          </p>
        </div>
        
        <div className="space-y-6 animate-bounce-slow">
          <button
            onClick={() => {
              // Redirect to Google auth
              window.location.href = '/dashboard';
            }}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-4 px-10 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl"
          >
            Create Your Secret Language
          </button>
          
          <p className="text-amber-700 text-sm font-medium">
            No login required • Just for curiosity and privacy
          </p>
        </div>
        
        {/* Features Section */}
        <div className="mt-16 animate-fade-in">
          <h2 className="text-2xl font-bold text-amber-900 mb-12 font-serif">How Encryptz Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl shadow-lg border border-amber-100 card-hover">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-amber-900 mb-3 font-serif">Private</h3>
              <p className="text-amber-800">Each language is completely isolated and owned by you</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl shadow-lg border border-amber-100 card-hover">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-amber-900 mb-3 font-serif">Social</h3>
              <p className="text-amber-800">Share your language with friends using unique links</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl shadow-lg border border-amber-100 card-hover">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-amber-900 mb-3 font-serif">Simple</h3>
              <p className="text-amber-800">No keys to manage • No complex setup</p>
            </div>
          </div>
        </div>
        
        {/* Try Out Section - Non-modal */}
        <div className="mt-16 bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl shadow-lg max-w-3xl mx-auto border border-amber-200">
          <h2 className="text-2xl font-bold text-amber-900 mb-6 text-center font-serif">Try It Out</h2>
          
          <div className="space-y-6">
            <div className="flex border-b border-amber-200">
              <button
                className={`py-2 px-4 font-medium text-sm ${activeTab === 'encrypt' ? 'text-amber-700 border-b-2 border-amber-600' : 'text-amber-600 hover:text-amber-800'}`}
                onClick={() => {
                  setActiveTab('encrypt');
                  setInputText('');
                  setOutputText('');
                  setError('');
                  setSuccess('');
                }}
              >
                Encrypt
              </button>
              <button
                className={`py-2 px-4 font-medium text-sm ${activeTab === 'decrypt' ? 'text-amber-700 border-b-2 border-amber-600' : 'text-amber-600 hover:text-amber-800'}`}
                onClick={() => {
                  setActiveTab('decrypt');
                  setInputText('');
                  setOutputText('');
                  setError('');
                  setSuccess('');
                }}
              >
                Decrypt
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-amber-800 mb-2 font-medium">
                {activeTab === 'encrypt' ? 'Plain Text' : 'Encrypted Text'}
              </label>
              <textarea 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 min-h-[120px] bg-white"
                placeholder={activeTab === 'encrypt' ? 'Enter text to encrypt...' : 'Paste your encrypted text here...'}
              />
            </div>
            
            <div className="flex justify-center">
              <button 
                onClick={handleProcess}
                className="btn-primary text-white font-medium py-2 px-6 rounded-lg transition"
              >
                {activeTab === 'encrypt' ? 'Encrypt Text' : 'Decrypt Text'}
              </button>
            </div>
            
            {outputText && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-amber-800 font-medium">
                    {activeTab === 'encrypt' ? 'Encrypted Result' : 'Decrypted Result'}
                  </label>
                  <button
                    onClick={copyToClipboard}
                    className="text-sm bg-amber-200 hover:bg-amber-300 text-amber-900 py-1 px-3 rounded transition"
                  >
                    Copy
                  </button>
                </div>
                <textarea 
                  value={outputText}
                  readOnly
                  className="w-full p-3 border border-amber-300 rounded-lg bg-amber-100 min-h-[120px]"
                />
              </div>
            )}
            
            {(error || success) && (
              <div className={`p-3 rounded-lg ${error ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-green-100 text-green-800 border border-green-200'}`}>
                {error || success}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-amber-200">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-amber-900 font-serif">Try It Out</h2>
                <button 
                  onClick={() => {
                    setIsModalOpen(false);
                    setActiveTab('decrypt');
                    setInputText('');
                    setOutputText('');
                    setError('');
                    setSuccess('');
                  }}
                  className="text-amber-600 hover:text-amber-800 text-2xl"
                >
                  &times;
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex border-b border-amber-200">
                  <button
                    className={`py-2 px-4 font-medium text-sm ${activeTab === 'encrypt' ? 'text-amber-700 border-b-2 border-amber-600' : 'text-amber-600 hover:text-amber-800'}`}
                    onClick={() => {
                      setActiveTab('encrypt');
                      setInputText('');
                      setOutputText('');
                      setError('');
                      setSuccess('');
                    }}
                  >
                    Encrypt
                  </button>
                  <button
                    className={`py-2 px-4 font-medium text-sm ${activeTab === 'decrypt' ? 'text-amber-700 border-b-2 border-amber-600' : 'text-amber-600 hover:text-amber-800'}`}
                    onClick={() => {
                      setActiveTab('decrypt');
                      setInputText('');
                      setOutputText('');
                      setError('');
                      setSuccess('');
                    }}
                  >
                    Decrypt
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-1">
                    {activeTab === 'encrypt' ? 'Plain Text' : 'Encrypted Text'}
                  </label>
                  <textarea 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 min-h-[120px] bg-white bg-opacity-50"
                    placeholder={activeTab === 'encrypt' ? 'Enter text to encrypt...' : 'Paste your encrypted text here...'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-1">
                    {activeTab === 'encrypt' ? 'Encrypted Result' : 'Decrypted Result'}
                  </label>
                  <textarea 
                    value={outputText}
                    readOnly
                    className="w-full p-3 border border-amber-300 rounded-lg bg-amber-100 min-h-[120px]"
                    placeholder={activeTab === 'encrypt' ? 'Encrypted text will appear here...' : 'Decrypted text will appear here...'}
                  />
                </div>
                
                <div className="flex space-x-3 pt-2">
                  <button 
                    onClick={handleProcess}
                    className="flex-1 btn-primary text-white py-2 px-4 rounded-lg transition"
                  >
                    {activeTab === 'encrypt' ? 'Encrypt' : 'Decrypt'}
                  </button>
                  <button 
                    onClick={() => {
                      setIsModalOpen(false);
                      setActiveTab('decrypt');
                      setInputText('');
                      setOutputText('');
                      setError('');
                      setSuccess('');
                    }}
                    className="flex-1 bg-amber-200 text-amber-900 py-2 px-4 rounded-lg hover:bg-amber-300 transition"
                  >
                    Cancel
                  </button>
                </div>
                
                {(error || success) && (
                  <div className={`p-3 rounded-lg ${error ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-green-100 text-green-800 border border-green-200'}`}>
                    {error || success}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}