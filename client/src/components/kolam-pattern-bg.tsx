import { cn } from "@/lib/utils";

interface KolamPatternBgProps {
  className?: string;
  opacity?: number;
}

export function KolamPatternBg({ className, opacity = 0.05 }: KolamPatternBgProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={{ opacity }}
    >
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="kolam-pattern"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="50" cy="50" r="3" fill="currentColor" className="text-primary" />
            <circle cx="0" cy="0" r="3" fill="currentColor" className="text-primary" />
            <circle cx="100" cy="0" r="3" fill="currentColor" className="text-primary" />
            <circle cx="0" cy="100" r="3" fill="currentColor" className="text-primary" />
            <circle cx="100" cy="100" r="3" fill="currentColor" className="text-primary" />
            <path
              d="M 0,50 Q 25,25 50,50 T 100,50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-primary"
            />
            <path
              d="M 50,0 Q 75,25 50,50 T 50,100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-primary"
            />
            <path
              d="M 0,0 Q 50,25 100,0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-gold"
            />
            <path
              d="M 0,100 Q 50,75 100,100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-gold"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#kolam-pattern)" />
      </svg>
    </div>
  );
}
