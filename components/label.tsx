import clsx from 'clsx';
import Price from './price';

const Label = ({
  title,
  amount,
  currencyCode,
  position = 'bottom'
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: 'bottom' | 'center';
}) => {
  return (
    <div
      className={clsx('absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label', {
        'lg:px-20 lg:pb-[35%]': position === 'center'
      })}
    >
      <div className="flex items-center rounded-xl border bg-white/80 p-2 text-sm font-medium text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/80 dark:text-white transition-all duration-300 hover:bg-white/90 dark:hover:bg-black/90">
        <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-snug tracking-tight">{title}</h3>
        <Price
          className="flex-none rounded-lg bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
      </div>
    </div>
  );
};

export default Label;
