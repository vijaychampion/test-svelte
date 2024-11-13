import notifications from "./notifications.json";
export function GET() {
  return new Response(JSON.stringify(notifications), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
