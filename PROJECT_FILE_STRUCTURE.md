# School Management System - Project File Structure

## 📁 Root Directory Structure

```
school_management/
├── .deploy_tools/                      # Deployment automation tools
├── .env                               # Environment variables (production)
├── .env.example                       # Environment variables template
├── .eslintignore                      # ESLint ignore patterns
├── .eslintrc.json                     # ESLint configuration
├── .eslintrc.react.json               # React-specific ESLint rules
├── .git/                              # Git repository data
├── .gitignore                         # Git ignore patterns
├── .prettierignore                    # Prettier ignore patterns
├── .prettierrc                        # Prettier code formatting config
├── .qodo/                             # Qodo AI assistant configuration
├── ADMIN_PANEL_USER_MANUAL.md         # Admin panel documentation
├── ADMIN_PANEL_WORKFLOWS.md           # Admin workflows guide
├── SUPER_ADMIN_USER_MANUAL.md         # Super admin documentation
├── SUPER_ADMIN_WORKFLOWS.md           # Super admin workflows guide
├── bash.exe.stackdump                 # System crash dump file
├── desktop.ini                        # Windows desktop configuration
├── jest.config.js                     # Jest testing framework config
├── migrate.sh                         # Database migration script
├── models.zip                         # Compressed database models
├── nodemon.json                       # Nodemon development server config
├── node_modules/                      # NPM dependencies (auto-generated)
├── package-lock.json                  # NPM dependency lock file
├── package.json                       # NPM package configuration
├── tsconfig.json                      # TypeScript compiler configuration
├── images/                            # Project images and assets
├── logs/                              # Application log files
├── models/                            # Database models and schemas
├── public/                            # Public frontend assets and pages
├── src/                               # Backend source code
└── vite-config-*.js                   # Vite build configs for different user roles
```

## 🎯 Frontend Structure (`/public/management/`)

### User Role-Based Management Interfaces
```
public/management/
├── account/                           # Accountant dashboard and functionality
│   ├── routes/
│   ├── store/
│   └── views/
│       ├── layouts/
│       └── pages/
├── admin/                             # Branch Administrator interface
│   ├── routes/
│   ├── store/
│   └── views/
│       ├── layouts/
│       └── pages/
│           ├── user_management/
│           ├── branch_management/
│           ├── class_management/
│           ├── account_management/
│           ├── meeting_management/
│           ├── notice_management/
│           └── teacher_kpi_management/
├── admission_officer/                 # Admission Officer dashboard
├── central_branch/                    # Central Branch management
├── hostel_super/                      # Hostel Superintendent interface
├── librarian/                         # Library management system
├── parent/                            # Parent portal and dashboard
├── staff/                             # Staff member interface
├── student/                           # Student portal and dashboard
├── super_admin/                       # System Super Administrator interface
│   ├── routes/
│   ├── store/
│   └── views/
│       ├── layouts/
│       └── pages/
│           ├── user_management/
│           ├── branch_management/
│           └── settings/
└── teacher/                           # Teacher dashboard and tools
```

### Detailed Admin Module Structure
```
public/management/admin/views/pages/
├── user_management/
│   ├── user_admins/                   # Admin user management
│   ├── user_staffs/                   # Staff management
│   ├── user_teachers/                 # Teacher management
│   ├── user_parents/                  # Parent management
│   ├── user_students/                 # Student management
│   └── user_branch_admins/            # Branch admin management
├── branch_management/
│   ├── branches/                      # Branch information
│   ├── branch_buildings/              # Building management
│   ├── branch_building_rooms/         # Room management
│   ├── branch_transports/             # Transport management
│   └── branch_transport_drivers/      # Driver management
├── class_management/
│   ├── branch_classes/                # Class setup
│   ├── branch_class_sections/         # Section management
│   ├── branch_class_subjects/         # Subject management
│   ├── branch_class_fees/             # Fee management
│   ├── branch_class_fee_types/        # Fee type definitions
│   ├── branch_class_routine_day_times/ # Class scheduling
│   ├── exams/                         # Examination management
│   └── exam_routines/                 # Exam scheduling
├── account_management/
│   ├── accounts/                      # Chart of accounts
│   ├── account_categories/            # Account categorization
│   ├── journal/                       # Journal entries
│   ├── debit/                         # Debit transactions
│   ├── credit/                        # Credit transactions
│   ├── profit_loss/                   # P&L reporting
│   ├── month_wise_statement/          # Monthly statements
│   ├── fees_collection/               # Fee collection
│   ├── loan_managements/              # Loan management
│   ├── payrolls/                      # Payroll processing
│   └── salary_payments/               # Salary management
├── meeting_management/
│   ├── meetings/                      # Meeting scheduling
│   └── meeting_agendas/               # Agenda management
├── notice_management/
│   ├── notices/                       # Notice creation
│   ├── notice_categorys/              # Notice categories
│   ├── faqs/                          # FAQ management
│   ├── policies/                      # Policy management
│   ├── contact_supports/              # Support system
│   ├── settings/                      # System settings
│   ├── leave_applications/            # Leave management
│   └── leave_types/                   # Leave type definitions
├── student_kpi_management/
│   ├── student_overall_evaluations/   # Student evaluations
│   └── student_evaluation_criterias/  # Evaluation criteria
├── teacher_kpi_management/
│   ├── teacher_overall_evaluations/   # Teacher evaluations
│   └── teacher_evaluation_criterias/  # Teacher evaluation criteria
└── todo_management/
    ├── tasks/                         # Task management
    ├── task_variants/                 # Task categories
    └── task_groups/                   # Task grouping
```

