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
      className={clsx('absolute bottom-0 left-0 flex w-full min-w-[200px] max-w-[420px] mx-auto px-2 sm:px-4 pb-2 sm:pb-4 @container/label', {
        'lg:px-20 lg:pb-[35%]': position === 'center'
      })}
    >
      <div className="flex items-start sm:items-center rounded-xl border border-primary/20 bg-white/80 p-1.5 sm:p-2.5 text-[10px] xs:text-xs sm:text-sm font-medium text-black 
                    backdrop-blur-md dark:border-primary/20 dark:bg-black/80 dark:text-white 
                    transition-all duration-300 hover:scale-[1.02] hover:-rotate-1
                    hover:bg-white/85 dark:hover:bg-black/85 hover:shadow-lg hover:shadow-primary/10
                    group w-full min-h-[40px] sm:min-h-[48px]">
        <h3 className="mr-2 sm:mr-4 flex-grow pl-1 sm:pl-2 
                      text-[11px] @[250px]/label:text-xs @[350px]/label:text-sm @[450px]/label:text-base
                      leading-tight @[350px]/label:leading-normal tracking-tight font-skate 
                      group-hover:text-primary transition-colors duration-300
                      break-words @container/title">
          {title}
        </h3>
        <Price
          className="flex-none rounded-lg bg-primary p-1 sm:p-2 text-[10px] xs:text-xs sm:text-sm text-black font-skate transition-all duration-300 
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
