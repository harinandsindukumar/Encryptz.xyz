'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
// We'll update this to use API routes directly
import { encryptText, decryptText, validateDecryption } from '@/lib/encryption-utils';

export default function EncryptPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();
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
          
          // Check if the user owns this encryption (if logged in)
          if (user && data.encryption.user_id !== user.id) {
            router.push('/dashboard');
            return;
          }
          
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
  }, [id, user, router]);

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
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading encryption...</p>
        </div>
      </div>
    );
  }

  if (error && !encryption) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
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
              Private Language
            </span>
          </div>
          <p className="text-amber-800 mt-2">
            Use this private language to encrypt and decrypt messages
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-sm p-6 border border-amber-100">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
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
            <h3 className="font-medium text-amber-800 mb-2 font-serif">About this encryption</h3>
            <p className="text-amber-700 text-sm">
              This is your private encrypted language. Messages encrypted here can only be decrypted with this same language.
              Sharing your language with others allows them to communicate with you using this private language.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}