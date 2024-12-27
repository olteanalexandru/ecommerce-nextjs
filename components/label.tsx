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
      <div className="flex items-center rounded-xl border border-primary/20 bg-white/90 p-2 text-sm font-medium text-black 
                    backdrop-blur-md dark:border-primary/20 dark:bg-black/90 dark:text-white 
                    transition-all duration-300 hover:scale-[1.02] hover:-rotate-1
                    hover:bg-white/95 dark:hover:bg-black/95 hover:shadow-lg hover:shadow-primary/10
                    group">
        <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-snug tracking-tight font-skate group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <Price
          className="flex-none rounded-lg bg-primary p-2 text-black font-skate transition-all duration-300 
                   hover:scale-105 hover:rotate-2 hover:shadow-md hover:shadow-primary/20"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
      </div>
    </div>
  );
};

export default Label;
