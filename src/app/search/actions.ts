"use server";

import assert from "assert";

export type ReviseResult =
  | {
      type: "unsent";
    }
  | {
      type: "ok";
    }
  | {
      type: "error";
      message: string;
    };

export type ReviseAction = typeof revise;

export async function revise(
  _prevState: ReviseResult,
  fd: FormData,
): Promise<ReviseResult> {
  assert(process.env.HUBSPOT_PORTAL_ID);
  assert(process.env.HUBSPOT_FORM_ID);

  const params = {
    text: fd.get("text") as string,
    translation: fd.get("translation") as string,
    book: fd.get("book") as string,
    title: fd.get("title") as string,
  };

  try {
    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_FORM_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: [
            { name: "text", value: params.text },
            { name: "translation", value: params.translation },
            { name: "book", value: params.book },
            { name: "title", value: params.title },
          ],
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to revise: ${response.statusText}`);
    }

    return { type: "ok" };
  } catch (error) {
    console.log(error);
    return {
      type: "error",
      message: "修正の依頼に失敗しました。時間を開けてもう一度お試しください",
    };
  }
}
