'use client';

import { Spotlight } from '@/components/ui/spotlight';
import LoadingWrapper from '@/components/loading-wrapper';
import { HypertextReveal } from '@/components/ui/hypertext';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { Carousel, Card } from '@/components/ui/apple-cards-carousel';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';

// Custom component for aurora text without scrambling
const AuroraText = ({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        backgroundImage: [
          'linear-gradient(45deg, #10b981, #3b82f6, #8b5cf6, #ec4899)',
          'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b)',
          'linear-gradient(45deg, #8b5cf6, #ec4899, #f59e0b, #10b981)',
          'linear-gradient(45deg, #ec4899, #f59e0b, #10b981, #3b82f6)',
          'linear-gradient(45deg, #f59e0b, #10b981, #3b82f6, #8b5cf6)',
          'linear-gradient(45deg, #10b981, #3b82f6, #8b5cf6, #ec4899)',
        ],
      }}
      transition={{
        opacity: { duration: 0.5, delay: delay, ease: 'easeOut' },
        y: { duration: 0.5, delay: delay, ease: 'easeOut' },
        backgroundImage: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
      }}
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundSize: '200% 200%',
        animation: 'aurora 6s ease-in-out infinite',
      }}
    >
      {text}
    </motion.span>
  );
};

export default function Home() {
  const [currentSentence, setCurrentSentence] = useState(0);
  const [showSentence, setShowSentence] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  const [aboutSectionProgress, setAboutSectionProgress] = useState(0);
  const [skillsProgress, setSkillsProgress] = useState(0);
  const [homePageProgress, setHomePageProgress] = useState(0);
  const cursorLightRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  const sentences = [
    'Full-stack Web Developer.',
    'Financial Derivatives Specialist.',
    'CS Grad from University of Toronto.',
    'Moving fast. Breaking nothing.',
  ];

  const PythonIcon = ({ className }: { className?: string }) => (
    <svg
      className={className}
      width='50'
      height='50'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M13.0164 2C10.8193 2 9.03825 3.72453 9.03825 5.85185V8.51852H15.9235V9.25926H5.97814C3.78107 9.25926 2 10.9838 2 13.1111L2 18.8889C2 21.0162 3.78107 22.7407 5.97814 22.7407H8.27322V19.4815C8.27322 17.3542 10.0543 15.6296 12.2514 15.6296H19.5956C21.4547 15.6296 22.9617 14.1704 22.9617 12.3704V5.85185C22.9617 3.72453 21.1807 2 18.9836 2H13.0164ZM12.0984 6.74074C12.8589 6.74074 13.4754 6.14378 13.4754 5.40741C13.4754 4.67103 12.8589 4.07407 12.0984 4.07407C11.3378 4.07407 10.7213 4.67103 10.7213 5.40741C10.7213 6.14378 11.3378 6.74074 12.0984 6.74074Z'
        fill='#387EB8'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M18.9834 30C21.1805 30 22.9616 28.2755 22.9616 26.1481V23.4815H16.0763V22.7407H26.0217C28.2187 22.7407 29.9998 21.0162 29.9998 18.8889V13.1111C29.9998 10.9838 28.2187 9.25926 26.0217 9.25926H23.7266V12.5185C23.7266 14.6458 21.9455 16.3704 19.7484 16.3704H12.4042C10.5451 16.3704 9.03809 17.8296 9.03809 19.6296V26.1481C9.03809 28.2755 10.8191 30 13.0162 30H18.9834ZM19.9014 25.2593C19.1408 25.2593 18.5244 25.8562 18.5244 26.5926C18.5244 27.329 19.1408 27.9259 19.9014 27.9259C20.6619 27.9259 21.2785 27.329 21.2785 26.5926C21.2785 25.8562 20.6619 25.2593 19.9014 25.2593Z'
        fill='#FFE052'
      />
    </svg>
  );

  const GitIcon = ({ className }: { className?: string }) => (
    <svg
      className={className}
      width='50'
      height='50'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16 2C8.268 2 2 8.268 2 16C2 22.236 6.244 27.413 12.092 29.024C12.792 29.146 13.056 28.709 13.056 28.334C13.056 28.003 13.044 27.014 13.038 25.68C9.294 26.527 8.467 23.78 8.467 23.78C7.835 22.37 6.913 21.935 6.913 21.935C5.659 21.058 7.013 21.076 7.013 21.076C8.405 21.174 9.136 22.53 9.136 22.53C10.354 24.658 12.307 24.053 13.084 23.693C13.205 22.784 13.564 22.182 13.96 21.831C11.192 21.475 8.28 20.354 8.28 15.424C8.28 14.093 8.811 13.004 9.163 12.152C9.024 11.795 8.547 10.478 9.293 8.733C9.293 8.733 10.435 8.353 12.997 10.138C14.086 9.827 15.25 9.671 16.405 9.666C17.56 9.671 18.724 9.827 19.815 10.138C22.375 8.353 23.515 8.733 23.515 8.733C24.263 10.478 23.786 11.795 23.647 12.152C24.001 13.004 24.53 14.093 24.53 15.424C24.53 20.368 21.613 21.471 18.835 21.823C19.331 22.252 19.789 23.096 19.789 24.383C19.789 26.201 19.774 27.669 19.774 28.334C19.774 28.713 20.035 29.154 20.747 29.022C26.589 27.407 30.832 22.234 30.832 16C30.832 8.268 24.564 2 16.832 2H16Z'
        style={{ fill: '#ffffff', fillRule: 'evenodd' }}
      />
    </svg>
  );

  const TypeScriptIcon = ({ className }: { className?: string }) => (
    <svg
      className={className}
      width='50'
      height='50'
      viewBox='0 0 32 32'
      xmlns='http://www.w3.org/2000/svg'
      fill='#000000'
    >
      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
      <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
      <g id='SVGRepo_iconCarrier'>
        <title>file_type_typescript_official</title>
        <rect x='2' y='2' width='28' height='28' rx='1.312' style={{ fill: '#3178c6' }}></rect>
        <path
          d='M18.245,23.759v3.068a6.492,6.492,0,0,0,1.764.575,11.56,11.56,0,0,0,2.146.192,9.968,9.968,0,0,0,2.088-.211,5.11,5.11,0,0,0,1.735-.7,3.542,3.542,0,0,0,1.181-1.266,4.469,4.469,0,0,0,.186-3.394,3.409,3.409,0,0,0-.717-1.117,5.236,5.236,0,0,0-1.123-.877,12.027,12.027,0,0,0-1.477-.734q-.6-.249-1.08-.484a5.5,5.5,0,0,1-.813-.479,2.089,2.089,0,0,1-.516-.518,1.091,1.091,0,0,1-.181-.618,1.039,1.039,0,0,1,.162-.571,1.4,1.4,0,0,1,.459-.436,2.439,2.439,0,0,1,.726-.283,4.211,4.211,0,0,1,.956-.1,5.942,5.942,0,0,1,.808.058,6.292,6.292,0,0,1,.856.177,5.994,5.994,0,0,1,.836.3,4.657,4.657,0,0,1,.751.422V13.9a7.509,7.509,0,0,0-1.525-.4,12.426,12.426,0,0,0-1.9-.129,8.767,8.767,0,0,0-2.064.235,5.239,5.239,0,0,0-1.716.733,3.655,3.655,0,0,0-1.171,1.271,3.731,3.731,0,0,0-.431,1.845,3.588,3.588,0,0,0,.789,2.34,6,6,0,0,0,2.395,1.639q.63.26,1.175.509a6.458,6.458,0,0,1,.942.517,2.463,2.463,0,0,1,.626.585,1.2,1.2,0,0,1,.23.719,1.1,1.1,0,0,1-.144.552,1.269,1.269,0,0,1-.435.441,2.381,2.381,0,0,1-.726.292,4.377,4.377,0,0,1-1.018.105,5.773,5.773,0,0,1-1.969-.35A5.874,5.874,0,0,1,18.245,23.759Zm-5.154-7.638h4V13.594H5.938v2.527H9.92V27.375h3.171Z'
          style={{ fill: '#ffffff', fillRule: 'evenodd' }}
        ></path>
      </g>
    </svg>
  );

  const ReactIcon = ({ className }: { className?: string }) => (
    <svg
      className={className}
      width='50'
      height='50'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
      <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
      <g id='SVGRepo_iconCarrier'>
        <path
          d='M18.6789 15.9759C18.6789 14.5415 17.4796 13.3785 16 13.3785C14.5206 13.3785 13.3211 14.5415 13.3211 15.9759C13.3211 17.4105 14.5206 18.5734 16 18.5734C17.4796 18.5734 18.6789 17.4105 18.6789 15.9759Z'
          fill='#53C1DE'
        ></path>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M24.7004 11.1537C25.2661 8.92478 25.9772 4.79148 23.4704 3.39016C20.9753 1.99495 17.7284 4.66843 16.0139 6.27318C14.3044 4.68442 10.9663 2.02237 8.46163 3.42814C5.96751 4.82803 6.73664 8.8928 7.3149 11.1357C4.98831 11.7764 1 13.1564 1 15.9759C1 18.7874 4.98416 20.2888 7.29698 20.9289C6.71658 23.1842 5.98596 27.1909 8.48327 28.5877C10.9973 29.9932 14.325 27.3945 16.0554 25.7722C17.7809 27.3864 20.9966 30.0021 23.4922 28.6014C25.9956 27.1963 25.3436 23.1184 24.7653 20.8625C27.0073 20.221 31 18.7523 31 15.9759C31 13.1835 26.9903 11.7923 24.7004 11.1537ZM24.4162 19.667C24.0365 18.5016 23.524 17.2623 22.8971 15.9821C23.4955 14.7321 23.9881 13.5088 24.3572 12.3509C26.0359 12.8228 29.7185 13.9013 29.7185 15.9759C29.7185 18.07 26.1846 19.1587 24.4162 19.667ZM22.85 27.526C20.988 28.571 18.2221 26.0696 16.9478 24.8809C17.7932 23.9844 18.638 22.9422 19.4625 21.7849C20.9129 21.6602 22.283 21.4562 23.5256 21.1777C23.9326 22.7734 24.7202 26.4763 22.85 27.526ZM9.12362 27.5111C7.26143 26.47 8.11258 22.8946 8.53957 21.2333C9.76834 21.4969 11.1286 21.6865 12.5824 21.8008C13.4123 22.9332 14.2816 23.9741 15.1576 24.8857C14.0753 25.9008 10.9945 28.557 9.12362 27.5111ZM2.28149 15.9759C2.28149 13.874 5.94207 12.8033 7.65904 12.3326C8.03451 13.5165 8.52695 14.7544 9.12123 16.0062C8.51925 17.2766 8.01977 18.5341 7.64085 19.732C6.00369 19.2776 2.28149 18.0791 2.28149 15.9759ZM9.1037 4.50354C10.9735 3.45416 13.8747 6.00983 15.1159 7.16013C14.2444 8.06754 13.3831 9.1006 12.5603 10.2265C11.1494 10.3533 9.79875 10.5569 8.55709 10.8297C8.09125 9.02071 7.23592 5.55179 9.1037 4.50354ZM20.3793 11.5771C21.3365 11.6942 22.2536 11.85 23.1147 12.0406C22.8562 12.844 22.534 13.6841 22.1545 14.5453C21.6044 13.5333 21.0139 12.5416 20.3793 11.5771ZM16.0143 8.0481C16.6054 8.66897 17.1974 9.3623 17.7798 10.1145C16.5985 10.0603 15.4153 10.0601 14.234 10.1137C14.8169 9.36848 15.414 8.67618 16.0143 8.0481ZM9.8565 14.5444C9.48329 13.6862 9.16398 12.8424 8.90322 12.0275C9.75918 11.8418 10.672 11.69 11.623 11.5748C10.9866 12.5372 10.3971 13.5285 9.8565 14.5444ZM11.6503 20.4657C10.6679 20.3594 9.74126 20.2153 8.88556 20.0347C9.15044 19.2055 9.47678 18.3435 9.85796 17.4668C10.406 18.4933 11.0045 19.4942 11.6503 20.4657ZM16.0498 23.9915C15.4424 23.356 14.8365 22.6531 14.2448 21.8971C15.4328 21.9423 16.6231 21.9424 17.811 21.891C17.2268 22.6608 16.6369 23.3647 16.0498 23.9915ZM22.1667 17.4222C22.5677 18.3084 22.9057 19.1657 23.1742 19.9809C22.3043 20.1734 21.3652 20.3284 20.3757 20.4435C21.015 19.4607 21.6149 18.4536 22.1667 17.4222ZM18.7473 20.5941C16.9301 20.72 15.1016 20.7186 13.2838 20.6044C12.2509 19.1415 11.3314 17.603 10.5377 16.0058C11.3276 14.4119 12.2404 12.8764 13.2684 11.4158C15.0875 11.2825 16.9178 11.2821 18.7369 11.4166C19.7561 12.8771 20.6675 14.4086 21.4757 15.9881C20.6771 17.5812 19.7595 19.1198 18.7473 20.5941ZM22.8303 4.4666C24.7006 5.51254 23.8681 9.22726 23.4595 10.8426C22.2149 10.5641 20.8633 10.3569 19.4483 10.2281C18.6239 9.09004 17.7698 8.05518 16.9124 7.15949C18.1695 5.98441 20.9781 3.43089 22.8303 4.4666Z'
          fill='#53C1DE'
        ></path>
      </g>
    </svg>
  );

  const NodeIcon = ({ className }: { className?: string }) => (
    <svg
      className={className}
      width='50'
      height='50'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
      <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
      <g id='SVGRepo_iconCarrier'>
        <path
          d='M17.1725 2.29872C16.4627 1.89953 15.5373 1.90132 14.8269 2.29872C11.2689 4.26227 7.71082 6.22641 4.15216 8.18906C3.45969 8.55335 2.99264 9.29698 3.00009 10.0688V21.9328C2.99509 22.7197 3.48622 23.4705 4.19655 23.8298C5.21871 24.3736 6.2118 24.9726 7.25244 25.4802C8.45451 26.0709 9.95843 26.2015 11.1752 25.5855C12.1629 25.075 12.6016 23.9395 12.6003 22.896C12.6083 18.9806 12.6016 15.0651 12.6034 11.1496C12.6269 10.9756 12.4962 10.7896 12.3064 10.7938C11.8517 10.7866 11.3964 10.7896 10.9417 10.7926C10.7699 10.7764 10.6022 10.9191 10.6152 11.0918C10.6091 14.982 10.6164 18.8734 10.6115 22.7642C10.6214 23.3024 10.2578 23.8196 9.73913 24.0014C8.5412 24.4213 5.12198 22.2012 5.12198 22.2012C4.9965 22.1431 4.91682 22.007 4.92912 21.8718C4.92912 17.9576 4.92973 14.0433 4.92912 10.1297C4.91187 9.97191 5.00912 9.8298 5.15402 9.76538C8.70033 7.8134 12.2448 5.85654 15.7911 3.90336C15.9143 3.82115 16.086 3.8214 16.2089 3.90396C19.7552 5.85654 23.3003 7.81161 26.8472 9.76368C26.9926 9.828 27.0857 9.9725 27.0709 10.1297C27.0703 14.0433 27.0721 17.9576 27.0697 21.8713C27.0802 22.0098 27.0086 22.144 26.8793 22.2048C23.3661 24.1462 19.8129 26.025 16.3315 28.0228C16.1796 28.1099 16.0075 28.2086 15.8373 28.1126C14.9218 27.6062 14.0174 27.0801 13.1049 26.5688C13.0057 26.5069 12.8794 26.4803 12.7759 26.5496C12.3668 26.7652 11.982 26.9398 11.5122 27.1258C10.8524 27.387 10.9578 27.4938 11.5529 27.8405C12.62 28.4444 13.6889 29.0459 14.756 29.6504C15.4585 30.0888 16.4024 30.12 17.1275 29.7149C20.6861 27.7538 24.2436 25.7904 27.8029 23.8293C28.5113 23.468 29.0049 22.7202 28.9999 21.9327V10.0688C29.0068 9.31264 28.5576 8.58227 27.886 8.21259C24.3156 6.23947 20.7435 4.27064 17.1725 2.29872Z'
          fill='#8CC84B'
        ></path>
        <path
          d='M22.5419 11.2062C21.1452 10.459 19.4836 10.4192 17.9315 10.5169C16.8102 10.6277 15.6309 10.9371 14.814 11.7409C13.9761 12.5489 13.7937 13.8537 14.1917 14.9085C14.4769 15.6539 15.1948 16.1386 15.9372 16.395C16.8935 16.7326 17.8979 16.837 18.9026 16.9414C19.819 17.0366 20.7357 17.1319 21.6165 17.4042C21.9763 17.5234 22.3953 17.7058 22.5055 18.0973C22.6073 18.5609 22.4957 19.0998 22.1193 19.4219C20.9237 20.3682 17.5979 20.2232 16.4166 19.4784C15.939 19.1611 15.7332 18.5994 15.6495 18.0641C15.6402 17.8973 15.5059 17.7443 15.3248 17.757C14.8713 17.7516 14.4178 17.7528 13.9643 17.7564C13.8061 17.7431 13.6416 17.8557 13.6329 18.0172C13.5397 20.4689 15.7914 21.5377 17.9039 21.773C19.1108 21.888 20.3442 21.8814 21.5327 21.6224C22.4261 21.419 23.3219 21.0444 23.9369 20.3563C24.6953 19.52 24.8444 18.2749 24.5043 17.2332C24.2443 16.4559 23.5012 15.9573 22.7416 15.7008C21.7086 15.3466 20.4844 15.1562 19.5488 15.0671C18.1889 14.9376 16.5729 14.9905 16.188 14.0969C16.0345 13.629 16.1651 13.048 16.5951 12.7602C17.7328 11.9885 20.0483 12.091 21.2265 12.6675C21.7675 12.9384 22.081 13.4948 22.2104 14.0565C22.2344 14.2215 22.3454 14.3937 22.5364 14.3865C22.9868 14.3955 23.4372 14.3889 23.8875 14.3895C24.0422 14.4003 24.2116 14.313 24.2418 14.1546C24.2227 12.9806 23.6232 11.7788 22.5419 11.2062Z'
          fill='#8CC84B'
        ></path>
      </g>
    </svg>
  );

  const NextIcon = ({ className }: { className?: string }) => (
    <svg
      className={className}
      width='50'
      height='50'
      viewBox='0 0 256 256'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      preserveAspectRatio='xMidYMid'
      fill='#000000'
    >
      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
      <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
      <g id='SVGRepo_iconCarrier'>
        <g>
          <path
            d='M119.616813,0.0688905149 C119.066276,0.118932037 117.314565,0.294077364 115.738025,0.419181169 C79.3775171,3.69690087 45.3192571,23.3131775 23.7481916,53.4631946 C11.7364614,70.2271045 4.05395894,89.2428829 1.15112414,109.384595 C0.12512219,116.415429 0,118.492153 0,128.025062 C0,137.557972 0.12512219,139.634696 1.15112414,146.665529 C8.10791789,194.730411 42.3163245,235.11392 88.7116325,250.076335 C97.0197458,252.753556 105.778299,254.580072 115.738025,255.680985 C119.616813,256.106338 136.383187,256.106338 140.261975,255.680985 C157.453763,253.779407 172.017986,249.525878 186.382014,242.194795 C188.584164,241.068861 189.00958,240.768612 188.709286,240.518404 C188.509091,240.36828 179.124927,227.782837 167.86393,212.570214 L147.393939,184.922273 L121.743891,146.965779 C107.630108,126.098464 96.0187683,109.034305 95.9186706,109.034305 C95.8185728,109.009284 95.7184751,125.873277 95.6684262,146.465363 C95.5933529,182.52028 95.5683284,183.971484 95.1178886,184.82219 C94.4672532,186.048207 93.9667644,186.548623 92.915738,187.099079 C92.114956,187.499411 91.4142717,187.574474 87.6355816,187.574474 L83.3063539,187.574474 L82.1552297,186.848872 C81.4044966,186.373477 80.8539589,185.747958 80.4785924,185.022356 L79.9530792,183.896422 L80.0031281,133.729796 L80.0782014,83.5381493 L80.8539589,82.5623397 C81.25435,82.0369037 82.1051808,81.3613431 82.7057674,81.0360732 C83.7317693,80.535658 84.1321603,80.4856165 88.4613881,80.4856165 C93.5663734,80.4856165 94.4172043,80.6857826 95.7434995,82.1369867 C96.1188661,82.5373189 110.007429,103.454675 126.623656,128.650581 C143.239883,153.846488 165.962072,188.250034 177.122972,205.139048 L197.392766,235.839522 L198.418768,235.163961 C207.502639,229.259062 217.112023,220.852086 224.719453,212.09482 C240.910264,193.504394 251.345455,170.835585 254.848876,146.665529 C255.874878,139.634696 256,137.557972 256,128.025062 C256,118.492153 255.874878,116.415429 254.848876,109.384595 C247.892082,61.3197135 213.683675,20.9362052 167.288368,5.97379012 C159.105376,3.32158945 150.396872,1.49507389 140.637341,0.394160408 C138.234995,0.143952798 121.693842,-0.131275573 119.616813,0.0688905149 L119.616813,0.0688905149 Z M172.017986,77.4831252 C173.219159,78.0836234 174.195112,79.2345784 174.545455,80.435575 C174.74565,81.0861148 174.795699,94.9976579 174.74565,126.348671 L174.670577,171.336 L166.73783,159.17591 L158.780059,147.01582 L158.780059,114.313685 C158.780059,93.1711423 158.880156,81.2862808 159.030303,80.7108033 C159.430694,79.3096407 160.306549,78.2087272 161.507722,77.5581875 C162.533724,77.0327515 162.909091,76.98271 166.837928,76.98271 C170.541544,76.98271 171.19218,77.0327515 172.017986,77.4831252 Z'
            style={{ fill: '#ffffff', fillRule: 'evenodd' }}
          ></path>
        </g>
      </g>
    </svg>
  );

  const technologies = [
    { name: 'Python', icon: PythonIcon },
    { name: 'Git', icon: GitIcon },
    { name: 'TypeScript', icon: TypeScriptIcon },
    { name: 'React', icon: ReactIcon },
    { name: 'Node.js', icon: NodeIcon },
    { name: 'Next.js', icon: NextIcon },
  ];

  // Sample data for the carousel
  const cards = [
    {
      src: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Project Alpha",
      category: "Web Development",
      content: <div>
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          A full-stack web application built with React and Node.js. Features include user authentication, 
          real-time data updates, and responsive design.
        </p>
      </div>,
    },
    {
      src: "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Project Beta",
      category: "Mobile App",
      content: <div>
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          A cross-platform mobile application developed with React Native. Includes features like offline support,
          push notifications, and seamless user experience.
        </p>
      </div>,
    },
    {
      src: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Project Gamma",
      category: "Data Analytics",
      content: <div>
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          A comprehensive data analytics platform with machine learning capabilities. Built using Python,
          TensorFlow, and modern visualization libraries.
        </p>
      </div>,
    },
  ];

  const cycleSentences = useCallback(() => {
    setShowSentence(true);

    setTimeout(() => {
      setShowSentence(false);

      setTimeout(() => {
        setCurrentSentence((prev) => (prev + 1) % sentences.length);
        cycleSentences();
      }, 1500); // Wait 1s for fade out to complete
    }, 4000); // Show for 5s (1s fade-in + 4s fully visible)
  }, [sentences.length]);

  useEffect(() => {
    const startSentences = setTimeout(() => {
      cycleSentences();
    }, 3500);

    return () => clearTimeout(startSentences);
  }, [cycleSentences]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      lastScrollY.current = currentScrollY;

      // Calculate overall home page progress
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(currentScrollY / documentHeight, 1);
      setHomePageProgress(scrollProgress);

      // Calculate about section scroll progress
      if (aboutSectionRef.current) {
        const rect = aboutSectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate progress based on how much of the section is visible
        let progress = 0;

        if (rect.top <= windowHeight && rect.bottom >= 0) {
          // Section is at least partially visible
          if (rect.top <= 0 && rect.bottom >= windowHeight) {
            // Section completely fills viewport
            progress = 1;
          } else if (rect.top > 0) {
            // Section is entering from bottom
            progress = Math.max(0, (windowHeight - rect.top) / windowHeight);
          } else {
            // Section is exiting from top
            progress = Math.max(0, rect.bottom / windowHeight);
          }
        }

        setAboutSectionProgress(progress);

        // Add delay for skills animation - triggers after about section is mostly visible
        if (progress > 0.6) {
          setTimeout(() => {
            setSkillsProgress(Math.min((progress - 0.6) / 0.4, 1));
          }, 500);
        } else {
          setSkillsProgress(0);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Cursor Light Effect */}
      <div
        ref={cursorLightRef}
        className='cursor-light'
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />

      <LoadingWrapper>
        <div className='h-screen w-full flex items-center justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden'>
          {/* Beam */}
          <div className='beam rounded-full pointer-events-none'></div>
          <Spotlight className='-top-40 left-0 md:left-60 md:-top-20' fill='white' />
          <div className='p-4 sm:p-6 md:p-8 max-w-7xl mx-auto relative z-10 w-full'>
            <div className='text-center'>
              <h1 className='text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold'>
                <HypertextReveal
                  text='Hello, '
                  className='bg-clip-text text-transparent bg-gradient-to-b from-purple-300 via-purple-500 to-purple-700'
                  delay={0.5}
                  duration={1}
                />
                <HypertextReveal
                  text="I'm "
                  className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400'
                  delay={1.5}
                  duration={0.5}
                />
                <AuroraText text='William Ji.' delay={2} />
              </h1>

              <div className='mt-4 md:mt-6 text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold flex justify-center items-center px-4'>
                <motion.div
                  key={currentSentence}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showSentence ? 1 : 0 }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                  className='h-8 md:h-12 flex items-center justify-center text-neutral-300 text-center'
                >
                  {sentences[currentSentence]}
                </motion.div>
              </div>
            </div>
          </div>

          <div className='absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2'>
            <div className='animate-bounce'>
              <div
                className='arrow-button w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white/30 flex items-center justify-center cursor-pointer hover:border-white/60 hover:bg-white/10 transition-all duration-300'
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              >
                <svg
                  className='w-5 h-5 md:w-6 md:h-6 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M12 5v14m7-7l-7 7-7-7' />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div
          id="about-section"
          ref={aboutSectionRef}
          className='w-full h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] px-6 md:px-8 lg:px-12 xl:px-16'
        >
          <div className='h-full flex flex-col pt-12 md:pt-16 lg:pt-20 pb-12 md:pb-16 lg:pb-20'>
            {/* Container 1: ABOUT ME 3-Column Layout */}
            <div className='flex items-start justify-center mb-8 md:mb-10 lg:mb-12'>
              <div className='flex flex-col lg:flex-row gap-8 lg:gap-8 xl:gap-12 items-start lg:items-start'>
                {/* Left Section - ABOUT ME Title */}
                <div className='flex-shrink-0 lg:w-auto'>
                  <motion.h2
                    className='text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 md:mb-3 text-center lg:text-left'
                    style={{
                      fontFamily: 'var(--font-geist), Geist Sans, system-ui, sans-serif',
                      transform: `translateX(${-100 + aboutSectionProgress * 100}px)`,
                      opacity: aboutSectionProgress,
                    }}
                  >
                    ABOUT
                  </motion.h2>
                  <motion.h2
                    className='text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold text-center lg:text-left'
                    style={{
                      fontFamily: 'var(--font-geist), Geist Sans, system-ui, sans-serif',
                      transform: `translateX(${100 - aboutSectionProgress * 100}px)`,
                      opacity: aboutSectionProgress,
                      color: 'transparent',
                      WebkitTextStroke: '2px white',
                    }}
                  >
                    ME
                  </motion.h2>
                </div>

                {/* Middle Section - Avatar */}
                <div className='flex-shrink-0 flex justify-center lg:justify-start items-start'>
                  <div
                    className='relative transition-opacity duration-500 ease-in-out'
                    style={{
                      opacity: aboutSectionProgress,
                    }}
                  >
                    <Image
                      src='/avatar.png'
                      alt='William Ji Avatar'
                      width={320}
                      height={320}
                      className='w-56 sm:w-60 md:w-64 lg:w-56 xl:w-64 h-auto rounded-2xl'
                      priority
                    />
                  </div>
                </div>

                {/* Right Section - Combined Paragraphs */}
                <div className='flex-1 relative max-w-2xl'>
                  {/* Vertical Progress Line */}
                  <div className='absolute right-0 top-0 bottom-0 w-0.5 bg-neutral-800 rounded-full hidden lg:block'>
                    <div
                      className='rounded-full transition-all duration-300 ease-out'
                      style={{
                        height: `${homePageProgress * 100}%`,
                        width: '100%',
                        background: 'linear-gradient(to bottom, #f59e0b, #ec4899, #8b5cf6, #3b82f6, #10b981)',
                      }}
                    />
                  </div>
                  <div className='lg:pr-12'>
                    <p
                      className='text-base sm:text-lg md:text-xl lg:text-base xl:text-lg text-neutral-300 leading-relaxed text-justify mb-8 lg:mb-10'
                      style={{
                        fontFamily: 'var(--font-poppins), system-ui, sans-serif !important',
                      }}
                    >
                      I'm William (Haohua) Ji. I recently graduate from the University of Toronto (June 2025) with a
                      double major in Computer Science and Statistics. I currently work at{' '}
                      <span
                        className='font-bold bg-clip-text text-transparent'
                        style={{
                          backgroundImage: 'linear-gradient(45deg, #f59e0b, #ec4899, #8b5cf6, #3b82f6, #10b981)',
                          backgroundSize: '200% 200%',
                          animation: 'aurora 6s ease-in-out infinite',
                        }}
                      >
                        CIBC Mellon and pursue a CFA Level I
                      </span>
                      . Previously, I worked as a{' '}
                      <span
                        className='font-bold bg-clip-text text-transparent'
                        style={{
                          backgroundImage: 'linear-gradient(45deg, #f59e0b, #ec4899, #8b5cf6, #3b82f6, #10b981)',
                          backgroundSize: '200% 200%',
                          animation: 'aurora 6s ease-in-out infinite',
                        }}
                      >
                        Performance Test Analyst at CIBC
                      </span>{' '}
                      and{' '}
                      <span
                        className='font-bold bg-clip-text text-transparent'
                        style={{
                          backgroundImage: 'linear-gradient(45deg, #f59e0b, #ec4899, #8b5cf6, #3b82f6, #10b981)',
                          backgroundSize: '200% 200%',
                          animation: 'aurora 6s ease-in-out infinite',
                        }}
                      >
                        co-founded Campus Eats
                      </span>
                      , a student-focused food delivery platform that helped local vendors grow.
                    </p>

                    <p
                      className='text-base sm:text-lg md:text-xl lg:text-base xl:text-lg text-neutral-300 leading-relaxed text-justify'
                      style={{
                        fontFamily: 'var(--font-poppins), system-ui, sans-serif !important',
                      }}
                    >
                      I am expertise in{' '}
                      <span
                        className='font-bold bg-clip-text text-transparent'
                        style={{
                          backgroundImage: 'linear-gradient(45deg, #f59e0b, #ec4899, #8b5cf6, #3b82f6, #10b981)',
                          backgroundSize: '200% 200%',
                          animation: 'aurora 6s ease-in-out infinite',
                        }}
                      >
                        Full-Stack Web Development, Software Business, and UI/UX Design
                      </span>
                      . Besides, I am actively contributing to a diverse range of 10+ projects, software business
                      startups, and more.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Container 2: SKILLS Section - Full Width */}
            <div className='flex-1 w-full'>
              {/* TECH STACK Title */}
              <div className='flex justify-end mb-4 lg:mb-6'>
                <div className='text-right'>
                  <motion.h2
                    className='text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold text-white'
                    style={{
                      fontFamily: 'var(--font-geist), Geist Sans, system-ui, sans-serif',
                      transform: `translateX(${100 - skillsProgress * 100}px)`,
                      opacity: skillsProgress,
                    }}
                  >
                    TECH{' '}
                    <span
                      style={{
                        color: 'transparent',
                        WebkitTextStroke: '2px white',
                      }}
                    >
                      STACK
                    </span>
                  </motion.h2>
                </div>
              </div>

              {/* Tech Stack Marquees */}
              <div className='w-full space-y-2'>
                <InfiniteMovingCards
                  items={technologies}
                  direction='right'
                  speed='fast'
                  pauseOnHover={false}
                  className='w-full'
                />
                <InfiniteMovingCards
                  items={technologies}
                  direction='left'
                  speed='fast'
                  pauseOnHover={false}
                  className='w-full'
                />
              </div>
            </div>
          </div>
        </div>

        {/* WORK EXPERIENCE Section */}
        <div className='w-full h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] px-6 md:px-8 lg:px-12 xl:px-16'>
          <div className='h-full flex items-center justify-center'>
            <div className='flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-20 items-center lg:items-center max-w-7xl mx-auto'>
              {/* Left Section - WORK EXPERIENCE Title */}
              <div className='flex-shrink-0'>
                <motion.h2
                  className='text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 md:mb-3 text-center lg:text-left'
                  style={{
                    fontFamily: 'var(--font-geist), Geist Sans, system-ui, sans-serif',
                  }}
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  WORK
                </motion.h2>
                <motion.h2
                  className='text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold text-center lg:text-left'
                  style={{
                    fontFamily: 'var(--font-geist), Geist Sans, system-ui, sans-serif',
                    color: 'transparent',
                    WebkitTextStroke: '2px white',
                  }}
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  EXPERIENCE
                </motion.h2>
              </div>

              {/* Middle Section - Timeline */}
              <div className='flex-shrink-0 relative'>
                <div className='h-80 w-0.5 bg-neutral-800 rounded-full relative'>
                  {/* Animated smaller line inside */}
                  <motion.div
                    className='absolute w-0.5 rounded-full'
                    style={{ 
                      height: '50px',
                      background: 'linear-gradient(to bottom, #f59e0b, #ec4899, #8b5cf6, #3b82f6, #10b981)',
                      boxShadow: '0 0 8px rgba(245, 158, 11, 0.6)',
                    }}
                    animate={{
                      y: [0, 270, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  {/* Timeline markers - equally spaced */}
                  <div
                    className='absolute -left-1 w-2.5 h-2.5 rounded-full shadow-lg'
                    style={{
                      top: 'calc(16.67% - 5px)',
                      background: 'linear-gradient(to bottom right, #f59e0b, #ec4899)',
                      boxShadow: '0 0 10px rgba(245, 158, 11, 0.5)',
                    }}
                  />
                  <div
                    className='absolute -left-1 w-2.5 h-2.5 rounded-full shadow-lg'
                    style={{
                      top: 'calc(50% - 5px)',
                      background: 'linear-gradient(to bottom right, #8b5cf6, #3b82f6)',
                      boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)',
                    }}
                  />
                  <div
                    className='absolute -left-1 w-2.5 h-2.5 rounded-full shadow-lg'
                    style={{
                      top: 'calc(83.33% - 5px)',
                      background: 'linear-gradient(to bottom right, #3b82f6, #10b981)',
                      boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
                    }}
                  />
                </div>
              </div>

              {/* Right Section - Work Experience Cards */}
              <div className='flex-1 space-y-8 max-w-2xl'>
                {/* Card 1 */}
                <motion.div
                  className='relative'
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <GlowingEffect
                    disabled={false}
                    borderWidth={1}
                    proximity={100}
                    spread={15}
                    blur={0}
                    className='rounded-lg'
                  />
                  <div className='flex items-center gap-4 p-4 rounded-lg bg-neutral-900/50 transition-colors relative z-10'>
                    <div className='w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1'>
                      <Image
                        src='/CIBC_Mellon_logo.png'
                        alt='CIBC Mellon Logo'
                        width={40}
                        height={40}
                        className='w-full h-full object-contain'
                      />
                    </div>
                    <div className='flex-1'>
                      <h3
                        className='text-lg font-semibold text-white mb-1'
                        style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
                      >
                        Financial Derivatives Specialist
                      </h3>
                      <p
                        className='text-neutral-400 text-sm'
                        style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
                      >
                        CIBC MELLON • Jul 2025 - Present
                      </p>
                      <p
                        className='text-neutral-300 text-sm mt-2 text-justify'
                        style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
                      >
                        Implemented and managed trade reconciliation processes while serving as a client-facing
                        specialist, ensuring accuracy in derivative transactions and prompt resolution of trade
                        discrepancies.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                  className='relative'
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <GlowingEffect
                    disabled={false}
                    borderWidth={1}
                    proximity={100}
                    spread={15}
                    blur={0}
                    className='rounded-lg'
                  />
                  <div className='flex items-center gap-4 p-4 rounded-lg bg-neutral-900/50 transition-colors relative z-10'>
                    <div className='w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1'>
                      <Image
                        src='/campus_eats_logo.jpeg'
                        alt='Campus Eats Logo'
                        width={40}
                        height={40}
                        className='w-full h-full object-contain rounded'
                      />
                    </div>
                    <div className='flex-1'>
                      <h3
                        className='text-lg font-semibold text-white mb-1'
                        style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
                      >
                        Co-Founder and Web Development Lead
                      </h3>
                      <p
                        className='text-neutral-400 text-sm'
                        style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
                      >
                        CAMPUS EATS • Sep 2023 - Aug 2024
                      </p>
                      <p
                        className='text-neutral-300 text-sm mt-2 text-justify'
                        style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
                      >
                        Co-founded and led the full-stack development and strategic growth of a student-focused food
                        delivery platform, driving adoption through cross-functional collaboration, scalable
                        architecture, and user-centered feature prioritization.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Card 3 */}
                <motion.div
                  className='relative'
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <GlowingEffect
                    disabled={false}
                    borderWidth={1}
                    proximity={100}
                    spread={15}
                    blur={0}
                    className='rounded-lg'
                  />
                  <div className='flex items-center gap-4 p-4 rounded-lg bg-neutral-900/50 transition-colors relative z-10'>
                    <div className='w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1'>
                      <Image
                        src='/CIBC_logo.png'
                        alt='CIBC Logo'
                        width={40}
                        height={40}
                        className='w-full h-full object-contain'
                      />
                    </div>
                    <div className='flex-1'>
                      <h3
                        className='text-lg font-semibold text-white mb-1'
                        style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
                      >
                        Performance Test Analyst
                      </h3>
                      <p
                        className='text-neutral-400 text-sm'
                        style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
                      >
                        CIBC • Sep 2022 - Aug 2023
                      </p>
                      <p
                        className='text-neutral-300 text-sm mt-2 text-justify'
                        style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
                      >
                        Led performance testing and optimization initiatives across 21 API and capital markets teams,
                        developing automated pipelines that improved test speed and reliability while enhancing system
                        integration and API efficiency.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* PROJECTS Section */}
        <div id="projects-section" className='w-full min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] py-20'>
          <div className='max-w-7xl mx-auto px-6 md:px-8 lg:px-12 xl:px-16'>
            {/* Section Title */}
            <motion.div
              className='text-center mb-8'
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 
                className='text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold text-white mb-4'
                style={{ fontFamily: 'var(--font-geist), Geist Sans, system-ui, sans-serif' }}
              >
                MY{' '}
                <span
                  style={{
                    color: 'transparent',
                    WebkitTextStroke: '2px white',
                  }}
                >
                  PROJECTS
                </span>
              </h2>
              <p 
                className='text-neutral-400 text-lg max-w-2xl mx-auto'
                style={{ fontFamily: 'var(--font-poppins), system-ui, sans-serif' }}
              >
                A showcase of my latest work and creative projects
              </p>
            </motion.div>

            {/* Apple Cards Carousel */}
            <Carousel items={cards.map((card, index) => (
              <Card key={card.src} card={card} index={index} />
            ))} />
          </div>
        </div>

        {/* Footer */}
        <footer className='w-full bg-black/[0.96] border-t border-neutral-800 py-8'>
          <div className='max-w-7xl mx-auto px-6 md:px-8 lg:px-12 xl:px-16'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
              <motion.p 
                className='text-sm md:text-base bg-clip-text text-transparent'
                style={{ 
                  fontFamily: 'var(--font-poppins), system-ui, sans-serif',
                  backgroundImage: 'linear-gradient(45deg, #f59e0b, #ec4899, #8b5cf6, #3b82f6, #10b981)',
                  backgroundSize: '200% 200%',
                  animation: 'aurora 6s ease-in-out infinite',
                }}
                animate={{
                  backgroundImage: [
                    'linear-gradient(45deg, #f59e0b, #ec4899, #8b5cf6, #3b82f6, #10b981)',
                    'linear-gradient(45deg, #ec4899, #8b5cf6, #3b82f6, #10b981, #f59e0b)',
                    'linear-gradient(45deg, #8b5cf6, #3b82f6, #10b981, #f59e0b, #ec4899)',
                    'linear-gradient(45deg, #3b82f6, #10b981, #f59e0b, #ec4899, #8b5cf6)',
                    'linear-gradient(45deg, #10b981, #f59e0b, #ec4899, #8b5cf6, #3b82f6)',
                    'linear-gradient(45deg, #f59e0b, #ec4899, #8b5cf6, #3b82f6, #10b981)',
                  ],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                Designed and Developed by William Ji
              </motion.p>
              <motion.p 
                className='text-sm md:text-base bg-clip-text text-transparent'
                style={{ 
                  fontFamily: 'var(--font-poppins), system-ui, sans-serif',
                  backgroundImage: 'linear-gradient(45deg, #f59e0b, #ec4899, #8b5cf6, #3b82f6, #10b981)',
                  backgroundSize: '200% 200%',
                  animation: 'aurora 6s ease-in-out infinite',
                }}
                animate={{
                  backgroundImage: [
                    'linear-gradient(45deg, #10b981, #f59e0b, #ec4899, #8b5cf6, #3b82f6)',
                    'linear-gradient(45deg, #3b82f6, #10b981, #f59e0b, #ec4899, #8b5cf6)',
                    'linear-gradient(45deg, #8b5cf6, #3b82f6, #10b981, #f59e0b, #ec4899)',
                    'linear-gradient(45deg, #ec4899, #8b5cf6, #3b82f6, #10b981, #f59e0b)',
                    'linear-gradient(45deg, #f59e0b, #ec4899, #8b5cf6, #3b82f6, #10b981)',
                    'linear-gradient(45deg, #10b981, #f59e0b, #ec4899, #8b5cf6, #3b82f6)',
                  ],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              >
                Copyright © {new Date().getFullYear()} WJ
              </motion.p>
            </div>
          </div>
        </footer>
      </LoadingWrapper>
    </>
  );
}
