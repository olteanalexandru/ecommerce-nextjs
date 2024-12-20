import clsx from 'clsx';

function Grid(props: React.ComponentProps<'ul'>) {
  return (
    <ul
      {...props}
      className={clsx(
        'grid grid-flow-row gap-4 md:gap-6 lg:gap-8',
        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        'animate-fadeIn',
        props.className
      )}
    />
  );
}

function GridItem(props: React.ComponentProps<'li'>) {
  return (
    <li
      {...props}
      className={clsx(
        'transition-all duration-300 ease-in-out',
        'hover:scale-[1.02]',
        'group relative aspect-square',
        props.className
      )}
    />
  );
}

Grid.Item = GridItem;

export default Grid;
