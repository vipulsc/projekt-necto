# Necto - AI-Powered PDF Summarization Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Website](https://img.shields.io/badge/Website-necto.sbs-blue)](https://necto.sbs)

Necto is an open-source SaaS platform that leverages AI to provide intelligent PDF summarization services. Built with modern web technologies, it offers a seamless experience for users to upload, process, and manage their PDF documents.

## 🌟 Features

- **AI-Powered Summarization**: Automatically generate concise summaries of PDF documents using advanced AI models
- **User Authentication**: Secure user management with Clerk integration
- **File Management**: Easy upload and management of PDF documents
- **Payment Integration**: Seamless payment processing with Stripe
- **Responsive Design**: Modern UI built with Next.js and Tailwind CSS

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Authentication**: Clerk
- **Database**: Neon (PostgreSQL)
- **AI Integration**: Google Generative AI, LangChain
- **File Storage**: UploadThing
- **Payment Processing**: Stripe
- **Styling**: Radix UI, Tailwind CSS
- **Type Safety**: TypeScript

## 🛠️ Getting Started

### Prerequisites

- Node.js (Latest LTS version)
- npm or yarn
- PostgreSQL database (or Neon account)
- Clerk account for authentication
- Google AI API key
- Stripe account for payments

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/vipulsc/projekt-necto.git
   cd necto
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with the following variables:

   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret
   DATABASE_URL=your_database_url
   GOOGLE_AI_API_KEY=your_google_ai_key
   STRIPE_SECRET_KEY=your_stripe_secret
   STRIPE_WEBHOOK_SECRET=your_webhook_secret
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Database Schema

The application uses PostgreSQL with the following main tables:

- `users`: User management and subscription information
- `pdf_summaries`: Storage for processed PDF documents and their summaries
- `payments`: Payment transaction records

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌐 Links

- [Website](https://necto.sbs)
- [Documentation](https://docs.necto.sbs)
- [Issue Tracker](https://github.com/vipulsc/projekt-necto/issues)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Clerk](https://clerk.com/)
- [Google AI](https://ai.google.dev/)
- [Neon](https://neon.tech/)
- [Stripe](https://stripe.com/)
- [UploadThing](https://uploadthing.com/)

---

Made with ❤️ by Vipul
