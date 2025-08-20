// Customer data lookup
const customerData = {
  "FMN-000104": {
    "CustomerCode": "FMN-000104",
    "Brand": "FM",
    "BrandPresence": "AR+US+FM+UK",
    "CustomerName": "PEHCHAAN - AJMER",
    "TOWN": "AJMER",
    "STATE": "RAJASTHAN"
  },
  "FMN-000107": {
    "CustomerCode": "FMN-000107",
    "Brand": "FM", 
    "BrandPresence": "US+FM",
    "CustomerName": "SHYAM CREATION",
    "TOWN": "JODHPUR",
    "STATE": "RAJASTHAN"
  },
  "FMN-000097": {
    "CustomerCode": "FMN-000097",
    "Brand": "FM",
    "BrandPresence": "US+FM", 
    "CustomerName": "CHAPLOT MULTI BRAND",
    "TOWN": "RAJSAMAND",
    "STATE": "RAJASTHAN"
  },
  "USN-000004": {
    "CustomerCode": "USN-000004",
    "Brand": "USPA",
    "BrandPresence": "US",
    "CustomerName": "CELEBRATION",
    "TOWN": "ALWAR", 
    "STATE": "RAJASTHAN"
  },
  "USN-000006": {
    "CustomerCode": "USN-000006",
    "Brand": "USPA",
    "BrandPresence": "US+FM",
    "CustomerName": "CHAPLOT MULTI BRAND",
    "TOWN": "RAJSAMAND",
    "STATE": "RAJASTHAN"
  },
  "ARN-000102": {
    "CustomerCode": "ARN-000102",
    "Brand": "ARROW", 
    "BrandPresence": "AR",
    "CustomerName": "UNCAGED - NAGOUR",
    "TOWN": "NAGOUR",
    "STATE": "RAJASTHAN"
  },
  "UKN-000068": {
    "CustomerCode": "UKN-000068",
    "Brand": "USPA-KIDS",
    "BrandPresence": "UK", 
    "CustomerName": "YOUTH CREATION - JODHPUR",
    "TOWN": "JODHPUR",
    "STATE": "RAJASTHAN"
  },
  "FMN-000115": {
    "CustomerCode": "FMN-000115",
    "Brand": "FM",
    "BrandPresence": "FM",
    "CustomerName": "UNCAGED - JHUNJHUNU", 
    "TOWN": "JHUNJHUNU",
    "STATE": "RAJASTHAN"
  },
  "USN-000008": {
    "CustomerCode": "USN-000008",
    "Brand": "USPA",
    "BrandPresence": "AR+US+FM",
    "CustomerName": "CIVIL & MILITARY - M.I.ROAD",
    "TOWN": "JAIPUR",
    "STATE": "RAJASTHAN"
  },
  "FMN-000121": {
    "CustomerCode": "FMN-000121",
    "Brand": "FM",
    "BrandPresence": "FM", 
    "CustomerName": "UNCAGED - TONK ROAD",
    "TOWN": "JAIPUR",
    "STATE": "RAJASTHAN"
  }
};

// Application state
let salesEntries = [];
let selectedCustomer = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Set today's date
    setTodaysDate();
    
    // Setup event listeners
    setupEventListeners();
    
    console.log('DSR App initialized');
});

// Set today's date in the date input
function setTodaysDate() {
    const entryDate = document.getElementById('entryDate');
    if (entryDate) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        entryDate.value = `${year}-${month}-${day}`;
    }
}

// Setup all event listeners
function setupEventListeners() {
    const customerCodeSelect = document.getElementById('customerCode');
    const dsrForm = document.getElementById('dsrForm');
    const clearFormBtn = document.getElementById('clearForm');
    const viewEntriesBtn = document.getElementById('viewEntriesBtn');
    const hideEntriesBtn = document.getElementById('hideEntriesBtn');
    
    if (customerCodeSelect) {
        customerCodeSelect.addEventListener('change', handleCustomerSelection);
    }
    
    if (dsrForm) {
        dsrForm.addEventListener('submit', handleFormSubmit);
    }
    
    if (clearFormBtn) {
        clearFormBtn.addEventListener('click', handleClearForm);
    }
    
    if (viewEntriesBtn) {
        viewEntriesBtn.addEventListener('click', showEntriesTable);
    }
    
    if (hideEntriesBtn) {
        hideEntriesBtn.addEventListener('click', hideEntriesTable);
    }
}

// Handle customer selection
function handleCustomerSelection() {
    const customerCodeSelect = document.getElementById('customerCode');
    const selectedCode = customerCodeSelect.value;
    
    if (!selectedCode) {
        hideCustomerDetails();
        hideEntryForm();
        return;
    }
    
    selectedCustomer = customerData[selectedCode];
    
    if (selectedCustomer) {
        showCustomerDetails(selectedCustomer);
        showEntryForm();
        hideMessages();
    }
}

