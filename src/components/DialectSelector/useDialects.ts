import { useTranslations } from "next-intl";

export type Dialect = {
  label: string;
  value: string;
  children?: Dialect[];
};

export const useDialects = (): Dialect[] => {
  const t = useTranslations("/components/DialectSelector/useDialects");

  const dialects: Dialect[] = [
    {
      label: t("karahuto"),
      value: "樺太",
      children: [
        {
          label: t("east_coast"),
          value: "樺太/西海岸",
          children: [
            { label: t("otasu"), value: "樺太/西海岸/小田洲" },
            { label: t("ushiro"), value: "樺太/西海岸/鵜城" },
            { label: t("raichishi"), value: "樺太/西海岸/来知志" },
          ],
        },
      ],
    },
    {
      label: t("hokkaido"),
      value: "北海道",
      children: [
        {
          label: t("southwest"),
          value: "北海道/南西",
          children: [
            { label: t("saru"), value: "北海道/南西/沙流" },
            { label: t("chitose"), value: "北海道/南西/千歳" },
            { label: t("mukawa"), value: "北海道/南西/鵡川" },
            { label: t("horobetsu"), value: "北海道/南西/幌別" },
            { label: t("abuta"), value: "北海道/南西/虻田" },
            { label: t("shiraoi"), value: "北海道/南西/白老" },
          ],
        },
        {
          label: t("northeast"),
          value: "北海道/北東",
          children: [
            { label: t("shizunai"), value: "北海道/北東/静内" },
            { label: t("ishikari"), value: "北海道/北東/石狩" },
            { label: t("shiranuka"), value: "北海道/北東/白糠" },
            { label: t("tokachi"), value: "北海道/北東/十勝" },
            { label: t("kushiro"), value: "北海道/北東/釧路" },
            { label: t("urakawa"), value: "北海道/北東/浦河" },
            { label: t("bihoro"), value: "北海道/北東/美幌" },
            { label: t("samani"), value: "北海道/北東/様似" },
          ],
        },
      ],
    },
  ];

  return dialects;
};
