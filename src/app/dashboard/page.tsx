"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
// We'll update this to use API routes directly

export default function Dashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [newEncryptionName, setNewEncryptionName] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleCreateEncryption = async () => {
    if (!newEncryptionName.trim()) {
      setError('Please enter a name for your encryption');
      return;
    }

    if (!user) {
      setError('You must be logged in to create an encryption');
      return;
    }

    setCreating(true);
    setError('');

    try {
      const response = await fetch('/api/encryptions/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newEncryptionName.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create encryption');
      }

      const { encryption } = await response.json();
      
      // Navigate to the new encryption page
      router.push(`/encrypt/${encryption.id}`);
    } catch (err: any) {
      console.error('Error creating encryption:', err);
      setError(err.message || 'Failed to create encryption. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
          <p className="mt-4 text-amber-700">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-md border border-amber-200">
          <h2 className="text-xl font-semibold text-amber-900 font-serif mb-4">Access Denied</h2>
          <p className="text-amber-700 mb-6">Please sign in to access your dashboard</p>
          <button 
            onClick={() => router.push('/')}
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
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-sm p-6 mb-8 border border-amber-100">
          <h1 className="text-2xl font-bold text-amber-900 mb-2 font-serif">Your Encrypted Languages</h1>
          <p className="text-amber-800">
            Create and manage your private encrypted languages
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create New Encryption Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-sm p-6 border border-amber-200">
            <h2 className="text-xl font-semibold text-amber-900 mb-4 font-serif">Create New Encryption</h2>
            <p className="text-amber-800 mb-4">
              Create your own private encrypted language. Each language is completely isolated and owned by you.
            </p>
            
            {isCreating ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={newEncryptionName}
                  onChange={(e) => setNewEncryptionName(e.target.value)}
                  placeholder="Enter encryption name..."
                  className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                  disabled={creating}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex space-x-3">
                  <button
                    onClick={handleCreateEncryption}
                    disabled={creating}
                    className="flex-1 btn-primary text-white py-2 px-4 rounded-lg transition disabled:opacity-50"
                  >
                    {creating ? 'Creating...' : 'Create'}
                  </button>
                  <button
                    onClick={() => {
                      setIsCreating(false);
                      setNewEncryptionName('');
                      setError('');
                    }}
                    className="flex-1 bg-amber-200 text-amber-900 py-2 px-4 rounded-lg hover:bg-amber-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsCreating(true)}
                className="w-full btn-primary text-white py-3 px-4 rounded-lg transition flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Create New Encryption
              </button>
            )}
          </div>

          {/* Existing Encryptions List */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-sm p-6 border border-amber-200">
              <h2 className="text-xl font-semibold text-amber-900 mb-4 font-serif">Your Languages</h2>
              <EncryptionList userId={user?.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component to display the list of existing encryptions
function EncryptionList({ userId }: { userId: string | undefined }) {
  const [encryptions, setEncryptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load encryptions for the current user
  useEffect(() => {
    if (!userId) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }
    
    const fetchEncryptions = async () => {
      try {
        const response = await fetch('/api/encryptions');
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to load encryptions');
        }
        
        const { encryptions } = await response.json();
        setEncryptions(encryptions || []);
      } catch (err: any) {
        console.error('Error fetching encryptions:', err);
        setError('Failed to load your encryptions');
      } finally {
        setLoading(false);
      }
    };

    fetchEncryptions();
  }, [userId]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this encryption? This will permanently remove it and disable any shared links.')) {
      return;
    }

    try {
      const response = await fetch(`/api/encryptions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete encryption');
      }
      
      // Remove from local state
      setEncryptions(encryptions.filter(enc => enc.id !== id));
    } catch (err: any) {
      console.error('Error deleting encryption:', err);
      alert(err.message || 'Failed to delete encryption. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center py-4 font-medium">{error}</div>;
  }

  if (encryptions.length === 0) {
    return (
      <div className="text-center py-8 text-amber-700">
        <p>You haven't created any encrypted languages yet.</p>
        <p className="mt-2">Click "Create New Encryption" to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {encryptions.map((encryption) => (
        <div 
          key={encryption.id} 
          className="flex items-center justify-between p-4 border border-amber-200 rounded-lg hover:bg-amber-50 transition"
        >
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-amber-900 truncate font-serif">{encryption.name}</h3>
            <p className="text-sm text-amber-700">
              Created: {new Date(encryption.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => window.location.href = `/encrypt/${encryption.id}`}
              className="btn-primary text-white py-2 px-4 rounded-lg transition text-sm"
            >
              Open
            </button>
            <button
              onClick={() => {
                // Copy share link to clipboard
                navigator.clipboard.writeText(`${window.location.origin}/share/${encryption.id}`);
                alert('Share link copied to clipboard!');
              }}
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition text-sm"
            >
              Share
            </button>
            <button
              onClick={() => handleDelete(encryption.id)}
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition text-sm font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}