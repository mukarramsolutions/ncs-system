import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const generateParcelExcel = (parcels: any[]) => {
  const worksheet = XLSX.utils.json_to_sheet(
    parcels.map(parcel => ({
      'Tracking Number': parcel.trackingNumber,
      'Customer': parcel.customer,
      'Branch': parcel.branch,
      'Status': parcel.status,
      'Assigned Staff': parcel.assignedStaff || 'Unassigned',
      'Weight': parcel.weight,
      'Charges': parcel.charges,
      'Destination': parcel.destination,
      'Created Date': parcel.createdDate
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Parcels');

  // Add summary sheet
  const summaryData = [
    ['Total Parcels', parcels.length],
    ['Delivered', parcels.filter(p => p.status === 'delivered').length],
    ['In Transit', parcels.filter(p => p.status === 'in-transit').length],
    ['Pending', parcels.filter(p => p.status === 'pending').length],
    ['Processing', parcels.filter(p => p.status === 'processing').length]
  ];

  const summarySheet = XLSX.utils.aoa_to_sheet([
    ['Metric', 'Count'],
    ...summaryData
  ]);

  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(data, `parcels-report-${new Date().toISOString().split('T')[0]}.xlsx`);
};

export const generateCustomerExcel = (customers: any[]) => {
  const worksheet = XLSX.utils.json_to_sheet(
    customers.map(customer => ({
      'Name': customer.name,
      'Email': customer.email,
      'Phone': customer.phone,
      'Address': customer.address,
      'Parcels Count': customer.parcelsCount,
      'Total Revenue': customer.totalRevenue,
      'Join Date': customer.joinDate,
      'Status': customer.status
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Customers');

  // Add analytics
  const totalRevenue = customers.reduce((sum, c) => sum + parseFloat(c.totalRevenue.replace('$', '')), 0);
  const avgParcels = customers.reduce((sum, c) => sum + c.parcelsCount, 0) / customers.length;

  const analyticsData = [
    ['Total Customers', customers.length],
    ['Active Customers', customers.filter(c => c.status === 'active').length],
    ['Total Revenue', `$${totalRevenue.toFixed(2)}`],
    ['Average Parcels per Customer', avgParcels.toFixed(1)]
  ];

  const analyticsSheet = XLSX.utils.aoa_to_sheet([
    ['Metric', 'Value'],
    ...analyticsData
  ]);

  XLSX.utils.book_append_sheet(workbook, analyticsSheet, 'Analytics');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(data, `customers-report-${new Date().toISOString().split('T')[0]}.xlsx`);
};

export const generateStaffExcel = (staff: any[]) => {
  const worksheet = XLSX.utils.json_to_sheet(
    staff.map(member => ({
      'Name': member.name,
      'Role': member.role,
      'Branch': member.branch,
      'Email': member.email,
      'Phone': member.phone,
      'Parcels Assigned': member.parcelsAssigned,
      'Revenue Generated': `$${member.revenueGenerated.toFixed(2)}`,
      'Join Date': member.joinDate,
      'Status': member.status
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Staff');

  // Performance metrics
  const totalRevenue = staff.reduce((sum, s) => sum + s.revenueGenerated, 0);
  const totalParcels = staff.reduce((sum, s) => sum + s.parcelsAssigned, 0);

  const performanceData = [
    ['Total Staff', staff.length],
    ['Active Staff', staff.filter(s => s.status === 'active').length],
    ['Total Revenue Generated', `$${totalRevenue.toFixed(2)}`],
    ['Total Parcels Handled', totalParcels],
    ['Average Revenue per Staff', `$${(totalRevenue / staff.length).toFixed(2)}`]
  ];

  const performanceSheet = XLSX.utils.aoa_to_sheet([
    ['Metric', 'Value'],
    ...performanceData
  ]);

  XLSX.utils.book_append_sheet(workbook, performanceSheet, 'Performance');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(data, `staff-report-${new Date().toISOString().split('T')[0]}.xlsx`);
};

export const generateBranchExcel = (branches: any[]) => {
  const worksheet = XLSX.utils.json_to_sheet(
    branches.map(branch => ({
      'Branch Name': branch.name,
      'Location': branch.location,
      'Manager': branch.manager,
      'Phone': branch.phone,
      'Email': branch.email,
      'Staff Count': branch.staffCount,
      'Total Parcels': branch.totalParcels,
      'Monthly Revenue': `$${branch.monthlyRevenue.toLocaleString()}`,
      'Established': branch.established,
      'Status': branch.status
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Branches');

  // Branch analytics
  const totalRevenue = branches.reduce((sum, b) => sum + b.monthlyRevenue, 0);
  const totalStaff = branches.reduce((sum, b) => sum + b.staffCount, 0);
  const totalParcels = branches.reduce((sum, b) => sum + b.totalParcels, 0);

  const analyticsData = [
    ['Total Branches', branches.length],
    ['Active Branches', branches.filter(b => b.status === 'active').length],
    ['Total Staff Across Branches', totalStaff],
    ['Total Parcels Handled', totalParcels],
    ['Total Monthly Revenue', `$${totalRevenue.toLocaleString()}`],
    ['Average Revenue per Branch', `$${(totalRevenue / branches.length).toLocaleString()}`]
  ];

  const analyticsSheet = XLSX.utils.aoa_to_sheet([
    ['Metric', 'Value'],
    ...analyticsData
  ]);

  XLSX.utils.book_append_sheet(workbook, analyticsSheet, 'Analytics');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(data, `branches-report-${new Date().toISOString().split('T')[0]}.xlsx`);
};

export const generateRevenueExcel = (revenueData: any) => {
  // Main revenue data
  const summaryData = [
    ['Total Revenue', `$${revenueData.total.toLocaleString()}`],
    ['Monthly Average', `$${revenueData.monthly.toLocaleString()}`],
    ['Growth Rate', `${revenueData.growth}%`]
  ];

  const summarySheet = XLSX.utils.aoa_to_sheet([
    ['Metric', 'Value'],
    ...summaryData
  ]);

  // Branch revenue
  const branchSheet = XLSX.utils.json_to_sheet(
    revenueData.byBranch.map((branch: any) => ({
      'Branch': branch.name,
      'Revenue': `$${branch.revenue.toLocaleString()}`,
      'Percentage': `${branch.percentage}%`
    }))
  );

  // Staff revenue
  const staffSheet = XLSX.utils.json_to_sheet(
    revenueData.byStaff.map((staff: any) => ({
      'Staff Member': staff.name,
      'Revenue': `$${staff.revenue.toLocaleString()}`,
      'Percentage': `${staff.percentage}%`
    }))
  );

  // Monthly trend
  const trendSheet = XLSX.utils.json_to_sheet(
    revenueData.monthlyTrend.map((month: any) => ({
      'Month': month.month,
      'Revenue': `$${month.revenue.toLocaleString()}`
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');
  XLSX.utils.book_append_sheet(workbook, branchSheet, 'By Branch');
  XLSX.utils.book_append_sheet(workbook, staffSheet, 'By Staff');
  XLSX.utils.book_append_sheet(workbook, trendSheet, 'Monthly Trend');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(data, `revenue-report-${new Date().toISOString().split('T')[0]}.xlsx`);
};