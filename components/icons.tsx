import type { SVGProps } from "react";
type Props = SVGProps<SVGSVGElement> & {
  name:
    | "arrow"
    | "bag"
    | "pin"
    | "phone"
    | "close"
    | "plus"
    | "minus"
    | "search"
    | "menu"
    | "bean"
    | "cup"
    | "dog"
    | "laptop"
    | "clock"
    | "check"
    | "trash"
    | "chevron";
};
export function Icon({ name, ...props }: Props) {
  const paths: Record<Props["name"], React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </>
    ),
    bag: (
      <>
        <path d="M5 7h14l1 14H4L5 7Z" />
        <path d="M8 8V6a4 4 0 0 1 8 0v2" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    phone: (
      <path d="m7 3 3 5-3 3a14 14 0 0 0 6 6l3-3 5 3c-1 4-4 5-7 3C8 17 4 12 3 7c-1-3 1-4 4-4Z" />
    ),
    close: <path d="m6 6 12 12M6 18 18 6" />,
    plus: <path d="M5 12h14M12 5v14" />,
    minus: <path d="M5 12h14" />,
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
    menu: <path d="M3 7h18M3 12h18M3 17h18" />,
    bean: (
      <>
        <ellipse cx="12" cy="12" rx="7" ry="10" transform="rotate(35 12 12)" />
        <path d="M16 4c-9 2-1 14-9 16" />
      </>
    ),
    cup: (
      <>
        <path d="M4 9h13v7a6 6 0 0 1-12 0L4 9ZM17 10h2a3 3 0 0 1 0 6h-2M3 22h17M8 6c-3-3 2-3 0-6M13 6c-3-3 2-3 0-6" />
      </>
    ),
    dog: (
      <>
        <path d="m7 8-4-4-1 9 5 1M17 8l4-4 1 9-5 1M7 8a10 10 0 0 1 10 0v9c0 6-10 6-10 0Z" />
        <path d="M9 12h.01M15 12h.01m-4 4 1 1 1-1m-1 1v3" />
      </>
    ),
    laptop: (
      <>
        <path d="M5 3h14v13H5zM2 20h20l-3-4H5l-3 4Z" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 6v6l4 2" />
      </>
    ),
    check: <path d="m5 12 4 4L20 5" />,
    trash: (
      <>
        <path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7" />
      </>
    ),
    chevron: <path d="m6 9 6 6 6-6" />,
  };
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
export function CupDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 220"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M46 88c29-9 74-11 115 0l-8 65c-7 35-91 32-99 0l-8-65Z" />
      <ellipse cx="104" cy="88" rx="58" ry="16" />
      <path d="M161 96c56-14 44 60-4 45M29 181c43 21 119 25 161-1M75 61c-22-22 27-27 5-51m31 50c-24-24 24-30 7-51m27 53c-21-23 21-22 5-43M57 111l5 35c3 18 26 22 40 24" />
      <path d="m28 73-11-5m173 80 13 4M187 61l10-9" />
    </svg>
  );
}
