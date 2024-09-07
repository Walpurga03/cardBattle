// src/custom.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    'lightning-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      name: string;
      'button-text': string;
      to: string;
      labels: string;
      amounts: string;
      accent: string;
    };
  }
}