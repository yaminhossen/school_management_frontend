# Super Admin Workflows & Procedures Guide
**Detailed Step-by-Step Workflows**

---

## Quick Reference Card

### Essential URLs
- **Login**: `https://admin.mnab.info/super-admin/login`
- **Dashboard**: `https://admin.mnab.info/super-admin`
- **Admin Management**: `https://admin.mnab.info/super-admin/user-admins`
- **Branch Management**: `https://admin.mnab.info/super-admin/branches`

### Key Navigation Paths
```
Super Admin Dashboard
├── Admin Management (/user-admins)
│   ├── View All Admins
│   ├── Create New Admin
│   ├── Edit Admin
│   └── Admin Details
├── Staff Management (/user-staffs)
├── Teacher Management (/user-teachers)
├── Student Management (/user-students)
├── Branch Management (/branches)
│   ├── View All Branches
│   ├── Create New Branch
│   ├── Edit Branch
│   └── Branch Details
└── Settings (/settings)
```

---

## Detailed Workflows

### 1. Creating a New Branch Administrator

**When to Use**: Adding a new admin to manage a specific branch

#### Prerequisites:
- Super admin access
- Branch information ready
- Admin personal details available

#### Step-by-Step Process:

1. **Access Admin Management**
   ```
   Dashboard → Admin Management → Create New Admin
   URL: /super-admin/user-admins/create
   ```

2. **Fill Personal Information**
   - **Full Name**: Enter complete name
   - **Email Address**: Must be unique (will be username)
   - **Phone Number**: Valid contact number
   - **Address**: Complete physical address

3. **Set Login Credentials**
   - **Email**: Auto-filled from personal info
   - **Password**: Generate secure password
   - **Confirm Password**: Re-enter for verification

4. **Branch Assignment**
   - **Select Branch**: Choose from dropdown
   - **Primary Branch**: Set as main assignment
   - **Secondary Branches**: Add if applicable

5. **Permission Configuration**
   - **Access Level**: Full Admin or Limited
   - **Module Permissions**: Select accessible modules
   - **Special Privileges**: Any additional permissions

6. **Verification & Save**
   - Review all entered information
   - Click "Create Admin" button
   - Confirm creation in popup dialog

#### Expected Result:
- New admin account created
- Login credentials generated
- Email notification sent to new admin
- Admin appears in admin list

#### Follow-up Actions:
- Contact new admin with login details
- Schedule orientation session
- Monitor first login activity

---

### 2. Setting Up a New Branch

**When to Use**: Opening a new institutional branch

#### Prerequisites:
- Branch location secured
- Basic infrastructure ready
- Initial staff identified

#### Detailed Process:

1. **Initial Branch Creation**
   ```
   Dashboard → Branch Management → Create New Branch
   URL: /super-admin/branches/create
   ```

2. **Basic Branch Information**
   - **Branch Name**: Official branch name
   - **Branch Code**: Unique identifier (3-5 characters)
   - **Branch Type**: Main, Sub-branch, Extension
   - **Establishment Date**: Official opening date

3. **Location Details**
   - **Physical Address**: Complete street address
   - **City/State**: Administrative location
   - **Postal Code**: ZIP/postal code
   - **GPS Coordinates**: Latitude/longitude if available
   - **Map Link**: Google Maps or similar

4. **Contact Information**
   - **Primary Phone**: Main branch contact
   - **Secondary Phone**: Alternative contact
   - **Email Address**: Branch official email
   - **Fax Number**: If applicable
   - **Website**: Branch-specific website

5. **Facility Configuration**
   - **Total Area**: Branch total area in sq ft/meters
   - **Number of Buildings**: Count of structures
   - **Classroom Count**: Available classrooms
   - **Laboratory Count**: Science/computer labs
   - **Library Capacity**: Library seating capacity
   - **Cafeteria Capacity**: Food service capacity
   - **Parking Spaces**: Available parking