## 🔧 Backend Structure (`/src/`)

### Core Backend Components
```
src/
├── bootstrap/                         # Application bootstrap and initialization
├── configs/                           # Configuration files and settings
├── helpers/                           # Utility functions and helpers
├── modules/                           # Feature modules (main business logic)
├── plugins/                           # Custom plugins and extensions
├── routes/                            # Route definitions and handlers
├── index.ts                          # Application entry point
└── register_all_routes.ts            # Route registration system
```

### Backend Module Structure
```
src/modules/
├── academic_calendar_management/      # Academic calendar and events
├── accounts_management/               # Financial accounting system
├── asset_management/                  # Asset tracking and management
├── assignment_management/             # Student assignments
├── attendance_management/             # Attendance tracking system
├── auth_management/                   # Authentication and authorization
├── branch_management/                 # Multi-branch management
├── class_course_schedule_management/  # Course scheduling
├── class_management/                  # Class and section management
├── common_types/                      # Shared TypeScript types
├── employee_salary_management/        # Payroll and salary management
├── exam_management/                   # Examination system
├── exam_paper_management/             # Exam paper handling
├── loan_management/                   # Loan and financial aid
├── meeting_management/                # Meeting scheduling and management
├── notice_management/                 # Notice and communication system
├── personal_calendar_schedule_management/ # Personal calendar management
├── setup_management/                  # System setup and configuration
├── student_evaluation_management/     # Student assessment system
├── teacher_evaluations/               # Teacher performance evaluation
├── todo_management/                   # Task and todo management
└── user_management/                   # User account management
```

### Detailed Module Structure Example (User Management)
```
src/modules/user_management/
├── user_admin/
│   ├── controllers/                   # Request handlers
│   ├── models/                        # Database models
│   ├── services/                      # Business logic
│   ├── validators/                    # Input validation
│   ├── types/                         # TypeScript interfaces
│   └── routes.ts                      # API endpoints
├── user_students/
├── user_teachers/
├── user_parents/
├── user_staffs/
├── user_branch_admins/
└── user_login_histories/
```

## 📱 Frontend Component Structure

### Component Organization Pattern
```
Each User Role (admin, teacher, student, etc.)/
├── routes/
│   └── index.tsx                      # Route definitions
├── store/
│   ├── index.tsx                      # Redux store setup
│   └── slices/                        # State management slices
└── views/
    ├── layouts/
    │   ├── DashboardLayout.tsx        # Main layout component
    │   └── shared/                    # Shared layout components
    └── pages/
        ├── T1.tsx                     # Main dashboard page
        └── [module_name]/
            ├── All.tsx                # List/view all items
            ├── Create.tsx             # Create new item
            ├── Edit.tsx               # Edit existing item
            ├── Details.tsx            # View item details
            ├── Layout.tsx             # Module layout
            ├── Import.tsx             # Bulk import functionality
            ├── components/            # Module-specific components
            ├── config/
            │   ├── routes.tsx         # Module routes
            │   ├── setup.ts           # Module configuration
            │   └── store/             # Module state management
            └── helpers/               # Module utility functions
```

## 📊 Database and Models

### Database Structure
```
models/
├── index.js                          # Model exports and relationships
└── individual_model_files/           # Sequelize model definitions
```

## 🔨 Build and Configuration Files

