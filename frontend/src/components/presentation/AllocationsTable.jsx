import React from "react";

// Simple striped table from Tailwind UI
//   https://tailwindui.com/components/application-ui/lists/tables#component-d60e8c748260b622747ec1568ba9c509

export const AllocationsTable = ({allocations}) => (
  <div className="flex flex-col">
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Platform
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Rate
              </th>
            </tr>
            </thead>
            <tbody>
            {allocations.map((allocation, idx) => (
              <tr key={allocation.name+allocation.rate} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{allocation.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{allocation.rate}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);
