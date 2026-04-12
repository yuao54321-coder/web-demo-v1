import { Compass, Briefcase } from "lucide-react";
import Index from "./pages/Index.jsx";
import Search from "./pages/Search.jsx";
import AiPlan from "./pages/AiPlan.jsx";
import MyTrips from "./pages/MyTrips.jsx";

export const navItems = [
  {
    title: "发现",
    to: "/",
    icon: <Compass className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "我的行程",
    to: "/trips",
    icon: <Briefcase className="h-4 w-4" />,
    page: <MyTrips />,
  },
  {
    title: "搜索",
    to: "/search",
    icon: <Compass className="h-4 w-4 hidden" />,
    page: <Search />,
  },
  {
    title: "AI规划",
    to: "/ai-plan",
    icon: <Compass className="h-4 w-4 hidden" />,
    page: <AiPlan />,
  },
];
