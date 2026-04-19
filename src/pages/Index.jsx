import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import RushCalendar from "../components/RushCalendar";
import FlightCard from "../components/FlightCard";
import AiPlanner from "../components/AiPlanner";
import { cheapFlights, moreCheapFlights } from "../data/mockData";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [filters, setFilters] = useState({
    time: "all",
    from: "all",
    to: "all",
    source: "all",
  });
  const [myTrip, setMyTrip] = useState(null);
  const [allFlights, setAllFlights] = useState([...cheapFlights, ...moreCheapFlights]);

  useEffect(() => {
    supabase.from('flights').select('*').order('id').then(({ data }) => {
      if (data && data.length) {
        setAllFlights(data.map(f => ({
          id: f.id,
          from: f.from_city,
          to: f.to_city,
          country: f.country,
          price: f.price,
          tags: f.tags || [],
          source: f.source,
          sourceType: f.source_type,
          code: f.code,
          remainingTime: f.remaining_time,
        })));
      }
    });
  }, []);

  useEffect(() => {
    if (!user) { setMyTrip(null); return; }
    supabase.from('trips').select('*').eq('user_id', user.id)
      .order('created_at', { ascending: false }).limit(1)
      .then(({ data }) => {
        if (data && data.length) {
          const t = data[0];
          const days = t.departure_date
            ? Math.max(0, Math.ceil((new Date(t.departure_date) - new Date()) / 86400000))
            : 0;
          setMyTrip({ destination: t.destination, days });
        }
      });
  }, [user]);
  
  const filteredFlights = allFlights.filter(flight => {
    if (filters.from !== "all" && flight.from !== filters.from) return false;
    if (filters.to !== "all") {
      if (filters.to === "domestic" && flight.country !== "中国") return false;
      if (filters.to === "international" && flight.country === "中国") return false;
    }
    if (filters.source !== "all" && flight.sourceType !== filters.source) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto space-y-6">
          {/* 搜索栏 */}
          <SearchBar />

          {/* 抢票日历 */}
          <RushCalendar />

          {/* 特价机票捡漏 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🔥</span>
              <h2 className="text-xl font-bold text-gray-900">机票捡漏</h2>
              <span className="text-sm text-gray-500">现在就能买</span>
            </div>

            {/* 筛选条 */}
            <div className="flex flex-wrap gap-2 mb-4">
              <select 
                className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-sm"
                value={filters.time}
                onChange={(e) => setFilters({...filters, time: e.target.value})}
              >
                <option value="all">出发时间：全部</option>
                <option value="48h">48小时内</option>
                <option value="7d">7天内</option>
                <option value="30d">30天内</option>
              </select>
              <select 
                className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-sm"
                value={filters.from}
                onChange={(e) => setFilters({...filters, from: e.target.value})}
              >
                <option value="all">出发地：全部</option>
                <option value="上海">上海</option>
                <option value="北京">北京</option>
                <option value="广州">广州</option>
                <option value="深圳">深圳</option>
              </select>
              <select 
                className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-sm"
                value={filters.to}
                onChange={(e) => setFilters({...filters, to: e.target.value})}
              >
                <option value="all">到达：全部</option>
                <option value="domestic">国内</option>
                <option value="international">国际</option>
              </select>
              <select 
                className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-sm"
                value={filters.source}
                onChange={(e) => setFilters({...filters, source: e.target.value})}
              >
                <option value="all">获取方式：全部</option>
                <option value="platform">平台补贴</option>
                <option value="code">暗号价</option>
                <option value="lastMinute">尾单</option>
                <option value="student">学生专享</option>
              </select>
            </div>

            {/* 机票卡片网格 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredFlights.slice(0, 10).map(flight => (
                <FlightCard 
                  key={flight.id} 
                  flight={flight}
                  onClick={() => navigate(`/search?from=${flight.from}&to=${flight.to}`)}
                />
              ))}
            </div>
            
            {filteredFlights.length > 10 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                {filteredFlights.slice(10, 20).map(flight => (
                  <FlightCard 
                    key={flight.id} 
                    flight={flight}
                    onClick={() => navigate(`/search?from=${flight.from}&to=${flight.to}`)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* AI智能行程规划 */}
          <AiPlanner />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-6">
        <div className="max-w-[1200px] mx-auto px-4 text-center text-sm text-gray-500">
          数据每5分钟更新 · 已帮助12万用户发现特价
        </div>
      </footer>

      {/* 浮动行程提醒 */}
      {myTrip && (
        <div className="fixed bottom-6 right-6 max-w-sm">
          <div className="bg-white rounded-xl shadow-lg border-2 border-orange-200 p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✈️</span>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{myTrip.destination}之旅</div>
                <div className="text-sm text-orange-600">{myTrip.days}天后出发</div>
              </div>
              <button 
                onClick={() => setMyTrip(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <button 
              onClick={() => navigate("/trips")}
              className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              AI管家建议 →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
