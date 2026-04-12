import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plane, Briefcase, Clock, CheckCircle, XCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AISteward from "../components/AISteward";

const MyTrips = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [rushOrders, setRushOrders] = useState([]);

  useEffect(() => {
    const savedTrips = localStorage.getItem('myTrips');
    const savedOrders = localStorage.getItem('rushOrders');
    if (savedTrips) setTrips(JSON.parse(savedTrips));
    if (savedOrders) setRushOrders(JSON.parse(savedOrders));
  }, []);

  // 示例数据用于展示
  const hasData = true; // MVP阶段展示示例数据

  if (!hasData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <Briefcase className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">还没有行程</h2>
        <p className="text-gray-500 mb-6">去发现页搜索特价机票，开启你的旅程</p>
        <Button onClick={() => navigate("/")} className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
          去发现
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-8">
      <div className="max-w-[1200px] mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">我的行程</h1>

        <Tabs defaultValue="confirmed" className="w-full">
          <TabsList className="w-full bg-white p-1 rounded-xl mb-6">
            <TabsTrigger value="confirmed" className="flex-1">
              ✈️ 已确认行程
            </TabsTrigger>
            <TabsTrigger value="rush" className="flex-1">
              🎯 代抢/监控中
            </TabsTrigger>
          </TabsList>

          <TabsContent value="confirmed" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 左侧行程卡片 - 1/3宽度 */}
              <div className="lg:col-span-1 space-y-4">
                {/* 行程总览卡片 */}
                <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-5 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <Plane className="w-5 h-5" />
                    <span className="font-bold">吉林 → 深圳之旅</span>
                  </div>
                  <div className="text-3xl font-extrabold mb-1">¥6,821</div>
                  <div className="text-sm opacity-90 mb-1">17天完整行程</div>
                  <div className="text-sm opacity-90">5天后出发 · 4/20 - 5/7</div>
                </div>

                {/* 行程分段 */}
                <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">第1程 吉林→沈阳</div>
                      <div className="text-sm text-gray-500">高铁G1234 · 09:00→11:45</div>
                      <div className="text-xs text-green-600 mt-1">✅ 已购票 ¥150</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">第2程 沈阳→西安</div>
                      <div className="text-sm text-gray-500">东航MU5432 · 15:20→17:45</div>
                      <div className="text-xs text-green-600 mt-1">✅ 已出票 · 去哪儿 ¥520</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">第3程 西安→西宁</div>
                      <div className="text-sm text-gray-500">南航CZ6176 · 14:30→16:10</div>
                      <div className="text-xs text-orange-600 mt-1">⏳ 待购买 · 预计¥480</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs">🚄</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">第4程 西宁→拉萨</div>
                      <div className="text-sm text-gray-500">青藏铁路Z6801 · 20:30→19:10+1</div>
                      <div className="text-xs text-orange-600 mt-1">⏳ 待购买 · 硬卧¥495</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Plane className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-500">第5程 拉萨→成都</div>
                      <div className="text-sm text-gray-400">待预订</div>
                    </div>
                  </div>

                  {/* 进度条 */}
                  <div className="pt-4 border-t">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">购买进度</span>
                      <span className="text-orange-600 font-medium">2/5</span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full w-2/5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
                    </div>
                    <div className="text-center mt-2 text-xs text-gray-500">
                      已完成 40%
                    </div>
                  </div>
                </div>
              </div>

              {/* 右侧AI管家 - 2/3宽度 */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <AISteward showChecklist={true} />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rush" className="space-y-4">
            {/* 代抢成功示例 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-green-500">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">✅</span>
                <span className="font-semibold text-green-700">代抢成功！</span>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                南航CZ389 上海→大阪 4/30 08:30起飞→11:45落地
              </div>
              <div className="text-sm text-gray-600 mb-3">
                实付¥1,180 + 服务费¥5 = ¥1,185
              </div>
              <div className="text-xs text-green-600 mb-3">
                已退回多冻结¥100（10分钟内到账）
              </div>
              <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                查看AI管家攻略 →
              </Button>
            </div>

            {/* 代抢失败示例 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-red-500">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">❌</span>
                <span className="font-semibold text-red-700">很遗憾没抢到</span>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                东航会员日 上海→大阪 4/18 10:00
              </div>
              <div className="text-sm text-gray-600 mb-3">
                预付¥1,280 + 服务费¥5已全额退回（10分钟内到账）
              </div>
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <div className="text-xs font-medium text-gray-700 mb-2">💡 AI建议：</div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>· 当前飞猪¥1,268可直接购买 <Button size="sm" variant="link" className="h-auto p-0 text-xs">直接购买→</Button></div>
                  <div>· 下次南航会员日5/28 <Button size="sm" variant="link" className="h-auto p-0 text-xs">预约下次代抢→</Button></div>
                </div>
              </div>
            </div>

            {/* 进行中代抢 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🏷️</span>
                <span className="font-semibold">南航会员日</span>
                <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs ml-auto">进行中</span>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                上海→大阪 · 4/28 10:00开抢
              </div>
              <div className="text-sm text-orange-600 mb-3">
                预付¥1,280已冻结 · 最高接受¥1,500
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">修改</Button>
                <Button variant="outline" size="sm" className="text-red-600">取消退款</Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🔑</span>
                <span className="font-semibold">东航暗号监控</span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs ml-auto">监控中</span>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                上海→大阪 · 目标≤¥1,200
              </div>
              <div className="text-sm text-blue-600 mb-3">
                自动代抢开启 · 预付¥1,200已冻结
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">暂停监控</Button>
                <Button variant="outline" size="sm" className="text-red-600">取消退款</Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🎲</span>
                <span className="font-semibold">春秋盲盒</span>
                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs ml-auto">待助力</span>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                上海出发 · 4/16 10:00开抢
              </div>
              <div className="text-sm text-orange-600 mb-2">
                预付¥99 · 需你提前完成分享助力
              </div>
              <div className="bg-yellow-50 rounded-lg p-3 mb-3 text-xs text-yellow-800">
                ⚠️ 请在4/16 09:00前完成分享助力
              </div>
              <div className="flex gap-3">
                <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-500 text-white">分享助力指引</Button>
                <Button variant="outline" size="sm" className="text-red-600">取消退款</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyTrips;
