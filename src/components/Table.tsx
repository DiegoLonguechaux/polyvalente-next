import React from 'react';

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
}

export default function Table<T>({ columns, data, keyExtractor }: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-800">
        <thead className="bg-[#1E272C]">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className={`px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider ${col.className || ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-[#1E272C] divide-y divide-gray-800">
          {data.map((item) => (
            <tr key={keyExtractor(item)} className="hover:bg-[#2C353A] transition-colors">
              {columns.map((col, index) => (
                <td key={index} className={`px-6 py-4 whitespace-nowrap ${col.className || ''}`}>
                  {col.render ? (
                    col.render(item)
                  ) : (
                    <div className="text-sm text-gray-300">
                      {col.accessorKey ? String(item[col.accessorKey]) : ''}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
