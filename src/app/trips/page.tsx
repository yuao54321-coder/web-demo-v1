'use client';
import { useState } from 'react';
import { tripData, butlerData } from '@/data/mock';

export default function TripsPage() {
  const [checklist, setChecklist] = useState(tripData.checklist);
  const [showButler, setShowButler] = useState(false);

  const toggleCheck = (id: number) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const doneCount = checklist.filter(c => c.done).length;
  const today = new Date();
  const depart = new Date(tripData.departDate);
  const daysLeft = Math.ceil((depart.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="fade-in">
      <div className="px-4 pt-4 pb-3">
        <h1 className="font-bold text-xl flex items-center gap-2">
          <span>✈️</span> 我的行程
        </h1>
      </div>

      {/* 行程卡片 */}
      <div className="mx-4 card overflow-hidden">
        <div className="gradient-orange p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-lg">上海 → {tripData.destination}</div>
              <div className="text-sm opacity-80 mt-0.5">{tripData.airline} · {tripData.plan}</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{daysLeft}</div>
              <div className="text-xs opacity-80">天后出发</div>
            </div>
          </div>
          <div className="mt-3 text-sm opacity-90">📅 {tripData.departDate}</div>
        </div>

        {/* 出行 checklist */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm">📋 出行准备（完成 {doneCount}/{checklist.length}）</h3>
            <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full gradient-orange rounded-full transition-all" style={{ width: `${(doneCount / checklist.length) * 100}%` }} />
            </div>
          </div>
          <div className="space-y-2">
            {checklist.map(item => (
              <button
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition ${item.done ? 'bg-emerald-50' : 'bg-gray-50'}`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs flex-shrink-0 transition ${
                  item.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300'
                }`}>
                  {item.done && '✓'}
                </div>
                <span className={`text-sm ${item.done ? 'line-through text-[var(--text-secondary)]' : ''}`}>{item.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI管家攻略入口 */}
      <div className="mx-4 mt-4">
        <button
          onClick={() => setShowButler(!showButler)}
          className="w-full card p-4 flex items-center justify-between hover:shadow-md transition"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🧳</span>
            <div className="text-left">
              <div className="font-bold text-sm">AI出行管家攻略</div>
              <div className="text-xs text-[var(--text-secondary)]">红眼攻略 · 酒店推荐 · 装备清单</div>
            </div>
          </div>
          <span className="text-[var(--text-secondary)]">{showButler ? '▲' : '▼'}</span>
        </button>
      </div>

      {/* AI管家内容（展开） */}
      {showButler && (
        <div className="mx-4 mt-3 space-y-3 fade-in">
          {/* 红眼航班 */}
          <div className="card border border-[var(--border)] overflow-hidden">
            <div className="bg-indigo-50 px-4 py-2.5 font-bold text-sm flex items-center gap-2">
              <span>🌙</span> 红眼航班落地方案
            </div>
            <div className="p-4">
              <div className="text-xs text-[var(--text-secondary)] mb-3">
                你的航班 {butlerData.redEye.landing} 落地{butlerData.redEye.airport}
              </div>
              <div className="bg-gray-50 rounded-xl p-3 mb-3">
                <div className="font-bold text-xs mb-2">方案A：机场过夜（省钱）</div>
                <div className="space-y-1 text-xs text-[var(--text-secondary)]">
                  <div>· {butlerData.redEye.overnightInfo}</div>
                  <div>· 室内温度{butlerData.redEye.temperature}</div>
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-3">
                <div className="font-bold text-xs mb-2">方案B：机场附近酒店 <span className="tag tag-blue">推荐</span></div>
                {butlerData.redEye.hotels.map((hotel, i) => (
                  <div key={i} className="bg-white rounded-lg p-3 mb-2">
                    <div className="font-bold text-sm">{hotel.name}</div>
                    <div className="text-xs text-[var(--text-secondary)]">⭐{hotel.rating} · {hotel.distance} · {hotel.type}</div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[var(--primary)] font-bold">¥{hotel.price}</span>
                      <button className="px-4 py-1.5 rounded-lg text-xs font-bold gradient-blue text-white">美团酒店预订</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 餐食 */}
          <div className="card border border-[var(--border)] overflow-hidden">
            <div className="bg-red-50 px-4 py-2.5 font-bold text-sm flex items-center gap-2">
              <span>🍽️</span> 机上餐食提醒
            </div>
            <div className="p-4 text-sm">
              <div className="flex items-start gap-2">
                <span>❌</span>
                <div>
                  <div className="text-red-500 font-bold">{butlerData.meal.airline}：不含免费餐食和饮用水</div>
                  <div className="text-xs text-[var(--text-secondary)] mt-1">机上购买：{butlerData.meal.onboardPrice}</div>
                  <div className="text-xs text-[var(--text-secondary)]">{butlerData.meal.suggestion}</div>
                </div>
              </div>
            </div>
          </div>

          {/* 天气 */}
          <div className="card border border-[var(--border)] overflow-hidden">
            <div className="bg-cyan-50 px-4 py-2.5 font-bold text-sm flex items-center gap-2">
              <span>🌡️</span> 目的地天气
            </div>
            <div className="p-4">
              <div className="flex items-center gap-4 mb-2">
                <span className="font-bold">{butlerData.weather.city} · {butlerData.weather.month}</span>
                <span className="text-sm text-[var(--text-secondary)]">{butlerData.weather.condition}</span>
              </div>
              <div className="flex gap-4 mb-2">
                <span className="text-red-500 font-bold text-lg">{butlerData.weather.high}°</span>
                <span className="text-blue-500 font-bold text-lg">{butlerData.weather.low}°</span>
              </div>
              <div className="text-xs text-[var(--text-secondary)]">💡 {butlerData.weather.tip}</div>
            </div>
          </div>

          {/* 出入境 */}
          <div className="card border border-[var(--border)] overflow-hidden">
            <div className="bg-purple-50 px-4 py-2.5 font-bold text-sm flex items-center gap-2">
              <span>🌏</span> 出入境信息
            </div>
            <div className="p-4 space-y-2 text-xs text-[var(--text-secondary)]">
              <div>🛂 {butlerData.international.visa}</div>
              <div>📄 {butlerData.international.docs}</div>
              <div>💴 {butlerData.international.currency}</div>
              <div>🕐 时差：{butlerData.international.timeDiff}</div>
              <div>🚃 {butlerData.international.transport}</div>
            </div>
          </div>

          {/* 装备购物车 */}
          <div className="card border border-[var(--border)] overflow-hidden">
            <div className="bg-orange-50 px-4 py-2.5 font-bold text-sm flex items-center gap-2">
              <span>🛒</span> 出行装备一键购
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {butlerData.shopping.items.map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 p-2.5 rounded-lg ${item.checked ? 'bg-orange-50' : 'bg-gray-50'}`}>
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center text-[10px] ${
                      item.checked ? 'bg-[var(--primary)] border-[var(--primary)] text-white' : 'border-gray-300'
                    }`}>
                      {item.checked && '✓'}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm">{item.name}</div>
                      <div className="text-[10px] text-[var(--text-secondary)]">{item.reason}</div>
                    </div>
                    <span className="text-sm font-bold">¥{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-[var(--border)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">已选 {butlerData.shopping.items.filter(i => i.checked).length} 件</span>
                  <span className="text-[var(--primary)] font-bold">¥{butlerData.shopping.items.filter(i => i.checked).reduce((s, i) => s + i.price, 0).toFixed(1)}</span>
                </div>
                <div className="text-xs text-[var(--text-secondary)] mb-3">📦 {butlerData.shopping.deliveryTime}</div>
                <button className="w-full py-3 rounded-xl gradient-orange text-white font-bold text-sm">美团外卖一键下单 →</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="h-8" />
    </div>
  );
}
