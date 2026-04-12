import { useState } from "react";
import { X, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const RushModal = ({ deal, onClose }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            预约代抢 - {deal.name}
          </DialogTitle>
        </DialogHeader>

        {success ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✅</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">预约成功！</h3>
            <p className="text-sm text-gray-600">已冻结¥{deal.rushPrice}，抢不到10分钟内自动退回</p>
          </div>
        ) : step === 1 ? (
          <div className="space-y-4">
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">目标活动</div>
              <div className="font-semibold text-gray-900">{deal.name}</div>
              <div className="text-sm text-orange-600">{deal.time} · {deal.description}</div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700">乘机人姓名</label>
                <Input placeholder="请输入姓名" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">身份证号</label>
                <Input placeholder="请输入身份证号" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">联系电话</label>
                <Input placeholder="请输入手机号" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">最高接受价（含税）</label>
                <Input placeholder="例如：1500" className="mt-1" />
                <p className="text-xs text-gray-500 mt-1">高于此价格将自动放弃抢购</p>
              </div>
            </div>

            <Button 
              onClick={() => setStep(2)}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white"
            >
              下一步：确认冻结
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <div className="font-medium text-blue-900">支付宝预授权</div>
                <div className="text-sm text-blue-700">抢不到10分钟内全额退回原账户</div>
              </div>
            </div>

            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">代抢服务费</span>
                <span className="font-semibold">¥{deal.rushPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">预冻结金额（机票款）</span>
                <span className="font-semibold">¥1,500</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>合计冻结</span>
                <span className="text-orange-600">¥{1500 + deal.rushPrice}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>预计3秒内完成冻结</span>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                返回修改
              </Button>
              <Button 
                onClick={handleConfirm}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white"
              >
                {loading ? "处理中..." : "确认冻结"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RushModal;
