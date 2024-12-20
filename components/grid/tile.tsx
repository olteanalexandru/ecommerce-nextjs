import clsx from 'clsx';
import Image from 'next/image';
import Label from '../label';
import { QuickViewButton } from './quick-view-button';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  onQuickView,
  src,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  onQuickView?: () => void;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
} & React.ComponentProps<typeof Image>) {
  // Don't render if no valid src
  if (!src) return null;

  return (
    <div
      className={clsx(
        'group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black',
        {
          'relative cursor-pointer transition duration-300': isInteractive,
          'ring-2 ring-blue-600': active
        }
      )}
    >
      <Image
        src={src}
        className={clsx('relative h-full w-full object-cover', {
          'transition duration-300 ease-in-out group-hover:scale-105': isInteractive
        })}
        {...props}
      />
      {isInteractive && onQuickView && <QuickViewButton onQuickView={onQuickView} />}
      {label && (
        <div className="absolute bottom-0 left-0 w-full">
          <Label
            title={label.title}
            amount={label.amount}
            currencyCode={label.currencyCode}
            position={label.position}
          />
        </div>
      )}
    </div>
  );
}
