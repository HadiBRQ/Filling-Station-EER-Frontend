import React from "react";
import FooterContent from "./footer-content";
import { Link } from "@/components/navigation";
import Image from "next/image";
import { Icon } from "@/components/ui/icon";

const DashBoardFooter = async () => {
  // --- Mock transaction data (realistic samples). Replace with API when available ---
  const now = new Date();
  const daysAgo = (d: number) => {
    const dd = new Date(now);
    dd.setDate(now.getDate() - d);
    return dd.toISOString();
  };

  const mockTransactions = [
    // Today
    { id: "T-1001", createdAt: now.toISOString(), amount: 12500, paymentMethod: "Card", product: "Petrol", branch: "Victoria Island", receipt: "RCPT-1001" },
    { id: "T-1002", createdAt: now.toISOString(), amount: 8200, paymentMethod: "Cash", product: "Diesel", branch: "Lekki Phase 1", receipt: "RCPT-1002" },
    { id: "T-1003", createdAt: now.toISOString(), amount: 5400, paymentMethod: "Mobile", product: "LNG", branch: "Ikeja GRA", receipt: "RCPT-1003" },
    // This week
    { id: "T-0998", createdAt: daysAgo(2), amount: 15200, paymentMethod: "Card", product: "Petrol", branch: "Garki", receipt: "RCPT-0998" },
    { id: "T-0999", createdAt: daysAgo(3), amount: 7000, paymentMethod: "Cash", product: "Diesel", branch: "Wuse", receipt: "RCPT-0999" },
    // Earlier this month
    { id: "T-0901", createdAt: daysAgo(10), amount: 21000, paymentMethod: "Card", product: "Petrol", branch: "Port Harcourt", receipt: "RCPT-0901" },
    { id: "T-0902", createdAt: daysAgo(12), amount: 9600, paymentMethod: "Mobile", product: "Diesel", branch: "Kano", receipt: "RCPT-0902" },
    // Last month (not counted in this month's totals)
    { id: "T-0800", createdAt: daysAgo(40), amount: 18000, paymentMethod: "Cash", product: "Petrol", branch: "Victoria Island", receipt: "RCPT-0800" },
  ];

  // --- Helpers ---
  const startOfDay = (d: Date) => { const dd = new Date(d); dd.setHours(0,0,0,0); return dd; };
  const startOfWeek = (d: Date) => { const dd = new Date(d); const day = dd.getDay(); const diff = dd.getDate() - day + (day === 0 ? -6 : 1); dd.setDate(diff); dd.setHours(0,0,0,0); return dd; };
  const startOfMonth = (d: Date) => { const dd = new Date(d.getFullYear(), d.getMonth(), 1); dd.setHours(0,0,0,0); return dd; };
  const inRange = (txDateIso: string, start: Date, end: Date) => { const t = new Date(txDateIso); return t >= start && t <= end; };
  const currency = (v: number) => `₦${v.toLocaleString()}`;

  const products = ["Petrol", "Diesel", "LNG"];

  const computeAggregates = (transactions: typeof mockTransactions, start: Date, end: Date) => {
    const filtered = transactions.filter(tx => inRange(tx.createdAt, start, end));
    const byProduct: Record<string, number> = {};
    products.forEach(p => byProduct[p] = 0);
    let total = 0;
    filtered.forEach(tx => {
      byProduct[tx.product] = (byProduct[tx.product] || 0) + tx.amount;
      total += tx.amount;
    });
    return { filtered, byProduct, total };
  };

  const todayStart = startOfDay(now);
  const weekStart = startOfWeek(now);
  const monthStart = startOfMonth(now);

  const todayAgg = computeAggregates(mockTransactions, todayStart, now);
  const weekAgg = computeAggregates(mockTransactions, weekStart, now);
  const monthAgg = computeAggregates(mockTransactions, monthStart, now);
  const totalAgg = computeAggregates(mockTransactions, new Date(0), now);

  // Payment method breakdown (recent 8 transactions)
  const recentTx = mockTransactions
    .slice()
    .sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  const paymentSummary = recentTx.reduce<Record<string, {count:number, amount:number}>>((acc, tx) => {
    if (!acc[tx.paymentMethod]) acc[tx.paymentMethod] = {count:0, amount:0};
    acc[tx.paymentMethod].count += 1;
    acc[tx.paymentMethod].amount += tx.amount;
    return acc;
  }, {});

  // --- Layout ---
  return (
    <FooterContent>
      {/* Desktop: Revenue summary */}
      <div className="hidden md:block mb-6">
        <h3 className="text-sm font-semibold text-default-600 mb-3">MACROOIL — Revenue Overview</h3>

        <div className="grid grid-cols-4 gap-4">
          {/* Today */}
          <div className="bg-card p-4 rounded-md border">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-default-500">Today</div>
              <div className="text-sm font-semibold">{currency(todayAgg.total)}</div>
            </div>
            <div className="space-y-2">
              {products.map(p => (
                <div key={p} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary/80" />
                    <span>{p}</span>
                  </div>
                  <div className="text-default-500">{currency(todayAgg.byProduct[p] || 0)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* This Week */}
          <div className="bg-card p-4 rounded-md border">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-default-500">This Week</div>
              <div className="text-sm font-semibold">{currency(weekAgg.total)}</div>
            </div>
            <div className="space-y-2">
              {products.map(p => (
                <div key={p} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>{p}</span>
                  </div>
                  <div className="text-default-500">{currency(weekAgg.byProduct[p] || 0)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* This Month */}
          <div className="bg-card p-4 rounded-md border">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-default-500">This Month</div>
              <div className="text-sm font-semibold">{currency(monthAgg.total)}</div>
            </div>
            <div className="space-y-2">
              {products.map(p => (
                <div key={p} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                    <span>{p}</span>
                  </div>
                  <div className="text-default-500">{currency(monthAgg.byProduct[p] || 0)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="bg-card p-4 rounded-md border">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-default-500">Total (All time)</div>
              <div className="text-sm font-semibold">{currency(totalAgg.total)}</div>
            </div>
            <div className="space-y-2 text-xs text-default-500">
              <div>Transactions: {totalAgg.filtered.length}</div>
              <div>Branches: 7</div>
              <div>Station: MACROOIL</div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction history + mobile condensed footer */}
      <div className="md:flex md:items-start md:justify-between">
        <div className="hidden md:block md:w-2/3 bg-card p-4 rounded-md border">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold">Recent Transactions</h4>
            <div className="text-xs text-default-500">Showing {recentTx.length} most recent</div>
          </div>

          <div className="divide-y">
            {recentTx.map(tx => (
              <div key={tx.id} className="py-3 flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-muted w-10 h-10 flex items-center justify-center">
                    <Icon icon={tx.paymentMethod === "Card" ? "heroicons-outline:credit-card" : tx.paymentMethod === "Cash" ? "heroicons-outline:cash" : "heroicons-outline:phone"} />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{tx.product} — {tx.branch}</div>
                    <div className="text-xs text-default-500">Receipt: {tx.receipt} • {new Date(tx.createdAt).toLocaleString()}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{currency(tx.amount)}</div>
                  <div className="text-xs mt-1 inline-flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] ${tx.paymentMethod === "Cash" ? "bg-yellow-100 text-yellow-700" : tx.paymentMethod === "Card" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                      {tx.paymentMethod}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Payment summary */}
          <div className="mt-4 pt-4 border-t">
            <h5 className="text-xs text-default-500 mb-2">Payment Method Summary</h5>
            <div className="flex gap-4">
              {Object.entries(paymentSummary).map(([method, s]) => (
                <div key={method} className="bg-muted p-3 rounded w-36 text-xs">
                  <div className="text-default-500">{method}</div>
                  <div className="font-semibold">{s.count} tx</div>
                  <div className="text-default-500">{currency(s.amount)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile footer (original) */}
        <div className="flex md:hidden justify-around items-center mt-4 w-full">
          <Link href="/app/chat" className="text-default-600">
            <div>
              <span className="relative cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center mb-1">
                <Icon icon="heroicons-outline:mail" />
                <span className="absolute right-[5px] lg:top-0 -top-2 h-4 w-4 bg-red-500 text-[8px] font-semibold flex flex-col items-center justify-center rounded-full text-white z-99">
                  10
                </span>
              </span>
              <span className="block text-xs text-default-600">Messages</span>
            </div>
          </Link>
          <Link
            href="profile"
            className="relative bg-card bg-no-repeat backdrop-filter backdrop-blur-[40px] rounded-full footer-bg dark:bg-default-300 h-[65px] w-[65px] z-[-1] -mt-[40px] flex justify-center items-center"
          >
            <div className="h-[50px] w-[50px] rounded-full relative left-[0px] top-[0px] custom-dropshadow">
              <Image
                src="/images/avatar/av-1.jpg"
                alt="Hadi Ibrahim"
                width={50}
                height={50}
                className="w-full h-full rounded-full border-2"
              />
            </div>
          </Link>
          <Link href="notifications">
            <div>
              <span className="relative cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center mb-1">
                <Icon icon="heroicons-outline:bell" />
                <span className="absolute right-[17px] lg:top-0 -top-2 h-4 w-4 bg-red-500 text-[8px] font-semibold flex flex-col items-center justify-center rounded-full text-white z-99">
                  2
                </span>
              </span>
              <span className="block text-xs text-default-600">
                Notifications
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* original copyright + authors */}
      <div className=" md:flex  justify-between text-default-600 hidden mt-6">
        <div className="text-center md:ltr:text-start md:rtl:text-right text-sm">
          COPYRIGHT &copy; {new Date().getFullYear()}, All rights
          Reserved
        </div>
        <div className="md:ltr:text-right md:rtl:text-end text-center text-sm">
          Created by{" "}
          <a
            href="https://my-portfolio-v1-0-2025.vercel.app"
            target="_blank"
            className="text-primary font-semibold"
            rel="noopener noreferrer"
          >
           Olanrewaju Abdulmalik & Hadi Ibrahim
          </a>
        </div>
      </div>
    </FooterContent>
  );
};

export default DashBoardFooter;
