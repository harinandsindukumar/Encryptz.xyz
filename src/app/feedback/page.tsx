'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FeedbackPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState<'feedback' | 'report'>('feedback');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Basic validation
    if (!name || !email || !subject || !message) {
      setError('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Send the feedback to the API
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          type: feedbackType,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit feedback');
      }

      setSubmitSuccess(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      
      // Redirect after 3 seconds
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (err: any) {
      setError('Failed to submit your feedback. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-sm p-8 border border-amber-100">
          <h1 className="text-3xl font-bold text-amber-900 font-serif mb-2">
            {feedbackType === 'feedback' ? 'Send Feedback' : 'Report a Problem'}
          </h1>
          <p className="text-amber-800 mb-8">
            {feedbackType === 'feedback' 
              ? 'We value your feedback! Share your thoughts, suggestions, or ideas to help us improve Encryptz.' 
              : 'Report any issues or problems you are experiencing with our service.'}
          </p>

          {submitSuccess ? (
            <div className="bg-green-100 border border-green-200 rounded-lg p-6 text-center">
              <h3 className="text-xl font-medium text-green-800 mb-2 font-serif">Thank You!</h3>
              <p className="text-green-700 mb-4">
                Your {feedbackType} has been submitted successfully. We appreciate your input!
              </p>
              <p className="text-green-700">
                Redirecting to home page...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex space-x-4">
                <button
                  type="button"
                  className={`flex-1 py-3 px-4 rounded-lg border transition ${
                    feedbackType === 'feedback'
                      ? 'border-amber-500 bg-amber-50 text-amber-700'
                      : 'border-amber-300 text-amber-700 hover:bg-amber-50'
                  }`}
                  onClick={() => setFeedbackType('feedback')}
                >
                  Send Feedback
                </button>
                <button
                  type="button"
                  className={`flex-1 py-3 px-4 rounded-lg border transition ${
                    feedbackType === 'report'
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-amber-300 text-amber-700 hover:bg-amber-50'
                  }`}
                  onClick={() => setFeedbackType('report')}
                >
                  Report Problem
                </button>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-amber-800 mb-1 font-medium">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-amber-800 mb-1 font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-amber-800 mb-1 font-medium">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                  placeholder={`Subject for your ${feedbackType}`}
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-amber-800 mb-1 font-medium">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                  placeholder={`Please describe your ${feedbackType} in detail...`}
                  required
                ></textarea>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-200 text-red-700 p-4 rounded-lg">
                  {error}
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full btn-primary text-white py-3 px-4 rounded-lg transition font-medium ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : `Submit ${feedbackType === 'feedback' ? 'Feedback' : 'Report'}`}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-amber-700">
          <p>
            For immediate assistance, you can also contact us at{' '}
            <a 
              href="mailto:harinand.dev@gmail.com" 
              className="text-amber-700 hover:text-amber-900 underline"
            >
              harinand.dev@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}