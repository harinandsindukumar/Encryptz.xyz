'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
// We'll update this to use API routes directly
import { encryptText, decryptText, validateDecryption } from '@/lib/encryption-utils';

export default function SharePage() {
  const { id } = useParams();
  const [encryption, setEncryption] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchEncryption = async () => {
      try {
        if (typeof id === 'string') {
          const response = await fetch(`/api/encryptions/${id}`);
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to load encryption');
          }
          
          const data = await response.json();
          setEncryption(data.encryption);
        }
      } catch (err: any) {
        console.error('Error fetching encryption:', err);
        setError('Encryption not found or you do not have access to it');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEncryption();
    }
  }, [id]);

  const handleProcess = () => {
    if (!inputText.trim()) {
      setError('Please enter some text to process');
      return;
    }

    setError('');
    setSuccess('');

    try {
      if (activeTab === 'encrypt') {
        const result = encryptText(inputText, id as string);
        setOutputText(result);
        setSuccess('Text encrypted successfully!');
      } else {
        // Validate that the text can be decrypted with this encryption
        if (!validateDecryption(inputText, id as string)) {
          setError('This text cannot be decrypted with this encryption. Make sure you\'re using the correct encryption language.');
          return;
        }
        
        const result = decryptText(inputText, id as string);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
          <p className="mt-4 text-amber-700">Loading encryption...</p>
        </div>
      </div>
    );
  }

  if (error && !encryption) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-md border border-amber-200">
          <h2 className="text-xl font-semibold text-amber-900 font-serif mb-4">Error</h2>
          <p className="text-amber-700 mb-6">{error}</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="btn-primary text-white py-2 px-4 rounded-lg transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-sm p-6 mb-8 border border-amber-100">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-amber-900 font-serif">{encryption?.name}</h1>
            <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Shared Language
            </span>
          </div>
          <p className="text-amber-800 mt-2">
            Use this shared language to encrypt and decrypt messages
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-sm p-6 border border-amber-100">
          {/* Tabs */}
          <div className="flex border-b border-amber-200 mb-6">
            <button
              className={`py-2 px-4 font-medium text-sm ${activeTab === 'encrypt' ? 'text-amber-700 border-b-2 border-amber-600' : 'text-amber-600 hover:text-amber-800'}`}
              onClick={() => setActiveTab('encrypt')}
            >
              Encrypt
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${activeTab === 'decrypt' ? 'text-amber-700 border-b-2 border-amber-600' : 'text-amber-600 hover:text-amber-800'}`}
              onClick={() => setActiveTab('decrypt')}
            >
              Decrypt
            </button>
          </div>

          {/* Input Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-amber-800 mb-2 font-medium">
              {activeTab === 'encrypt' ? 'Plain Text' : 'Encrypted Text'}
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={activeTab === 'encrypt' ? 'Enter text to encrypt...' : 'Enter text to decrypt...'}
              className="w-full p-4 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 min-h-[150px] bg-white"
            />
          </div>

          {/* Action Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={handleProcess}
              className="btn-primary text-white font-medium py-3 px-8 rounded-lg shadow transition"
            >
              {activeTab === 'encrypt' ? 'Encrypt Text' : 'Decrypt Text'}
            </button>
          </div>

          {/* Output Section */}
          {outputText && (
            <div className="mb-6">
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
                className="w-full p-4 border border-amber-300 rounded-lg bg-amber-50 min-h-[150px]"
              />
            </div>
          )}

          {/* Messages */}
          {(error || success) && (
            <div className={`p-4 rounded-lg mb-6 ${error ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-green-100 text-green-800 border border-green-200'}`}>
              {error || success}
            </div>
          )}

          {/* Info */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="font-medium text-amber-800 mb-2 font-serif">About this shared language</h3>
            <p className="text-amber-700 text-sm">
              You are using a shared encrypted language. This language was created by someone else and shared with you.
              You can use this language to communicate with others who have access to this link.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}