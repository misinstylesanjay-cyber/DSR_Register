# Google AppSheet DSR Form - Complete Setup Guide

## 🎯 आपकी समस्या का समाधान

आपको अपनी DSR sheet के लिए एक mobile app चाहिए जो:
- Customer Code select करने पर automatically सभी details fill हो जाएं
- केवल Date, Quantity, और Value manually भरना पड़े
- Professional और user-friendly हो

## 📊 Data Structure Setup

### Step 1: Google Sheets में Master Data Table बनाएं

**Sheet Name: "Master_Customer_Data"**

| Column | Type | Description |
|--------|------|-------------|
| CustomerCode | Text | Unique identifier (जैसे FMN-000104) |
| Brand | Text | FM, USPA, ARROW, USPA-KIDS |
| BrandPresence | Text | जैसे AR+US+FM+UK |
| CustomerName | Text | Customer का पूरा नाम |
| TOWN | Text | शहर |
| STATE | Text | राज्य |

### Step 2: Daily Sales Entry Table बनाएं

**Sheet Name: "Daily_Sales_Entries"**

| Column | Type | Description |
|--------|------|-------------|
| EntryID | Text | Unique entry ID (Auto-generated) |
| CustomerCode | Ref | Master_Customer_Data table से reference |
| Brand | Text | Auto-populate from Master |
| BrandPresence | Text | Auto-populate from Master |
| CustomerName | Text | Auto-populate from Master |
| TOWN | Text | Auto-populate from Master |
| STATE | Text | Auto-populate from Master |
| EntryDate | Date | Entry की date |
| Quantity | Number | Sales quantity |
| Value | Number | Sales value |
| CreatedBy | Text | User name (auto-populate) |
| CreatedDateTime | DateTime | Entry creation time |
| ModifiedDateTime | DateTime | Last modified time |

## 🚀 Google AppSheet Setup Guide

### Step 1: AppSheet Account Setup
1. **appsheet.com** पर जाएं
2. Google account से login करें
3. **Create > App > Start with existing data** select करें

### Step 2: Data Source Connection
1. **Google Sheets** select करें
2. अपनी DSR sheet select करें
3. **"Customize with AppSheet"** click करें

### Step 3: Tables Configuration

#### Master_Customer_Data Table:
1. **Data** tab में जाएं
2. **Master_Customer_Data** table select करें
3. **CustomerCode** को Key column set करें
4. सभी columns को **Show** में रखें

#### Daily_Sales_Entries Table:
1. **Daily_Sales_Entries** table select करें
2. **EntryID** को Key column set करें
3. **CustomerCode** column में:
   - Type: **Ref**
   - Referenced table: **Master_Customer_Data**
   - Referenced column: **CustomerCode**

### Step 4: Auto-Populate Formula Setup

निम्नलिखित columns के लिए **Initial value** set करें:

#### Brand Column:
```
LOOKUP([CustomerCode], "Master_Customer_Data", "CustomerCode", "Brand")
```

#### BrandPresence Column:
```
LOOKUP([CustomerCode], "Master_Customer_Data", "CustomerCode", "BrandPresence")
```

#### CustomerName Column:
```
LOOKUP([CustomerCode], "Master_Customer_Data", "CustomerCode", "CustomerName")
```

#### TOWN Column:
```
LOOKUP([CustomerCode], "Master_Customer_Data", "CustomerCode", "TOWN")
```

#### STATE Column:
```
LOOKUP([CustomerCode], "Master_Customer_Data", "CustomerCode", "STATE")
```

#### EntryDate Column:
```
TODAY()
```

#### CreatedDateTime Column:
```
NOW()
```

#### ModifiedDateTime Column (Formula में):
```
NOW()
```

### Step 5: Form Design Optimization

#### UX Tab में जाएं:
1. **Views** में **Daily_Sales_Entries_Form** select करें
2. **Columns** section में column order set करें:
   - CustomerCode (Required)
   - Brand (Read-only)
   - BrandPresence (Read-only)
   - CustomerName (Read-only)
   - TOWN (Read-only)
   - STATE (Read-only)
   - EntryDate (Show, Default: TODAY)
   - Quantity (Required)
   - Value (Required)

#### Column Properties:
1. **CustomerCode**: 
   - Input type: Dropdown
   - Required: Yes
   
