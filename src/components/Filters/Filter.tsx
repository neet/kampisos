import Link from "next/link";
import { FC, ReactNode } from "react";
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
  expanded?: boolean;
  expandedHref?: string;
  collapsedHref?: string;
};

export const Filter: FC<FilterProps> = (props) => {
  const {
    label,
    defaultValues = [],
    name,
    form,
    expanded,
    expandedHref = "",
    collapsedHref = "",
  } = props;

  const options = expanded
    ? props.options
    : props.options.slice(0, MAX_OPTIONS);

  const shouldExpand = props.options.length >= MAX_OPTIONS;

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
          expandedHref={expandedHref}
          collapsedHref={collapsedHref}
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
    <label className="flex gap-1 py-1 select-none">
      <input
        type="checkbox"
        value={option.value}
        name={name}
        form={form}
        defaultChecked={defaultChecked}
        className="accent-blue-600 dark:accent-blue-400"
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
  expandedHref: string;
  collapsedHref: string;
};

const FilterToggle: FC<FilterToggleProps> = (props) => {
  const { expanded, expandedHref, collapsedHref } = props;

  if (expanded) {
    return (
      <Link
        className="py-1 flex items-center gap-1 w-full"
        href={collapsedHref}
      >
        <FiChevronUp className="size-4 text-zinc-600 dark:text-zinc-400" />
        <span className="grow text-left">閉じる</span>
      </Link>
    );
  } else {
    return (
      <Link className="py-1 flex items-center gap-1 w-full" href={expandedHref}>
        <FiChevronDown className="size-4 text-zinc-600 dark:text-zinc-400" />
        <span className="grow text-left">さらに表示</span>
      </Link>
    );
  }
};
