# Solana-Powered AI Chatbot

## Overview

This is a web application that combines AI-powered chat functionality with Solana blockchain rewards. Users connect their Solana wallet, chat with an AI assistant powered by Mistral AI, and earn USDC for each interaction. The application supports both Solana mainnet (real USDC) and devnet (test USDC) with configurable network settings, comprehensive rate limiting, balance checks, and transaction monitoring. Features include a modern chat interface with real-time transaction tracking, wallet integration, and mainnet safety warnings.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**UI Component Library**: Shadcn/ui with Radix UI primitives, styled with Tailwind CSS using a custom design system based on the "new-york" style

**Design Philosophy**: Conversation-first layout inspired by modern chat interfaces (ChatGPT, Claude) with minimal chrome to maintain focus on message content. Uses Inter font for readability and JetBrains Mono for wallet addresses and transaction IDs.

**State Management**: TanStack Query (React Query) for server state management with custom query client configuration. Local component state using React hooks for UI interactions.

**Routing**: Wouter for lightweight client-side routing

**Key Design Decisions**:
- Full-height viewport layout with fixed header and scrollable chat container
- Message-centric UI with clear visual separation between user and AI messages
- Seamless wallet integration that doesn't disrupt chat flow
- Responsive spacing using Tailwind's spacing primitives (2, 4, 6, 8 units)

### Backend Architecture

**Framework**: Express.js with TypeScript running on Node.js

**API Design**: RESTful API with two main endpoints:
- `/api/validate-wallet` - Validates Solana wallet addresses
- `/api/chat` - Processes chat messages, generates AI responses, and initiates USDC transfers

**Development Setup**: Custom Vite middleware integration for HMR during development, with separate production build using esbuild

**Error Handling**: Zod schema validation for request/response data with centralized error handling

**Session Management**: Uses connect-pg-simple for session storage (PostgreSQL-backed sessions)

### Data Storage

**Database**: PostgreSQL (via Neon serverless)

**ORM**: Drizzle ORM for type-safe database operations

**Schema Management**: Drizzle Kit for migrations with schema defined in `shared/schema.ts`

**Current Storage Strategy**: Chat messages are ephemeral and stored client-side only. The storage layer (`server/storage.ts`) is designed for future expansion to persist conversations and transaction history.

**Rationale**: The minimal storage approach keeps the initial implementation simple while the modular storage interface allows easy extension for conversation persistence without architectural changes.

### Authentication and Authorization

**Wallet-Based Authentication**: Users authenticate by connecting their Solana wallet address

**Validation Process**: 
1. Client submits wallet address
2. Server validates address format (32-44 characters)
3. Server checks wallet existence on Solana devnet via RPC
4. No traditional username/password authentication required

**Security Considerations**: 
- Wallet address validation prevents malformed inputs
- Private key stored server-side as environment variable for USDC transfers
- No sensitive user data collected or stored

### External Dependencies

**AI Service**: Mistral AI
- Model: `mistral-large-latest`
- Handles natural language understanding and response generation
- Conversation history maintained client-side and sent with each request
- Requires `MISTRAL_API_KEY` environment variable

**Blockchain Infrastructure**: Solana (Mainnet/Devnet configurable)
- **Network Configuration**: Environment-driven via `SOLANA_NETWORK` (defaults to mainnet)
- **Mainnet**:
  - RPC Endpoint: `https://api.mainnet-beta.solana.com`
  - USDC mint: `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`
  - Transfer amount: 1000 (0.001 USDC with 6 decimals) - configurable via `TRANSFER_AMOUNT`
  - Min USDC buffer: 1.0 USDC (prevents complete wallet drainage)
  - Daily transfer limit: 100 transfers/day (configurable via `DAILY_TRANSFER_LIMIT`)
- **Devnet**:
  - RPC Endpoint: `https://api.devnet.solana.com`
  - USDC mint: `4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU`
  - Transfer amount: 1000 (0.001 USDC with 6 decimals)
  - Daily transfer limit: 1000 transfers/day
