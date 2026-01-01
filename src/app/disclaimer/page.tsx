export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Disclaimer</h1>
          
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4"><strong>Last updated:</strong> January 1, 2026</p>
            
            <p className="mb-4">
              This disclaimer provides important information about the Encryptz service and sets expectations 
              for users regarding the nature and limitations of our encryption service.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Purpose of Service</h2>
            <p className="mb-4">
              Encryptz is designed for casual privacy and creating personal encrypted languages for 
              communication with friends and trusted contacts. It is not intended for securing highly 
              sensitive, confidential, or legally protected information.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Encryption Security</h2>
            <p className="mb-4">
              The encryption methods used in this service are designed for privacy among trusted parties, 
              not for professional security applications. The encryption is not intended to withstand 
              attacks from sophisticated adversaries or for compliance with security standards.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">No Warranty</h2>
            <p className="mb-4">
              This service is provided "as is" without any warranty of any kind, express or implied. 
              We make no representations or warranties regarding the reliability, accuracy, or security 
              of the encryption methods beyond what is explicitly stated.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Limitation of Liability</h2>
            <p className="mb-4">
              Encryptz and its operators shall not be liable for any damages, losses, or consequences 
              arising from the use or inability to use this service, including but not limited to loss 
              of data, privacy breaches, or other incidents.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Appropriate Use</h2>
            <p className="mb-4">
              Users are expected to use this service responsibly and in compliance with applicable laws. 
              The service should not be used for illegal activities or to circumvent legal obligations.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Data Handling</h2>
            <p className="mb-4">
              While we implement security measures to protect user data, users acknowledge that no system 
              is completely secure. Users should consider the sensitivity of information before using 
              our encryption service.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Third-Party Services</h2>
            <p className="mb-4">
              We use Google authentication and Supabase for our service. These third-party services 
              have their own privacy policies and terms of service that apply to their handling of data.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Changes to Service</h2>
            <p className="mb-4">
              We reserve the right to modify, suspend, or discontinue any aspect of the service at any 
              time without notice. Users are responsible for regularly backing up any important data.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Educational Purpose</h2>
            <p className="mb-4">
              This service is primarily intended for educational and personal use. It demonstrates 
              encryption concepts but should not be considered a professional-grade security solution.
            </p>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                By using Encryptz, you acknowledge that you have read and understood this disclaimer 
                and agree to use the service according to these terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}