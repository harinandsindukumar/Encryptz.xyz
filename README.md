# Encryptz

Encryptz is a web app where users create their own private encrypted language and share it with friends using a single unique link.

## Features

- Create private encrypted languages
- Encrypt and decrypt text within your languages
- Share languages with friends using unique links
- Google authentication for secure access
- Each language is completely isolated and owned by you
- No login required for shared language access

## Tech Stack

- Next.js 14 (App Router)
- Supabase (Authentication & Database)
- Tailwind CSS (Styling)
- TypeScript

## About the Creator

This project was developed by Harinand Simdukumar. Connect with me:

- Email: [harinand.dev@gmail.com](mailto:harinand.dev@gmail.com)
- GitHub: [https://github.com/harinandsindukumar/](https://github.com/harinandsindukumar/)

I'm passionate about leveraging technology and open-source principles to build accessible tools in education and digital expression.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## How It Works

1. **Landing Page**: Simple page with a "Decrypt Your Text" button
2. **Authentication**: Google login to create and manage languages
3. **Dashboard**: Create and manage your encrypted languages
4. **Encryption Pages**: Individual pages for each language with encrypt/decrypt tabs
5. **Sharing**: Unique links to share languages with friends

## Encryption Method

Each language uses a substitution cipher with a unique mapping based on the language ID. The encryption is deterministic for each language, ensuring that the same input always produces the same output within the same language.

## Security

- Each encrypted language is isolated and owned by a single user
- Access control prevents unauthorized access
- Encrypted data is stored securely in Supabase
- Sharing uses unique, non-guessable links

## License

MIT

## Contact

- **Name**: Harinand Simdukumar
- **Email**: harinand.dev@gmail.com
- **GitHub**: [https://github.com/harinandsindukumar/](https://github.com/harinandsindukumar/)

## Feedback & Support

We welcome your feedback and reports! You can:

- Submit feedback through our [Feedback Form](http://localhost:3000/feedback)
- Report issues through our [Issue Reporter](http://localhost:3000/feedback)
- Email us directly at harinand.dev@gmail.com

## Database Schema

The application uses Supabase with the following tables:

1. `encryptions` - Stores user-created encrypted languages
2. `feedback` - Stores user feedback and reports

See the SQL files in the `supabase/` directory for detailed schema information.