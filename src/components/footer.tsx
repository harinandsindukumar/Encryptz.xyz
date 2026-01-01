export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-amber-50 to-orange-50 border-t border-amber-200 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-amber-800 font-serif">Encryptz</h2>
            <p className="text-amber-700 text-sm mt-1">
              Create your own secret language and share it with friends
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <div>
              <h3 className="text-sm font-semibold text-amber-800 uppercase tracking-wider">Legal</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="/privacy" className="text-sm text-amber-700 hover:text-amber-900">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-sm text-amber-700 hover:text-amber-900">
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a href="/disclaimer" className="text-sm text-amber-700 hover:text-amber-900">
                    Disclaimer
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-amber-800 uppercase tracking-wider">Support</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="/feedback" className="text-sm text-amber-700 hover:text-amber-900">
                    Send Feedback
                  </a>
                </li>
                <li>
                  <a href="/feedback" className="text-sm text-amber-700 hover:text-amber-900">
                    Report a Problem
                  </a>
                </li>
                <li>
                  <a href="mailto:harinand.dev@gmail.com" className="text-sm text-amber-700 hover:text-amber-900">
                    Contact: Harinand Simdukumar
                  </a>
                </li>
                <li>
                  <a href="https://github.com/harinandsindukumar/" className="text-sm text-amber-700 hover:text-amber-900">
                    GitHub Profile
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-amber-200 text-center">
          <p className="text-amber-700 text-sm">
            &copy; {new Date().getFullYear()} Encryptz. All rights reserved. This service is for educational and personal use only.
          </p>
        </div>
      </div>
    </footer>
  );
}