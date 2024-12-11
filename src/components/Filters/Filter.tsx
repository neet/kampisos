"use client";

import { FC, ReactNode, useMemo, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const MAX_OPTIONS = 5;

type Option = {
  label?: string;
  value: string;
  count: number;
};

export type FilterProps = {
  label: ReactNode;
  defaultValues?: string[];
  name?: string;
  form?: string;
  options: Option[];
};

export const Filter: FC<FilterProps> = (props) => {
  const { label, defaultValues = [], name, form } = props;

  const [expanded, setExpanded] = useState(false);

  const options = useMemo(() => {
    let returnValue = props.options;

    // checked first
    returnValue = returnValue.sort((a, b) => {
      if (defaultValues.includes(a.value)) {
        return -1;
      } else if (defaultValues.includes(b.value)) {
        return 1;
      } else {
        return 0;
      }
    });

    if (!expanded) {
      // return returnValue;
      returnValue = returnValue.slice(0, MAX_OPTIONS);
    }

    return returnValue;
  }, [props.options, expanded, defaultValues]);

  const shouldExpand = props.options.length > MAX_OPTIONS;

  return (
    <div>
      <h3 className="text-zinc-600 dark:text-zinc-400 text-sm font-bold leading-loose">
        {label}
      </h3>

      <ol>
        {options.map((option) => (
          <li key={option.value}>
            <FilterOption
              name={name}
              form={form}
              option={option}
              defaultChecked={defaultValues.includes(option.value)}
            />
          </li>
        ))}
      </ol>

      {shouldExpand && (
        <FilterToggle
          expanded={expanded}
          onExpand={() => setExpanded(true)}
          onCollapse={() => setExpanded(false)}
        />
      )}
    </div>
  );
};

type FilterOptionProps = {
  name?: string;
  form?: string;
  option: Option;
  defaultChecked?: boolean;
};

const FilterOption: FC<FilterOptionProps> = (props) => {
  const { name, form, option, defaultChecked } = props;

  const label = option.label ?? option.value;
  const count = Intl.NumberFormat("ja-JP").format(option.count);

  return (
    <label className="flex gap-1 py-1 items-center select-none">
      <input
        type="checkbox"
        value={option.value}
        name={name}
        form={form}
        defaultChecked={defaultChecked}
        className="accent-emerald-600 dark:accent-emerald-400"
      />

      <div className="grow truncate">{label}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400 py-0.5 px-1.5">
        {count}
      </div>
    </label>
  );
};

type FilterToggleProps = {
  expanded?: boolean;
  onExpand: () => void;
  onCollapse: () => void;
};

const FilterToggle: FC<FilterToggleProps> = (props) => {
  const { expanded, onExpand, onCollapse } = props;

  if (expanded) {
    return (
      <button
        className="py-1 flex items-center gap-1 w-full"
        onClick={() => onCollapse()}
      >
        <FiChevronUp className="size-4 text-zinc-400 dark:text-zinc-600" />
        <span className="grow text-left text-zinc-600 dark:text-zinc-400">
          閉じる
        </span>
      </button>
    );
  } else {
    return (
      <button
        className="py-1 flex items-center gap-1 w-full"
        onClick={() => onExpand()}
      >
        <FiChevronDown className="size-5 text-zinc-400 dark:text-zinc-600" />
        <span className="grow text-left text-zinc-600 dark:text-zinc-400">
          さらに表示
        </span>
      </button>
    );
  }
};