// Show customer details
function showCustomerDetails(customer) {
    document.getElementById('brandValue').textContent = customer.Brand;
    document.getElementById('brandPresenceValue').textContent = customer.BrandPresence;
    document.getElementById('customerNameValue').textContent = customer.CustomerName;
    document.getElementById('townValue').textContent = customer.TOWN;
    document.getElementById('stateValue').textContent = customer.STATE;
    
    const customerDetails = document.getElementById('customerDetails');
    customerDetails.style.display = 'block';
    
    // Smooth scroll to customer details
    setTimeout(() => {
        customerDetails.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// Hide customer details
function hideCustomerDetails() {
    const customerDetails = document.getElementById('customerDetails');
    customerDetails.style.display = 'none';
    selectedCustomer = null;
}

// Show entry form
function showEntryForm() {
    const entryForm = document.getElementById('entryForm');
    entryForm.style.display = 'block';
    
    // Set today's date when form is shown
    setTodaysDate();
    
    // Smooth scroll to entry form
    setTimeout(() => {
        entryForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 200);
}

// Hide entry form
function hideEntryForm() {
    const entryForm = document.getElementById('entryForm');
    entryForm.style.display = 'none';
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    if (!selectedCustomer) {
        showError('Please select a customer first.');
        return;
    }
    
    // Get form values
    const entryDate = document.getElementById('entryDate').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const value = parseFloat(document.getElementById('value').value);
    
    // Validate inputs
    if (!entryDate) {
        showError('Please select an entry date.');
        return;
    }
    
    if (!quantity || quantity <= 0) {
        showError('Please enter a valid quantity.');
        return;
    }
    
    if (!value || value <= 0) {
        showError('Please enter a valid value.');
        return;
    }
    
    // Create entry object
    const entry = {
        customerCode: selectedCustomer.CustomerCode,
        customerName: selectedCustomer.CustomerName,
        brand: selectedCustomer.Brand,
        brandPresence: selectedCustomer.BrandPresence,
        town: selectedCustomer.TOWN,
        state: selectedCustomer.STATE,
        date: entryDate,
        quantity: quantity,
        value: value,
        timestamp: new Date().toISOString()
    };
    
    // Add to entries array
    salesEntries.unshift(entry);
    
    // Show success message
    showSuccess();
    
    // Clear form fields but keep customer selection
    clearFormFields();
    
    // Show view entries button
    showViewEntriesButton();
}

// Clear form fields only (keep customer selection)
function clearFormFields() {
    document.getElementById('quantity').value = '';
    document.getElementById('value').value = '';
    setTodaysDate();
}

// Clear entire form
function handleClearForm() {
    const customerCodeSelect = document.getElementById('customerCode');
    const dsrForm = document.getElementById('dsrForm');
    
    customerCodeSelect.value = '';
    dsrForm.reset();
    
    hideCustomerDetails();
    hideEntryForm();
    hideMessages();
    setTodaysDate();
    
    selectedCustomer = null;
}

// Show success message
function showSuccess() {
    hideMessages();
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
    
    // Scroll to success message
    setTimeout(() => {
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
}

// Show error message
function showError(message) {
    hideMessages();
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    
    errorText.textContent = message;
    errorMessage.style.display = 'block';
    
    // Scroll to error message
    setTimeout(() => {
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

// Hide all messages
function hideMessages() {
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
}

// Show view entries button
function showViewEntriesButton() {
    if (salesEntries.length > 0) {
        const viewEntriesSection = document.getElementById('viewEntriesSection');
        viewEntriesSection.style.display = 'block';
    }
}

// Show entries table
function showEntriesTable() {
    if (salesEntries.length === 0) {
        showError('No entries found.');
        return;
    }
    
    populateEntriesTable();
    const entriesTable = document.getElementById('entriesTable');
    entriesTable.style.display = 'block';
    
    setTimeout(() => {
        entriesTable.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// Hide entries table
function hideEntriesTable() {
    const entriesTable = document.getElementById('entriesTable');
    entriesTable.style.display = 'none';
}

// Populate entries table
function populateEntriesTable() {
    const entriesBody = document.getElementById('entriesBody');
    entriesBody.innerHTML = '';
    
    salesEntries.forEach(entry => {
        const row = document.createElement('tr');
        
        // Format date
        const date = new Date(entry.date);
        const formattedDate = date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        // Format value
        const formattedValue = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2
        }).format(entry.value);
        
        row.innerHTML = `
            <td>${formattedDate}</td>
            <td>
                <div style="font-weight: 500; margin-bottom: 2px;">${entry.customerCode}</div>
                <div style="font-size: var(--font-size-xs); color: var(--color-text-secondary);">${entry.customerName}</div>
            </td>
            <td style="text-align: right; font-weight: 500;">${entry.quantity.toLocaleString('en-IN')}</td>
            <td style="text-align: right; font-weight: 500;">${formattedValue}</td>
        `;
        
        entriesBody.appendChild(row);
    });
}