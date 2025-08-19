# Admin Panel User Manual
**Comprehensive Guide to School Management System - Admin Dashboard**

---

## 📋 System Overview

### Admin Panel Purpose
The **Admin Panel** is the comprehensive management interface designed for branch administrators to manage all aspects of their educational institution. Unlike the Super Admin panel which manages multiple branches, the Admin panel focuses on day-to-day operations within a specific branch.

### Access Information
- **Login URL**: `https://admin.mnab.info/admin`
- **Panel Type**: Branch-Level Administration
- **User Role**: Branch Administrator
- **Scope**: Single branch management with full operational control

---

## 🏗 Dashboard Architecture

### Main Dashboard Components

#### **Navigation Structure**
```
Admin Dashboard
├── User Management (4 modules)
├── Todo Management (1 module)
├── Branch Management (5 modules)
├── Academic Management (9 modules)
├── Fees Management (3 modules)
├── Meeting Management (2 modules)
├── Account Management (7 modules)
├── HRM Management (2 modules)
└── Notice Management (6 modules)
```

#### **Dashboard Header**
- **Institution Name**: "Nurul Hiqamah Model Madrasa"
- **Panel Title**: "Admin Dashboard"
- **Quick Access Menu**: Responsive navigation sidebar
- **User Profile**: Admin account information and logout

---

## 📚 Module-by-Module Guide

## 1. 👥 User Management
**Purpose**: Complete user lifecycle management within the branch

### 1.1 Employee Management (`/user-staffs`)
**Function**: Manage non-teaching staff members

#### **Key Features:**
- **Staff Registration**: Add new employees with complete profiles
- **Employment Records**: Track job positions, salaries, and contracts
- **Attendance Tracking**: Monitor staff attendance and work hours
- **Performance Management**: Staff evaluations and reports
- **Document Management**: Store employee documents and certificates

#### **Staff Information Categories:**
```
Personal Information:
├── Basic Details (Name, Contact, Address)
├── Employment Information (Position, Department, Salary)
├── Educational Background
├── Emergency Contacts
└── Documents (ID, Certificates, Contracts)

System Access:
├── Login Credentials
├── Role Assignments
├── Permission Levels
└── Access History
```

#### **Common Operations:**
- **Create New Staff**: Add employee with full profile
- **Edit Staff Details**: Update information and roles
- **Manage Attendance**: Track work hours and absences
- **Generate Reports**: Staff performance and attendance reports
- **Handle Terminations**: Deactivate accounts and process exits

### 1.2 Teachers Management (`/user-teachers`)
**Function**: Comprehensive teacher administration

#### **Teacher-Specific Features:**
- **Academic Qualifications**: Education credentials and certifications
- **Subject Assignments**: Link teachers to subjects and classes
- **Class Schedules**: Manage teaching timetables
- **Performance Tracking**: Teaching evaluations and student feedback
- **Professional Development**: Training records and certifications

#### **Teacher Profile Sections:**
```
Academic Information:
├── Qualifications and Degrees
├── Subject Expertise
├── Teaching Experience
├── Certifications
└── Professional Development

Teaching Assignments:
├── Class Assignments
├── Subject Responsibilities
├── Class Routines
├── Exam Duties
└── Extra-curricular Activities

Performance Data:
├── Student Feedback
├── Evaluation Results
├── Attendance Records
├── Professional Growth
└── Achievement Records
```

### 1.3 Parents Management (`/user-parents`)
**Function**: Guardian and parent account management

#### **Parent Management Features:**
- **Guardian Profiles**: Complete parent/guardian information
- **Student Connections**: Link parents to their children
- **Communication Channels**: Contact preferences and methods
- **Financial Information**: Payment history and due amounts
- **Meeting Schedules**: Parent-teacher conference management

#### **Parent Information Structure:**
```
Personal Details:
├── Contact Information
├── Professional Information
├── Emergency Details
└── Relationship to Student

Financial Information:
├── Payment History
├── Outstanding Dues
├── Payment Methods
└── Financial Agreements

Communication Records:
├── Meeting History
├── Message Exchanges
├── Notification Preferences
└── Feedback Records
```

### 1.4 Students Management (`/user-students`)
**Function**: Complete student lifecycle management

#### **Comprehensive Student Features:**
- **Enrollment Management**: Student registration and admission
- **Academic Records**: Grades, attendance, and performance tracking
- **Personal Information**: Complete student profiles with photos
- **Financial Management**: Fee tracking, payments, and due amounts
- **Parent/Guardian Links**: Family relationship management
- **Health Records**: Medical information and emergency contacts

