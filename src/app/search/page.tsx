'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { priceCalendar, searchResults, aiPlans, butlerData } from '@/data/mock';
import FlightDetailModal from '@/components/FlightDetailModal';
import AIPlanPanel from '@/components/AIPlanPanel';
import ButlerPanel from '@/components/ButlerPanel';

function PriceCalendar({ selected, onSelect }: { selected: string | null, onSelect: (d: string) => void }) {
  return (
    <div className="mx-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold">价格日历</span>
        <span className="text-xs text-[var(--text-secondary)]">最佳出发：4/13-14</span>
      </div>
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {priceCalendar.map(day => {
          const bg = day.level === 'low' ? 'bg-emerald-50 border-emerald-300' : day.level === 'high' ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200';
          const priceColor = day.level === 'low' ? 'text-emerald-600' : day.level === 'high' ? 'text-red-500' : 'text-gray-600';
          const isSelected = selected === day.date;
          return (
            <button
              key={day.date}
              onClick={() => onSelect(day.date)}
              className={`flex-shrink-0 w-[58px] rounded-xl border p-2 text-center transition ${bg} ${isSelected ? 'ring-2 ring-[var(--primary)] border-[var(--primary)]' : ''}`}
            >
              <div className="text-xs text-[var(--text-secondary)]">{day.date}</div>
              <div className={`text-sm font-bold ${priceColor}`}>¥{day.price}</div>
              {day.level === 'low' && <div className="text-[10px] text-emerald-500 mt-0.5">低价</div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FlightCard({ flight, onClick }: { flight: typeof searchResults[0], onClick: () => void }) {
  return (
    <div className="card mx-4 mb-3 p-4 cursor-pointer hover:shadow-lg transition" onClick={onClick}>
      <div className="flex flex-wrap gap-1.5 mb-2.5">
        {flight.tags.map(tag => {
          const cls = tag === '历史低价' ? 'tag-red' : tag.includes('行李') || tag.includes('退改') ? 'tag-green' : 'tag-blue';
          return <span key={tag} className={`tag ${cls}`}>{tag}</span>;
        })}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-xl font-bold">{flight.depTime}</div>
            <div className="text-[10px] text-[var(--text-secondary)]">{flight.depAirport}</div>
          </div>
          <div className="text-center px-2">
            <div className="text-[10px] text-[var(--text-secondary)]">{flight.duration}</div>
            <div className="w-16 h-px bg-[var(--border)] relative my-1">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-[10px]">✈️</div>
            </div>
            <div className="text-[10px] text-[var(--text-secondary)]">{flight.stops}</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">{flight.arrTime}</div>
            <div className="text-[10px] text-[var(--text-secondary)]">{flight.arrAirport}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-[var(--text-secondary)]">{flight.airline} {flight.flightNo}</div>
          {flight.realPrice !== flight.price ? (
            <>
              <div className="text-[var(--primary)] text-xl font-bold">¥{flight.price}</div>
              <div className="text-xs text-[var(--text-secondary)]">真实总价 <span className="font-bold text-[var(--text)]">¥{flight.realPrice}</span></div>
            </>
          ) : (
            <div className="text-[var(--primary)] text-xl font-bold">¥{flight.price}</div>
          )}
        </div>
      </div>

      <div className="mt-2.5 pt-2.5 border-t border-[var(--border)] flex items-center gap-1.5">
        <span className="text-sm">🤖</span>
        <span className="text-xs text-[var(--text-secondary)]">{flight.aiComment}</span>
      </div>
    </div>
  );
}

function SearchPageInner() {
  const router = useRouter();
  const params = useSearchParams();
  const destination = params.get('to') || '大阪';
  const [activeTab, setActiveTab] = useState<'search' | 'ai'>('search');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<typeof searchResults[0] | null>(null);
  const [showButler, setShowButler] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(2); // 默认选性价比方案

  return (
    <div className="fade-in">
      {/* 顶部搜索条件 */}
      <div className="gradient-orange px-4 pt-4 pb-5">
        <button onClick={() => router.back()} className="text-white mb-2 text-sm">← 返回</button>
        <div className="bg-white/20 rounded-2xl p-3 flex items-center justify-between">
          <div className="text-white">
            <span className="font-bold text-lg">上海</span>
            <span className="mx-3 opacity-70">→</span>
            <span className="font-bold text-lg">{destination}</span>
          </div>
          <div className="text-white/80 text-sm">单程</div>
        </div>
      </div>

      {/* 价格日历 */}
      <div className="mt-4">
        <PriceCalendar selected={selectedDate} onSelect={setSelectedDate} />
      </div>

      {/* 双Tab */}
      <div className="mx-4 flex">
        <button
          onClick={() => setActiveTab('search')}
          className={`flex-1 py-3 text-sm font-bold text-center rounded-t-xl transition-all ${
            activeTab === 'search'
              ? 'bg-white text-[var(--text)] shadow-sm'
              : 'bg-[var(--bg)] text-[var(--text-secondary)]'
          }`}
        >
          全网特价搜索结果
        </button>
        <button
          onClick={() => setActiveTab('ai')}
          className={`flex-1 py-3 text-sm font-bold text-center rounded-t-xl transition-all ${
            activeTab === 'ai'
              ? 'bg-white text-[var(--text)] shadow-sm'
              : 'bg-[var(--bg)] text-[var(--text-secondary)]'
          }`}
        >
          🤖 AI智能规划
        </button>
      </div>

      {/* 内容区 */}
      <div className={`${activeTab === 'search' ? 'bg-white' : 'bg-white'} mx-4 rounded-b-2xl ${activeTab === 'search' ? 'rounded-tr-2xl' : 'rounded-tl-2xl'} pb-4 shadow-sm`}>
        {activeTab === 'search' ? (
          /* Tab1: 全网搜索结果 */
          <div className="pt-3">
            <div className="px-4 pb-3 flex items-center justify-between">
              <div className="flex gap-2">
                {['综合推荐', '价格↑', '时间↑'].map((s, i) => (
                  <button key={s} className={`text-xs px-3 py-1.5 rounded-full ${i === 0 ? 'bg-[var(--primary)] text-white' : 'bg-gray-100 text-[var(--text-secondary)]'}`}>{s}</button>
                ))}
              </div>
              <button className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                <span>筛选</span> <span>▾</span>
              </button>
            </div>
            {searchResults.map(flight => (
              <FlightCard key={flight.id} flight={flight} onClick={() => setSelectedFlight(flight)} />
            ))}
          </div>
        ) : (
          /* Tab2: AI智能规划 */
          <div className="pt-3 relative">
            <AIPlanPanel
              plans={aiPlans}
              selectedPlan={selectedPlan}
              onSelectPlan={setSelectedPlan}
              onToggleButler={() => setShowButler(!showButler)}
              showButler={showButler}
            />
          </div>
        )}
      </div>

      {/* AI管家侧边面板 */}
      {showButler && activeTab === 'ai' && (
        <ButlerPanel data={butlerData} plan={aiPlans[selectedPlan]} onClose={() => setShowButler(false)} />
      )}

      {/* 航班详情弹窗 */}
      {selectedFlight && (
        <FlightDetailModal flight={selectedFlight} onClose={() => setSelectedFlight(null)} />
      )}

      <div className="h-8" />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-[var(--text-secondary)]">加载中...</div>}>
      <SearchPageInner />
    </Suspense>
  );
}
