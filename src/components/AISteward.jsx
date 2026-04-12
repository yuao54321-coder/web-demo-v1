import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { MapPin, Train, Plane, Luggage, Utensils, Sun, Moon, Mountain, ShoppingCart, Globe, Shield } from "lucide-react";

// 子模块1：早晚航班提醒
const EarlyLateFlightCard = () => {
  return (
    <div className="bg-indigo-50 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🌙</span>
        <h3 className="font-bold text-indigo-900">早晚航班提醒</h3>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white rounded-xl p-4">
          <div className="text-sm font-medium text-gray-700 mb-3">你的航班 08:30 从沈阳桃仙起飞</div>
          
          <div className="space-y-3">
            <div className="border-l-2 border-indigo-300 pl-3">
              <div className="text-xs font-semibold text-indigo-700 mb-1">方案A：机场过夜</div>
              <div className="text-xs text-gray-600 space-y-1">
                <div>✅ 允许过夜，24小时开放</div>
                <div>🌡️ 室温 20°C，建议带薄外套</div>
                <div>📍 推荐位置：T2 3楼C区充电长椅</div>
                <div>💡 过夜Tips：带好眼罩耳塞、有便利店、免费WiFi覆盖</div>
              </div>
            </div>
            
            <div className="border-l-2 border-orange-300 pl-3">
              <div className="text-xs font-semibold text-orange-700 mb-1">方案B：附近酒店（推荐）</div>
              <div className="text-xs text-gray-600 space-y-1">
                <div>🏨 全季酒店机场店 ⭐4.8</div>
                <div>📍 距机场5分钟车程，免费接送</div>
                <div>🛏️ 大床房含早 ¥198/晚</div>
                <Button size="sm" variant="outline" className="mt-2 h-7 text-xs">美团预订→</Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-indigo-100 rounded-lg p-3 text-xs text-indigo-800">
          💡 AI建议：早班机建议住机场附近，可多睡1小时还能赶上早餐
        </div>
      </div>
    </div>
  );
};

// 子模块2：天气穿衣
const WeatherCard = () => {
  return (
    <div className="bg-cyan-50 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🌡️</span>
        <h3 className="font-bold text-cyan-900">天气穿衣</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl">🌤️</div>
          <div>
            <div className="text-lg font-bold text-cyan-900">拉萨 · 4月中旬</div>
            <div className="text-sm text-cyan-700">春季 | 海拔3,650m</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">最高温</div>
            <div className="text-xl font-bold text-orange-500">18°C</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">最低温</div>
            <div className="text-xl font-bold text-blue-500">2°C</div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4">
          <div className="font-medium text-gray-800 mb-2">💡 穿衣建议</div>
          <div className="text-sm text-gray-600 space-y-2">
            <div>· 日间：长袖T恤+薄外套+牛仔裤</div>
            <div>· 夜间：羽绒服/厚外套必备</div>
            <div>· 机场/机舱空调18-20°C，备薄外套</div>
            <div>· 高原紫外线强，带防晒霜和墨镜</div>
          </div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-3 text-xs text-yellow-800">
          ⚠️ 特别提醒：4月为干季，湿度仅30%，多喝水注意保湿
        </div>
      </div>
    </div>
  );
};

