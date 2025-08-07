import React from 'react';
import Image from 'next/image';
import { ProjectCard } from '@/types';
import { VideoPopup } from '@/components/ui/video-popup';
import { FaGithub } from 'react-icons/fa';
import { CodeBlock } from '@/components/ui/code-block';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';

export const PROJECT_CARDS: ProjectCard[] = [
  {
    src: '/Portfolio Site.png',
    title: 'Personal Website',
    category: 'Web Application',
    titleAction: (
      <a
        href='https://github.com/WilliamJiH/WilliamJiH.github.io'
        target='_blank'
        rel='noopener noreferrer'
        className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors dark:bg-neutral-800 dark:hover:bg-neutral-700'
        aria-label='View Personal Website on GitHub'
      >
        <FaGithub className='w-5 h-5 text-gray-700 dark:text-gray-300' />
      </a>
    ),
    content: (
      <div>
        <p
          className='text-neutral-600 dark:text-neutral-400 text-sm md:text-lg max-w-3xl mx-auto'
          style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
        >
          This modern, responsive personal portfolio showcases my journey as a software engineer through an immersive
          digital experience. Built from the ground up with Next.js, TypeScript, and Tailwind CSS, the site leverages
          cutting-edge web technologies including Framer Motion for fluid animations, Aceternity UI for polished
          components, and advanced CSS techniques for visual effects. The architecture features a component-driven
          design with TypeScript interfaces for type safety, custom hooks for state management, and optimized
          performance through Next.js&apos;s built-in features like image optimization and server-side rendering. Key
          interactive elements include a macOS-inspired floating dock navigation, elegant intro transitions,
          cursor-following spotlight effects, animated text reveals, and a comprehensive project showcase with embedded
          media and code examples.
        </p>
        <div className='mt-16 mb-12 clear-both'>
          <div className='relative z-10 py-4'>
            <ContainerScroll
              titleComponent=""
            >
            <Image
              src='/Personal-Website.png'
              alt='Personal Website Screenshot'
              width={1200}
              height={800}
              className='w-full h-full object-cover'
              draggable={false}
            />
          </ContainerScroll>
          </div>
        </div>
      </div>
    ),
  },
  {
    src: '/Campus Eats.png',
    title: 'Campus Eats',
    category: 'Food Delivery Platform',
    titleAction: (
      <a
        href='https://github.com/CampusEatsUofT'
        target='_blank'
        rel='noopener noreferrer'
        className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors dark:bg-neutral-800 dark:hover:bg-neutral-700'
        aria-label='View Campus Eats on GitHub'
      >
        <FaGithub className='w-5 h-5 text-gray-700 dark:text-gray-300' />
      </a>
    ),
    content: (
      <div>
        <p
          className='text-neutral-600 dark:text-neutral-400 text-sm md:text-lg max-w-3xl mx-auto'
          style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
        >
          Campus Eats is a student-led startup on a mission to transform the campus dining experience through an
          all-in-one mobile platform. Beyond our core Grab and Go central delivery system, we offer dine-in student
          coupons, food truck online ordering, and a dynamic food options exploration map to help students discover
          meals across campus.
        </p>
        <div className='flex justify-center my-6'>
          <VideoPopup
            imageSrc='/campus-eats-mobile.png'
            imageAlt='Campus Eats Mobile App Interface'
            youtubeEmbedUrl='https://www.youtube.com/embed/nSsBSv1q4Bc?si=DyvdCw1yVjZgHYLX'
            hoverText='Watch our Full Demo'
            className='max-w-3xl w-full'
          />
        </div>
        <p
          className='text-neutral-600 dark:text-neutral-400 text-sm md:text-lg max-w-3xl mx-auto'
          style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
        >
          We address the limitations of in-person-only ordering and the high fees of traditional delivery apps by
          offering a streamlined, affordable alternative. Through Campus Eats, students can browse menus, order ahead,
          skip lines, and access exclusive discounts—making campus dining more diverse, accessible, and student-friendly
          than ever.
        </p>
      </div>
    ),
  },
  {
    src: '/Savi Finance.png',
    title: 'Savi Finance',
    category: 'Financial Platform',
    titleAction: (
      <a
        href='https://github.com/cheapreats/'
        target='_blank'
        rel='noopener noreferrer'
        className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors dark:bg-neutral-800 dark:hover:bg-neutral-700'
        aria-label='View Savi Finance on GitHub'
      >
        <FaGithub className='w-5 h-5 text-gray-700 dark:text-gray-300' />
      </a>
    ),
    content: (
      <div>
        <p
          className='text-neutral-600 dark:text-neutral-400 text-sm md:text-lg max-w-3xl mx-auto'
          style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
        >
          Savi Finance is redefining how people manage money—by helping users align their finances with their life
          goals. Instead of chasing wealth for its own sake, Savi empowers individuals to make intentional, stress-free
          financial decisions through smart automation and meaningful insights.
        </p>
        <br />
        <p
          className='text-neutral-600 dark:text-neutral-400 text-sm md:text-lg max-w-3xl mx-auto'
          style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
        >
          Built on simplicity, collaboration, and completeness, Savi is a one-stop platform for everything from
          budgeting and expense splitting to tracking investments in crypto, stocks, and more. Our mission is to make
          the world&apos;s best financial habits accessible to everyone, everywhere.
        </p>
        <div className='flex justify-center my-6'>
          <VideoPopup
            imageSrc='/Savi-Architecture.png'
            imageAlt='Savi Finance Architecture Diagram'
            youtubeEmbedUrl='https://www.youtube.com/embed/1viQPZJ-nL8?si=I7BlcTsj8Qr7gYza'
            hoverText='Watch our Full Demo'
            className='max-w-3xl w-full'
          />
        </div>
        <p
          className='text-neutral-600 dark:text-neutral-400 text-sm md:text-lg max-w-3xl mx-auto'
          style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
        >
          In this project, I contributed to the design and development of the Crypto Wallet Tracking feature within the
          Savi Finance platform. Our goal was to allow users to track and manage their cryptocurrency assets across
          multiple wallets and blockchains in real-time. From the start, I focused on ensuring the system was modular,
          scalable, and secure. One of the first architectural decisions I proposed was to introduce a dedicated RPC
          server for handling all blockchain interactions. This server acts as the core service layer, fetching
          real-time wallet data, transactions, and market information from sources like Ethereum JSON-RPC, Coinbase API,
          Moralis, and Etherscan. By decoupling this service from the rest of the monolith, we were able to optimize for
          performance, reduce latency, and apply crypto-specific security controls without overcomplicating the main
          account system.
        </p>
        <div className='my-6 max-w-3xl mx-auto'>
          <CodeBlock
            language='graphql'
            filename='CryptoTransaction.gql'
            code={`export const cryptoTransactionSchema = gql\`
    type CryptoTransaction {
    id: DocumentId!
    transactionHash: String!
    amount: Float!
    currency: String!
    timestamp: DateTime!
    status: String!
    walletAddress: String!
    externalTransactionId: String # An identifier used by the third-party service for the transaction.
  }
  
  extend type Query {
    getCryptoTransaction(transactionId: DocumentId!): CryptoTransaction
    listCryptoTransactions(userId: DocumentId): [CryptoTransaction]
  }
\`

export const cryptoAccountSchema = gql\`
  enum CryptoAccountType {
    BITCOIN
    ETHEREUM
    LITECOIN
    RIPPLE
    CARDANO
    OTHER
  }
  
  # CryptoAccountBalance saves multiple snapshots(balance history) of a CryptoAccount
  type CryptoAccountBalance{
    id: DocumentId!
    cryptoAccountId: DocumentId!
    balance: Float! # This might now come directly from the third-party service
  }
  
  type CryptoAccount {
    id: DocumentId!
    userId: DocumentId!
    provider: String! # The third-party service provider, e.g., "Coinbase", "Binance"
    accountType: CryptoAccountType!
    currency: String!
    externalAccountId: String # The account ID from the third-party service
    createdAt: DateTime!
    updatedAt: DateTime
  }
  
  extend type Mutation {
    addCryptoAccount(input: AddCryptoAccountInput!): CryptoAccount)
    deleteCryptoAccount(accountId: DocumentId!): String
  }
  
  input AddCryptoAccountInput {
    uesrId: DocumentId!
    provider: String!
    accessToken: String!
    accountId: String
  }
  
  extend type Query {
    getCryptoAccount(accountId: DocumentId!): CryptoAccount
    listCryptoAccounts(userId: DocumentId): [CryptoAccount]
  }
\``}
          />
        </div>
        <p
          className='text-neutral-600 dark:text-neutral-400 text-sm md:text-lg max-w-3xl mx-auto'
          style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
        >
          To support this at the data level, I led the introduction of two new data models: CryptoAccount and
          CryptoTransaction. Instead of retrofitting our existing account schema—which would have tightly coupled crypto
          data with traditional accounts—I proposed isolating the crypto logic to preserve modularity and make the
          feature easier to extend. We also implemented event sourcing to track balance history accurately over time.
          This prevents data inconsistency when users modify past transactions and allows us to render time-series
          visualizations across wallets. I extended the GraphQL schema to include account creation, deletion, and
          querying functionality, and introduced enums to support multiple blockchain types (Ethereum, Bitcoin, etc.)
          and account subtypes (like EOA vs contract wallets).
        </p>
        <div className='flex justify-center my-6'>
          <Image
            src='/Savi-Tradeoff.png'
            alt='Savi Finance Tradeoff Analysis'
            width={800}
            height={600}
            className='max-w-3xl w-full h-auto rounded-lg shadow-lg'
          />
        </div>
        <p
          className='text-neutral-600 dark:text-neutral-400 text-sm md:text-lg max-w-3xl mx-auto'
          style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
        >
          Throughout this process, I also conducted several trade-off analyses, such as whether to reuse the existing
          sba-account-api versus building a new dedicated service. While reusing code had short-term development
          advantages, we ultimately opted for a new service to better support long-term scalability and performance.
          Similarly, I compared balance storage options (float vs array vs event-sourcing) and pushed for event-driven
          architecture as a long-term, flexible solution. Overall, I approached this feature with a strong focus on
          extensibility, ensuring that as we onboard more blockchains or support new wallet types, the system would
          scale with minimal technical debt.
        </p>
        <div className='my-6 max-w-3xl mx-auto'>
          <div className='relative w-full' style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
            <iframe
              className='absolute inset-0 w-full h-full rounded-lg'
              src='https://www.youtube.com/embed/N4ybVBGchrM'
              title='Backend Crypto RPC API Integration Demo'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen
            />
          </div>
          <p className='text-center text-neutral-600 dark:text-neutral-400 text-sm md:text-base mt-3 font-medium'>
            Backend Crypto RPC API Integration Demo
          </p>
        </div>
      </div>
    ),
  },
];
