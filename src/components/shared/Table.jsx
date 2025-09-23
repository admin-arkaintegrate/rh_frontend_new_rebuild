import React, { useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
// import noData from "../../assets/NoData.png";
import { formatCellContent } from "../../helpers/formatCellContent";
import Tooltip from "./Tooltip";

export default function Table({ columns, data, onCellDoubleClick }) {
  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoizedData = useMemo(() => data, [data]);

  const table = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto scrollbar-hide rounded-2xl bg-white ">
      <table className="min-w-[720px] table-fixed text-center">
        {/* HEADER */}
        <thead className="bg-[#354D92]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    width: header.column.getSize(),
                    maxWidth: header.column.getSize(),
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  className="py-6 !px-3 text-center text-[12px] font-semibold text-white
                             first:rounded-l-xl last:rounded-r-xl"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* BODY */}
        <tbody className="">
          {table.getRowModel().rows.length > 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-0">
                <div
                  className={`${
                    table.getRowModel().rows.length > 5
                      ? "max-h-72 overflow-y-auto scrollbar-hide "
                      : ""
                  }`}
                >
                  <table className="min-w-[720px] table-fixed border-separate border-spacing-y-2">
                    <tbody>
                      {table.getRowModel().rows.map((row) => (
                        <tr
                          key={row.id}
                          className="bg-[#F5F7FA] border-b border-[#E7F1FF]"
                        >
                          {row.getVisibleCells().map((cell) => {
                            const rawValue = cell.getValue();

                            const value = flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            );
                            const { display, tooltip } = formatCellContent(
                              rawValue,
                              12
                            );
                            const finalDisplay = tooltip ? (
                              <Tooltip text={tooltip}>{display}</Tooltip>
                            ) : (
                              value
                            );

                            return (
                              <td
                                key={cell.id}
                                style={{
                                  width: cell.column.getSize(),
                                  maxWidth: cell.column.getSize(),
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                                className="bg-[#F5F7FA] !px-3 h-[56px] text-center
                                   text-[12px] font-semibold text-[#454545]"
                                onDoubleClick={() => onCellDoubleClick?.(cell)}
                              >
                                {finalDisplay}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="p-6 text-center text-gray-500"
              >
                No Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