#### **Student Information Categories:**
```
Basic Information:
├── Personal Details (Name, DOB, Address)
├── Academic Information (Class, Section, Roll Number)
├── Contact Information
├── Emergency Contacts
└── Medical Information

Academic Records:
├── Enrollment Details
├── Class Assignments
├── Attendance Records
├── Examination Results
├── Academic Progress
└── Disciplinary Records

Financial Information:
├── Fee Structure
├── Payment History
├── Outstanding Dues
├── Scholarships
└── Financial Aid

Guardian Information:
├── Parent/Guardian Details
├── Contact Information
├── Professional Information
└── Emergency Authorization
```

#### **Advanced Student Operations:**
- **Bulk Import**: CSV/Excel student data import
- **Attendance Management**: Daily attendance tracking
- **Results Management**: Exam scores and report cards
- **Fee Collection**: Payment processing and due management
- **KPI Tracking**: Student performance indicators
- **Section Management**: Class and section assignments

---

## 2. ✅ Todo Management
**Purpose**: Task and project management for administrative workflows

### 2.1 Tasks Management (`/tasks`)
**Function**: Administrative task coordination and tracking

#### **Task Management Features:**
- **Task Creation**: Create and assign administrative tasks
- **Priority Management**: Set task priorities and deadlines
- **Assignment System**: Delegate tasks to staff members
- **Progress Tracking**: Monitor task completion status
- **Notification System**: Automated reminders and updates

#### **Task Categories:**
```
Administrative Tasks:
├── Student Registration Tasks
├── Academic Calendar Events
├── Staff Management Tasks
├── Financial Operations
└── Maintenance Activities

Academic Tasks:
├── Exam Preparation
├── Result Processing
├── Report Generation
├── Meeting Preparation
└── Event Organization
```

---

## 3. 🏢 Branch Management
**Purpose**: Physical and operational branch administration

### 3.1 Branch Buildings Management (`/branch-buildings`)
**Function**: Campus infrastructure management

#### **Building Management Features:**
- **Building Registry**: Complete building information database
- **Facility Tracking**: Classrooms, labs, offices, and common areas
- **Maintenance Records**: Repair history and scheduled maintenance
- **Occupancy Management**: Space allocation and utilization
- **Safety Compliance**: Building safety and security measures

### 3.2 Branch Building Rooms Management (`/branch-building-rooms`)
**Function**: Individual room and space management

#### **Room Management Features:**
- **Room Inventory**: Detailed room database with specifications
- **Capacity Management**: Room occupancy and size information
- **Equipment Tracking**: Furniture and equipment in each room
- **Booking System**: Room reservation and scheduling
- **Maintenance Logs**: Individual room maintenance records

### 3.3 Branch Transport Management (`/branch-transports`)
**Function**: Transportation service administration

#### **Transport Features:**
- **Vehicle Registry**: Bus and transport vehicle database
- **Route Management**: Transportation routes and schedules
- **Driver Management**: Driver information and scheduling
- **Student Transport**: Student transportation assignments
- **Maintenance Tracking**: Vehicle maintenance and inspection records

### 3.4 Branch Transport Drivers Management (`/branch-transport-drivers`)
**Function**: Driver and transport staff management

#### **Driver Management Features:**
- **Driver Profiles**: Complete driver information and credentials
- **License Management**: License verification and renewal tracking
- **Schedule Management**: Driver shift and route assignments
- **Performance Tracking**: Driver performance and safety records
- **Training Records**: Safety training and certification tracking

### 3.5 Academic Calendar Management (`/academic-calendars`)
**Function**: Academic year and event planning

#### **Calendar Features:**
- **Academic Year Setup**: Term dates, holidays, and important events
- **Event Planning**: School events, examinations, and activities
- **Holiday Management**: National and institutional holidays
- **Deadline Tracking**: Assignment and project deadlines
- **Resource Planning**: Facility and resource allocation for events

---

## 4. 📚 Academic Management
**Purpose**: Educational program and curriculum administration

### 4.1 Class Management (`/branch-classes`)
**Function**: Class structure and organization

#### **Class Management Features:**
- **Class Creation**: Set up new classes with grade levels
- **Student Capacity**: Define maximum students per class
- **Academic Standards**: Grade level requirements and standards
- **Promotion Criteria**: Class advancement requirements
- **Performance Tracking**: Class-level academic performance

