import { useState, useEffect } from "react";
import { Bell, Zap, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { rushDeals as mockDeals } from "../data/mockData";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/AuthContext";
import RushModal from "./RushModal";

const RushCalendar = () => {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [deals, setDeals] = useState(mockDeals);

  useEffect(() => {
    supabase.from('rush_deals').select('*').order('id').then(({ data }) => {
      if (data && data.length) {
        setDeals(data.map(d => ({
          id: d.id,
          date: d.deal_date,
          type: d.deal_type,
          icon: d.icon,
          name: d.name,
          time: d.deal_time,
          description: d.description,
          price: d.price,
          condition: d.condition,
          reminderPrice: d.reminder_price,
          rushPrice: d.rush_price,
          isAutoRush: d.is_auto_rush,
        })));
      }
    });
  }, []);

  useEffect(() => {
    if (!user) { setReminders([]); return; }
    supabase.from('reminders').select('deal_id').eq('user_id', user.id).then(({ data }) => {
      if (data) setReminders(data.map(r => r.deal_id));
    });
  }, [user]);

  const visibleDeals = expanded ? deals : deals.slice(0, 3);

  const handleSetReminder = async (dealId) => {
    if (!user) {
      alert('请先登录再设置提醒');
      return;
    }
    const { error } = await supabase.from('reminders').insert({ user_id: user.id, deal_id: dealId });
    if (!error) setReminders([...reminders, dealId]);
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'member': return '🏷️';
      case 'free': return '🆓';
      case 'blind': return '🎲';
      case 'code': return '🔑';
      default: return '📌';
    }
  };

  const groupedDeals = visibleDeals.reduce((acc, deal) => {
    if (!acc[deal.date]) acc[deal.date] = [];
    acc[deal.date].push(deal);
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🎯</span>
        <h2 className="text-xl font-bold text-gray-900">抢票日历</h2>
        <span className="text-sm text-gray-500 ml-2">定时抢的特价都在这里</span>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedDeals).map(([date, deals]) => (
          <div key={date} className="border-l-2 border-orange-200 pl-4">
            <div className="text-sm font-semibold text-gray-700 mb-2">{date}</div>
            <div className="space-y-3">
              {deals.map(deal => (
                <div key={deal.id} className="bg-gray-50 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xl">{getTypeIcon(deal.type)}</span>
                      <span className="font-semibold text-gray-900">{deal.name}</span>
                      <span className="text-sm text-orange-600 font-medium">{deal.time}</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {deal.description} {deal.price && <span className="text-orange-600 font-semibold">{deal.price}</span>}
                    </div>
                    {deal.condition && (
                      <div className="text-xs text-gray-500 mt-1">{deal.condition}</div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetReminder(deal.id)}
                      disabled={reminders.includes(deal.id)}
                      className={reminders.includes(deal.id) ? "bg-green-50 text-green-700" : ""}
                    >
                      <Bell className="w-3.5 h-3.5 mr-1" />
                      {reminders.includes(deal.id) ? "已设置" : "设置提醒"}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setSelectedDeal(deal)}
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white"
                    >
                      <Zap className="w-3.5 h-3.5 mr-1" />
                      {deal.isAutoRush ? "自动代抢" : `预约代抢¥${deal.rushPrice}`}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full mt-4 py-3 text-sm text-gray-600 hover:text-orange-600 flex items-center justify-center gap-1 transition-colors"
      >
        {expanded ? (
          <>收起 <ChevronUp className="w-4 h-4" /></>
        ) : (
          <>查看更多未来抢票活动 <ChevronDown className="w-4 h-4" /></>
        )}
      </button>

      {selectedDeal && (
        <RushModal deal={selectedDeal} onClose={() => setSelectedDeal(null)} />
      )}
    </div>
  );
};

export default RushCalendar;
