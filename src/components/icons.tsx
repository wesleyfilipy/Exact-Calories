import type { SVGProps } from "react";

export const Icons = {
  apple: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 20.94c1.5 0 2.75 1.06 4 0 1.25-1.06 2.5-2.25 2.5-4C18.5 14.53 17.47 13 16 13c-1.47 0-2.53.47-3.5 1.5-1-.95-2-1.5-3.5-1.5-1.47 0-2.53 1.53-2.5 3.5 0 1.75 1.25 2.94 2.5 4 .75 1.06 2.5 0 4 0z" />
      <path d="M12 4c-2.44 0-4.5 2.1-4.5 5.5C7.5 12.63 9.42 15 12 15s4.5-2.37 4.5-5.5C16.5 6.1 14.44 4 12 4z" />
    </svg>
  ),
  googlePlay: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M325.3,234.3L104.6,13l280.8,161.2L325.3,234.3z M44.4,23.9L158.8,216.3L44.4,484.9V23.9z M325.3,277.7l-220.7,160l280.8-161.2L325.3,277.7z M104.6,499l220.7-160l-60.1-60.1L104.6,499z"
      />
    </svg>
  ),
  logo: (props: SVGProps<SVGSVGElement>) => (
     <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
      <path d="m16 16-8-8"/>
      <path d="m8 16 8-8"/>
    </svg>
  ),
};
