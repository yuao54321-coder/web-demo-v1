import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, Phone, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { aiPlanExamples } from "../data/mockData";

const AiPlanner = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleStartPlan = () => {
    navigate("/ai-plan");
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">AI智能行程规划</h2>
          <p className="text-sm text-gray-600">告诉我你的出行想法，AI帮你规划最省钱的多城路线</p>
        </div>
      </div>

      <div className="relative mb-4">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="例如：我想从吉林去西安、拉萨、成都玩一圈，最后回深圳，大概17天..."
          className="w-full h-24 p-4 pr-24 rounded-xl border-0 bg-white shadow-sm resize-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="absolute right-3 bottom-3 flex items-center gap-2">
          <button 
            className="p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
            onClick={() => navigate("/ai-plan")}
          >
            <Mic className="w-5 h-5" />
          </button>
          <button 
            className="p-2 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors"
            onClick={() => alert("AI语音通话即将上线")}
          >
            <Phone className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {aiPlanExamples.map((example, idx) => (
          <button
            key={idx}
            onClick={() => setInputValue(example)}
            className="px-3 py-1.5 bg-white rounded-full text-xs text-gray-600 hover:bg-blue-100 hover:text-blue-700 transition-colors border border-gray-200"
          >
            {example.length > 20 ? example.slice(0, 20) + "..." : example}
          </button>
        ))}
      </div>

      <Button 
        onClick={handleStartPlan}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
      >
        开始规划
        <ArrowRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
};

export default AiPlanner;
