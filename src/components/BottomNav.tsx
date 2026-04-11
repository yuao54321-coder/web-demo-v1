'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const tabs = [
  { href: '/', label: '发现', icon: '🔥' },
  { href: '/search', label: '搜索', icon: '🔍' },
  { href: '/trips', label: '我的行程', icon: '✈️' },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="bottom-nav">
      {tabs.map(tab => (
        <Link key={tab.href} href={tab.href} className={pathname === tab.href ? 'active' : ''}>
          <span className="text-xl">{tab.icon}</span>
          <span>{tab.label}</span>
        </Link>
      ))}
    </nav>
  );
}
