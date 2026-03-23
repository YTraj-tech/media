import React from "react";

interface WorkerData {
  name: string;
  type: string;
  numOfWorkers: number;
  status: "Active" | "Maintenance" | "Inactive";
}

const data: WorkerData[] = [
  { name: "Site A", type: "Field Site", numOfWorkers: 150, status: "Active" },
  { name: "Site B", type: "Field Site", numOfWorkers: 42, status: "Maintenance" },
  { name: "Site C", type: "Field Site", numOfWorkers: 0, status: "Inactive" },
  { name: "Warehouse 1", type: "Storage", numOfWorkers: 87, status: "Active" },
  { name: "Warehouse 2", type: "Storage", numOfWorkers: 15, status: "Active" },
  { name: "Office HQ", type: "Corporate", numOfWorkers: 230, status: "Active" },
];

const statusConfig = {
  Active: {
    badge: "bg-emerald-50 text-emerald-800",
    dot: "bg-emerald-500",
    bar: "bg-emerald-500",
  },
  Maintenance: {
    badge: "bg-amber-50 text-amber-800",
    dot: "bg-amber-500",
    bar: "bg-amber-500",
  },
  Inactive: {
    badge: "bg-red-50 text-red-800",
    dot: "bg-red-400",
    bar: "bg-red-400",
  },
};

const WorkerStatusTable: React.FC = () => {
  const maxWorkers = Math.max(...data.map((d) => d.numOfWorkers));
  const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Empty state
  if (data.length === 0) {
    return (
      <div className="w-full mx-auto px-4 py-8 font-sans">
        <div className="rounded-xl border border-gray-100 flex flex-col items-center justify-center py-14 gap-2">
          <span className="text-2xl">📋</span>
          <p className="text-sm font-medium text-gray-400">No tasks available</p>
          <p className="text-xs text-gray-300">There are no locations to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-4 p-8 font-sans">

      {/* Scrollable Table — fixed height forces vertical scroll */}
      <div className="overflow-x-auto overflow-y-auto h-80 rounded-xl border border-gray-100">
        <table className="w-full min-w-[420px] border-collapse">
          <thead className="sticky top-0 z-10">
            <tr className="bg-purple-200 border-b border-gray-100">
              <th className="text-lg font-medium tracking-widest  text-gray-400 px-4 py-3 text-left whitespace-nowrap">
                Location
              </th>
              <th className="text-lg font-medium tracking-widest  -lgtext-lg-gray-400 px-4 py-3 text-left whitespace-nowrap">
                Workers
              </th>
              <th className="text-lg font-medium tracking-widest  text-gray-400 px-4 py-3 text-right whitespace-nowrap">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              const config = statusConfig[row.status];
              const pct = maxWorkers > 0 ? Math.round((row.numOfWorkers / maxWorkers) * 100) : 0;

              return (
                <tr
                  key={index}
                  className="border-b border-gray-50 last:border-none hover:bg-gray-50 transition-colors duration-100"
                >
                  <td className="px-4 py-3.5 align-middle">
                    <div className="text-sm font-medium text-gray-800">{row.name}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{row.type}</div>
                  </td>

                  <td className="px-4 py-3.5 align-middle">
                    <div className="flex items-center gap-2.5">
                      <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden min-w-[60px]">
                        <div
                          className={`h-full rounded-full ${config.bar} transition-all duration-500`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs text-gray-500 min-w-[28px] text-right">
                        {row.numOfWorkers}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3.5 align-middle text-right">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full ${config.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                      {row.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-3 text-[11px] text-gray-300 text-right">
        Last updated {now}
      </div>
    </div>
  );
};

export default WorkerStatusTable;