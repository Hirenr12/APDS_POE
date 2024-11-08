import React from 'react';

function PaymentsDisplay() {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Customer Payments</h2>
      <div style={styles.tableWrapper}>
        <div style={styles.table}>
          {/* Column Headers */}
          <div style={styles.row}>
            <div style={styles.columnHeader}>Username</div>
            <div style={styles.columnHeader}>Account Number</div>
            <div style={styles.columnHeader}>Amount</div>
            <div style={styles.columnHeader}>Currency</div>
            <div style={styles.columnHeader}>Provider</div>
          </div>
          {/* Data Rows */}
          <div style={styles.row}>
            <div style={styles.cell}>DummySser123</div>
            <div style={styles.cell}>1234567890</div>
            <div style={styles.cell}>Dummy500.00</div>
            <div style={styles.cell}>DummyUSD</div>
            <div style={styles.cell}>DummySwift</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '26px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#333',
  },
  tableWrapper: {
    overflowX: 'auto', // Makes sure it scrolls horizontally if too wide
    marginTop: '20px',
    backgroundColor: '#ffffff', // White background for the entire table box
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Box shadow for a slight 3D effect
  },
  table: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)', // 5 columns for each entry
    gap: '0px', // No space between columns
    borderCollapse: 'collapse', // Ensures that there is no space between borders
  },
  row: {
    display: 'contents', // Ensures the row doesn't have a container box and behaves like regular rows
    borderBottom: '1px solid #ddd', // Line separating the rows
    backgroundColor: '#f9f9f9', // Light background for odd rows
  },
  rowAlternate: {
    display: 'contents',
    borderBottom: '1px solid #ddd', // Line separating the rows
    backgroundColor: '#e0e0e0', // Darker background for even rows
  },
  columnHeader: {
    padding: '10px',
    backgroundColor: '#2C3E50', // Dark blue for a more professional look
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    border: '1px solid #ddd', // Vertical line between columns
  },
  cell: {
    padding: '10px',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
    border: '1px solid #ddd', // Vertical line between columns
  },
};

export default PaymentsDisplay;
