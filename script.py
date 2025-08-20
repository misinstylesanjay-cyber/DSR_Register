import pandas as pd
import numpy as np

# Load the DSR data
df = pd.read_excel('dsr-dEMO-FORM.xlsx')

# Display basic info about the data
print("Data Shape:", df.shape)
print("\nColumn names:")
for i, col in enumerate(df.columns):
    print(f"{i+1}. {col}")

print("\nFirst few rows of relevant columns:")
relevant_cols = ['Brand', 'Brand Presence', 'Customer Code New', 'Customer Name', 'TOWN', 'STATE']
print(df[relevant_cols].head(10))

print("\nUnique Brands:")
print(df['Brand'].unique())

print("\nSample Customer Codes:")
print(df['Customer Code New'].head(10).tolist())