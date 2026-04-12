import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp, Lightbulb, Filter, ArrowUpDown, Plane, Luggage, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { aiMoneySavingTips, cheapFlights } from "../data/mockData";
import { formatPrice } from "../lib/utils";
import AISteward from "../components/AISteward";

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const from = searchParams.get("from") || "上海";
  const to = searchParams.get("to") || "大阪";
  
  const [aiTipExpanded, setAiTipExpanded] = useState(false);
  const [sortBy, setSortBy] = useState("recommended");
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showAISteward, setShowAISteward] = useState(false);
  const [activeTab, setActiveTab] = useState("search");

  const currentFlight = cheapFlights.find(f => f.from === from && f.to === to) || cheapFlights[0];

  // 航班详情视图
  const FlightDetail = ({ flight, onBack }) => {
    const [showPurchaseSuccess, setShowPurchaseSuccess] = useState(false);
    
    const handlePurchase = () => {
      setShowPurchaseSuccess(true);
      setTimeout(() => {
        navigate("/trips");
      }, 3000);
    };
    
    if (showPurchaseSuccess) {
      return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">✅</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">购买成功！</h3>
            <p className="text-gray-600 mb-4">已添加到我的行程，AI管家正在生成攻略...</p>
            <div className="text-sm text-gray-500">3秒后自动跳转行程页</div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4" />
          返回搜索结果
        </button>
        
        {/* 航班大卡片 */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-sm opacity-90">东航MU1234 · 波音737</div>
              <div className="text-2xl font-bold mt-1">{from} → {to}</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-extrabold">¥{formatPrice(flight.price)}</div>
              <div className="text-sm opacity-90">含税总价</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between bg-white/10 rounded-xl p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">08:30</div>
              <div className="text-sm opacity-90">{from}浦东T1</div>
            </div>
            <div className="flex-1 px-6">
              <div className="text-center text-sm opacity-90 mb-1">2小时15分</div>
              <div className="h-0.5 bg-white/50 relative">
                <div className="absolute right-0 -top-1 w-2 h-2 bg-white rounded-full" />
              </div>
              <div className="text-center text-xs mt-1 opacity-75">直飞</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">10:45</div>
              <div className="text-sm opacity-90">{to}关西T1</div>
            </div>
          </div>
        </div>
        
        {/* 两列信息 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">📋</span>
              <span className="font-semibold">注意事项</span>
            </div>
            <div className="text-sm text-gray-600 space-y-2">
              <div>· 免费行李额：20kg托运+5kg手提</div>
              <div>· 值机截止：起飞前45分钟</div>
              <div>· 登机截止：起飞前20分钟</div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🍽️</span>
              <span className="font-semibold">机上餐食</span>
            </div>
            <div className="text-sm text-gray-600 space-y-2">
              <div>· 含免费早餐（三明治+酸奶+果汁）</div>
              <div>· 特殊餐食需提前24小时预订</div>
              <div>· 机上提供付费WiFi</div>
            </div>
          </div>
        </div>
        
        {/* 怎么买到这个价格 */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">💰</span>
            <span className="font-semibold">怎么买到这个价格</span>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span>🏷️</span>
              <span className="font-medium text-orange-900">获取方式：{flight.source}</span>
            </div>
            <div className="text-sm text-gray-600 space-y-2">
              <div>📱 购买渠道：飞猪APP</div>
              <div>⏰ 活动时间：随时可买，无需抢购</div>
              <div>📝 操作步骤：</div>
              <div className="pl-4 space-y-1">
                <div>1. 打开飞猪APP → 搜索"{from}到{to}"</div>
                <div>2. 筛选"百亿补贴"标签</div>
                <div>3. 选择日期和航班</div>
                <div>4. 立即下单支付</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 购买方式 */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="font-semibold mb-4">选择购买方式</div>
          <div className="space-y-3">
            <div className="border-2 border-orange-200 rounded-xl p-4 bg-orange-50">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">立即购买</span>
                <span className="text-xl font-bold text-orange-600">¥{formatPrice(flight.price)}</span>
              </div>
              <div className="text-sm text-gray-600 mb-3">当前最低价，随时可买</div>
              <Button 
                onClick={handlePurchase}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white"
              >
                一键购买 →
              </Button>
            </div>
            
            <div className="border rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">预约代抢</span>
                <span className="text-sm text-gray-500">预计更低价</span>
              </div>
              <div className="text-sm text-gray-600 mb-3">
                等4/28南航会员日 · 预计¥980-1180 · 历史78%成功率
              </div>
              <Button variant="outline" className="w-full">
                预约代抢¥5
              </Button>
            </div>
          </div>
        </div>
        
        {/* AI管家按钮和展开区域 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900">AI出行管家</div>
                <div className="text-sm text-gray-500">专属攻略、天气、装备建议</div>
              </div>
            </div>
            <Button 
              onClick={() => setShowAISteward(!showAISteward)}
              variant="outline"
              className="border-blue-300 text-blue-700"
            >
              {showAISteward ? "🧳 收起管家" : "🧳 查看管家攻略"}
            </Button>
          </div>
          
          {showAISteward && (
            <div className="mt-4 pt-4 border-t border-blue-200">
              <AISteward compact={true} />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部橙色条 */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-[1200px] mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <div className="font-bold text-lg">{from} → {to}</div>
              <div className="text-sm opacity-90">单程 · 1人</div>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-6 text-sm">
            <div>
              <span className="opacity-80">当前最低</span>
              <div className="text-2xl font-bold">¥{formatPrice(currentFlight.price)}</div>
            </div>
            <div>
              <span className="opacity-80">近30天均价</span>
              <div className="text-lg">¥{formatPrice(Math.round(currentFlight.price * 1.2))}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-6">
        {/* AI省钱建议 */}
        <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
          <button 
            className="w-full p-4 flex items-center justify-between"
            onClick={() => setAiTipExpanded(!aiTipExpanded)}
          >
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <span className="font-medium">AI省钱建议</span>
              <span className="text-sm text-gray-500">等17天可省¥200</span>
            </div>
            {aiTipExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          {aiTipExpanded && (
            <div className="px-4 pb-4 space-y-3">
              <div className="bg-green-50 rounded-lg p-3">
                <div className="font-medium text-green-800">立即买</div>
                <div className="text-sm text-green-700">
                  ✅ 全网最低¥{aiMoneySavingTips.immediate.price}（{aiMoneySavingTips.immediate.platform}）
                </div>
              </div>
              <div className="bg-orange-50 rounded-lg p-3">
                <div className="font-medium text-orange-800">等会员日代抢</div>
                <div className="text-sm text-orange-700">
                  🏷️ 预计¥{aiMoneySavingTips.memberDay.priceRange} · {aiMoneySavingTips.memberDay.date} {aiMoneySavingTips.memberDay.time}开抢 · 历史{aiMoneySavingTips.memberDay.probability}%
                </div>
                <Button size="sm" variant="outline" className="mt-2">预约代抢¥{aiMoneySavingTips.memberDay.rushPrice}</Button>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="font-medium text-blue-800">等暗号价</div>
                <div className="text-sm text-blue-700">
                  🔑 近3个月{aiMoneySavingTips.codePrice.frequency}次 · ¥{aiMoneySavingTips.codePrice.history.join(' ¥')}
                </div>
                <Button size="sm" variant="outline" className="mt-2">自动代抢¥{aiMoneySavingTips.codePrice.rushPrice}</Button>
              </div>
            </div>
          )}
        </div>

        {/* 双Tab */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-white p-1 rounded-xl mb-4">
            <TabsTrigger value="search" className="flex-1">全网特价搜索结果</TabsTrigger>
            <TabsTrigger value="ai" className="flex-1">🤖 AI智能规划</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-4">
            {selectedFlight ? (
              <FlightDetail 
                flight={selectedFlight} 
                onBack={() => setSelectedFlight(null)} 
              />
            ) : (
              <>
                {/* 排序筛选 */}
                <div className="flex items-center gap-3">
                  <select 
                    className="px-3 py-2 rounded-lg bg-white border text-sm"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="recommended">综合推荐</option>
                    <option value="price_asc">价格低→高</option>
                    <option value="time_asc">出发早→晚</option>
                  </select>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-1" />
                    筛选
                  </Button>
                </div>

                {/* 航班列表 */}
                <div className="space-y-3">
                  {[1,2,3,4,5].map((_, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedFlight({...currentFlight, price: currentFlight.price + idx * 50})}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-lg font-bold">0{8 + idx}:30</div>
                            <div className="text-xs text-gray-500">{from}</div>
                          </div>
                          <div className="flex flex-col items-center px-4">
                            <div className="text-xs text-gray-400">2h15m</div>
                            <div className="w-20 h-0.5 bg-gray-300 relative">
                              <div className="absolute right-0 -top-1 w-2 h-2 bg-gray-300 rounded-full" />
                            </div>
                            <div className="text-xs text-green-600">直飞</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold">1{0 + idx}:45</div>
                            <div className="text-xs text-gray-500">{to}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-orange-600">¥{formatPrice(currentFlight.price + idx * 50)}</div>
                          <div className="text-xs text-gray-500">{currentFlight.source}</div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">东航MU{1234 + idx}</span>
                        <span className="text-xs text-gray-500">波音737 | 含行李20kg</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="ai">
            <div className="space-y-4">
              {/* AI智能航线规划卡片 */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <span className="text-3xl">🤖</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">AI智能航线规划</h3>
                    <p className="text-gray-600">为你找到{from}到{to}的3种最佳方案</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-sm text-green-600 font-medium mb-2">💰 最省钱</div>
                    <div className="text-2xl font-bold text-gray-900">¥{formatPrice(currentFlight.price - 200)}</div>
                    <div className="text-sm text-gray-500">经南京中转</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-orange-300">
                    <div className="text-sm text-orange-600 font-medium mb-2">⭐ 性价比推荐</div>
                    <div className="text-2xl font-bold text-gray-900">¥{formatPrice(currentFlight.price)}</div>
                    <div className="text-sm text-gray-500">直飞 · 含行李</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-sm text-blue-600 font-medium mb-2">✈️ 最省心</div>
                    <div className="text-2xl font-bold text-gray-900">¥{formatPrice(currentFlight.price + 300)}</div>
                    <div className="text-sm text-gray-500">全服务航司 · 可退改</div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="font-semibold text-gray-800 mb-3">🎯 等一等更省</div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-orange-50 rounded-lg p-3">
                      <div>
                        <div className="font-medium text-orange-800">等会员日代抢</div>
                        <div className="text-sm text-orange-600">预计¥980-1180 · 等17天 · 历史78%</div>
                      </div>
                      <Button size="sm" variant="outline">预约代抢</Button>
                    </div>
                    <div className="flex items-center justify-between bg-blue-50 rounded-lg p-3">
                      <div>
                        <div className="font-medium text-blue-800">等暗号价</div>
                        <div className="text-sm text-blue-600">近3个月2次 · ¥890起 · 不确定性较高</div>
                      </div>
                      <Button size="sm" variant="outline">开启监控</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* AI管家区域 */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <AISteward />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Search;
