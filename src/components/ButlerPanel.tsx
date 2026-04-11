'use client';
import { useState } from 'react';

export default function ButlerPanel({ data, plan, onClose }: { data: any, plan: any, onClose: () => void }) {
  const [shoppingItems, setShoppingItems] = useState(data.shopping.items.map((item: any) => ({ ...item })));

  const toggleItem = (index: number) => {
    setShoppingItems((prev: any[]) => prev.map((item: any, i: number) => i === index ? { ...item, checked: !item.checked } : item));
  };

  const removeItem = (index: number) => {
    setShoppingItems((prev: any[]) => prev.filter((_: any, i: number) => i !== index));
  };

  const checkedItems = shoppingItems.filter((item: any) => item.checked);
  const totalPrice = checkedItems.reduce((sum: number, item: any) => sum + item.price, 0);

  const hasRedEye = plan.legs.some((l: any) => l.isRedEye);
  const hasNoMeal = plan.legs.some((l: any) => !l.meal);

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30" />
      <div
        className="relative w-[85%] max-w-[360px] bg-white h-full overflow-y-auto slide-right"
        onClick={e => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="gradient-blue text-white p-4 pb-5 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🧳</span>
              <span className="font-bold">AI出行管家</span>
            </div>
            <button onClick={onClose} className="text-white/70 hover:text-white text-lg">✕</button>
          </div>
          <div className="text-sm opacity-80 mt-1">已根据你的航班智能生成</div>
        </div>

        <div className="p-4 space-y-4">
          {/* 红眼航班提醒 */}
          {hasRedEye && (
            <div className="card border border-[var(--border)] overflow-hidden">
              <div className="bg-indigo-50 px-4 py-2.5 font-bold text-sm flex items-center gap-2">
                <span>🌙</span> 红眼航班落地方案
              </div>
              <div className="p-4">
                <div className="text-xs text-[var(--text-secondary)] mb-3">
                  你的航班 {data.redEye.landing} 落地{data.redEye.airport}
                </div>

                {/* 方案A: 机场过夜 */}
                <div className="bg-gray-50 rounded-xl p-3 mb-3">
                  <div className="font-bold text-xs mb-2">方案A：机场过夜（省钱）</div>
                  <div className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                    <div>· {data.redEye.overnightInfo}</div>
                    <div>· 室内温度{data.redEye.temperature}</div>
                    {data.redEye.noLounger && <div>· 无躺椅，建议带颈枕</div>}
                  </div>
                </div>

                {/* 方案B: 酒店 */}
                <div className="bg-blue-50 rounded-xl p-3">
                  <div className="font-bold text-xs mb-2 flex items-center justify-between">
                    <span>方案B：机场附近酒店（舒适）</span>
                    <span className="tag tag-blue">推荐</span>
                  </div>
                  <div className="space-y-2.5">
                    {data.redEye.hotels.map((hotel: any, i: number) => (
                      <div key={i} className="bg-white rounded-lg p-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-bold text-sm">{hotel.name}</div>
                            <div className="text-xs text-[var(--text-secondary)] mt-0.5">⭐{hotel.rating} · {hotel.distance}</div>
                            <div className="text-xs text-[var(--text-secondary)]">{hotel.type} · 入住{hotel.checkIn}→退房{hotel.checkOut}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[var(--primary)] font-bold">¥{hotel.price}</div>
                          </div>
                        </div>
                        <button className="mt-2 w-full py-2 rounded-lg text-xs font-bold gradient-blue text-white">
                          美团酒店预订 →
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-blue-600 flex items-start gap-1.5">
                    <span>💡</span>
                    <span>AI建议：凌晨落地，推荐订钟点房睡4小时到早上再出发</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 机上餐食提醒 */}
          {hasNoMeal && (
            <div className="card border border-[var(--border)] overflow-hidden">
              <div className="bg-red-50 px-4 py-2.5 font-bold text-sm flex items-center gap-2">
                <span>🍽️</span> 机上餐食提醒
              </div>
              <div className="p-4">
                <div className="flex items-start gap-2 text-sm">
                  <span>❌</span>
                  <div>
                    <div className="text-red-500 font-bold">{data.meal.airline}：不含免费餐食和饮用水</div>
                    <div className="text-xs text-[var(--text-secondary)] mt-1">机上购买：{data.meal.onboardPrice}</div>
                    <div className="text-xs text-[var(--text-secondary)]">{data.meal.suggestion}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 目的地天气 */}
          <div className="card border border-[var(--border)] overflow-hidden">
            <div className="bg-cyan-50 px-4 py-2.5 font-bold text-sm flex items-center gap-2">
              <span>🌡️</span> 目的地天气
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold">{data.weather.city} · {data.weather.month}</span>
                <span className="text-sm">{data.weather.condition}</span>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">{data.weather.high}°</div>
                  <div className="text-[10px] text-[var(--text-secondary)]">最高</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">{data.weather.low}°</div>
                  <div className="text-[10px] text-[var(--text-secondary)]">最低</div>
                </div>
              </div>
              <div className="text-xs text-[var(--text-secondary)]">💡 {data.weather.tip}</div>
            </div>
          </div>

          {/* 国际航班提醒 */}
          {data.international && (
            <div className="card border border-[var(--border)] overflow-hidden">
              <div className="bg-purple-50 px-4 py-2.5 font-bold text-sm flex items-center gap-2">
                <span>🌏</span> 出入境信息
              </div>
              <div className="p-4 space-y-2.5">
                <div className="flex items-start gap-2 text-sm">
                  <span className="flex-shrink-0">🛂</span>
                  <div>
                    <div className="font-bold text-xs">签证政策</div>
                    <div className="text-xs text-[var(--text-secondary)]">{data.international.visa}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="flex-shrink-0">📄</span>
                  <div>
                    <div className="font-bold text-xs">入境材料</div>
                    <div className="text-xs text-[var(--text-secondary)]">{data.international.docs}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="flex-shrink-0">💴</span>
                  <div>
                    <div className="font-bold text-xs">货币与时差</div>
                    <div className="text-xs text-[var(--text-secondary)]">{data.international.currency}</div>
                    <div className="text-xs text-[var(--text-secondary)]">时差：{data.international.timeDiff}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="flex-shrink-0">🚃</span>
                  <div>
                    <div className="font-bold text-xs">机场交通</div>
                    <div className="text-xs text-[var(--text-secondary)]">{data.international.transport}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 出行装备一键购 */}
          <div className="card border border-[var(--border)] overflow-hidden">
            <div className="bg-orange-50 px-4 py-2.5 font-bold text-sm flex items-center gap-2">
              <span>🛒</span> 出行装备一键购
            </div>
            <div className="p-4">
              <div className="text-xs text-[var(--text-secondary)] mb-3">AI已根据你的航班智能推荐，可自由增减</div>
              <div className="space-y-2">
                {shoppingItems.map((item: any, i: number) => (
                  <div key={i} className={`flex items-center gap-3 p-2.5 rounded-lg transition ${item.checked ? 'bg-orange-50' : 'bg-gray-50'}`}>
                    <button
                      onClick={() => toggleItem(i)}
                      className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center text-xs transition ${
                        item.checked ? 'bg-[var(--primary)] border-[var(--primary)] text-white' : 'border-gray-300'
                      }`}
                    >
                      {item.checked && '✓'}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm">{item.name}</div>
                      <div className="text-[10px] text-[var(--text-secondary)]">{item.reason}</div>
                    </div>
                    <span className="text-sm font-bold">¥{item.price}</span>
                    <button onClick={() => removeItem(i)} className="text-gray-400 hover:text-red-400 text-xs">✕</button>
                  </div>
                ))}
              </div>

              <button className="mt-3 w-full py-2 rounded-lg border border-dashed border-[var(--border)] text-xs text-[var(--text-secondary)] hover:bg-gray-50">
                + 自己添加物品
              </button>

              <div className="mt-4 pt-3 border-t border-[var(--border)]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm">已选 <span className="font-bold">{checkedItems.length}</span> 件</span>
                  <span className="text-[var(--primary)] font-bold text-lg">¥{totalPrice.toFixed(1)}</span>
                </div>
                <div className="text-xs text-[var(--text-secondary)] mb-3">📦 {data.shopping.deliveryTime}</div>
                <button className="w-full py-3 rounded-xl gradient-orange text-white font-bold text-sm">
                  美团外卖一键下单 →
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="h-8" />
      </div>
    </div>
  );
}