2. **Auto-populate fields** (Brand, BrandPresence, etc.):
   - Editable: No
   - Show: Yes

3. **EntryDate**:
   - Initial value: TODAY()
   - Required: Yes

4. **Quantity & Value**:
   - Required: Yes
   - Type: Number

### Step 6: Dropdown Enhancement

#### CustomerCode Dropdown को बेहतर बनाने के लिए:
1. **Master_Customer_Data** table में जाएं
2. **Display name** formula set करें:
```
CONCATENATE([CustomerCode], " - ", [CustomerName], " - ", [TOWN])
```

### Step 7: Validation Rules

#### Data > Columns में validation add करें:

**Quantity Column**:
```
[Quantity] > 0
```

**Value Column**:
```
[Value] > 0
```

### Step 8: App Behavior Settings

#### Behavior Tab में:
1. **Actions** में custom actions add करें
2. **Data change actions** set करें auto-email के लिए (optional)

## 🎨 UI Customization

### App Design:
1. **UX > Brand** में जाएं
2. App का logo और color theme set करें
3. Professional colors का इस्तेमाल करें:
   - Primary: **#1565C0** (Blue)
   - Accent: **#37474F** (Dark Gray)

### Form Layout:
1. **Views > Daily_Sales_Entries_Form** में
2. **Display name** set करें: "DSR Entry Form"
3. **Description** add करें: "Daily Sales Report Data Entry"

## 📱 Mobile App Features

### Essential Features:
1. **Offline capability** - बिना internet के भी work करे
2. **Auto-sync** - internet connect होने पर automatic sync
3. **Search functionality** - Customer code आसानी से search कर सकें
4. **Form validation** - गलत data entry से बचने के लिए

### Performance Optimization:
1. **Data > Security** में proper access controls set करें
2. **Settings > Offline sync** enable करें
3. **Localization** set करें (Hindi support के लिए)

## 🔧 Advanced Features (Optional)

### 1. Barcode Scanner Integration:
```
Customer Code field में barcode scanner enable करें
```

### 2. GPS Location Capture:
```
Location column add करें automatic GPS capture के लिए
```

### 3. Photo Attachment:
```
Image type column add करें product photos के लिए
```

### 4. Auto-Email Reports:
```
Behavior में automation set करें daily/weekly reports के लिए
```

## ✅ Testing & Deployment

### Testing Process:
1. **Preview** में app test करें
2. Different scenarios check करें:
   - Customer selection
   - Auto-populate functionality
   - Form validation
   - Data saving

### Deployment Steps:
1. **Manage > Deploy** में जाएं
2. **Users** add करें जो app use करेंगे
3. **Permissions** set करें (Read, Write, Admin)
4. **Mobile app link** share करें team के साथ

## 📊 Reports & Analytics

### Built-in Reports:
1. **Dashboard view** create करें daily sales summary के लिए
2. **Chart views** add करें visual analytics के लिए
3. **Filter options** provide करें date/brand wise filtering के लिए

### Export Options:
- Excel export functionality
- PDF reports
- Email automation

## 🛠️ Troubleshooting Tips

### Common Issues:
1. **Auto-populate not working**: LOOKUP formula check करें
2. **Dropdown empty**: Master data table में data ensure करें
3. **Sync issues**: Internet connection और permissions check करें
4. **Performance slow**: Data size और offline sync settings check करें

### Support Resources:
- AppSheet Help Center
- Community Forums
- Google Workspace Support

## 💡 Best Practices

1. **Data Backup**: Regular Google Sheets backup रखें
2. **User Training**: Team को proper training दें
3. **Regular Updates**: Monthly app review और updates करें
4. **Security**: Access controls regularly review करें
5. **Performance Monitoring**: App usage और performance track करें

---

## 🎯 Summary

यह setup आपको एक professional DSR app देगा जो:
- ✅ Customer Code select करने पर सभी details auto-fill करे
- ✅ केवल Date, Quantity, Value manually भरना पड़े
- ✅ Mobile-friendly और offline capable हो
- ✅ Real-time data sync करे
- ✅ Professional दिखे और easy-to-use हो

**Total Setup Time**: 2-3 hours
**User Training Time**: 30 minutes per user
**Monthly Maintenance**: 1 hour

यह solution आपकी सभी requirements को पूरा करता है और scalable भी है future needs के लिए।