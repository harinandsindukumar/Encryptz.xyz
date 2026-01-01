# Encryptz

Encryptz is a web application that allows users to create their own private encrypted languages and share them with friends using a single unique link. Built with Next.js and Supabase, it provides a simple and secure way to communicate using custom encryption.

## Features

- **Create Custom Encrypted Languages**: Generate your own private encryption system
- **Share with Friends**: Share your encrypted language using a unique link
- **Easy Encryption/Decryption**: Simple interface for encrypting and decrypting messages
- **Google Authentication**: Secure login with Google OAuth
- **Responsive Design**: Works on all devices
- **No Key Management**: Simple to use without complex key management

## Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Supabase**: Backend services (authentication & database)
- **Tailwind CSS**: Styling framework
- **Vercel**: Deployment platform

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/harinandsindukumar/Encryptz.xyz.git
cd Encryptz.xyz
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with your specific configuration. You can use the `.env.example` file as a template:

```bash
cp .env.example .env.local
```

Then update the values in `.env.local` with your actual Supabase project details.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Environment Variables

The application requires the following environment variables to connect with Supabase. A `.env.example` file is provided as a template:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Your Google OAuth client ID (optional, if using Google auth)
- `NEXT_PUBLIC_GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret (optional, if using Google auth)

These are required for authentication and database operations.

## Database Schema

The application uses the following tables in Supabase. You can find the detailed schema in the `supabase/` directory:

### encryptions table
- `id`: UUID (Primary Key)
- `name`: Text (Name of the encryption)
- `user_id`: UUID (Foreign Key to auth.users)
- `created_at`: Timestamp (Default: now())

### feedback table
- `id`: UUID (Primary Key, Default: gen_random_uuid())
- `name`: Text (User's name)
- `email`: Text (User's email)
- `subject`: Text (Feedback subject)
- `message`: Text (Feedback message)
- `type`: Text (Feedback type: 'feedback' or 'report')
- `created_at`: Timestamp (Default: now())
- `status`: Text (Default: 'pending')

### Supabase Setup

To set up the database in your Supabase project, you can use the SQL schema file located at `supabase/feedback_schema.sql`.

## API Routes

- `GET /api/encryptions`: Get all encryptions for the authenticated user
- `POST /api/encryptions/create`: Create a new encryption
- `GET /api/encryptions/[id]`: Get a specific encryption
- `DELETE /api/encryptions/[id]`: Delete a specific encryption
- `POST /api/feedback`: Submit feedback or report an issue

## Project Structure

```
src/
├── app/                    # Next.js 14 App Router pages
│   ├── api/                # API routes
│   ├── dashboard/          # User dashboard
│   ├── encrypt/[id]/       # Encryption interface
│   ├── share/[id]/         # Shared encryption interface
│   ├── feedback/           # Feedback form
│   ├── privacy/            # Privacy policy
│   ├── terms/              # Terms of service
│   ├── disclaimer/         # Disclaimer
│   └── globals.css         # Global styles
├── components/             # React components
├── context/                # React context providers
├── lib/                    # Utility functions
└── utils/                  # Utility modules
```

## Contributing

We welcome contributions to Encryptz! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- Harinand Simdukumar: [harinandsindukumarkg@gmail.com](mailto:harinandsindukumarkg@gmail.com)
- GitHub: [https://github.com/harinandsindukumar/](https://github.com/harinandsindukumar/)

## Acknowledgments

- Next.js for the amazing React framework
- Supabase for the backend services
- Tailwind CSS for the styling framework
- All contributors who help make this project better

---

Built with ❤️ by [Harinand Simdukumar](https://github.com/harinandsindukumar/)