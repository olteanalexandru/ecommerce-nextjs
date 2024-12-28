'use client';

import clsx from 'clsx';
import { useProduct, useUpdateURL } from 'components/product/product-context';
import { ProductOption, ProductVariant } from 'lib/shopify/types';

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

const isColorOption = (name: string) => name.toLowerCase() === 'color';
const isSizeOption = (name: string) => name.toLowerCase() === 'size';

export function VariantSelector({
  options,
  variants
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const { state, updateOption } = useProduct();
  const updateURL = useUpdateURL();
  const hasNoOptionsOrJustOneOption =
    !options.length || (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({ ...accumulator, [option.name.toLowerCase()]: option.value }),
      {}
    )
  }));

  return options.map((option) => (
    <form key={option.id}>
      <dl className="mb-8">
        <dt className="mb-4 flex items-center justify-between">
          <span className="text-sm uppercase tracking-wide text-white">{option.name}</span>
          {isSizeOption(option.name) && (
            <button
              type="button"
              className="text-xs text-primary hover:text-primary/80"
              onClick={() => window.open('/size-guide', '_blank')}
            >
              Size Guide
            </button>
          )}
        </dt>
        <dd className="flex flex-wrap gap-3">
          {option.values.map((value) => {
            const optionNameLowerCase = option.name.toLowerCase();

            // Base option params on current selectedOptions so we can preserve any other param state.
            const optionParams = { ...state, [optionNameLowerCase]: value };

            // Filter out invalid options and check if the option combination is available for sale.
            const filtered = Object.entries(optionParams).filter(([key, value]) =>
              options.find(
                (option) => option.name.toLowerCase() === key && option.values.includes(value)
              )
            );
            const isAvailableForSale = combinations.find((combination) =>
              filtered.every(
                ([key, value]) => combination[key] === value && combination.availableForSale
              )
            );

            // The option is active if it's in the selected options.
            const isActive = state[optionNameLowerCase] === value;

            return (
              <button
                formAction={() => {
                  const newState = updateOption(optionNameLowerCase, value);
                  updateURL(newState);
                }}
                key={value}
                aria-disabled={!isAvailableForSale}
                disabled={!isAvailableForSale}
                title={`${option.name} ${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
                className={clsx(
                  'flex min-w-[48px] items-center justify-center rounded-full px-2 py-1 text-sm text-white',
                  {
            'border border-neutral-800 bg-neutral-900': !isColorOption(option.name),
                    'h-8 w-8 min-w-0 rounded-full border-2': isColorOption(option.name),
            'cursor-default ring-2 ring-primary': isActive,
            'ring-1 ring-transparent transition duration-300 ease-in-out hover:ring-primary':
                      !isActive && isAvailableForSale,
                    'relative z-10 cursor-not-allowed': !isAvailableForSale
                  }
                )}
                style={isColorOption(option.name) ? { backgroundColor: value.toLowerCase() } : undefined}
              >
                {!isColorOption(option.name) && value}
              </button>
            );
          })}
        </dd>
      </dl>
    </form>
  ));
}