### 4.2 Class Section Management (`/branch-class-sections`)
**Function**: Section organization within classes

#### **Section Features:**
- **Section Creation**: Divide classes into manageable sections
- **Student Assignment**: Assign students to specific sections
- **Teacher Assignment**: Assign class teachers to sections
- **Room Assignment**: Designate classrooms for sections
- **Schedule Management**: Section-specific timetables

### 4.3 Class Subject Management (`/branch-class-subjects`)
**Function**: Curriculum and subject administration

#### **Subject Management Features:**
- **Subject Creation**: Define subjects for each class level
- **Curriculum Planning**: Subject content and learning objectives
- **Teacher Assignment**: Assign subject teachers
- **Resource Allocation**: Educational materials and resources
- **Assessment Planning**: Exam and evaluation schedules

### 4.4 Class Routine Management (`/branch-class-routine-day-times/class-routine`)
**Function**: Timetable and schedule coordination

#### **Routine Features:**
- **Timetable Creation**: Daily and weekly class schedules
- **Teacher Scheduling**: Assign teachers to time slots
- **Room Allocation**: Assign classrooms for each period
- **Conflict Resolution**: Prevent scheduling conflicts
- **Schedule Distribution**: Share timetables with stakeholders

### 4.5 Exam Management (`/exams`)
**Function**: Comprehensive examination administration

#### **Exam Management Features:**
- **Exam Planning**: Schedule examinations and assessment periods
- **Question Paper Management**: Prepare and distribute exam materials
- **Invigilation**: Assign teachers for exam supervision
- **Result Processing**: Grade collection and result compilation
- **Report Generation**: Individual and class performance reports

### 4.6 Exam Routine Management (`/exam-routines`)
**Function**: Examination scheduling and coordination

#### **Exam Routine Features:**
- **Exam Timetable**: Create detailed examination schedules
- **Hall Assignment**: Allocate examination halls and seating
- **Supervision Schedule**: Assign invigilators and supervisors
- **Resource Planning**: Exam materials and equipment requirements
- **Conflict Management**: Resolve scheduling conflicts

### 4.7 Student Evaluation Management
**Function**: Student performance assessment and tracking

#### **Evaluation Features:**
- **Performance Criteria**: Define evaluation standards and metrics
- **Continuous Assessment**: Ongoing student performance tracking
- **Report Generation**: Comprehensive student evaluation reports
- **Parent Communication**: Share evaluation results with parents
- **Intervention Planning**: Identify and support struggling students

---

## 5. 💰 Fees Management
**Purpose**: Financial administration for student fees and payments

### 5.1 Class Fee Types Management (`/branch-class-fee-types`)
**Function**: Define and manage different types of fees

#### **Fee Type Features:**
- **Fee Categories**: Tuition, transportation, meals, activities, etc.
- **Fee Structure**: Different fee amounts for different classes
- **Payment Schedules**: Monthly, quarterly, or annual payment plans
- **Discount Management**: Scholarship and discount programs
- **Late Fee Policies**: Penalties for overdue payments

### 5.2 Class Fees Management (`/branch-class-fees`)
**Function**: Specific fee amount management for each class

#### **Fee Management Features:**
- **Fee Calculation**: Automatic fee calculation based on student category
- **Payment Tracking**: Monitor payment status for each student
- **Due Management**: Track overdue payments and send reminders
- **Refund Processing**: Handle fee refunds and adjustments
- **Financial Reporting**: Generate fee collection and due reports

### 5.3 Due List Management (`/user-students`)
**Function**: Outstanding payment tracking and collection

#### **Due Management Features:**
- **Due Tracking**: Comprehensive list of outstanding payments
- **Payment Reminders**: Automated reminder system for overdue fees
- **Collection Management**: Track collection efforts and outcomes
- **Parent Communication**: Notify parents about due amounts
- **Payment Plans**: Set up installment plans for large dues

---

## 6. 🤝 Meeting Management
**Purpose**: Institutional meeting coordination and documentation

### 6.1 Meetings Management (`/meeting`)
**Function**: Schedule and coordinate meetings

#### **Meeting Features:**
- **Meeting Scheduling**: Plan meetings with staff, parents, or students
- **Participant Management**: Invite and track attendees
- **Agenda Setting**: Prepare meeting agendas and materials
- **Minutes Recording**: Document meeting discussions and decisions
- **Follow-up Tracking**: Monitor action items from meetings

