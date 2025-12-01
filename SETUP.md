# Setup Instructions

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Code editor (VS Code recommended)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages:
- React 18.3.1
- TypeScript 5.7.2
- Vite 6.0.1
- Tailwind CSS 3.4.15
- Other development dependencies

### 2. Run Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173` (default Vite port)

### 3. Build for Production

```bash
npm run build
```

The production build will be created in the `dist/` folder.

### 4. Preview Production Build

```bash
npm run preview
```

## Project Overview

### Key Files

- **src/components/shipment/ShipmentForm.tsx**: Main form component with tab navigation
- **src/lib/fieldConfig.ts**: Complete field definitions from Excel (80 fields)
- **src/lib/fieldUtils.ts**: Logic for conditional field visibility
- **src/types/shipment.ts**: TypeScript type definitions

### How It Works

1. **Field Configuration**: All 80 fields from the Excel template are defined in `fieldConfig.ts` with:
   - Field name, type, category
   - Required/optional status
   - Conditions (country, mode, etc.)
   - Examples and descriptions

2. **Conditional Rendering**: Fields appear/disappear based on:
   - **Country Selection**: E.g., selecting "Japan" shows Japan-specific fields like Tape_Color, ETA_Tokyo, TTB dates
   - **Mode Selection**: Selecting "Air" shows air freight fields (AWB, Airline), "Sea" shows sea freight fields (Container, Vessel)

3. **Tab Organization**: Fields are grouped into 14 categories:
   - Identifiers → Order References → Product → Quantity → Weight → Value & Customs
   - Air Freight → Sea Freight → Schedule → Carrier → Documentation
   - Location → Japan Specific → Theft Tracking → Notes

4. **Validation**: Required fields (marked with *) are validated on submit

## Backend Integration

### ASP.NET Core API Setup

The frontend is ready to connect to an ASP.NET Core backend. Here's a sample controller:

```csharp
// Controllers/ShipmentsController.cs
[ApiController]
[Route("api/[controller]")]
public class ShipmentsController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> CreateShipment([FromBody] ShipmentDto shipment)
    {
        // Validate shipment
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        // Save to database
        // await _shipmentService.CreateAsync(shipment);

        return Ok(new { message = "Shipment created successfully", id = shipment.Shipment });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetShipment(string id)
    {
        // Retrieve shipment
        // var shipment = await _shipmentService.GetByIdAsync(id);
        // return Ok(shipment);
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateShipment(string id, [FromBody] ShipmentDto shipment)
    {
        // Update shipment
        // await _shipmentService.UpdateAsync(id, shipment);
        return Ok(new { message = "Shipment updated successfully" });
    }
}
```

### Update the Frontend Submit Handler

In `ShipmentForm.tsx`, uncomment and update the API call:

```typescript
const response = await fetch('http://localhost:5000/api/shipments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});

if (response.ok) {
  alert('Shipment submitted successfully!');
  setFormData({});
} else {
  alert('Error submitting shipment');
}
```

## Customization

### Adding New Fields

1. Add field definition to `src/lib/fieldConfig.ts`:
```typescript
{
  fieldName: 'New_Field',
  required: false,
  dataType: 'Text',
  appliesTo: ['All'],
  category: 'Identifiers',
  description: 'Description of the field',
  example: 'Example value'
}
```

2. Add TypeScript type to `src/types/shipment.ts`:
```typescript
export interface ShipmentData {
  // ... existing fields
  New_Field?: string;
}
```

### Modifying Field Visibility

Update the `isFieldVisible` function in `src/lib/fieldUtils.ts` to add custom visibility logic.

### Styling Changes

Tailwind CSS classes can be modified directly in the components. Global styles are in `src/index.css`.

## Troubleshooting

### Port Already in Use
If port 5173 is busy:
```bash
npm run dev -- --port 3000
```

### Module Not Found Errors
Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
Ensure all imports are correct and run:
```bash
npm run build
```

## Testing the Form

1. Start the dev server
2. Open browser to `http://localhost:5173`
3. Select a country (e.g., "Japan")
4. Select a mode (e.g., "Sea")
5. Observe which fields appear in different tabs
6. Fill required fields (marked with *)
7. Click "Submit Shipment" to see console output

## Next Steps

- Connect to ASP.NET Core backend API
- Add database integration (SQL Server, PostgreSQL, etc.)
- Implement authentication and authorization
- Add shipment listing and search features
- Export functionality (Excel, PDF)
- Dashboard with analytics
