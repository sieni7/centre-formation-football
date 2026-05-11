import { LucideProps } from 'lucide-react'

export const FootballIcon = (props: LucideProps) => (
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
    <circle cx="12" cy="12" r="10" />
    <path d="m6.7 6.7 10.6 10.6" />
    <path d="m6.7 17.3 10.6-10.6" />
    <path d="M12 2v20" />
    <path d="M2 12h20" />
  </svg>
)
