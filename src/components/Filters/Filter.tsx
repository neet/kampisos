import { FC, ReactNode } from "react";
// import { FiChevronDown } from "react-icons/fi";

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
  const { label, defaultValues = [], name, form, options } = props;

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

      {/* <button className="py-1 flex items-center gap-1 w-full">
        <FiChevronDown className="size-4 text-zinc-600 dark:text-zinc-400" />
        <span className="text-sm grow text-left">さらに表示</span>
      </button> */}
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

      <div className="grow truncate text-sm">{label}</div>
      <div className="text-xs text-gray-600 dark:text-gray-400 py-0.5 px-1.5">
        {count}
      </div>
    </label>
  );
};
