# x402Pay: Decentralized Micropayments for IoT on Solana

## Project Vision

**x402Pay** is a Solana-native decentralized payment infrastructure purpose-built for the IoT economy, implementing the "get-as-you-go" paradigm for instant micropayments. The project enables machine-to-machine (M2M) and human-to-machine (H2M) transactions using Solana's high throughput (40,000 TPS) and sub-second finality.

**📄 Full Whitepaper:** See `docs/x402pay-whitepaper.md` for comprehensive technical documentation, tokenomics, roadmap, and investment information.

## Current Implementation Status

The codebase implements a **professional dual-purpose platform**:

### 1. Whitepaper Documentation Website
- 9 professional dark-themed pages showcasing x402Pay vision and technology
- Monochromatic dark blackish-gray theme (neutral grayscale aesthetics)
- Persistent navigation header with mobile responsiveness
- Sections: Home, Executive Summary, Introduction, Solution, x402 Sol, Device Identity, SDK, Tokenomics, Roadmap
- Streamlined home page: Single "Get Started" CTA, simplified layout

### 2. Proof-of-Concept Chat Application
Professional AI chat interface demonstrating core payment infrastructure:
- **AI Integration**: Mistral AI-powered conversational interface
- **Wallet Connection**: Phantom wallet integration with USDC micropayments (0.001 USDC per prompt)
- **Network Support**: Solana mainnet/devnet with configurable rate limiting
- **Professional UI**: 
  - Desktop sidebar with real-time network status, balance monitoring, and session statistics
  - Mobile-responsive overlay sidebar
  - Monochromatic dark theme with subtle gray gradients
  - Transaction tracking with blockchain explorer links
- **Features**: Clear chat history, session statistics (messages, earnings, successful transactions), daily limit tracking

**Next Steps:** Evolution toward full IoT micropayment platform with device registries, x402 Sol smart contract deployment, and SDK releases (Python, Rust, JavaScript) as outlined in the whitepaper roadmap.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**UI Component Library**: Shadcn/ui with Radix UI primitives, styled with Tailwind CSS using a custom design system based on the "new-york" style

**Design Philosophy**: 
- **Whitepaper Site**: Professional documentation design with monochromatic dark gray theme, technical sophistication through minimalist grayscale aesthetics, and deep hierarchies for complex content
- **Chat Interface**: Modern conversational UI with sidebar-based layout, real-time status displays, and professional dark theme with subtle gray gradients

**State Management**: TanStack Query (React Query) for server state management with custom query client configuration. Local component state using React hooks for UI interactions.

**Routing**: Wouter for lightweight client-side routing across whitepaper pages and chat

**Key Design Decisions**:
- **Chat Page**: 
  - Persistent sidebar (desktop) showing network status, SOL/USDC balances, daily transfer limits, and session statistics
  - Mobile-responsive overlay sidebar with hamburger menu
  - Gray gradient send button (from-gray-600 to-gray-700)
  - Enhanced message bubbles with AI avatar indicators
  - Professional empty state with monochromatic branding
  - Clear chat functionality with confirmation dialog
- **Whitepaper Site**:
  - Sticky navigation header with all sections accessible
  - Dark blackish-gray theme with neutral gradients throughout
  - Mobile-friendly responsive layout
  - Client-side routing for smooth transitions
  - Streamlined home page (no version badge, "Built by" section, or "Try Demo" button)
  - Cost display: "0.001 USDC" per prompt (not per transaction)

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

**Wallet-Based Authentication**: Users authenticate by connecting their Solana wallet (Phantom or compatible wallets)

**Wallet Connection Flow**: 
1. User clicks "Connect Wallet" button in the header
2. Phantom wallet extension prompts for connection approval
3. Frontend receives wallet public key via Solana Wallet Standard
4. Backend automatically validates wallet address format and existence on network
5. Chat functionality unlocks after successful validation

**Wallet Integration**:
- WalletContext manages connection state globally using React Context
- Automatic wallet detection and connection via `window.solana` provider
- Supports account switching and disconnection
- Wallet address displayed in truncated format (e.g., `3AB...xyz`)

**Security Considerations**: 
- Wallet address validation prevents malformed inputs
- Server private key stored securely as environment variable for USDC transfers
- No sensitive user data collected or stored
- Automatic re-validation on wallet changes

### External Dependencies

**AI Service**: Mistral AI
- Model: `mistral-small-latest`
- Temperature: 0.7
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
  - Rate limiting: **Configurable via RATE_LIMITING_ENABLED** (currently set to false for testing)
    - When enabled: 5-min cooldown per wallet, 20 req/hour per IP, daily transfer limits
    - When disabled: No rate limits (⚠️ Use with caution on mainnet!)
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
- **RATE_LIMITING_ENABLED**: Enable/disable rate limiting - `true` or `false` (default: `true`)
  - ⚠️ **WARNING**: Setting to `false` on mainnet removes all transfer limits and exposes treasury to abuse
- **DAILY_TRANSFER_LIMIT**: Maximum transfers per day (default: 100 for mainnet, 1000 for devnet)
- **MIN_USDC_BUFFER**: Minimum USDC balance to maintain in sender wallet (currently set to: 0.01 USDC)
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
MIN_USDC_BUFFER=0.01
RATE_LIMITING_ENABLED=false
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