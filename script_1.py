# Create master data for the AppSheet setup
import pandas as pd
from datetime import datetime, timedelta

# Create master customer data table
master_data = df[['Brand', 'Brand Presence', 'Customer Code New', 'Customer Name', 'TOWN', 'STATE']].copy()
master_data = master_data.rename(columns={
    'Customer Code New': 'CustomerCode',
    'Customer Name': 'CustomerName',
    'Brand Presence': 'BrandPresence'
})

# Create sample daily sales entry structure
daily_sales_columns = [
    'EntryID',
    'CustomerCode', 
    'Brand',
    'BrandPresence',
    'CustomerName',
    'TOWN',
    'STATE',
    'EntryDate',
    'Quantity',
    'Value',
    'CreatedBy',
    'CreatedDateTime',
    'ModifiedDateTime'
]

# Create sample data for daily sales
sample_daily_sales = []

# Save master data
master_data.to_csv('Master_Customer_Data.csv', index=False)
print("Master Customer Data created:")
print(master_data.head(10))
print(f"\nTotal customers: {len(master_data)}")

# Create sample daily sales entries
daily_sales_df = pd.DataFrame(columns=daily_sales_columns)
daily_sales_df.to_csv('Daily_Sales_Entries.csv', index=False)

print("\nDaily Sales Entry structure created:")
for i, col in enumerate(daily_sales_columns, 1):
    print(f"{i}. {col}")