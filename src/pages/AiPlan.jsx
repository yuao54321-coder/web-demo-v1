import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mic, Send, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AISteward from "../components/AISteward";

const AiPlan = () => {
  const navigate = useNavigate();
  const [activeScene, setActiveScene] = useState("A");
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPurchaseList, setShowPurchaseList] = useState(false);

  const scenes = {
    A: { title: "多城复杂路线", desc: "吉林→西安→拉萨→成都→深圳，17天", icon: "⭐" },
    B: { title: "绕道省钱", desc: "吉林→深圳", icon: "💰" },
    C: { title: "多人出行带老人", desc: "北京→成都，4人", icon: "👨‍👩‍👧‍👦" },
    D: { title: "等着抢 vs 立即买", desc: "上海→北海道", icon: "⏰" },
  };

  useEffect(() => {
    if (activeScene === "A") {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setMessages([
          { type: "user", content: "我想从吉林去西安玩两天，再去拉萨玩几天，再去成都玩几天，然后回深圳工作，大概未来一周内出发，总行程时间不超过17天，帮我看看路线和便宜机票" }
        ]);
        setIsTyping(false);
        
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setMessages(prev => [...prev, {
              type: "ai",
              content: `理解了！你这是一条"吉林出发，一路向南到深圳"的长途行程，途经西安→拉萨→成都，我帮你分析了几个关键点：

⚠️ 关键提醒：拉萨海拔3,650m，从西安直飞拉萨高反风险较大。建议经西宁中转坐青藏铁路进藏（海拔逐步上升，身体有适应过程）

💰 省钱发现：
· 吉林→西安直飞¥1,800，坐高铁到沈阳再飞西安只需¥670
· 西安→拉萨直飞¥2,400，经西宁中转只需¥1,100且对身体更好

⏰ 行程建议：17天足够
· 西安2天（钟楼/兵马俑）
· 拉萨5天（含1-2天高反适应）
· 成都3天（市区2天+熊猫基地1天）
· 路上+缓冲4-5天

以下是我为你规划的3条路线，请往下查看 ↓`
            }]);
            setIsTyping(false);
            setShowPlans(true);
          }, 1500);
        }, 500);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [activeScene]);

  const plans = [
    {
      tag: "健康+省钱 ⭐推荐",
      price: 6821,
      days: 17,
      route: "吉林─🚄→沈阳─✈→西安(2天)─✈→西宁(1天)─🚄青藏铁路→拉萨(5天)─✈→成都(3天)─✈→深圳",
      highlight: "DAY5 西宁→拉萨 青藏铁路Z6801（硬卧¥495，沿途青海湖/唐古拉山/可可西里）",
      hotels: "西安亚朵¥168、西宁¥220、拉萨瑞吉¥380×5、春熙亚朵¥168×3",
      breakdown: "交通¥2,905+酒店¥2,572+景点¥1,344=¥6,821",
      reason: "青藏铁路防高反/西宁过渡/性价比最优"
    },
    {
      tag: "最省钱",
      price: 5830,
      days: 17,
      route: "吉林─🚄→沈阳─✈→西安─✈直飞→拉萨─✈→成都─✈春秋早班→深圳",
      warning: "西安直飞拉萨高反风险高/需提前吃红景天3天",
      reason: "总价最低但需承担高反风险"
    },
    {
      tag: "最省时间",
      price: 8840,
      days: 14,
      route: "全程飞机直飞",
      pros: "最省时间/全程含行李/可退改",
      cons: "价格最高",
      reason: "时间紧张选这个"
    }
  ];

  const purchaseItems = [
    { id: 1, type: "train", name: "吉林→沈阳 高铁G1234", price: 150, platform: "12306", status: "done" },
    { id: 2, type: "flight", name: "沈阳→西安 东航MU520", price: 520, platform: "去哪儿", status: "todo" },
    { id: 3, type: "hotel", name: "西安亚朵酒店×2晚", price: 336, platform: "美团酒店", status: "todo" },
    { id: 4, type: "flight", name: "西安→西宁 南航CZ6176", price: 480, platform: "飞猪", status: "todo" },
    { id: 5, type: "train", name: "西宁→拉萨 青藏铁路Z6801", price: 495, platform: "12306", status: "todo" },
    { id: 6, type: "hotel", name: "拉萨瑞吉酒店×5晚", price: 1900, platform: "携程", status: "todo" },
    { id: 7, type: "flight", name: "拉萨→成都 国航CA444", price: 680, platform: "飞猪", status: "todo" },
    { id: 8, type: "hotel", name: "成都春熙亚朵×3晚", price: 504, platform: "美团酒店", status: "todo" },
    { id: 9, type: "flight", name: "成都→深圳 南航CZ3456", price: 620, platform: "去哪儿", status: "todo" },
    { id: 10, type: "ticket", name: "景点门票通票", price: 569, platform: "美团", status: "todo" },
  ];

  const doneCount = purchaseItems.filter(i => i.status === "done").length;
  const totalPrice = purchaseItems.reduce((sum, i) => sum + i.price, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部 */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-[1200px] mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-500" />
                AI智能行程规划
              </h1>
            </div>
          </div>
          
          {/* 场景Tab */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {Object.entries(scenes).map(([key, scene]) => (
              <button
                key={key}
                onClick={() => setActiveScene(key)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeScene === key 
                    ? "bg-blue-100 text-blue-700" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span className="mr-1">{scene.icon}</span>
                {scene.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-6">
        {/* 对话区 */}
        {!selectedPlan && (
          <div className="space-y-4 mb-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl p-4 ${
                  msg.type === "user" 
                    ? "bg-blue-500 text-white rounded-br-md" 
                    : "bg-white shadow-sm rounded-bl-md"
                }`}>
                  <pre className="whitespace-pre-wrap font-sans text-sm">{msg.content}</pre>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white shadow-sm rounded-2xl rounded-bl-md p-4">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "0.1s"}} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "0.2s"}} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 方案卡片或购买清单或AI管家 */}
        {showPlans && !selectedPlan && !showPurchaseList && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {plans.map((plan, idx) => (
              <div key={idx} className={`bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all ${
                idx === 0 ? "ring-2 ring-orange-300" : ""
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 rounded-full text-xs font-medium">
                    {plan.tag}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-extrabold text-orange-600">¥{plan.price.toLocaleString()}</span>
                  <span className="text-gray-500">· {plan.days}天</span>
                </div>
                <div className="text-sm text-gray-600 mb-3 leading-relaxed">{plan.route}</div>
                {plan.highlight && (
                  <div className="bg-blue-50 rounded-lg p-3 mb-3 text-sm text-blue-800">
                    <span className="font-medium">关键：</span>{plan.highlight}
                  </div>
                )}
                {plan.warning && (
                  <div className="bg-yellow-50 rounded-lg p-3 mb-3 text-sm text-yellow-800">
                    <span className="font-medium">⚠️ 注意：</span>{plan.warning}
                  </div>
                )}
                {plan.hotels && (
                  <div className="text-xs text-gray-500 mb-2">🏨 {plan.hotels}</div>
                )}
                {plan.breakdown && (
                  <div className="text-xs text-gray-500 mb-2">💰 {plan.breakdown}</div>
                )}
                <div className="text-sm text-green-600 font-medium">
                  ✓ AI推荐：{plan.reason}
                </div>
                <Button 
                  onClick={() => setSelectedPlan(plan)}
                  className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white"
                >
                  选此方案
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* 选择方案后的AI管家详情视图 */}
        {selectedPlan && !showPurchaseList && (
          <div className="space-y-6">
            {/* 方案确认横幅 */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6" />
                <span className="font-bold text-lg">已选择「{selectedPlan.tag.replace(" ⭐推荐", "")}」</span>
              </div>
              <div className="text-sm opacity-90">
                {selectedPlan.route}
              </div>
            </div>
            
            {/* AI出行管家完整组件 */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <AISteward />
            </div>
            
            {/* 操作按钮 */}
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setSelectedPlan(null)}
              >
                ← 返回选方案
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white"
                onClick={() => setShowPurchaseList(true)}
              >
                帮我买这个方案 →
              </Button>
            </div>
          </div>
        )}

        {/* 购买清单 */}
        {showPurchaseList && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h3 className="text-lg font-bold">已选择「路线1」该方案10笔需购买：</h3>
            </div>
            
            <div className="space-y-3 mb-6">
              {purchaseItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-lg">
                    {item.type === "train" && "🚄"}
                    {item.type === "flight" && "✈️"}
                    {item.type === "hotel" && "🏨"}
                    {item.type === "ticket" && "🎫"}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.platform}</div>
                  </div>
                  <div className="font-semibold text-orange-600">¥{item.price}</div>
                  {item.status === "done" ? (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">✅ 已买</span>
                  ) : (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-7 text-xs">去购买</Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* 进度条 */}
            <div className="bg-gray-100 rounded-xl p-4 mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>购买进度</span>
                <span className="text-orange-600">{doneCount}/{purchaseItems.length}</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                  style={{ width: `${(doneCount / purchaseItems.length) * 100}%` }}
                />
              </div>
              <div className="text-center mt-2 text-sm text-gray-600">
                已完成 {Math.round((doneCount / purchaseItems.length) * 100)}%
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <div className="text-sm text-blue-800">
                💡 可随时"加入我的行程"，支持半成品加入
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowPurchaseList(false)}
              >
                ← 返回
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white"
                onClick={() => navigate("/trips")}
              >
                加入我的行程 →
              </Button>
            </div>
          </div>
        )}

        {/* 底部输入框 */}
        {!selectedPlan && !showPurchaseList && (
          <div className="sticky bottom-4 bg-white rounded-2xl shadow-lg p-3 flex items-center gap-3">
            <button className="p-3 rounded-full bg-red-50 text-red-500 hover:bg-red-100">
              <Mic className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="说点什么，比如'我想在拉萨多待几天'..."
              className="flex-1 border-0 focus:ring-0 text-sm"
            />
            <button className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600">
              <Send className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiPlan;
