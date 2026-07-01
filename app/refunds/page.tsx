import { redirect } from "next/navigation";

// Returns/exchange content now lives on the merged Shipping & Returns page.
export default function RefundsRedirect() {
  redirect("/shipping");
}
