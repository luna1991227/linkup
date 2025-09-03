
import { ContactMethods } from "@/components/contact-methods";

export default function ApplyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <p className="text-gray-600 mb-6">
            不管是因为生活上突然有困难 还是想趁年轻 早日财富自由 我想我们都是市面上做的最好的！
          </p>
          <p className="text-gray-600 mb-6">
            只要你的条件和态度还不错，我们团队里的大家都可以稳定很高的收入滴
          </p>
          <p className="text-gray-600 mb-6">
            我们最最注重的是隐私保护！！在介绍之前我们都会提供客户的基础信息（比如微信号）来提前确认互相都不认识
          </p>
          <p className="text-gray-600 mb-6">
            我们也会尽量保护每一位小姐姐的安全！我们有专门的负责人来负责这一块
          </p>
          <p className="text-gray-600 mb-6">
            随时想退出也完全无所谓的！我们不会强迫任何事情 哪怕我们不在一起工作了 也欢迎来谈谈心聊聊天 大家都是朋友！
          </p>
          <p className="text-gray-600 mb-6">
            有任何问题 都欢迎随时短信 或者telegram联系！
          </p>

          <ContactMethods variant="vertical" showLabels={true} />
        </div>
      </div>
    </div >
  );
}
