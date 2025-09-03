'use client';

import { Button } from '@/components/ui/button';
import { CONTACT_INFO } from '@/lib/contacts';
import Image from 'next/image';

interface ContactMethodsProps {
  variant?: 'default' | 'compact' | 'vertical';
  showLabels?: boolean;
}

export function ContactMethods({ variant = 'default', showLabels = true }: ContactMethodsProps) {
  const handlePhoneClick = () => {
    window.open(`tel:${CONTACT_INFO.phone}`, '_self');
  };

  const handleTelegramClick = () => {
    window.open(CONTACT_INFO.telegram.link, '_blank', 'noopener,noreferrer');
  };

  const handleTwitterClick = () => {
    window.open(CONTACT_INFO.twitter.link, '_blank', 'noopener,noreferrer');
  };

  const handleRedNoteClick = () => {
    window.open(CONTACT_INFO.rednote.link, '_blank', 'noopener,noreferrer');
  };

  if (variant === 'compact') {
    return (
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePhoneClick}
          className="p-2"
        >
          <Image
            src="/phoneIcon.png"
            alt="Phone"
            width={16}
            height={16}
            className="h-4 w-4 flex-shrink-0"
          />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleTelegramClick}
          className="p-2"
        >
          <Image
            src="/telegramIcon.png"
            alt="Telegram"
            width={16}
            height={16}
            className="h-4 w-4 flex-shrink-0"
          />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleTwitterClick}
          className="p-2"
        >
          <Image
            src="/xIcon.png"
            alt="X (Twitter)"
            width={16}
            height={16}
            className="h-4 w-4 flex-shrink-0"
          />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRedNoteClick}
          className="p-2"
        >
          <Image
            src="/rednoteIcon.png"
            alt="RedNote"
            width={20}
            height={20}
            className="h-5 w-5 flex-shrink-0"
          />
        </Button>
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className="flex flex-col gap-3 w-full">
        <Button
          variant="outline"
          onClick={handlePhoneClick}
          className="flex items-center justify-start gap-3 p-4 h-auto"
        >
          <Image
            src="/phoneIcon.png"
            alt="Phone"
            width={20}
            height={20}
            className="h-5 w-5 flex-shrink-0"
          />
          <div className="text-left">
            <div className="font-medium">电话</div>
            {showLabels && (
              <div className="text-sm text-gray-500">{CONTACT_INFO.phone}</div>
            )}
          </div>
        </Button>

        <Button
          variant="outline"
          onClick={handleTelegramClick}
          className="flex items-center justify-start gap-3 p-4 h-auto"
        >
          <Image
            src="/telegramIcon.png"
            alt="Telegram"
            width={20}
            height={20}
            className="h-5 w-5 flex-shrink-0"
          />
          <div className="text-left">
            <div className="font-medium">电报</div>
            {showLabels && (
              <div className="text-sm text-gray-500">@{CONTACT_INFO.telegram.id}</div>
            )}
          </div>
        </Button>

        <Button
          variant="outline"
          onClick={handleTwitterClick}
          className="flex items-center justify-start gap-3 p-4 h-auto"
        >
          <Image
            src="/xIcon.png"
            alt="X (Twitter)"
            width={20}
            height={20}
            className="h-5 w-5 flex-shrink-0"
          />
          <div className="text-left">
            <div className="font-medium">推特 / X</div>
            {showLabels && (
              <div className="text-sm text-gray-500">@{CONTACT_INFO.twitter.id}</div>
            )}
          </div>
        </Button>

        <Button
          variant="outline"
          onClick={handleRedNoteClick}
          className="flex items-center justify-start gap-3 p-4 h-auto"
        >
          <Image
            src="/rednoteIcon.png"
            alt="RedNote"
            width={24}
            height={24}
            className="h-6 w-6 flex-shrink-0"
          />
          <div className="text-left">
            <div className="font-medium">小红书</div>
            {showLabels && (
              <div className="text-sm text-gray-500">@{CONTACT_INFO.rednote.id}</div>
            )}
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-3 flex-wrap">
      <Button
        variant="outline"
        onClick={handlePhoneClick}
        className="flex items-center gap-2"
      >
        <Image
          src="/phoneIcon.png"
          alt="Phone"
          width={16}
          height={16}
          className="h-4 w-4 flex-shrink-0"
        />
        {showLabels && "拨打电话"}
      </Button>

      <Button
        variant="outline"
        onClick={handleTelegramClick}
        className="flex items-center gap-2"
      >
        <Image
          src="/telegramIcon.png"
          alt="Telegram"
          width={16}
          height={16}
          className="h-4 w-4 flex-shrink-0"
        />
        {showLabels && "电报"}
      </Button>

      <Button
        variant="outline"
        onClick={handleTwitterClick}
        className="flex items-center gap-2"
      >
        <Image
          src="/xIcon.png"
          alt="X (Twitter)"
          width={16}
          height={16}
          className="h-4 w-4 flex-shrink-0"
        />
        {showLabels && "推特"}
      </Button>

      <Button
        variant="outline"
        onClick={handleRedNoteClick}
        className="flex items-center gap-2"
      >
        <Image
          src="/rednoteIcon.png"
          alt="RedNote"
          width={20}
          height={20}
          className="h-5 w-5 flex-shrink-0"
        />
        {showLabels && "小红书"}
      </Button>
    </div>
  );
}
