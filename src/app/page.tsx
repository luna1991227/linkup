import Link from "next/link";
import { ContactMethods } from "@/components/contact-methods";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-12">
            欢迎来到多伦多微社区！
          </h1>

          <div className="flex gap-6 justify-center mb-16">
            <Link
              href="/gallery"
              className="bg-neutral-900 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-neutral-800 transition-colors"
            >
              模特列表
            </Link>
            <Link
              href="/apply"
              className="border-2 border-neutral-900 text-neutral-900 px-8 py-4 rounded-lg text-lg font-medium hover:bg-neutral-900 hover:text-white transition-colors"
            >
              女生招聘
            </Link>
          </div>

          {/* About Us Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-neutral-900 mb-6">关于我们</h2>
              <p className="text-lg text-gray-600">
                本社区致力于为每一位客人提供最高端的陪伴和快乐 注重于隐私保护
              </p>
              <p className="text-lg text-gray-600">
                承诺在见面之前不需要任何定金 细水长流嘛
              </p>
              <p className="text-lg text-gray-600">
                也非常感谢大家的每一份信任
              </p>
              <p className="text-lg text-gray-600">
                也欢迎各位小姐姐来兼职
              </p>
              <p className="text-lg text-gray-600">
                兼职请看分类中的介绍
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-semibold mb-4">我们的使命</h3>
                <p className="text-gray-600">
                  提供一个安全、可靠和专业的平台，连接客户与经过验证的服务提供者，
                  同时保持最高标准的隐私和谨慎。
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-semibold mb-4">为什么选择我们</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• 严格的验证流程</li>
                  <li>• 安全加密平台</li>
                  <li>• 专注多伦多本地</li>
                  <li>• 专业服务标准</li>
                  <li>• 全天候客户支持</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-8 bg-white rounded-xl shadow-sm">
              <h3 className="text-2xl font-semibold mb-4 text-neutral-900">验证服务提供者</h3>
              <p className="text-neutral-600">
                所有服务提供者都经过严格验证，确保安全和专业性。
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-xl shadow-sm">
              <h3 className="text-2xl font-semibold mb-4 text-neutral-900">安全平台</h3>
              <p className="text-neutral-600">
                您的隐私和安全是我们的首要任务，采用加密通信保护。
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-xl shadow-sm">
              <h3 className="text-2xl font-semibold mb-4 text-neutral-900">专注本地</h3>
              <p className="text-neutral-600">
                与您本地区域的服务提供者联系，享受便捷及时的服务。
              </p>
            </div>
          </div>

          <div className="mt-16 bg-white p-8 rounded-xl shadow-sm max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold mb-6 text-neutral-900">联系我们</h3>
              <p className="text-neutral-600 mb-6">
                关注我们的社交媒体，通过多种平台与我们保持联系。有疑问或需要帮助？我们随时为您提供服务。
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              <ContactMethods variant="vertical" showLabels={true} />

              <div className="bg-gray-50 p-6 rounded-lg h-full flex flex-col justify-center">
                <h4 className="text-lg font-semibold mb-2">多伦多微社区</h4>
                <p className="text-gray-600 text-sm mb-4">
                  加入我们的多伦多社区，获取本地更新和联系信息。
                </p>
                <div className="text-sm text-gray-500 mb-4">
                  在所有平台关注我们 @torontovsociety
                </div>

                <div className="mt-6">
                  <h5 className="font-semibold mb-3">如何请求服务？</h5>
                  <ol className="text-sm text-gray-600 space-y-2">
                    <li>1. 浏览我们的服务提供者画廊</li>
                    <li>2. 通过我们的联系方式与我们取得联系</li>
                    <li>3. 我们将安排您与合适的服务提供者进行沟通</li>
                    <li>4. 确认服务详情并享受专业服务</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
