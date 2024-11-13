import orders from "./orders.json";
export function GET() {
  return new Response(JSON.stringify(orders), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
