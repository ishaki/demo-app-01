import React, { useState } from 'react';
import { ShipmentData, Category } from '../../types/shipment';
import { fieldDefinitions, categories } from '../../lib/fieldConfig';
import { isFieldVisible } from '../../lib/fieldUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { FormSection } from './FormSection';
import { LineItemsTable } from './LineItemsTable';
import { Button } from '../ui/button';

export const ShipmentForm: React.FC = () => {
  const [formData, setFormData] = useState<ShipmentData>({
    lineItems: [],
  });
  const [activeTab, setActiveTab] = useState<Category | 'Product Details'>('Identifiers');

  const selectedCountry = formData.Destination_Country;
  const selectedMode = formData.Mode;

  const handleFieldChange = (fieldName: keyof ShipmentData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = fieldDefinitions.filter(
      (field) =>
        field.required &&
        isFieldVisible(field, selectedCountry, selectedMode)
    );

    const missingFields = requiredFields.filter(
      (field) => !formData[field.fieldName as keyof ShipmentData]
    );

    if (missingFields.length > 0) {
      alert(
        `Please fill in the following required fields:\n${missingFields
          .map((f) => f.fieldName.replace(/_/g, ' '))
          .join('\n')}`
      );
      return;
    }

    // Validate at least one line item
    if (formData.lineItems.length === 0) {
      alert('Please add at least one product line item.');
      return;
    }

    // TODO: Send data to ASP.NET Core backend
    console.log('Form submitted:', formData);

    // Placeholder for API call
    // const response = await fetch('/api/shipments', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });

    alert('Shipment submitted successfully!');
  };

  const getVisibleFieldsByCategory = (category: Category) => {
    return fieldDefinitions.filter(
      (field) =>
        field.category === category &&
        isFieldVisible(field, selectedCountry, selectedMode)
    );
  };

  const hasVisibleFields = (category: Category) => {
    return getVisibleFieldsByCategory(category).length > 0;
  };

  const resetForm = () => {
    if (confirm('Are you sure you want to reset the form? All data will be lost.')) {
      setFormData({ lineItems: [] });
      setActiveTab('Identifiers');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            DORO Shipment Management
          </h1>
          <p className="text-lg text-gray-600">
            Complete shipment tracking and documentation system
          </p>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-bold">New Shipment</CardTitle>
                <p className="text-blue-100 mt-2">
                  Fill in the details below to create a new shipment record
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                <div className="text-sm text-blue-100">Shipment ID</div>
                <div className="text-xl font-bold">{formData.Shipment || '---'}</div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Status Bar */}
            {(selectedCountry || selectedMode) && (
              <div className="mb-6 flex flex-wrap gap-3">
                {selectedCountry && (
                  <div className="inline-flex items-center bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                    <svg
                      className="w-5 h-5 text-blue-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm font-medium text-blue-900">
                      Destination: <strong>{selectedCountry}</strong>
                    </span>
                  </div>
                )}
                {selectedMode && (
                  <div className="inline-flex items-center bg-purple-50 border border-purple-200 rounded-lg px-4 py-2">
                    <svg
                      className="w-5 h-5 text-purple-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    <span className="text-sm font-medium text-purple-900">
                      Transport Mode: <strong>{selectedMode}</strong>
                    </span>
                  </div>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <Tabs
                value={activeTab}
                onValueChange={(value) => setActiveTab(value as Category | 'Product Details')}
                className="w-full"
              >
                <TabsList className="flex flex-wrap h-auto gap-2 bg-gradient-to-r from-gray-100 to-gray-200 p-3 rounded-xl mb-6 shadow-inner">
                  <TabsTrigger
                    value="Product Details"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg px-6 py-2.5 rounded-lg transition-all font-semibold"
                  >
                    📦 Product Details
                  </TabsTrigger>
                  {categories
                    .filter((category) => hasVisibleFields(category))
                    .map((category) => (
                      <TabsTrigger
                        key={category}
                        value={category}
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg px-6 py-2.5 rounded-lg transition-all font-medium"
                      >
                        {category}
                      </TabsTrigger>
                    ))}
                </TabsList>

                {/* Product Details Tab */}
                <TabsContent value="Product Details" className="mt-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                    <LineItemsTable
                      lineItems={formData.lineItems}
                      onChange={(items) => handleFieldChange('lineItems', items)}
                    />
                  </div>
                </TabsContent>

                {/* Other Category Tabs */}
                {categories.map((category) => (
                  <TabsContent
                    key={category}
                    value={category}
                    className="mt-4"
                  >
                    {hasVisibleFields(category) && (
                      <FormSection
                        category={category}
                        fields={getVisibleFieldsByCategory(category)}
                        formData={formData}
                        onFieldChange={handleFieldChange}
                      />
                    )}
                  </TabsContent>
                ))}
              </Tabs>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-between items-center border-t-2 border-gray-200 pt-6 bg-gradient-to-r from-gray-50 to-gray-100 -mx-6 -mb-6 px-6 py-6 rounded-b-lg">
                <Button
                  type="button"
                  onClick={resetForm}
                  variant="outline"
                  className="px-8 py-3 text-base font-semibold"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Reset Form
                </Button>
                <Button
                  type="submit"
                  className="px-8 py-3 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Submit Shipment
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>DORO Shipment Management System v1.0</p>
        </div>
      </div>
    </div>
  );
};
