import { ContactMethods } from "@/components/contact-methods";

export default function SharePage() {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-8">
      <div className="max-w-6xl mx-auto text-center">
        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8">
          多伦多微社区
        </h1>
        <div className="flex gap-4">
          {/* Subtitle */}
          <div className="bg-white p-8 text-neutral-900 text-lg rounded-xl shadow-sm flex items-center flex-col justify-center">
            <p className="">
              本社区专营 多伦多/GTA地区
            </p>
            <p className="">
              在这里 您能找到任何您需要的情感服务
            </p>
            <p className="">
              我们保证交易过程中的安全
            </p>
            <p className="">
              为了隐私 在交易开始前
            </p>
            <p className="">
              我们会确认一下很基础的信息 比如微信号
            </p>
            <p className="">
              来保证双方都不认识
            </p>
            <p className="">
              在加拿大 很多人心底里是孤独的
            </p>
            <p className="">
              不管是为了生理上的需求 还是情绪上的支持
            </p>
            <p className="">
              没有什么是陪伴不可以解决的
            </p>
            <p className="">
              我们提供的不仅仅是性服务 还是心灵上的安慰
            </p>
            <p className="">
              在多伦多微社区
            </p>
            <p className="">
              您总是可以找到符合您心意的
            </p>
            <p className="">
              不管是御姐还是萝莉 丰满的还是可爱的
            </p>
            <p className="">
              我们都可以满足
            </p>
            <p className="">
              我们不会卷价格 我们坚信 质量才是第一竞争力
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h3 className="text-2xl font-semibold mb-6 text-neutral-900">联系我们</h3>
            <p className="text-gray-600 mb-6">
              关注我们 @torontovsociety • 欢迎各位小姐姐来兼职
            </p>
            <div className="flex justify-center">
              <ContactMethods variant="vertical" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