### 6.2 Meeting Agendas Management (`/meeting-agendas`)
**Function**: Agenda preparation and distribution

#### **Agenda Features:**
- **Agenda Creation**: Prepare detailed meeting agendas
- **Document Attachment**: Include supporting documents and materials
- **Distribution System**: Share agendas with participants in advance
- **Version Control**: Manage agenda updates and revisions
- **Archive Management**: Store historical meeting agendas

---

## 7. 💼 Account Management
**Purpose**: Financial accounting and budget management

### 7.1 Account Management (`/accounts`)
**Function**: Chart of accounts and financial structure

#### **Account Features:**
- **Account Creation**: Set up different account types and categories
- **Account Hierarchy**: Organize accounts in logical structures
- **Balance Tracking**: Monitor account balances and transactions
- **Account Reconciliation**: Regular account balance verification
- **Financial Reporting**: Generate account-based financial reports

### 7.2 Account Categories Management (`/account-categories`)
**Function**: Organize accounts into logical categories

### 7.3 Journal Management (`/journal`)
**Function**: Record financial transactions

### 7.4 Debit Management (`/debit`)
**Function**: Track debit transactions and payments

### 7.5 Credit Management (`/credit`)
**Function**: Monitor credit transactions and receipts

### 7.6 Profit and Loss Management (`/profit-loss`)
**Function**: Financial performance analysis

### 7.7 Monthly Statement Management (`/month-wise-statement`)
**Function**: Monthly financial reporting

---

## 8. 👤 HRM Management
**Purpose**: Human resource management and employee services

### 8.1 Leave Management (`/leave-applications/pending`)
**Function**: Employee leave request processing

#### **Leave Management Features:**
- **Leave Applications**: Staff and teacher leave requests
- **Approval Workflow**: Multi-level leave approval process
- **Leave Balance**: Track available leave days for employees
- **Leave Calendar**: Visual representation of staff leave schedules
- **Substitute Management**: Arrange coverage for absent employees

### 8.2 Leave Type Management (`/leave-types`)
**Function**: Define different types of leave policies

#### **Leave Type Features:**
- **Leave Categories**: Sick leave, annual leave, emergency leave, etc.
- **Leave Policies**: Rules and regulations for each leave type
- **Entitlement Management**: Annual leave allocations for employees
- **Carryover Rules**: Unused leave handling policies
- **Documentation Requirements**: Required documents for different leave types

---

## 9. 📢 Notice Management
**Purpose**: Communication and information dissemination

### 9.1 Notice Category Management (`/notice-categorys`)
**Function**: Organize notices by category

### 9.2 Notice Management (`/notices`)
**Function**: Create and distribute institutional notices

#### **Notice Features:**
- **Notice Creation**: Prepare announcements and communications
- **Target Audience**: Specify recipients (students, parents, staff)
- **Distribution Channels**: Multiple delivery methods (email, SMS, portal)
- **Priority Levels**: Urgent, normal, and informational notices
- **Archive Management**: Store historical notices for reference

### 9.3 FAQ Management (`/faqs`)
**Function**: Frequently asked questions maintenance

### 9.4 Policy Management (`/policies`)
**Function**: Institutional policy documentation

### 9.5 Contact Support (`/contact-supports`)
**Function**: Help desk and support ticket management

### 9.6 Settings Management (`/settings`)
**Function**: System configuration and preferences

---

## 🔧 System Operations

### Daily Operations Checklist
**Morning Routine (15-20 minutes):**
1. **Login and Dashboard Review**
   - Check system notifications and alerts
   - Review pending tasks and urgent items
   - Monitor system performance indicators

2. **User Management Review**
   - Check new user registrations
   - Review pending approvals
   - Monitor user activity logs

3. **Academic Operations**
   - Review attendance reports
   - Check exam schedules and preparations
   - Monitor class routines and teacher assignments

4. **Financial Overview**
   - Review fee collection status
   - Check pending payments and dues
   - Monitor budget performance

**Daily Management Tasks:**
1. **Student Administration**
   - Process new admissions
   - Update student records
   - Handle attendance issues
   - Manage fee collections

2. **Staff Coordination**
   - Review leave applications
   - Handle staff scheduling
   - Process administrative requests
   - Monitor performance metrics

3. **Academic Supervision**
   - Monitor class schedules
   - Review exam preparations
   - Handle academic issues
   - Coordinate with teachers

