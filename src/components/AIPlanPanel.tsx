'use client';

export default function AIPlanPanel({ plans, selectedPlan, onSelectPlan, onToggleButler, showButler }: {
  plans: any[], selectedPlan: number, onSelectPlan: (i: number) => void, onToggleButler: () => void, showButler: boolean
}) {
  const plan = plans[selectedPlan];

  return (
    <div className="px-4">
      {/* 方案选择 */}
      <div className="flex gap-2 mb-4">
        {plans.map((p, i) => (
          <button
            key={p.id}
            onClick={() => onSelectPlan(i)}
            className={`flex-1 py-2.5 px-2 rounded-xl text-center transition ${
              selectedPlan === i
                ? 'gradient-orange text-white shadow-md'
                : 'bg-gray-100 text-[var(--text-secondary)]'
            }`}
          >
            <div className="text-xs">{p.label}</div>
            <div className="font-bold text-sm mt-0.5">¥{p.totalPrice}</div>
            {p.recommended && <div className="text-[10px] mt-0.5">👈 推荐</div>}
          </button>
        ))}
      </div>

      {/* 方案详情 */}
      <div className="space-y-3">
        {plan.legs.map((leg: any, i: number) => (
          <div key={i} className="card p-4 border border-[var(--border)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[var(--text-secondary)]">第{i + 1}程</span>
              {leg.isRedEye && <span className="tag tag-yellow">🌙 红眼</span>}
              {!leg.meal && <span className="tag tag-red">不含餐食</span>}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-base">{leg.from} → {leg.to}</div>
                <div className="text-xs text-[var(--text-secondary)] mt-1">{leg.airline} {leg.flightNo} · {leg.depTime}-{leg.arrTime}</div>
              </div>
              <div className="text-right">
                <div className="text-[var(--primary)] text-xl font-bold">¥{leg.price}</div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-dashed border-[var(--border)] flex items-center gap-2">
              <span className="text-sm">👉</span>
              <span className="text-xs">在 <span className="font-bold text-[var(--secondary)]">{leg.platform}</span> 买</span>
              <span className="text-[10px] text-[var(--text-secondary)]">({leg.platformReason})</span>
            </div>
          </div>
        ))}
      </div>

      {/* 风险/优势提示 */}
      {plan.risks && plan.risks.length > 0 && (
        <div className="mt-3 bg-yellow-50 rounded-xl p-3">
          <div className="text-xs font-bold text-yellow-700 mb-1.5">⚠️ 注意事项</div>
          {plan.risks.map((r: string, i: number) => (
            <div key={i} className="text-xs text-yellow-600 flex items-start gap-1.5 mt-1">
              <span>·</span><span>{r}</span>
            </div>
          ))}
        </div>
      )}

      {plan.benefits && plan.benefits.length > 0 && (
        <div className="mt-3 bg-emerald-50 rounded-xl p-3">
          <div className="text-xs font-bold text-emerald-700 mb-1.5">✅ 优势</div>
          <div className="flex flex-wrap gap-1.5">
            {plan.benefits.map((b: string, i: number) => (
              <span key={i} className="tag tag-green">{b}</span>
            ))}
          </div>
        </div>
      )}

      {plan.saving && (
        <div className="mt-3 text-center text-sm">
          💡 <span className="text-[var(--primary)] font-bold">{plan.saving}</span>
        </div>
      )}

      {/* 方案对比表 */}
      <div className="mt-4 card overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-3 text-left font-bold text-[var(--text-secondary)]"></th>
              <th className="py-2 px-2 text-center font-bold">价格</th>
              <th className="py-2 px-2 text-center font-bold">耗时</th>
              <th className="py-2 px-2 text-center font-bold">行李</th>
              <th className="py-2 px-2 text-center font-bold">餐食</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((p, i) => (
              <tr key={i} className={`border-t border-[var(--border)] ${selectedPlan === i ? 'bg-orange-50' : ''}`}>
                <td className="py-2.5 px-3 font-bold">{p.label}{p.recommended ? ' ⭐' : ''}</td>
                <td className="py-2.5 px-2 text-center text-[var(--primary)] font-bold">¥{p.totalPrice}</td>
                <td className="py-2.5 px-2 text-center">{p.legs.length > 1 ? `${p.legs.length}段` : '直飞'}</td>
                <td className="py-2.5 px-2 text-center">{p.benefits?.includes('行李直挂') || p.benefits?.includes('含行李23kg') ? '✅' : '❌'}</td>
                <td className="py-2.5 px-2 text-center">{p.legs.every((l: any) => l.meal) ? '✅' : p.legs.some((l: any) => l.meal) ? '⚠️' : '❌'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 底部按钮 */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={onToggleButler}
          className={`flex-1 py-3 rounded-xl text-sm font-bold border transition ${showButler ? 'border-[var(--primary)] text-[var(--primary)] bg-[var(--primary-light)]' : 'border-[var(--border)] text-[var(--text-secondary)]'}`}
        >
          🧳 {showButler ? '收起管家' : 'AI管家'}
        </button>
        <button className="flex-1 py-3 rounded-xl text-sm font-bold gradient-orange text-white">
          去购买 →
        </button>
      </div>

      <div className="h-4" />
    </div>
  );
}
