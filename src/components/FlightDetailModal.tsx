'use client';

export default function FlightDetailModal({ flight, onClose }: { flight: any, onClose: () => void }) {
  const totalCost = flight.costs.reduce((sum: number, c: any) => sum + c.price, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="relative w-full max-w-[430px] bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto slide-up"
        onClick={e => e.stopPropagation()}
      >
        {/* 拖拽指示器 */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* 航班信息 */}
        <div className="px-5 pb-4 border-b border-[var(--border)]">
          <div className="text-xs text-[var(--text-secondary)]">{flight.airline} {flight.flightNo}</div>
          <div className="flex items-center justify-between mt-3">
            <div className="text-center">
              <div className="text-2xl font-bold">{flight.depTime}</div>
              <div className="text-xs text-[var(--text-secondary)] mt-0.5">{flight.depAirport}</div>
            </div>
            <div className="text-center px-4 flex-1">
              <div className="text-xs text-[var(--text-secondary)]">{flight.duration}</div>
              <div className="h-px bg-[var(--border)] relative my-2">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-base">✈️</div>
              </div>
              <div className="text-xs text-[var(--text-secondary)]">{flight.stops}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{flight.arrTime}</div>
              <div className="text-xs text-[var(--text-secondary)] mt-0.5">{flight.arrAirport}</div>
            </div>
          </div>
        </div>

        {/* 规则说人话 */}
        <div className="px-5 py-4 border-b border-[var(--border)]">
          <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
            <span>📋</span> 规则说人话
          </h3>
          <div className="space-y-2">
            {flight.rules.map((rule: any, i: number) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="flex-shrink-0">{rule.icon}</span>
                <span className={rule.icon === '❌' ? 'text-red-500' : rule.icon === '⚠️' ? 'text-yellow-600' : 'text-gray-700'}>{rule.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 机上餐食 */}
        <div className="px-5 py-4 border-b border-[var(--border)]">
          <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
            <span>🍽️</span> 机上餐食
          </h3>
          {flight.meal ? (
            <div className="text-sm flex items-start gap-2">
              <span>✅</span>
              <span className="text-gray-700">含免费餐食和饮用水</span>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="text-sm flex items-start gap-2">
                <span>❌</span>
                <span className="text-red-500">不含免费餐食和饮用水</span>
              </div>
              <div className="text-xs text-[var(--text-secondary)] ml-6">机上购买：泡面约¥25 矿泉水约¥10</div>
              <div className="text-xs text-[var(--text-secondary)] ml-6">建议登机前在机场买好食物</div>
            </div>
          )}
        </div>

        {/* 真实成本计算器 */}
        <div className="px-5 py-4 border-b border-[var(--border)]">
          <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
            <span>💰</span> 真实成本计算器
          </h3>
          <div className="space-y-2">
            {flight.costs.map((cost: any, i: number) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-[var(--text-secondary)]">
                  {i > 0 && '+ '}{cost.item}
                  {cost.note && <span className="text-xs ml-1">（{cost.note}）</span>}
                </span>
                <span className={cost.price === 0 ? 'text-emerald-500' : ''}>
                  {cost.price === 0 ? '¥0' : `¥${cost.price}`}
                </span>
              </div>
            ))}
            <div className="border-t border-dashed border-[var(--border)] pt-2 flex justify-between font-bold">
              <span>= 总价</span>
              <span className="text-[var(--primary)] text-lg">¥{totalCost}</span>
            </div>
          </div>
        </div>

        {/* 跨平台比价 */}
        <div className="px-5 py-4">
          <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
            <span>🛒</span> 去哪买？
          </h3>
          <div className="space-y-2">
            {flight.platforms.map((p: any, i: number) => (
              <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${p.lowest ? 'bg-[var(--primary-light)] border border-[var(--primary)]' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">{p.name}</span>
                  {p.lowest && <span className="tag tag-red">最低</span>}
                </div>
                <div className="flex items-center gap-3">
                  <span className={`font-bold ${p.lowest ? 'text-[var(--primary)]' : ''}`}>¥{p.price}</span>
                  <button className={`text-xs px-4 py-1.5 rounded-full font-bold ${p.lowest ? 'gradient-orange text-white' : 'bg-gray-200 text-[var(--text)]'}`}>
                    直达
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-6" />
      </div>
    </div>
  );
}