4. **Communication Management**
   - Send daily notices and announcements
   - Respond to parent inquiries
   - Update information systems
   - Manage emergency communications

### Weekly Operations
**Monday Planning (30-45 minutes):**
- Review weekly schedules and priorities
- Plan staff meetings and coordinations
- Set academic week objectives
- Review financial performance

**Mid-Week Review (20-30 minutes):**
- Monitor progress on weekly objectives
- Address any emerging issues
- Review student and staff feedback
- Adjust schedules as needed

**Friday Wrap-up (30-40 minutes):**
- Complete weekly reports
- Review achievements and challenges
- Plan for following week
- Archive important documents

### Monthly Operations
**Month-End Reviews (2-3 hours):**
1. **Financial Reconciliation**
   - Complete monthly accounting
   - Generate financial reports
   - Review budget performance
   - Plan for next month's budget

2. **Performance Analysis**
   - Student academic performance review
   - Staff performance evaluation
   - System usage analysis
   - Stakeholder feedback review

3. **Strategic Planning**
   - Review institutional objectives
   - Plan improvement initiatives
   - Schedule maintenance activities
   - Update policies and procedures

---

## 🚨 Troubleshooting Guide

### Common Issues and Solutions

#### 1. Login and Access Issues
**Problem**: Cannot access admin panel
**Solutions:**
1. Verify correct URL: `https://admin.mnab.info/admin`
2. Check internet connectivity
3. Clear browser cache and cookies
4. Try different browser or incognito mode
5. Contact IT support for account verification

#### 2. User Management Issues
**Problem**: Cannot create new user accounts
**Solutions:**
1. Verify required fields are completed
2. Check for duplicate email addresses
3. Ensure proper role assignments
4. Verify system permissions
5. Check database connectivity

#### 3. Student Data Issues
**Problem**: Student information not updating
**Solutions:**
1. Refresh browser and try again
2. Check for form validation errors
3. Verify required fields completion
4. Save data in smaller chunks
5. Contact technical support

#### 4. Payment and Fee Issues
**Problem**: Fee calculations incorrect
**Solutions:**
1. Verify fee structure settings
2. Check student category assignments
3. Review discount and waiver applications
4. Recalculate fees manually
5. Contact finance department

#### 5. System Performance Issues
**Problem**: Slow system response
**Solutions:**
1. Check internet connection speed
2. Clear browser cache
3. Close unnecessary browser tabs
4. Try during off-peak hours
5. Contact IT support for server status

---

## 📊 Reporting and Analytics

### Available Reports
1. **Student Reports**
   - Enrollment summary
   - Attendance reports
   - Academic performance
   - Fee collection status

2. **Staff Reports**
   - Employee directory
   - Attendance summary
   - Performance evaluations
   - Leave utilization

3. **Financial Reports**
   - Monthly income statements
   - Fee collection reports
   - Budget performance
   - Outstanding dues

4. **Academic Reports**
   - Class performance
   - Exam results analysis
   - Subject-wise performance
   - Teacher effectiveness

### Report Generation Process
1. Navigate to relevant module
2. Select "Reports" or "Analytics" option
3. Choose report type and parameters
4. Set date range and filters
5. Generate and download report

---

## 🔒 Security and Privacy

### Security Measures
1. **User Authentication**
   - Secure login with password requirements
   - Session management and timeout
   - Role-based access control
   - Activity logging and monitoring

2. **Data Protection**
   - Encrypted data transmission
   - Regular backups
   - Access audit trails
   - Privacy compliance measures

### Best Practices
1. **Password Security**
   - Use strong passwords
   - Regular password updates
   - No password sharing
   - Secure password storage

2. **Data Handling**
   - Verify information accuracy
   - Regular data backups
   - Secure document storage
   - Privacy policy compliance

---

## 📞 Support and Contact

### Technical Support
- **System Issues**: Contact IT department
- **User Training**: Schedule training sessions
- **Feature Requests**: Submit through proper channels
- **Emergency Support**: Use emergency contact protocols

### Training Resources
- **User Manual**: This comprehensive guide
- **Video Tutorials**: Available through admin portal
- **Training Sessions**: Regular group training
- **One-on-One Support**: Individual assistance available

---

**Document Information:**
- **Version**: 1.0
- **Created**: August 2025
- **Target Users**: Branch Administrators
- **Review Schedule**: Quarterly updates
- **Support Contact**: Technical Support Team
