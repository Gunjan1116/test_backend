
## **🔹 Step 1.1: Create a Meta Business Account**
Before using the WhatsApp Business API, you need a **Meta Business Account**.

### ✅ **Steps to Create a Meta Business Account:**
1. Go to [Meta Business Manager](https://business.facebook.com/).
2. Click **"Create Account"** (if you don’t have one).
3. Enter your:
   - **Business Name**
   - **Your Name**
   - **Business Email**
4. Click **Submit** and verify your email.
5. In **Business Manager**, go to **Business Settings** → **Business Info** and fill in:
   - Business Address
   - Website URL (if available)
   - Industry Category

💡 **Note:** You must provide a **real business** name and details, as Meta will verify them later.

---

## **🔹 Step 1.2: Verify Your Business on Meta**
Meta requires business verification before granting **full access** to the WhatsApp Business API.

### ✅ **Steps for Business Verification:**
1. **Go to Meta Business Settings**  
   - Open [Business Manager](https://business.facebook.com/settings) → Click **Security Center**.
   - Find **Business Verification** and click **Start Verification**.

2. **Submit Business Information:**  
   - **Legal Business Name** (must match government documents).  
   - **Business Address & Phone Number** (as per official documents).  
   - **Website URL** (optional but recommended).  
   - **Business Registration Document** (upload government-issued documents like GST, Business License, etc.).

3. **Verify Business Phone Number:**  
   - Choose **Call** or **Email OTP** verification.
   - Enter the OTP received and submit.

4. **Wait for Approval:**  
   - Verification takes **24 hours to a few days**.
   - Track status in **Security Center**.

💡 **Note:** Without business verification, you will have limited message quota and cannot send bulk messages.

---

## **🔹 Step 1.3: Apply for WhatsApp Business API**
Once your Meta Business is verified, apply for WhatsApp API access.

### ✅ **Steps to Apply for WhatsApp API:**
1. **Go to [Meta Developers](https://developers.facebook.com/)** → Click **Create App**.
2. Select **Business App** → Click **Next**.
3. Enter:
   - **App Name** (e.g., MyBusinessWA)
   - **Business Account** (select the verified business)
   - **App Purpose:** Select **Business**.
4. Click **Create App**.

---

## **🔹 Step 1.4: Register a WhatsApp Business Phone Number**
You need a **dedicated phone number** to send messages.

### ✅ **Phone Number Requirements:**
- **Should not be linked to another WhatsApp account** (if linked, delete from WhatsApp before registration).
- **Supports calls & SMS** for OTP verification.

### ✅ **Steps to Register a WhatsApp Number:**
1. In **Meta Business Manager**, go to **WhatsApp Manager**.
2. Click **Add Phone Number** → Enter your **Country Code & Number**.
3. Select **SMS or Call Verification** → Enter OTP received.
4. Click **Submit**.

💡 **Note:** Once verified, **this number cannot be used in normal WhatsApp or WhatsApp Business App**.

---

## **🔹 Step 1.5: Get a WhatsApp Business API Access Token**
To send messages via API, generate an **Access Token**.

### ✅ **Steps to Generate an Access Token:**
1. Go to **Meta for Developers** → Open your **App**.
2. Navigate to **WhatsApp → API Settings**.
3. Click **Generate Token**.
4. Copy & save the **Permanent Access Token**.

💡 **Note:** Use a **permanent token**, not a temporary one (which expires in 24 hours).

---

## **🔹 Step 1.6: Get Phone Number ID and Business ID**
You'll need **Phone Number ID** and **Business ID** to send messages.

### ✅ **Steps to Get IDs via API:**
1. Make a **GET request** to:
   ```
   https://graph.facebook.com/v17.0/me?fields=id,name
   ```
   - **Headers:**
     ```
     Authorization: Bearer YOUR_ACCESS_TOKEN
     ```
2. Response will include:
   ```json
   {
     "id": "123456789012345",
     "name": "My Business"
   }
   ```
   - **Business ID** = `123456789012345`

3. To get **Phone Number ID**, use:
   ```
   https://graph.facebook.com/v17.0/YOUR_BUSINESS_ID/phone_numbers
   ```
   - The response will show:
     ```json
     {
       "data": [
         {
           "id": "987654321098765",
           "display_phone_number": "+919876543210"
         }
       ]
     }
     ```
   - **Phone Number ID** = `987654321098765`

💡 **Note:** These IDs are required in API requests.

---

## **🔹 Step 1.7: Create & Approve WhatsApp Message Templates**
To send **bulk messages**, use **pre-approved templates**.

### ✅ **Steps to Create Message Templates:**
1. Open **Meta Business Manager** → **WhatsApp Manager**.
2. Click **Message Templates** → **Create Template**.
3. Select:
   - **Template Category:** Marketing, OTP, etc.
   - **Language:** English, Hindi, etc.
   - **Template Name:** e.g., `promo_message`
   - **Message Body:**
     ```
     Hello {{1}}, 
     Check out our latest offer! 
     {{2}} 
     Click here: {{3}}
     ```
4. Add **Image & Link (optional).**
5. Submit for **approval** (takes a few hours).

💡 **Note:** **Without approved templates, WhatsApp API will reject bulk messages.**

