import { useState } from "react";
import { Share2, Clock } from "lucide-react";
import { countryEmoji, formatPrice, getTagColorClass, getSourceColorClass } from "../lib/utils";
import ShareModal from "./ShareModal";

const FlightCard = ({ flight, onClick }) => {
  const [showShare, setShowShare] = useState(false);

  return (
    <>
      <div 
        className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group relative"
        onClick={onClick}
      >
        <button
          onClick={(e) => { e.stopPropagation(); setShowShare(true); }}
          className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-orange-100"
        >
          <Share2 className="w-4 h-4 text-gray-600" />
        </button>

        <div className="flex justify-between items-start mb-2 pr-8">
          <div className="flex items-center gap-1">
            <span className="font-bold text-gray-900">{flight.from}</span>
            <span className="text-gray-400">→</span>
            <span className="font-bold text-gray-900">{flight.to}</span>
            <span className="text-lg ml-1">{countryEmoji[flight.country]}</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500">含税</span>
            <div className="text-2xl font-extrabold text-orange-600">
              ¥{formatPrice(flight.price)}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {flight.tags.map((tag, idx) => (
            <span 
              key={idx}
              className={`px-2 py-0.5 rounded-full text-xs border ${getTagColorClass(tag)}`}
            >
              {tag}
            </span>
          ))}
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getSourceColorClass(flight.sourceType)}`}>
            {flight.source}
          </span>
          {flight.remainingTime && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-700">
              <Clock className="w-3 h-3" />
              {flight.remainingTime}
            </span>
          )}
        </div>
      </div>

      {showShare && <ShareModal flight={flight} onClose={() => setShowShare(false)} />}
    </>
  );
};

export default FlightCard;
