import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, Users, ArrowRightLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchBar = () => {
  const navigate = useNavigate();
  const [fromCity, setFromCity] = useState("上海");
  const [toCity, setToCity] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [tripType, setTripType] = useState("oneWay");

  const cities = ["上海", "北京", "广州", "深圳", "成都", "西安", "杭州", "南京", "重庆", "厦门"];

  const handleSearch = () => {
    if (!toCity) return;
    const params = new URLSearchParams({
      from: fromCity,
      to: toCity,
      date: departDate || "",
      passengers,
      type: tripType,
    });
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[140px]">
          <MapPin className="w-4 h-4 text-gray-400" />
          <Select value={fromCity} onValueChange={setFromCity}>
            <SelectTrigger className="border-0 bg-gray-50 hover:bg-gray-100">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {cities.map(city => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-center">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => { const tmp = fromCity; setFromCity(toCity || fromCity); setToCity(tmp); }}
          >
            <ArrowRightLeft className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <div className="flex items-center gap-2 flex-1 min-w-[140px]">
          <MapPin className="w-4 h-4 text-orange-500" />
          <Input
            placeholder="输入目的地"
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
            className="border-0 bg-gray-50 hover:bg-gray-100 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 flex-1 min-w-[140px]">
          <Calendar className="w-4 h-4 text-gray-400" />
          <Input
            type="date"
            value={departDate}
            onChange={(e) => setDepartDate(e.target.value)}
            className="border-0 bg-gray-50 hover:bg-gray-100"
          />
        </div>

        <div className="flex items-center gap-2 flex-1 min-w-[100px]">
          <Users className="w-4 h-4 text-gray-400" />
          <Select value={passengers} onValueChange={setPassengers}>
            <SelectTrigger className="border-0 bg-gray-50 hover:bg-gray-100">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1,2,3,4,5].map(n => (
                <SelectItem key={n} value={String(n)}>{n}人</SelectItem>
              ))}
              <SelectItem value="6">5+人</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Select value={tripType} onValueChange={setTripType}>
            <SelectTrigger className="border-0 bg-gray-50 hover:bg-gray-100 w-[90px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="oneWay">单程</SelectItem>
              <SelectItem value="roundTrip">往返</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleSearch}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6"
        >
          <Search className="w-4 h-4 mr-1" />
          搜索特价
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
