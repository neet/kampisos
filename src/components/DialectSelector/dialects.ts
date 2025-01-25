type Dialect = {
  label: string;
  value: string;
  children?: Dialect[];
};

export const dialects: Dialect[] = [
  {
    label: "樺太",
    value: "樺太",
    children: [
      {
        label: "西海岸",
        value: "樺太/西海岸",
        children: [
          { label: "小田洲", value: "樺太/西海岸/小田洲" },
          { label: "鵜城", value: "樺太/西海岸/鵜城" },
          { label: "来知志", value: "樺太/西海岸/来知志" },
        ],
      },
    ],
  },
  {
    label: "北海道",
    value: "北海道",
    children: [
      {
        label: "南西",
        value: "北海道/南西",
        children: [
          { label: "沙流", value: "北海道/南西/沙流" },
          { label: "千歳", value: "北海道/南西/千歳" },
          { label: "鵡川", value: "北海道/南西/鵡川" },
          { label: "幌別", value: "北海道/南西/幌別" },
          { label: "虻田", value: "北海道/南西/虻田" },
          { label: "白老", value: "北海道/南西/白老" },
        ],
      },
      {
        label: "北東",
        value: "北海道/北東",
        children: [
          { label: "静内", value: "北海道/北東/静内" },
          { label: "石狩", value: "北海道/北東/石狩" },
          { label: "白糠", value: "北海道/北東/白糠" },
          { label: "十勝", value: "北海道/北東/十勝" },
          { label: "釧路", value: "北海道/北東/釧路" },
          { label: "浦河", value: "北海道/北東/浦河" },
          { label: "美幌", value: "北海道/北東/美幌" },
          { label: "様似", value: "北海道/北東/様似" },
        ],
      },
    ],
  },
];
