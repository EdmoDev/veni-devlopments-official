import 'react';

declare module 'react' {
  interface CSSProperties {
    '--i'?: number | string;
    '--z'?: number | string;
    // You can add other custom CSS properties here as needed
  }
} 