6. **Academic Configuration**
   - **Grade Levels**: Supported grade levels
   - **Student Capacity**: Maximum enrollment
   - **Academic Calendar**: Branch-specific calendar
   - **Programs Offered**: Academic programs available

7. **Administrative Setup**
   - **Branch Admin Assignment**: Assign primary administrator
   - **Initial Staff**: Add key staff members
   - **Department Structure**: Define organizational structure

8. **Financial Configuration**
   - **Fee Structure**: Branch-specific fees
   - **Payment Methods**: Accepted payment types
   - **Scholarship Programs**: Available financial aid
   - **Budget Allocation**: Initial budget assignment

#### Verification Checklist:
- [ ] All required fields completed
- [ ] Contact information verified
- [ ] GPS coordinates accurate
- [ ] Admin assignment confirmed
- [ ] Fee structure approved
- [ ] Facilities information complete

#### Post-Creation Tasks:
1. **System Configuration**
   - Set up branch-specific settings
   - Configure academic calendar
   - Initialize fee management
   
2. **Staff Onboarding**
   - Create staff accounts
   - Conduct system training
   - Assign initial responsibilities

3. **Student Registration Setup**
   - Prepare enrollment system
   - Configure class/section structure
   - Set up admission procedures

---

### 3. User Account Management Workflow

**Purpose**: Managing all types of user accounts across the system

#### 3.1 Creating Admin Users

1. **Navigate to Admin Management**
   ```
   Super Admin Dashboard → Admin Management → Create
   ```

2. **Complete Admin Form**
   ```
   Personal Information:
   ├── Full Name: [Required]
   ├── Email: [Required, Unique]
   ├── Phone: [Required]
   ├── Address: [Required]
   ├── National ID: [Optional]
   └── Emergency Contact: [Optional]
   
   Professional Information:
   ├── Employee ID: [Auto-generated]
   ├── Join Date: [Required]
   ├── Department: [Required]
   ├── Position: [Required]
   └── Salary Information: [Optional]
   
   System Access:
   ├── Username: [Auto from email]
   ├── Password: [System generated]
   ├── Branch Assignment: [Required]
   ├── Permission Level: [Required]
   └── Account Status: [Active by default]
   ```

3. **Permission Assignment**
   - **Full Access**: Complete system control
   - **Limited Access**: Specific module access
   - **Read-Only**: View permissions only
   - **Custom**: Tailored permission set

4. **Account Activation**
   - System generates credentials
   - Email sent to user
   - First-time login forces password change
   - Account added to active user list

#### 3.2 Staff Account Creation

**Process Flow:**
```
Staff Request → Verify Information → Create Account → Assign Role → Notify User
```

**Required Information:**
- Personal details (name, contact, address)
- Employment information (position, department, salary)
- System access requirements
- Reporting structure
- Work schedule

#### 3.3 Teacher Account Setup

**Special Considerations:**
- Subject assignment capabilities
- Class management permissions
- Grade/assessment access
- Parent communication tools
- Academic resource access

**Teacher-Specific Fields:**
- Teaching qualification
- Subject specialization
- Experience level
- Certification details
- Performance metrics access

#### 3.4 Student Account Management

**Bulk vs Individual Creation:**
- **Individual**: Single student registration
- **Bulk Import**: CSV/Excel upload for multiple students
- **Academic Year Rollover**: Automatic promotion/graduation

**Student Information Categories:**
1. **Personal Data**: Name, age, address, emergency contacts
2. **Academic Data**: Class, section, roll number, previous records
3. **Guardian Data**: Parent/guardian information and contacts
4. **Medical Data**: Health information and special needs
5. **Financial Data**: Fee status and payment history

---

### 4. System Maintenance Workflows

#### 4.1 Regular System Health Checks

**Daily Tasks (5-10 minutes):**
1. **Login Verification**
   - Test super admin login
   - Verify dashboard loads correctly
   - Check for any error messages

2. **User Activity Review**
   - Check recent login activities
   - Review any failed login attempts
   - Monitor unusual user behavior

3. **System Performance Check**
   - Page loading speeds
   - Database response times
   - Error log review

