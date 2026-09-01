import { getLLMFullText } from "@/lib/source";

export const revalidate = false;

export const GET = async () =>
  new Response(await getLLMFullText(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