### Build Configuration
```
Root Directory:
├── vite-config-account.js            # Vite config for accountant role
├── vite-config-admin.js              # Vite config for admin role
├── vite-config-admission-officer.js  # Vite config for admission officer
├── vite-config-central-branch.js     # Vite config for central branch
├── vite-config-hostel-super.js       # Vite config for hostel super
├── vite-config-librarian.js          # Vite config for librarian role
├── vite-config-parent.js             # Vite config for parent portal
├── vite-config-staff.js              # Vite config for staff interface
├── vite-config-student.js            # Vite config for student portal
├── vite-config-super-admin.js        # Vite config for super admin
├── vite-config-teacher.js            # Vite config for teacher dashboard
├── jest.config.js                    # Testing framework configuration
├── tsconfig.json                     # TypeScript compilation settings
├── .eslintrc.json                    # Code linting rules
├── .prettierrc                       # Code formatting rules
└── nodemon.json                      # Development server configuration
```

## 📁 Public Assets

### Static Assets Structure
```
public/
├── assets/
│   ├── dashboard/                     # Dashboard-specific assets
│   ├── dashboard_uni/                 # University dashboard assets
│   └── website/                       # Website assets
├── management_build/                  # Built management interfaces
├── uploads/                           # User uploaded files
│   ├── accounts[timestamp][filename]  # Account-related uploads
│   └── [various_uploaded_files]      # Student photos, documents, etc.
├── views/                            # Server-side view templates
└── favicon.ico                       # Site favicon
```

## 🔍 File Naming Conventions

### TypeScript/JavaScript Files
- **Components**: PascalCase (e.g., `StudentList.tsx`, `TeacherProfile.tsx`)
- **Pages**: PascalCase (e.g., `All.tsx`, `Create.tsx`, `Edit.tsx`)
- **Utilities**: camelCase (e.g., `dateHelper.ts`, `apiClient.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)

### Directory Structure
- **Modules**: snake_case (e.g., `user_management`, `class_management`)
- **Components**: PascalCase (e.g., `StudentList/`, `TeacherProfile/`)
- **Pages**: Descriptive names (e.g., `student_registration/`, `fee_collection/`)

## 🏗 Architecture Patterns

### Frontend Architecture
- **Framework**: React with TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Styling**: CSS Modules with SCSS
- **UI Components**: Custom component library

### Backend Architecture
- **Framework**: Fastify with TypeScript
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT-based authentication
- **API Design**: RESTful API with OpenAPI documentation
- **File Structure**: Domain-driven design with modules

### Development Tools
- **Version Control**: Git
- **Code Quality**: ESLint + Prettier
- **Testing**: Jest
- **Development Server**: Nodemon
- **Package Manager**: NPM

## 📈 Scalability Features

### Multi-Role Support
- Separate build configurations for each user role
- Role-based routing and component loading
- Optimized bundles per user type
- Independent deployment capabilities

### Modular Architecture
- Feature-based module organization
- Loose coupling between modules
- Independent module development
- Easy feature addition/removal

### Performance Optimization
- Code splitting by user role
- Lazy loading of components
- Optimized build configurations
- Efficient state management

---

## 📝 Key File Locations

### Important Configuration Files
- **Main Backend Entry**: `src/index.ts`
- **Route Registration**: `src/register_all_routes.ts`
- **Package Configuration**: `package.json`
- **TypeScript Config**: `tsconfig.json`
- **Environment Variables**: `.env` and `.env.example`

### Main Dashboard Files
- **Super Admin Dashboard**: `public/management/super_admin/views/pages/T1.tsx`
- **Admin Dashboard**: `public/management/admin/views/pages/T1.tsx`
- **Teacher Dashboard**: `public/management/teacher/views/pages/T1.tsx`
- **Student Dashboard**: `public/management/student/views/pages/T1.tsx`
- **Parent Dashboard**: `public/management/parent/views/pages/T1.tsx`

### Key Backend Modules
- **User Management**: `src/modules/user_management/`
- **Authentication**: `src/modules/auth_management/`
- **Branch Management**: `src/modules/branch_management/`
- **Class Management**: `src/modules/class_management/`
- **Exam Management**: `src/modules/exam_management/`

---

**Total Project Statistics:**
- **Languages**: TypeScript, JavaScript, HTML, CSS/SCSS
- **Frontend Frameworks**: React, Redux, React Router
- **Backend Framework**: Fastify (Node.js)
- **Database**: PostgreSQL with Sequelize ORM
- **Build Tools**: Vite (multiple configurations)
- **User Roles**: 11 different user interfaces
- **Modules**: 22+ backend feature modules
- **Components**: 100+ React components across all roles
