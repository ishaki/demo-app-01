import React from 'react';
import { ShipmentLineItem } from '../../types/shipment';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface LineItemsTableProps {
  lineItems: ShipmentLineItem[];
  onChange: (lineItems: ShipmentLineItem[]) => void;
}

export const LineItemsTable: React.FC<LineItemsTableProps> = ({
  lineItems,
  onChange,
}) => {
  const addLineItem = () => {
    const newItem: ShipmentLineItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      Delivery: '',
      SKU: '',
      Description: '',
      Cases: undefined,
      Sticks: undefined,
      Gross_Kilos: undefined,
      Net_Kilos: undefined,
    };
    onChange([...lineItems, newItem]);
  };

  const removeLineItem = (id: string) => {
    onChange(lineItems.filter((item) => item.id !== id));
  };

  const updateLineItem = (id: string, field: keyof ShipmentLineItem, value: any) => {
    onChange(
      lineItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const calculateTotals = () => {
    const totals = lineItems.reduce(
      (acc, item) => ({
        cases: acc.cases + (item.Cases || 0),
        sticks: acc.sticks + (item.Sticks || 0),
        grossKilos: acc.grossKilos + (item.Gross_Kilos || 0),
        netKilos: acc.netKilos + (item.Net_Kilos || 0),
      }),
      { cases: 0, sticks: 0, grossKilos: 0, netKilos: 0 }
    );
    return totals;
  };

  const totals = calculateTotals();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Product Line Items</h3>
          <p className="text-sm text-gray-500 mt-1">
            Add one or more products to this shipment
          </p>
        </div>
        <Button
          type="button"
          onClick={addLineItem}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Product Line
        </Button>
      </div>

      {lineItems.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No product lines</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding your first product line.
          </p>
          <div className="mt-6">
            <Button
              type="button"
              onClick={addLineItem}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Your First Product Line
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delivery
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SKU
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cases
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sticks
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gross Kilos
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Net Kilos
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lineItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Input
                        type="text"
                        value={item.Delivery || ''}
                        onChange={(e) =>
                          updateLineItem(item.id, 'Delivery', e.target.value)
                        }
                        placeholder="Delivery #"
                        className="min-w-[120px]"
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Input
                        type="text"
                        value={item.SKU || ''}
                        onChange={(e) =>
                          updateLineItem(item.id, 'SKU', e.target.value)
                        }
                        placeholder="SKU"
                        className="min-w-[120px]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Input
                        type="text"
                        value={item.Description || ''}
                        onChange={(e) =>
                          updateLineItem(item.id, 'Description', e.target.value)
                        }
                        placeholder="Product description"
                        className="min-w-[200px]"
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Input
                        type="number"
                        step="1"
                        value={item.Cases || ''}
                        onChange={(e) =>
                          updateLineItem(
                            item.id,
                            'Cases',
                            e.target.value ? parseInt(e.target.value) : undefined
                          )
                        }
                        placeholder="0"
                        className="min-w-[100px]"
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Input
                        type="number"
                        step="1"
                        value={item.Sticks || ''}
                        onChange={(e) =>
                          updateLineItem(
                            item.id,
                            'Sticks',
                            e.target.value ? parseInt(e.target.value) : undefined
                          )
                        }
                        placeholder="0"
                        className="min-w-[120px]"
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Input
                        type="number"
                        step="0.01"
                        value={item.Gross_Kilos || ''}
                        onChange={(e) =>
                          updateLineItem(
                            item.id,
                            'Gross_Kilos',
                            e.target.value ? parseFloat(e.target.value) : undefined
                          )
                        }
                        placeholder="0.00"
                        className="min-w-[100px]"
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Input
                        type="number"
                        step="0.01"
                        value={item.Net_Kilos || ''}
                        onChange={(e) =>
                          updateLineItem(
                            item.id,
                            'Net_Kilos',
                            e.target.value ? parseFloat(e.target.value) : undefined
                          )
                        }
                        placeholder="0.00"
                        className="min-w-[100px]"
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => removeLineItem(item.id)}
                        className="text-red-600 hover:text-red-800 transition-colors p-2 hover:bg-red-50 rounded-md"
                        title="Remove line item"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-blue-50 border-t-2 border-blue-200">
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-3 text-right font-semibold text-gray-900"
                  >
                    Totals:
                  </td>
                  <td className="px-4 py-3 font-semibold text-blue-900">
                    {totals.cases.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-semibold text-blue-900">
                    {totals.sticks.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-semibold text-blue-900">
                    {totals.grossKilos.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 font-semibold text-blue-900">
                    {totals.netKilos.toFixed(2)}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
              <div className="text-sm font-medium text-blue-600">Total Cases</div>
              <div className="text-2xl font-bold text-blue-900 mt-1">
                {totals.cases.toLocaleString()}
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
              <div className="text-sm font-medium text-purple-600">Total Sticks</div>
              <div className="text-2xl font-bold text-purple-900 mt-1">
                {totals.sticks.toLocaleString()}
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
              <div className="text-sm font-medium text-green-600">Gross Kilos</div>
              <div className="text-2xl font-bold text-green-900 mt-1">
                {totals.grossKilos.toFixed(2)}
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4 border border-amber-200">
              <div className="text-sm font-medium text-amber-600">Net Kilos</div>
              <div className="text-2xl font-bold text-amber-900 mt-1">
                {totals.netKilos.toFixed(2)}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
