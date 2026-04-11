'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { flashDeals, todayDeals, airlineEvents } from '@/data/mock';

function FlashDealBanner() {
  const [current, setCurrent] = useState(0);
  const [countdown, setCountdown] = useState(flashDeals[0].countdown);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % flashDeals.length), 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        const parts = prev.split(':').map(Number);
        let [h, m, s] = parts;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) return '00:00:00';
        return [h, m, s].map(n => String(n).padStart(2, '0')).join(':');
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [current]);

  const deal = flashDeals[current];

  return (
    <div className="gradient-orange mx-4 rounded-2xl p-4 text-white relative overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">⚡</span>
          <span className="font-bold text-sm">限时闪购</span>
        </div>
        <div className="bg-white/20 rounded-lg px-3 py-1 text-sm font-mono font-bold">
          {countdown}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-lg font-bold">{deal.from} → {deal.to} {deal.flag}</div>
          <div className="text-sm opacity-90 mt-1">{deal.airline} · {deal.label}</div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold">¥{deal.price}</div>
          <div className="text-xs opacity-80">剩{deal.remaining}张</div>
        </div>
      </div>
      <button className="mt-3 w-full bg-white text-[var(--primary)] rounded-xl py-2.5 font-bold text-sm hover:bg-white/90 transition">
        立即抢购
      </button>
      <div className="flex justify-center gap-1.5 mt-3">
        {flashDeals.map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full transition ${i === current ? 'bg-white' : 'bg-white/40'}`} />
        ))}
      </div>
    </div>
  );
}

function DealCard({ deal }: { deal: typeof todayDeals[0] }) {
  const router = useRouter();
  const tagClass = { red: 'tag-red', green: 'tag-green', blue: 'tag-blue', yellow: 'tag-yellow' }[deal.tagType];

  return (
    <div
      className="card overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => router.push(`/search?to=${deal.city}`)}
    >
      <div className="relative h-32">
        <img src={deal.image} alt={deal.city} className="w-full h-full object-cover" />
        <div className={`tag ${tagClass} absolute top-2 left-2`}>{deal.tag}</div>
      </div>
      <div className="p-3">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-base">{deal.city}</span>
          <span>{deal.flag}</span>
        </div>
        <div className="text-xs text-[var(--text-secondary)] mt-0.5">{deal.airline}</div>
        <div className="flex items-baseline gap-1 mt-1.5">
          <span className="text-[var(--primary)] text-xl font-bold">¥{deal.price}</span>
          <span className="text-xs text-[var(--text-secondary)]">起</span>
        </div>
      </div>
    </div>
  );
}

function AirlineCalendar() {
  return (
    <div className="mx-4 mt-6">
      <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
        <span>📅</span> 航司大促日历
      </h2>
      <div className="card divide-y divide-[var(--border)]">
        {airlineEvents.map((event, i) => (
          <div key={i} className="flex items-start gap-3 p-3.5">
            <div className="gradient-orange text-white text-xs font-bold rounded-lg px-2.5 py-1.5 min-w-[48px] text-center">
              {event.date}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">{event.airline}</span>
                <span className="tag tag-blue">{event.event}</span>
              </div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">{event.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [showTripReminder, setShowTripReminder] = useState(true);

  return (
    <div className="fade-in">
      {/* 顶部搜索栏 */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✈️</span>
            <span className="font-bold text-xl">捡漏飞行</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
            <span>📍</span>
            <span>上海出发</span>
          </div>
        </div>
        <div
          className="bg-white rounded-2xl px-4 py-3 flex items-center gap-2 shadow-sm cursor-pointer hover:shadow-md transition"
          onClick={() => router.push('/search')}
        >
          <span className="text-[var(--text-secondary)]">🔍</span>
          <span className="text-[var(--text-secondary)] text-sm">想去哪？搜索目的地</span>
        </div>
      </div>

      {/* 出行提醒卡片 */}
      {showTripReminder && (
        <div className="mx-4 mb-4 fade-in">
          <div className="card border-l-4 border-[var(--primary)] p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1" onClick={() => router.push('/trips')} style={{cursor:'pointer'}}>
              <span className="text-2xl">✈️</span>
              <div>
                <div className="font-bold text-sm">你的大阪之旅 5月15日出发</div>
                <div className="text-xs text-[var(--text-secondary)] mt-0.5">倒计时34天 · 点击查看完整攻略</div>
              </div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setShowTripReminder(false); }}
              className="text-[var(--text-secondary)] hover:text-[var(--text)] p-1"
            >✕</button>
          </div>
        </div>
      )}

      {/* 限时闪购 */}
      <FlashDealBanner />

      {/* 今日捡漏 */}
      <div className="mx-4 mt-6">
        <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
          <span>🔥</span> 今日捡漏 · 编辑精选
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {todayDeals.map(deal => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </div>

      {/* 航司大促日历 */}
      <AirlineCalendar />

      <div className="h-8" />
    </div>
  );
}
