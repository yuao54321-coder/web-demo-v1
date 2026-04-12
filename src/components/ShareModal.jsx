import { X, Link2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { countryEmoji, formatPrice } from "../lib/utils";

const ShareModal = ({ flight, onClose }) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>分享特价机票</DialogTitle>
        </DialogHeader>

        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-4 text-white mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-lg">✈️</span>
            </div>
            <span className="font-bold">飞探特价</span>
          </div>
          <div className="text-lg font-bold mb-1">
            {flight.from} → {flight.to} {countryEmoji[flight.country]}
          </div>
          <div className="text-3xl font-extrabold mb-2">¥{formatPrice(flight.price)}</div>
          <div className="text-sm opacity-90">获取方式：{flight.source}</div>
          <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between">
            <div className="text-xs opacity-80">扫码立即查看</div>
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <div className="w-10 h-10 bg-gray-800 rounded" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" className="flex flex-col items-center gap-1 h-auto py-3">
            <MessageCircle className="w-5 h-5 text-green-600" />
            <span className="text-xs">微信好友</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center gap-1 h-auto py-3">
            <span className="text-lg">📱</span>
            <span className="text-xs">朋友圈</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center gap-1 h-auto py-3" onClick={handleCopyLink}>
            <Link2 className="w-5 h-5 text-blue-600" />
            <span className="text-xs">复制链接</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