**Weekly Tasks (30-45 minutes):**
1. **Data Backup Verification**
   - Confirm automated backups completed
   - Test backup restoration process
   - Update backup storage locations

2. **User Account Audit**
   - Review new user accounts
   - Check for inactive accounts
   - Verify permission assignments

3. **Branch Performance Review**
   - Branch activity summaries
   - User engagement metrics
   - Resource utilization reports

**Monthly Tasks (1-2 hours):**
1. **Comprehensive System Review**
   - Full functionality testing
   - Performance optimization
   - Security assessment

2. **User Training Assessment**
   - Identify training needs
   - Plan educational sessions
   - Update documentation

#### 4.2 Emergency Response Procedures

**System Down Scenario:**
1. **Immediate Actions (0-15 minutes)**
   - Verify system status
   - Check internet connectivity
   - Notify technical team
   - Communicate to stakeholders

2. **Investigation Phase (15-60 minutes)**
   - Identify root cause
   - Assess impact scope
   - Determine recovery timeline
   - Prepare status updates

3. **Recovery Phase (Variable)**
   - Implement fixes
   - Test system functionality
   - Gradually restore services
   - Monitor stability

4. **Post-Recovery (1-24 hours)**
   - Full system testing
   - User communication
   - Incident documentation
   - Prevention planning

---

### 5. Reporting and Analytics Workflows

#### 5.1 Branch Performance Reports

**Monthly Branch Report Generation:**
1. **Access Reporting Module**
   ```
   Dashboard → Reports → Branch Performance
   ```

2. **Select Report Parameters**
   - **Time Period**: Select month/quarter/year
   - **Branch Selection**: All or specific branches
   - **Metrics**: Choose performance indicators
   - **Format**: PDF, Excel, or online view

3. **Key Metrics to Include**
   - Student enrollment numbers
   - Staff utilization rates
   - Academic performance averages
   - Financial performance
   - Facility utilization
   - Incident reports

4. **Report Distribution**
   - Stakeholder identification
   - Automated email distribution
   - Dashboard publication
   - Archive for historical analysis

#### 5.2 User Activity Analytics

**User Engagement Analysis:**
```
Data Collection → Analysis → Reporting → Action Planning
```

**Metrics to Track:**
- Login frequency and patterns
- Module usage statistics
- Feature adoption rates
- Support ticket volume
- Training completion rates

---

## Emergency Procedures

### Critical System Issues

#### 1. Data Loss Emergency
**Immediate Response:**
1. Stop all user activities
2. Activate backup restoration
3. Notify all stakeholders
4. Document incident details
5. Implement recovery procedures

#### 2. Security Breach
**Response Protocol:**
1. Change all administrative passwords
2. Review access logs
3. Identify compromise scope
4. Notify relevant authorities
5. Implement security patches

#### 3. Mass User Issues
**Management Strategy:**
1. Identify common factors
2. Implement temporary workarounds
3. Communicate with affected users
4. Deploy permanent solutions
5. Monitor resolution effectiveness

---

## Quality Assurance Checklists

### New User Creation Checklist
- [ ] Personal information complete and accurate
- [ ] Contact details verified
- [ ] Role/department assignment correct
- [ ] Permission level appropriate
- [ ] System access tested
- [ ] Welcome communication sent
- [ ] Training scheduled (if applicable)

### Branch Setup Checklist
- [ ] Location information accurate
- [ ] Contact details verified
- [ ] Facility data complete
- [ ] Administrative assignments made
- [ ] Academic structure configured
- [ ] Financial settings established
- [ ] System integration tested

### System Maintenance Checklist
- [ ] Backup systems operational
- [ ] Security measures updated
- [ ] Performance metrics within range
- [ ] User feedback addressed
- [ ] Documentation current
- [ ] Training materials updated

---

**Document Control:**
- **Version**: 1.0
- **Last Updated**: August 2025
- **Review Frequency**: Quarterly
- **Owner**: Super Admin Team
