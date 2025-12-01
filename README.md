# DORO Shipment Management System

A modern, comprehensive shipment tracking and documentation system built with React, TypeScript, Tailwind CSS, and Shadcn/UI.

## Features

### Header/Detail Structure
- **Header Information**: One shipment document contains general shipping information
- **Line Items**: Multiple product lines per shipment (Delivery, SKU, Description, Cases, Sticks, Gross/Net Kilos)
- **Dynamic Totals**: Automatic calculation of total cases, sticks, and weight across all line items

### Smart Conditional Fields
Fields dynamically appear/disappear based on:
- **Selected Destination Country** (Japan, Taiwan, Colombia, etc.)
  - Japan: Tape colors, ETA Tokyo, TTB documentation, price fields, container checklist
  - Taiwan: Data logger serial, CIF Los Angeles, Memphis/LA arrival dates
  - Mauritius: 2nd delivery for split shipments
  - Colombia: CNEE address
- **Transport Mode** (Air or Sea freight)
  - Air: AWB, Airline, Departure Airport
  - Sea: Container, Vessel, Shipping Line, BOL

### Beautiful Modern UI
- **Gradient Backgrounds**: Eye-catching gradient designs throughout
- **Interactive Tabs**: Tab-based navigation for 13 categories plus product details
- **Visual Feedback**: Icons, badges, and status indicators
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Validation**: Visual indicators for required fields
- **Professional Layout**: Clean, organized sections with proper spacing

### Data Organization (13 Categories)

1. **Product Details** (Line Items Table)
   - Add/remove multiple product lines
   - Each line: Delivery, SKU, Description, Cases, Sticks, Gross Kilos, Net Kilos
   - Automatic totals calculation
   - Color-coded summary cards

2. **Identifiers**: Shipment ID, Loading Date, Mode, Country, Forwarder
3. **Order References**: SAP orders, STO, delivery numbers
4. **Container Info**: Pallets, dimensions, configuration
5. **Value & Customs**: Pricing, HS codes, incoterms
6. **Air Freight**: AWB, airline, departure info
7. **Sea Freight**: Container, vessel, booking details
8. **Schedule**: ETD, ETA, arrival dates
9. **Carrier**: Vessel and shipping line info
10. **Documentation**: TTB, CI/PL, tax documents
11. **Location**: Ports and delivery addresses
12. **Japan Specific**: Tape colors, checklists
13. **Theft Tracking**: Pilferage documentation
14. **Notes**: Additional comments

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS 3 with custom gradients
- **UI Components**: Custom Shadcn/UI components
- **Build Tool**: Vite
- **Backend Ready**: ASP.NET Core integration prepared

## Project Structure

```
src/
├── components/
│   ├── shipment/
│   │   ├── ShipmentForm.tsx        # Main form with tabs and status
│   │   ├── LineItemsTable.tsx      # Product line items table
│   │   ├── FormSection.tsx         # Category sections
│   │   └── FormField.tsx           # Individual fields with icons
│   └── ui/                         # Shadcn/UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── tabs.tsx
│       └── textarea.tsx
├── lib/
│   ├── fieldConfig.ts              # Field definitions
│   └── fieldUtils.ts               # Visibility logic
├── types/
│   └── shipment.ts                 # TypeScript interfaces
├── App.tsx
├── main.tsx
└── index.css
```

## Installation & Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage Guide

1. **Start with Identifiers Tab**
   - Fill in Shipment ID (required)
   - Select Loading Date (required)
   - Choose Destination Country (required)
   - Select Transport Mode: Air or Sea (required)
   - Select Freight Forwarder

2. **Add Product Details**
   - Click on "📦 Product Details" tab
   - Click "Add Product Line" button
   - Fill in product information:
     - Delivery number
     - SKU code
     - Product description
     - Quantity (cases, sticks)
     - Weight (gross and net kilos)
   - Add more lines as needed
   - View automatic totals at the bottom

3. **Complete Other Sections**
   - Navigate through tabs to fill in relevant information
   - Fields will show/hide based on country and mode selections
   - Required fields are marked with a red "Required" badge
   - Completed required fields show a green checkmark

4. **Submit**
   - Review all information
   - Click "Submit Shipment"
   - Form validates required fields and line items
   - Data is sent to backend API

## Key Features Explained

### Line Items Table
- **Add Multiple Products**: One shipment can contain many different products
- **Inline Editing**: Edit directly in the table cells
- **Remove Items**: Delete unwanted lines with trash icon
- **Auto Totals**: Real-time calculation of totals
- **Summary Cards**: Color-coded cards show totals at a glance

### Conditional Field Logic
The system intelligently shows/hides fields based on:
```typescript
// Example: Japan-specific fields only appear when Japan is selected
if (Destination_Country === 'Japan') {
  // Show: Tape_Color, ETA_Tokyo, TTB dates, Price, etc.
}

// Example: Sea freight fields only appear for Sea mode
if (Mode === 'Sea') {
  // Show: Container_No, Vessel, Shipping_Line, BOL_No, etc.
}
```

### Visual Enhancements
- **Gradients**: Modern gradient backgrounds and buttons
- **Icons**: SVG icons for visual context
- **Badges**: Status badges for required fields
- **Cards**: Organized card layouts
- **Hover Effects**: Interactive hover states
- **Status Bar**: Shows selected country and mode

## Backend Integration (ASP.NET Core)

### Data Model
```csharp
public class ShipmentDto
{
    // Header fields
    public string Shipment { get; set; }
    public DateTime? LoadingDate { get; set; }
    public string Mode { get; set; }
    public string DestinationCountry { get; set; }

    // Line items
    public List<ShipmentLineItemDto> LineItems { get; set; }

    // ... other fields
}

public class ShipmentLineItemDto
{
    public string Id { get; set; }
    public string Delivery { get; set; }
    public string SKU { get; set; }
    public string Description { get; set; }
    public int? Cases { get; set; }
    public int? Sticks { get; set; }
    public decimal? GrossKilos { get; set; }
    public decimal? NetKilos { get; set; }
}
```

### API Endpoint
```csharp
[HttpPost("api/shipments")]
public async Task<IActionResult> CreateShipment([FromBody] ShipmentDto shipment)
{
    if (!ModelState.IsValid)
        return BadRequest(ModelState);

    // Save header
    var shipmentEntity = await _shipmentService.CreateAsync(shipment);

    // Save line items
    foreach (var item in shipment.LineItems)
    {
        await _lineItemService.CreateAsync(shipmentEntity.Id, item);
    }

    return Ok(new { id = shipmentEntity.Id });
}
```

### Frontend API Call
Uncomment in `ShipmentForm.tsx`:
```typescript
const response = await fetch('/api/shipments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
```

## Customization

### Adding New Fields
1. Add to `src/lib/fieldConfig.ts`:
```typescript
{
  fieldName: 'New_Field',
  required: false,
  dataType: 'Text',
  appliesTo: ['All'],
  category: 'Identifiers',
  description: 'Description',
  example: 'Example'
}
```

2. Add TypeScript type in `src/types/shipment.ts`:
```typescript
export interface ShipmentData {
  // ... existing fields
  New_Field?: string;
}
```

### Styling Changes
- Modify gradients in `ShipmentForm.tsx`
- Update Tailwind classes in components
- Change colors in `tailwind.config.js`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Proprietary - DORO Shipment Management System