// 子模块3：餐食
const MealCard = () => {
  const isBudgetAirline = false;
  
  return (
    <div className={`rounded-2xl p-5 ${isBudgetAirline ? 'bg-red-50' : 'bg-green-50'}`}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🍽️</span>
        <h3 className={`font-bold ${isBudgetAirline ? 'text-red-900' : 'text-green-900'}`}>餐食信息</h3>
      </div>
      
      {isBudgetAirline ? (
        <div className="space-y-3">
          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">❌</span>
              <span className="font-semibold text-red-800">春秋航空：不含免费餐食和水</span>
            </div>
            <div className="text-sm text-gray-600 mb-3">
              机上价格：泡面¥25 / 矿泉水¥10 / 简餐¥40-60
            </div>
            <div className="text-xs text-red-700 space-y-1 bg-red-50 p-3 rounded-lg">
              <div>💡 建议：</div>
              <div>· 登机前在机场买好食物</div>
              <div>· 带密封包装零食可登机</div>
              <div>· ⚠️ 不带水过安检（过不了）</div>
              <div>· 空瓶过安检后接水</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">✅</span>
              <span className="font-semibold text-green-800">中国东航：含免费餐食和饮用水</span>
            </div>
            <div className="text-sm text-gray-600 mb-3">
              早班机时段：提供热餐+面包+饮料+水果
            </div>
            <div className="text-xs text-green-700 space-y-1 bg-green-50 p-3 rounded-lg">
              <div>🍳 早餐：鸡蛋三明治+酸奶+果汁</div>
              <div>☕ 饮品：咖啡/茶/果汁任选</div>
              <div>💡 特殊餐食需提前24小时预订</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 子模块4：转机
const TransferCard = () => {
  return (
    <div className="bg-purple-50 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">✈️</span>
        <h3 className="font-bold text-purple-900">转机指南</h3>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white rounded-xl p-4">
          <div className="font-semibold text-gray-800 mb-3">西宁曹家堡 · 中转时长5小时</div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-green-50 rounded-lg p-2 text-center">
              <div className="text-xs text-green-600">行李直挂</div>
              <div className="font-bold text-green-700">是 ✅</div>
            </div>
            <div className="bg-green-50 rounded-lg p-2 text-center">
              <div className="text-xs text-green-600">过境签</div>
              <div className="font-bold text-green-700">不需要 ✅</div>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-purple-500">🏨</span>
              <div>
                <span className="font-medium">休息室：</span>
                南航明珠休息室（2楼）¥120/人，含简餐淋浴
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-500">🚕</span>
              <div>
                <span className="font-medium">长转机&gt;4h：</span>
                可入境短游，机场→市区打车30min约¥80
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-500">⚠️</span>
              <div>
                <span className="font-medium">注意：</span>
                最短转机时间需≥1.5小时
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 子模块5：出入境
const EntryExitCard = () => {
  return (
    <div className="bg-violet-50 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🌏</span>
        <h3 className="font-bold text-violet-900">出入境指南</h3>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white rounded-xl p-4">
          <div className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">🇯🇵</span>
            日本 · 大阪
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-violet-500 font-medium">🛂</span>
              <div>
                <span className="font-medium">签证：</span>
                免签15天（持中国护照）
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-violet-500 font-medium">📄</span>
              <div>
                <span className="font-medium">材料：</span>
                护照(有效期>6月)+返程机票+酒店确认单
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-violet-500 font-medium">💴</span>
              <div>
                <span className="font-medium">货币：</span>
                日元 汇率1:19 | 建议带现金+西瓜卡
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-violet-500 font-medium">🕐</span>
              <div>
                <span className="font-medium">时差：</span>
                比北京时间快1小时
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-violet-500 font-medium">🚃</span>
              <div>
                <span className="font-medium">机场→市区：</span>
                南海电铁45min约¥45 | 机场巴士60min约¥80
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <div className="text-xs font-medium text-gray-700 mb-2">📱 实用App</div>
            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-1 bg-violet-100 text-violet-700 rounded text-xs">Google地图</span>
              <span className="px-2 py-1 bg-violet-100 text-violet-700 rounded text-xs">换乘案内</span>
              <span className="px-2 py-1 bg-violet-100 text-violet-700 rounded text-xs">Google翻译</span>
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 rounded-lg p-3 text-xs text-red-800">
          <div className="font-medium mb-1">📞 紧急联系</div>
          <div>中国大使馆：+81-3-3403-3388 | 日本报警：110</div>
        </div>
      </div>
    </div>
  );
};

// 子模块6：高原反应
const AltitudeCard = () => {
  return (
    <div className="bg-orange-50 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">⛰️</span>
        <h3 className="font-bold text-orange-900">高原反应提醒</h3>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-semibold text-gray-800">拉萨</div>
              <div className="text-sm text-gray-500">海拔 3,650米</div>
            </div>
            <div className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
              中高风险
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="font-medium text-blue-800 text-sm mb-2">📋 行前3-7天准备</div>
              <div className="text-xs text-blue-700 space-y-1">
                <div>· 红景天胶囊每日2次，每次2粒</div>
                <div>· 保证充足睡眠，停止剧烈运动</div>
                <div>· 避免感冒，暂缓进藏计划</div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-3">
              <div className="font-medium text-green-800 text-sm mb-2">🏥 抵达后注意事项</div>
              <div className="text-xs text-green-700 space-y-1">
                <div>· 第1天不要剧烈活动，多休息</div>
                <div>· 多喝水（每天&gt;2L），少喝酒</div>
                <div>· ⚠️ 第1天禁止洗澡（防感冒）</div>
                <div>· 饮食清淡，少食多餐</div>
              </div>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-3">
              <div className="font-medium text-yellow-800 text-sm mb-2">💊 应急药品清单</div>
              <div className="text-xs text-yellow-700 space-y-1">
                <div>· 红景天/高原安（缓解症状）</div>
                <div>· 布洛芬（缓解头痛）</div>
                <div>· 葡萄糖口服液（补充能量）</div>
                <div>· 便携氧气罐（紧急备用）</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-red-100 rounded-lg p-3 text-xs text-red-800">
          <span className="font-medium">🚨 严重症状立即下撤：</span>
          持续剧烈头痛/呕吐、意识模糊、呼吸困难
        </div>
        
        <div className="bg-orange-100 rounded-lg p-3 text-xs text-orange-800">
          💡 AI建议：你选择的路线经西宁+青藏铁路进藏，海拔逐步上升，是最防高反的方式
        </div>
      </div>
    </div>
  );
};

// 子模块7：装备一键购
const GearCard = () => {
  const [selectedItems, setSelectedItems] = useState({
    eyeMask: true,
    pillow: true,
    snacks: true,
    sunscreen: true,
    mosquito: false,
    powerbank: true,
    adapter: false,
    oxygen: true,
  });
  
  const items = [
    { key: 'eyeMask', name: '眼罩+耳塞套装', price: 12.9, reason: '早班机必备', emoji: '😴' },
    { key: 'pillow', name: '便携U型枕', price: 29.9, reason: '长途飞行', emoji: '💤' },
    { key: 'snacks', name: '密封零食(可登机)', price: 18.9, reason: '廉航无餐', emoji: '🍪' },
    { key: 'sunscreen', name: '30ml防晒霜', price: 19.9, reason: '高原紫外线', emoji: '☀️' },
    { key: 'mosquito', name: '驱蚊手环', price: 15.9, reason: '热带必备', emoji: '🦟' },
    { key: 'powerbank', name: '充电宝10000mAh', price: 59.9, reason: '长转机备用', emoji: '🔋' },
    { key: 'adapter', name: '转换插头', price: 18.9, reason: '日本两扁脚', emoji: '🔌' },
    { key: 'oxygen', name: '便携氧气罐', price: 25, reason: '高原备用', emoji: '💨' },
  ];
  
  const toggleItem = (key) => {
    setSelectedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };
  
  const selectedCount = Object.values(selectedItems).filter(Boolean).length;
  const totalPrice = items.filter(item => selectedItems[item.key]).reduce((sum, item) => sum + item.price, 0);
  
  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🛒</span>
        <h3 className="font-bold text-orange-900">出行装备一键购</h3>
      </div>
      
      <div className="text-sm text-gray-600 mb-4">AI根据你的航班推荐：</div>
      
      <div className="space-y-2 mb-4">
        {items.map(item => (
          <label key={item.key} className="flex items-center gap-3 bg-white rounded-xl p-3 cursor-pointer hover:shadow-sm transition-shadow">
            <input 
              type="checkbox" 
              checked={selectedItems[item.key]}
              onChange={() => toggleItem(item.key)}
              className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
            />
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span>{item.emoji}</span>
                <span className={`text-sm ${selectedItems[item.key] ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                  {item.name}
                </span>
              </div>
              <div className="text-xs text-gray-400">{item.reason}</div>
            </div>
            <div className={`font-semibold ${selectedItems[item.key] ? 'text-gray-400' : 'text-orange-600'}`}>
              ¥{item.price}
            </div>
          </label>
        ))}
      </div>
      
      <div className="bg-white rounded-xl p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm text-gray-600">
            已选{selectedCount}件
          </div>
          <div className="text-lg font-bold text-orange-600">
            ¥{totalPrice.toFixed(1)}
          </div>
        </div>
        <div className="text-xs text-gray-500 mb-3">
          📦 预计明天18:00前送达
        </div>
        <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white">
          美团外卖一键下单 →
        </Button>
      </div>
    </div>
  );
};

// 子模块8：Checklist（仅行程页显示）
const ChecklistCard = ({ showChecklist }) => {
  const [checklist, setChecklist] = useState({
    ticket: true,
    idCard: false,
    passport: true,
    visa: false,
    hotel: true,
    insurance: false,
    powerbank: false,
    medicine: false,
  });
  
  if (!showChecklist) return null;
  
  const toggleItem = (key) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };
  
  const completedCount = Object.values(checklist).filter(Boolean).length;
  const totalCount = Object.keys(checklist).length;
  const progress = (completedCount / totalCount) * 100;
  
  const items = [
    { key: 'ticket', label: '✈️ 机票预订确认', important: true },
    { key: 'idCard', label: '🆔 身份证', important: true },
    { key: 'passport', label: '🛂 护照(>6个月有效期)', important: true },
    { key: 'visa', label: '📋 签证/签注', important: false },
    { key: 'hotel', label: '🏨 酒店确认单', important: false },
    { key: 'insurance', label: '🛡️ 旅行保险', important: false },
    { key: 'powerbank', label: '🔋 充电宝(≤100Wh)', important: false },
    { key: 'medicine', label: '💊 常用药品', important: false },
  ];
  
  return (
    <div className="bg-gray-50 rounded-2xl p-5 border-2 border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">📋</span>
        <h3 className="font-bold text-gray-900">出行Checklist</h3>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">准备进度</span>
          <span className="text-orange-600 font-medium">{completedCount}/{totalCount}</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        {items.map(item => (
          <label key={item.key} className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={checklist[item.key]}
              onChange={() => toggleItem(item.key)}
              className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
            />
            <span className={`text-sm transition-colors ${
              checklist[item.key] 
                ? 'text-gray-400 line-through' 
                : item.important ? 'text-gray-800 font-medium' : 'text-gray-600'
            }`}>
              {item.label}
            </span>
            {item.important && !checklist[item.key] && (
              <span className="text-xs text-red-500 ml-auto">必需</span>
            )}
          </label>
        ))}
      </div>
    </div>
  );
};

// 主AI管家组件
const AISteward = ({ showChecklist = false, compact = false }) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
          <span className="text-xl">🤖</span>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">AI出行管家攻略</h2>
          <p className="text-sm text-gray-500">根据你的行程智能生成</p>
        </div>
      </div>
      
      <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
        <EarlyLateFlightCard />
        <WeatherCard />
        <MealCard />
        <TransferCard />
        <EntryExitCard />
        <AltitudeCard />
        <GearCard />
        {showChecklist && <ChecklistCard showChecklist={true} />}
      </div>
    </div>
  );
};

export default AISteward;
