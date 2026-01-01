export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4"><strong>Last updated:</strong> January 1, 2026</p>
            
            <p className="mb-4">
              Welcome to Encryptz! This Privacy Policy explains how we collect, use, and protect your information 
              when you use our encrypted language creation service.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Information We Collect</h2>
            <p className="mb-4">
              We collect minimal information necessary to provide our service:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Account information from Google authentication (email, name, profile picture)</li>
              <li>Encrypted language data you create through our service</li>
              <li>Basic usage analytics to improve our service</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">How We Use Your Information</h2>
            <p className="mb-4">
              We use your information solely to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide and maintain our encrypted language service</li>
              <li>Allow you to create, access, and manage your private languages</li>
              <li>Enable sharing functionality with others using unique links</li>
              <li>Improve and optimize our service</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Data Protection</h2>
            <p className="mb-4">
              Your privacy is paramount to us. We implement appropriate security measures to protect your information:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>All encrypted language data is stored securely with access controls</li>
              <li>We do not access or read your encrypted messages</li>
              <li>Data is encrypted using secure methods during transmission</li>
              <li>We follow industry-standard security practices</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Data Sharing</h2>
            <p className="mb-4">
              We do not sell, trade, or rent your personal identification information to others. 
              We may share your information under the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and property</li>
              <li>With service providers who assist us in operating our service</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Your Rights</h2>
            <p className="mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access your personal information we hold</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your account and associated data</li>
              <li>Object to processing of your personal information</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Cookies and Tracking</h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to enhance your experience on our service. 
              These help us remember your preferences and analyze service usage.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Third-Party Services</h2>
            <p className="mb-4">
              We use Google authentication for login purposes. Google's privacy policy applies to 
              their services. We encourage you to review their privacy policy.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Changes to This Policy</h2>
            <p className="mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page. You are advised to review this Privacy 
              Policy periodically for any changes.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at: 
              privacy@encryptz.xyz
            </p>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                This service is provided "as is", for personal and educational use. 
                It is not intended for securing highly sensitive information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}