- **Safety Features**:
  - SOL balance check (minimum 0.01 SOL for gas fees)
  - USDC balance validation before transfers
  - Configurable minimum USDC buffer to prevent complete drainage
  - Daily transfer limits to prevent abuse
  - Rate limiting: 5-minute cooldown per wallet, 20 requests/hour per IP
- Uses `@solana/web3.js` and `@solana/spl-token` for blockchain interactions
- Requires `SOLANA_PRIVATE_KEY` (base58 encoded) for transaction signing

**Database**: Neon Serverless PostgreSQL
- Connection via `@neondatabase/serverless` driver
- Requires `DATABASE_URL` environment variable
- Supports edge/serverless deployment patterns

**UI Libraries**:
- Radix UI for accessible component primitives
- Tailwind CSS for styling with custom design tokens
- Lucide React for icons
- React Hook Form with Zod resolvers for form validation

**Build Tools**:
- Vite for frontend bundling and development server
- esbuild for backend bundling in production
- TypeScript for type safety across the stack
- PostCSS with Autoprefixer for CSS processing

**Development Tools** (Replit-specific):
- `@replit/vite-plugin-runtime-error-modal` for error overlay
- `@replit/vite-plugin-cartographer` for code mapping
- `@replit/vite-plugin-dev-banner` for development indicators

## Environment Configuration

The application supports flexible network configuration via environment variables for seamless switching between devnet (testing) and mainnet (production) environments.

### Required Environment Variables (Secrets)

- **MISTRAL_API_KEY**: API key for Mistral AI service (get from https://console.mistral.ai/)
- **SOLANA_PRIVATE_KEY**: Base58-encoded private key for the sender wallet (must have USDC and SOL)
- **SESSION_SECRET**: Secret key for session management

### Optional Configuration Variables

- **SOLANA_NETWORK**: Network selection - `mainnet` or `devnet` (default: `mainnet`)
- **TRANSFER_AMOUNT**: USDC transfer amount in smallest units (default: 1000 = 0.001 USDC)
- **DAILY_TRANSFER_LIMIT**: Maximum transfers per day (default: 100 for mainnet, 1000 for devnet)
- **MIN_USDC_BUFFER**: Minimum USDC balance to maintain in sender wallet (default: 1.0 for mainnet, 0.01 for devnet)
- **TRANSFERS_ENABLED**: Set to `false` to disable transfers completely (default: `true`)

### Network Setup Guide

#### For Devnet Testing (Safe, No Real Money)
```
SOLANA_NETWORK=devnet
MISTRAL_API_KEY=your_mistral_key
SOLANA_PRIVATE_KEY=your_devnet_wallet_private_key
SESSION_SECRET=random_secret_string
```

#### For Mainnet Production (Real USDC Transfers)
```
SOLANA_NETWORK=mainnet
MISTRAL_API_KEY=your_mistral_key
SOLANA_PRIVATE_KEY=your_mainnet_wallet_private_key
SESSION_SECRET=random_secret_string
TRANSFER_AMOUNT=1000
DAILY_TRANSFER_LIMIT=100
MIN_USDC_BUFFER=1.0
```

### Mainnet Safety Checklist

Before deploying to mainnet, ensure:

1. ✅ Sender wallet has sufficient USDC balance
2. ✅ Sender wallet has sufficient SOL for transaction fees (~0.01 SOL minimum)
3. ✅ `SOLANA_PRIVATE_KEY` is stored securely (use Replit Secrets, never commit to version control)
4. ✅ `DAILY_TRANSFER_LIMIT` is set to prevent excessive spending
5. ✅ `MIN_USDC_BUFFER` is configured to prevent complete wallet drainage
6. ✅ Rate limiting is active (default: 5-min cooldown per wallet, 20 req/hour per IP)
7. ✅ Frontend displays mainnet warning dialog before first transfer
8. ✅ Monitor sender wallet balance regularly

### Monitoring & Security

- **Balance Monitoring**: Frontend displays sender's SOL and USDC balances
- **Rate Limiting**: Automatic per-wallet and per-IP rate limits prevent abuse
- **Transaction Logging**: All transfers logged with signature, amount, timestamp, recipient
- **Balance Checks**: Preflight validation ensures sufficient SOL for gas and USDC for transfers
- **Explorer Links**: All successful transactions link to Solscan for verification