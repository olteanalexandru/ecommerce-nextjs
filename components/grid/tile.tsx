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
        'group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white/80 dark:bg-black/80 backdrop-blur-sm',
        {
          'relative cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:-rotate-1 hover:shadow-xl hover:shadow-primary/20': isInteractive,
          'ring-2 ring-primary': active
        }
      )}
    >
      <Image
        src={src}
        className={clsx('relative h-full w-full object-cover', {
          'transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-2': isInteractive
        })}
        {...props}
      />
      {isInteractive && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      {isInteractive && onQuickView && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <QuickViewButton onQuickView={onQuickView} />
        </div>
      )}
      {label && (
        <div className="absolute bottom-0 left-0 w-full transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
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
