import type { ComponentProps, ReactElement } from 'react';

export interface IconProps extends Omit<ComponentProps<'svg'>, 'children'> {
  size?: number;
}

export function MoneyIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} {...props}>
      <ellipse cx="12" cy="8" rx="7" ry="3" strokeWidth="2" />
      <path d="M5 8v4c0 1.66 3.13 3 7 3s7-1.34 7-3V8" strokeWidth="2" fill="none" />
      <path d="M5 12v4c0 1.66 3.13 3 7 3s7-1.34 7-3v-4" strokeWidth="2" fill="none" />
    </svg>
  );
}

export function EducationIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} {...props}>
      <path d="M2 8l10-5 10 5-10 5L2 8z" strokeWidth="2" fill="none" strokeLinejoin="round" />
      <path d="M6 10.5v5l6 3 6-3v-5" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PartyIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} {...props}>
      <path d="M5.5 3L7 9l-1.5 6M11 3l1 6-1 6M16.5 3L18 9l-1.5 6M8 15l-2 6M12 15v6M16 15l2 6" strokeWidth="2" strokeLinecap="round" />
      <circle cx="5.5" cy="3" r="1" fill="currentColor" />
      <circle cx="11" cy="3" r="1" fill="currentColor" />
      <circle cx="16.5" cy="3" r="1" fill="currentColor" />
    </svg>
  );
}

export function LoveIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} {...props}>
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeWidth="2" fill="none" strokeLinejoin="round" />
    </svg>
  );
}

export function HealthIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} {...props}>
      <circle cx="12" cy="12" r="9" strokeWidth="2" fill="none" />
      <path d="M12 7v10M7 12h10" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function TechIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} {...props}>
      <rect x="3" y="8" width="18" height="10" rx="2" strokeWidth="2" fill="none" />
      <path d="M8 21h8M12 18v3" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function BookIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} {...props}>
      <path d="M4 4v16a2 2 0 002 2h12a2 2 0 002-2V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M4 4h16M8 4v16M12 8h4M12 12h4" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function QuestionIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} {...props}>
      <circle cx="12" cy="12" r="9" strokeWidth="2" fill="none" />
      <path d="M9.5 9a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 4" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" strokeWidth="0" />
    </svg>
  );
}

export function DangerIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} {...props}>
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeWidth="2" fill="none" strokeLinejoin="round" />
      <path d="M12 9v4m0 4h.01" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ExclamationIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} {...props}>
      <circle cx="12" cy="12" r="9" strokeWidth="2" fill="none" />
      <path d="M12 8v4" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16" r="0.5" fill="currentColor" strokeWidth="0" />
    </svg>
  );
}

export function FoodIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} {...props}>
      <path d="M7 3v8M10 3v8M13 3v8" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 11v10M10 8c0 1.66-1.34 3-3 3v10" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function HomeIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} {...props}>
      <path d="M3 10l9-7 9 7v9a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeWidth="2" fill="none" strokeLinejoin="round" />
      <path d="M9 21V12h6v9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BulbIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} {...props}>
      <path d="M9 18h6M10 21h4" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 2a7 7 0 00-4 12.65V16h8v-1.35A7 7 0 0012 2z" strokeWidth="2" fill="none" strokeLinejoin="round" />
    </svg>
  );
}

export function CarIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} {...props}>
      <path d="M5 11l2-6h10l2 6H5z" strokeWidth="2" fill="none" strokeLinejoin="round" />
      <path d="M3 11v6a2 2 0 002 2h1a2 2 0 002-2v-1h8v1a2 2 0 002 2h1a2 2 0 002-2v-6H3z" strokeWidth="2" fill="none" strokeLinejoin="round" />
      <circle cx="7" cy="14" r="1" fill="currentColor" />
      <circle cx="17" cy="14" r="1" fill="currentColor" />
    </svg>
  );
}

export function HappyIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} {...props}>
      <circle cx="12" cy="12" r="9" strokeWidth="2" />
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="10" r="1" fill="currentColor" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function SadIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} {...props}>
      <circle cx="12" cy="12" r="9" strokeWidth="2" />
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="10" r="1" fill="currentColor" />
      <path d="M8 16s1.5-2 4-2 4 2 4 2" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ChurchIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} {...props}>
      <path d="M12 2v4M10 4h4" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 6l-8 6v9h16v-9l-8-6z" strokeWidth="2" strokeLinejoin="round" />
      <rect x="10" y="16" width="4" height="5" strokeWidth="2" />
    </svg>
  );
}

export function PlaneIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} {...props}>
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function PencilIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} {...props}>
      <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" strokeWidth="2" strokeLinejoin="round" />
      <path d="M15 5l4 4" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function DisketteIcon({ size = 24, className = '', ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} {...props}>
      <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" strokeWidth="2" strokeLinejoin="round" />
      <path d="M17 21v-8H7v8" strokeWidth="2" strokeLinejoin="round" />
      <path d="M7 3v5h8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function getIconsByName(): Record<string, typeof DisketteIcon> {
  return {
    money: MoneyIcon,
    education: EducationIcon,
    party: PartyIcon,
    love: LoveIcon,
    health: HealthIcon,
    tech: TechIcon,
    book: BookIcon,
    question: QuestionIcon,
    danger: DangerIcon,
    exclamation: ExclamationIcon,
    food: FoodIcon,
    home: HomeIcon,
    bulb: BulbIcon,
    car: CarIcon,
    happy: HappyIcon,
    sad: SadIcon,
    church: ChurchIcon,
    plane: PlaneIcon,
    pencil: PencilIcon,
    diskette: DisketteIcon,
  };
}
