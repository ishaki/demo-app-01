import React, { useMemo } from 'react';
import { ShipmentData } from '../../../types/shipment';
import { ReviewSection, ReviewField } from '../ReviewSection';
import { calculateAllDerivedFields } from '../../../lib/autoCalculations';

interface Step12ReviewSubmitProps {
  formData: ShipmentData;
  onEdit: (stepNumber: number) => void;
}

export const Step12ReviewSubmit: React.FC<Step12ReviewSubmitProps> = ({
  formData,
  onEdit,
}) => {
  // Calculate all derived fields for display
  const calculations = useMemo(
    () => calculateAllDerivedFields(formData),
    [formData]
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-start">
          <svg
            className="w-8 h-8 mr-4 mt-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <h2 className="text-2xl font-bold">Review & Submit</h2>
            <p className="mt-2 text-indigo-100">
              Review all shipment information below. Click "Edit" on any section to make
              changes, or click "Submit Shipment" when ready.
            </p>
          </div>
        </div>
      </div>

      {/* Shipment Summary Card */}
      {formData.Shipment && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
          <h3 className="text-lg font-bold text-blue-900 mb-4">Shipment Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="text-sm font-medium text-blue-600">Shipment ID</div>
              <div className="text-xl font-bold text-blue-900 mt-1">
                {formData.Shipment}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="text-sm font-medium text-blue-600">Mode</div>
              <div className="text-xl font-bold text-blue-900 mt-1">
                {formData.Mode || 'N/A'}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="text-sm font-medium text-blue-600">Destination</div>
              <div className="text-xl font-bold text-blue-900 mt-1">
                {formData.Destination_Country || 'N/A'}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="text-sm font-medium text-blue-600">Total Cases</div>
              <div className="text-xl font-bold text-blue-900 mt-1">
                {calculations.totalCases || 0}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 1: Basic Information */}
      <ReviewSection
        title="Basic Information"
        stepNumber={1}
        onEdit={onEdit}
        isEmpty={!formData.Shipment && !formData.Mode}
      >
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
          <ReviewField label="Shipment ID" value={formData.Shipment} />
          <ReviewField label="Loading Date" value={formData.Loading_Date} type="date" />
          <ReviewField label="Transport Mode" value={formData.Mode} />
          <ReviewField label="Destination Country" value={formData.Destination_Country} />
          <ReviewField label="End Market" value={formData.End_Market} />
          <ReviewField label="Freight Forwarder" value={formData.Freight_Forwarder} />
        </dl>
      </ReviewSection>

      {/* Step 2: Order References */}
      <ReviewSection
        title="Order References"
        stepNumber={2}
        onEdit={onEdit}
        isEmpty={!formData.STO && !formData.Sales_Order}
      >
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
          <ReviewField label="Sales Order" value={formData.Sales_Order} />
          <ReviewField label="STO (Stock Transport Order)" value={formData.STO} />
          <ReviewField label="GBA1 JP21" value={formData.GBA1_JP21} />
          <ReviewField label="US41 Shorefair GBA1" value={formData.US41_Shorefair_GBA1} />
          <ReviewField label="2nd Delivery" value={formData['2nd_Delivery']} />
        </dl>
      </ReviewSection>

      {/* Step 3: Product Details */}
      <ReviewSection
        title="Product Details"
        stepNumber={3}
        onEdit={onEdit}
        isEmpty={formData.lineItems.length === 0}
      >
        {formData.lineItems.length > 0 ? (
          <>
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-3">Line Items</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Delivery
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        SKU
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Description
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        Cases
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        Sticks
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        Gross kg
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        Net kg
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {formData.lineItems.map((item, index) => (
                      <tr key={item.id || index}>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {item.Delivery || '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {item.SKU || '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {item.Description || '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">
                          {item.Cases?.toLocaleString() || 0}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">
                          {item.Sticks?.toLocaleString() || 0}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">
                          {item.Gross_Kilos?.toLocaleString() || 0}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">
                          {item.Net_Kilos?.toLocaleString() || 0}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-indigo-50">
                    <tr>
                      <td
                        colSpan={3}
                        className="px-4 py-3 text-sm font-bold text-indigo-900"
                      >
                        TOTALS
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-indigo-900 text-right">
                        {calculations.totalCases.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-indigo-900 text-right">
                        {calculations.totalSticks.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-indigo-900 text-right">
                        {calculations.totalGrossKilos.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-indigo-900 text-right">
                        {calculations.totalNetKilos.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <dl className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2 mt-4 pt-4 border-t">
              <ReviewField label="Pallets" value={formData.Pallets} type="number" />
              <ReviewField
                label="Pallets Per Case"
                value={formData.Pallets_Per_Case}
                type="number"
              />
              <ReviewField label="Pallet Dimensions" value={formData.Pallet_Dimensions} />
            </dl>
          </>
        ) : (
          <p className="text-gray-400 italic">No line items added</p>
        )}
      </ReviewSection>

      {/* Step 4: Value & Customs */}
      <ReviewSection
        title="Value & Customs"
        stepNumber={4}
        onEdit={onEdit}
        isEmpty={!formData.Value && !formData.Price}
      >
        <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
          <ReviewField label="Value" value={formData.Value} type="currency" />
          <ReviewField label="HS Code" value={formData.HS_Code} />
          <ReviewField label="Date Code" value={formData.Date_Code} />
          <ReviewField label="Price" value={formData.Price} type="currency" />
          <ReviewField
            label="Price Per Unit"
            value={calculations.pricePerUnit}
            type="currency"
          />
          <ReviewField
            label="Cost Per Case"
            value={formData.Cost_Per_Case}
            type="currency"
          />
          <ReviewField
            label="CIF Los Angeles"
            value={formData.CIF_Los_Angeles}
            type="currency"
          />
          <ReviewField label="Incoterm" value={formData.Incoterm} />
        </dl>
      </ReviewSection>

      {/* Step 5: Freight Details */}
      <ReviewSection
        title="Freight Details"
        stepNumber={5}
        onEdit={onEdit}
        isEmpty={!formData.AWB && !formData.Container_No}
      >
        {formData.Mode === 'Air' ? (
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            <ReviewField label="AWB (Air Waybill)" value={formData.AWB} />
            <ReviewField label="AWB Booking" value={formData.AWB_Booking} />
            <ReviewField label="Airline" value={formData.Airline} />
            <ReviewField label="Departure Airport" value={formData.Departure_Airport} />
          </dl>
        ) : formData.Mode === 'Sea' ? (
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            <ReviewField label="Container Number" value={formData.Container_No} />
            <ReviewField label="Seal Number" value={formData.Seal_No} />
            <ReviewField label="Booking Number" value={formData.Booking_No} />
            <ReviewField label="BOL Number" value={formData.BOL_No} />
            <ReviewField
              label="Data Logger Serial"
              value={formData.Data_Logger_Serial}
            />
          </dl>
        ) : (
          <p className="text-gray-400 italic">No mode selected</p>
        )}
      </ReviewSection>

      {/* Step 6: Schedule & Timeline */}
      <ReviewSection
        title="Schedule & Timeline"
        stepNumber={6}
        onEdit={onEdit}
        isEmpty={!formData.ETD && !formData.ETA}
      >
        <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
          <ReviewField label="ETD (Estimated Time of Departure)" value={formData.ETD} type="date" />
          <ReviewField label="ETS (Estimated Time of Sailing)" value={formData.ETS} type="date" />
          <ReviewField label="ETA (Estimated Time of Arrival)" value={formData.ETA} type="date" />
          <ReviewField
            label="Lead Time Days (Auto-Calculated)"
            value={calculations.leadTimeDays}
            type="number"
          />
          {formData.Destination_Country === 'Japan' && (
            <>
              <ReviewField label="ETA Tokyo" value={formData.ETA_Tokyo} type="date" />
              <ReviewField label="COB Sail" value={formData.COB_Sail} type="date" />
            </>
          )}
          {(formData.Destination_Country === 'Japan' ||
            formData.Destination_Country === 'Taiwan') && (
            <>
              <ReviewField
                label="Arrived Memphis"
                value={formData.Arrived_Memphis}
                type="date"
              />
              <ReviewField
                label="Arrived LA Port"
                value={formData.Arrived_LA_Port}
                type="date"
              />
              <ReviewField label="COB Rail" value={formData.COB_Rail} type="date" />
            </>
          )}
        </dl>
      </ReviewSection>

      {/* Step 7: Carrier Details */}
      {formData.Mode === 'Sea' && (
        <ReviewSection
          title="Carrier Details"
          stepNumber={7}
          onEdit={onEdit}
          isEmpty={!formData.Vessel && !formData.Shipping_Line}
        >
          <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
            <ReviewField label="Vessel" value={formData.Vessel} />
            <ReviewField label="Shipping Line" value={formData.Shipping_Line} />
            <ReviewField label="Original Vessel" value={formData.Original_Vessel} />
            <ReviewField label="Final Vessel" value={formData.Final_Vessel} />
            <ReviewField
              label="Transhipments"
              value={formData.Transhipments}
              type="number"
            />
          </dl>
        </ReviewSection>
      )}

      {/* Step 8: Documentation */}
      <ReviewSection
        title="Documentation Tracking"
        stepNumber={8}
        onEdit={onEdit}
        isEmpty={
          !formData.Date_CI_PL_Drafted &&
          !formData.Date_TTB_Drafted &&
          !formData.Date_Final_Docs_Sent
        }
      >
        <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
          <ReviewField
            label="CI/PL Drafted"
            value={formData.Date_CI_PL_Drafted}
            type="date"
          />
          <ReviewField
            label="CI/PL Printed"
            value={formData.Date_CI_PL_Printed}
            type="date"
          />
          <ReviewField
            label="TTB Drafted"
            value={formData.Date_TTB_Drafted}
            type="date"
          />
          <ReviewField
            label="TTB Printed"
            value={formData.Date_TTB_Printed}
            type="date"
          />
          <ReviewField
            label="TTB Received/Signed"
            value={formData.Dated_TTB_Received_Signed}
            type="date"
          />
          <ReviewField
            label="Final Docs Sent"
            value={formData.Date_Final_Docs_Sent}
            type="date"
          />
          <ReviewField
            label="Docs Due Date"
            value={formData.Date_Docs_Have_To_Be_Sent}
            type="date"
          />
          <ReviewField
            label="Docs Sent To Tax"
            value={formData.Docs_Sent_To_Tax}
            type="date"
          />
          <ReviewField
            label="Final Docs Complete"
            value={formData.Final_Docs_Complete}
            type="boolean"
          />
          <ReviewField
            label="Final Docs To EM"
            value={formData.Final_Docs_To_EM}
            type="boolean"
          />
          <ReviewField label="TTB Complete" value={formData.TTB_Complete} type="boolean" />
          <ReviewField label="Tax Status" value={formData.Tax_Status} />
          <ReviewField
            label="Estimated SWB Available"
            value={formData.Estimated_SWB_Available}
            type="date"
          />
          <ReviewField label="Accounting Doc" value={formData.Accounting_Doc} />
        </dl>
      </ReviewSection>

      {/* Step 9: Location & Delivery */}
      <ReviewSection
        title="Location & Delivery"
        stepNumber={9}
        onEdit={onEdit}
        isEmpty={!formData.Port_Of_Departure && !formData.Port_Of_Delivery}
      >
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
          <ReviewField label="Port of Departure" value={formData.Port_Of_Departure} />
          <ReviewField label="Port of Delivery" value={formData.Port_Of_Delivery} />
          <ReviewField
            label="Final Place of Delivery"
            value={formData.Final_Place_Of_Delivery}
          />
          <ReviewField label="CNEE Address" value={formData.CNEE_Address} type="textarea" />
        </dl>
      </ReviewSection>

      {/* Step 10: Japan-Specific */}
      {formData.Destination_Country === 'Japan' && (
        <ReviewSection
          title="Japan-Specific Requirements"
          stepNumber={10}
          onEdit={onEdit}
          isEmpty={!formData.Tape_Color && !formData.Container_Checklist_Recorded}
        >
          <dl className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2">
            <ReviewField label="Tape Color" value={formData.Tape_Color} />
            <ReviewField
              label="Container Checklist Recorded"
              value={formData.Container_Checklist_Recorded}
              type="boolean"
            />
            <ReviewField
              label="STO Date Updated"
              value={formData.STO_Date_Updated}
              type="date"
            />
          </dl>
        </ReviewSection>
      )}

      {/* Step 11: Theft & Notes */}
      <ReviewSection
        title="Theft Tracking & Notes"
        stepNumber={11}
        onEdit={onEdit}
        isEmpty={!formData.Cases_Stolen && !formData.Notes}
      >
        <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
          <ReviewField
            label="Cases Stolen"
            value={formData.Cases_Stolen}
            type="number"
          />
          <ReviewField
            label="Sticks Stolen"
            value={formData.Sticks_Stolen}
            type="number"
          />
          <ReviewField
            label="Percent Pilfered (Auto)"
            value={calculations.percentPilfered}
            type="number"
          />
          <ReviewField
            label="Value of Stolen Items (Auto)"
            value={calculations.valueOfStolenItems}
            type="currency"
          />
          <ReviewField
            label="Difference Remaining"
            value={formData.Difference_Remaining}
            type="number"
          />
          <ReviewField
            label="Seals Broken"
            value={formData.Seals_Broken}
            type="boolean"
          />
        </dl>
        {formData.Notes && (
          <div className="mt-4 pt-4 border-t">
            <ReviewField label="Notes" value={formData.Notes} type="textarea" />
          </div>
        )}
      </ReviewSection>

      {/* Submit Instructions */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
        <div className="flex items-start">
          <svg
            className="w-6 h-6 text-green-600 mr-3 mt-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <h3 className="text-lg font-semibold text-green-900">Ready to Submit?</h3>
            <p className="text-sm text-green-700 mt-1">
              Review all sections above to ensure accuracy. Click the "Edit" button on
              any section to make changes. When everything looks correct, click the
              "Submit Shipment" button below.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
