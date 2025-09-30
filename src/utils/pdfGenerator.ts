import jsPDF from 'jspdf';
import 'jspdf-autotable';
import JsBarcode from 'jsbarcode';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const generateParcelLabel = (parcel: any) => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [100, 150] // 4x6 inch label
  });

  // Create barcode canvas
  const canvas = document.createElement('canvas');
  JsBarcode(canvas, parcel.trackingNumber, {
    format: 'CODE128',
    width: 2,
    height: 40,
    displayValue: true,
    fontSize: 12,
    textMargin: 2
  });

  // Convert canvas to image
  const barcodeDataURL = canvas.toDataURL('image/png');

  // Header
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('NCS LOGISTICS', 50, 15, { align: 'center' });
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Parcel & Logistics Management', 50, 22, { align: 'center' });

  // Tracking Number
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Tracking Number:', 10, 35);
  pdf.text(parcel.trackingNumber, 10, 42);

  // Barcode
  pdf.addImage(barcodeDataURL, 'PNG', 10, 45, 80, 20);

  // QR Code for tracking URL
  const trackingUrl = `https://ncs-logistics.com/track/${parcel.trackingNumber}`;
  
  // Create QR code canvas
  const qrCanvas = document.createElement('canvas');
  const qrContext = qrCanvas.getContext('2d');
  qrCanvas.width = 60;
  qrCanvas.height = 60;
  
  // Simple QR code placeholder (in real implementation, use a QR code library)
  if (qrContext) {
    qrContext.fillStyle = '#000';
    qrContext.fillRect(0, 0, 60, 60);
    qrContext.fillStyle = '#fff';
    qrContext.fillRect(5, 5, 50, 50);
  }
  
  const qrDataURL = qrCanvas.toDataURL('image/png');
  pdf.addImage(qrDataURL, 'PNG', 70, 70, 20, 20);

  // Sender Information
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.text('FROM:', 10, 75);
  pdf.setFont('helvetica', 'normal');
  pdf.text(parcel.senderAddress || 'NCS Logistics Center', 10, 82);

  // Recipient Information
  pdf.setFont('helvetica', 'bold');
  pdf.text('TO:', 10, 95);
  pdf.setFont('helvetica', 'normal');
  pdf.text(parcel.customer || 'Customer Name', 10, 102);
  pdf.text(parcel.destination || 'Delivery Address', 10, 109);

  // Parcel Details
  pdf.setFont('helvetica', 'bold');
  pdf.text('DETAILS:', 10, 122);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Weight: ${parcel.weight || 'N/A'}`, 10, 129);
  pdf.text(`Type: ${parcel.type || 'Standard'}`, 10, 136);
  pdf.text(`Date: ${new Date().toLocaleDateString()}`, 10, 143);

  // Footer
  pdf.setFontSize(8);
  pdf.text(`Scan QR code or visit: ${trackingUrl}`, 10, 148);

  // Save the PDF
  pdf.save(`parcel-label-${parcel.trackingNumber}.pdf`);
};

export const generateParcelReport = (parcels: any[]) => {
  const pdf = new jsPDF();

  // Header
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('NCS Logistics - Parcel Report', 20, 20);

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
  pdf.text(`Total Parcels: ${parcels.length}`, 20, 40);

  // Table
  const tableData = parcels.map(parcel => [
    parcel.trackingNumber,
    parcel.customer,
    parcel.status,
    parcel.branch,
    parcel.charges,
    parcel.createdDate
  ]);

  pdf.autoTable({
    head: [['Tracking Number', 'Customer', 'Status', 'Branch', 'Charges', 'Date']],
    body: tableData,
    startY: 50,
    styles: {
      fontSize: 10,
      cellPadding: 3
    },
    headStyles: {
      fillColor: [59, 130, 246],
      textColor: 255
    }
  });

  pdf.save('parcels-report.pdf');
};

export const generateCustomerReport = (customers: any[]) => {
  const pdf = new jsPDF();

  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('NCS Logistics - Customer Report', 20, 20);

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
  pdf.text(`Total Customers: ${customers.length}`, 20, 40);

  const tableData = customers.map(customer => [
    customer.name,
    customer.email,
    customer.phone,
    customer.parcelsCount,
    customer.totalRevenue,
    customer.status
  ]);

  pdf.autoTable({
    head: [['Name', 'Email', 'Phone', 'Parcels', 'Revenue', 'Status']],
    body: tableData,
    startY: 50,
    styles: {
      fontSize: 10,
      cellPadding: 3
    },
    headStyles: {
      fillColor: [16, 185, 129],
      textColor: 255
    }
  });

  pdf.save('customers-report.pdf');
};

export const generateStaffReport = (staff: any[]) => {
  const pdf = new jsPDF();

  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('NCS Logistics - Staff Report', 20, 20);

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
  pdf.text(`Total Staff: ${staff.length}`, 20, 40);

  const tableData = staff.map(member => [
    member.name,
    member.role,
    member.branch,
    member.parcelsAssigned,
    `$${member.revenueGenerated.toFixed(2)}`,
    member.status
  ]);

  pdf.autoTable({
    head: [['Name', 'Role', 'Branch', 'Parcels', 'Revenue', 'Status']],
    body: tableData,
    startY: 50,
    styles: {
      fontSize: 10,
      cellPadding: 3
    },
    headStyles: {
      fillColor: [139, 92, 246],
      textColor: 255
    }
  });

  pdf.save('staff-report.pdf');
};

export const generateBranchReport = (branches: any[]) => {
  const pdf = new jsPDF();

  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('NCS Logistics - Branch Report', 20, 20);

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
  pdf.text(`Total Branches: ${branches.length}`, 20, 40);

  const tableData = branches.map(branch => [
    branch.name,
    branch.location,
    branch.manager,
    branch.staffCount,
    branch.totalParcels,
    `$${branch.monthlyRevenue.toLocaleString()}`
  ]);

  pdf.autoTable({
    head: [['Name', 'Location', 'Manager', 'Staff', 'Parcels', 'Revenue']],
    body: tableData,
    startY: 50,
    styles: {
      fontSize: 10,
      cellPadding: 3
    },
    headStyles: {
      fillColor: [245, 158, 11],
      textColor: 255
    }
  });

  pdf.save('branches-report.pdf');
};

export const generateRevenueReport = (revenueData: any) => {
  const pdf = new jsPDF();

  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('NCS Logistics - Revenue Report', 20, 20);

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);

  // Summary
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Revenue Summary', 20, 50);

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Total Revenue: $${revenueData.total.toLocaleString()}`, 20, 60);
  pdf.text(`Monthly Average: $${revenueData.monthly.toLocaleString()}`, 20, 70);
  pdf.text(`Growth Rate: +${revenueData.growth}%`, 20, 80);

  // Branch Revenue Table
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Revenue by Branch', 20, 100);

  const branchData = revenueData.byBranch.map((branch: any) => [
    branch.name,
    `$${branch.revenue.toLocaleString()}`,
    `${branch.percentage}%`
  ]);

  pdf.autoTable({
    head: [['Branch', 'Revenue', 'Percentage']],
    body: branchData,
    startY: 110,
    styles: {
      fontSize: 10,
      cellPadding: 3
    },
    headStyles: {
      fillColor: [59, 130, 246],
      textColor: 255
    }
  });

  pdf.save('revenue-report.pdf');
};