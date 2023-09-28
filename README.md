
# ⚠ Important links

- Dot Env File [Download Link](https://drive.google.com/file/d/1HLb8Ck1fRhZaMA-gsNun1FKdOR4RcMh7/view?usp=sharing)
- Link To Deployed site [link](https://hostel-management-diu.web.app/)

# Instructions for Development and installation 
- **Requirements**
    -  Node.js v18.x
- **Npm Commands**
    ```pwsh
    npm i -g pnpm firebase-tools
    pnpm i
    pnpm run dev
    ```

# 📋 Tasks
- **Authentication**:
    - [x]  Role based Auth for student, staff and admin
    - [x]  Admin can create, delete & update staff & student account.
    - [x]  Users can logout from their account.
- **Students Dashboard :**
    - [x]  Overview
        - [x]  Account Info, Role
        - [x]  Personal Info User Data, Contacts & others
        - [x]  booking info
    - [ ]  Settings
        - [x]  Update Personal Info
        - [ ]  Update Email & Password
    - [ ]  Order Food
        - [x]  View Available Itmes
        - [x]  Order Food
            - [x]  Cancel Order
            - [ ]  Food Payment
    - [ ]  Room booking
        - [x]  Show Available Rooms
        - [ ]  Submit booking
        - [ ]  Cancel Booking
        - [ ]  Room Payment
    - [ ]  Payment
        - [x]  Show Payment Log
        - [ ]  Automate Pament
            - [ ]  Room Booking
            - [ ]  Hostel Payment
            - [ ]  Food
- **Staff Dashboard:**
    - [x]  Overview
        - [x]  Account Info, Role
        - [ ]  Contact info
        - [ ]  Update Email & Password
    - [ ]  Scheduling and shift management
    - [ ]  Task assignment
- **Admin Dashboard:**
    - [x]  Overview
        - [x]  Show Total Staff And Students
        - [x]  Show Pending Bookings
        - [x]  Show Total Available Rooms
        - [x]  Show total booked rooms
    - [ ]  Rooms & Floor
        - [ ]  Show All Floor & Rooms
        - [ ]  Create Update Delete Rooms
        - [ ]  Assign Room To Students
    - [ ]  Users
        - [ ]  Update User Role
        - [x]  Students user
            - [x]  View All students
            - [x]  Create Update Delete Students
            - [ ]  Test Features
        - [x]  Staff user
            - [x]  View All Staff
            - [x]  Create update delete Staff user
            - [ ]  Staff Work Role
            - [ ]  Staff Shift
            - [ ]  Test Features
    - [x]  Food
        - [x]  Create food item
        - [x]  Delete Food Item
        - [x]  test features
        - [ ]  Show Food Sold Data
    - [ ]  Payment
        - [ ]  Create Update Delete Payments for users
        - [ ]  Update Code based on changes
- **known Issues**
    - [x]  On refresh site logs out
        - [x]  rewrite the rolese implementation
    - [x]  api request blocked
        - [x]  disable adblocker
    - [x]  corss origin error
        - [x]  built in brownser feature


# 🗺 Diagrams

### Student / User / staff

- Name
- Student ID
- role
- Gender
- Nationality
- Religion
- Address
- Booking date
- contact info
    - personal number
    - guardian number
    - Emergency number
    - email
- **date of birth**

### Room

- Room
    - Room ID
    - Bed no
    - floor
    - Status (active or inactive.)
    - ac
    - price
    - is booked
- Room Allotment

### Room Allotment

- userID
- serviceManID
- roomID
- createdAT
- updatedAT

### Payment

- userID
- roomID
- paymentID
- PaymentType
- ammount
- TransationID
- CreatedAt
- updatedAt