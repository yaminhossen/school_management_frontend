<ul className="sidebar-menu">
                <MenuSingle to="/" icon="icon-home" label="Dashboard" />

                {/* User Management */}
                <MenuDropDown icon="icon-user" group_title="User Management">
                    <MenuDropDownItem
                        to="/user-staffs"
                        label="Employee Management"
                    />
                    <MenuDropDownItem
                        to="/user-teachers"
                        label="Teachers Management"
                    />
                    <MenuDropDownItem
                        to="/user-parents"
                        label="Parents Management"
                    />
                    <MenuDropDownItem
                        to="/user-students"
                        label="Students Management"
                    />
                </MenuDropDown>

                {/* Todo Management */}
                <MenuDropDown
                    icon="icon-notepad"
                    group_title="Todo Management"
                >
                    <MenuDropDownItem to="/tasks" label="Tasks Management" />
                </MenuDropDown>

                {/* Branch Management */}
                <MenuDropDown
                    icon="icon-location-pin"
                    group_title="Branch Management"
                >
                    <MenuDropDownItem
                        to="/branch-buildings"
                        label="Branch Buildings"
                    />
                    <MenuDropDownItem
                        to="/branch-building-rooms"
                        label="Building Rooms"
                    />
                    <MenuDropDownItem
                        to="/branch-transport-drivers"
                        label="Transport Drivers"
                    />
                    <MenuDropDownItem
                        to="/branch-transports"
                        label="Transports"
                    />
                    <MenuDropDownItem
                        to="/academic-calendar-event-types"
                        label="Calendar Event Types"
                    />
                    <MenuDropDownItem
                        to="/academic-calendars"
                        label="Academic Calendars"
                    />
                </MenuDropDown>

                {/* Academic Management */}
                <MenuDropDown
                    icon="icon-book-open"
                    group_title="Academic Management"
                >
                    <MenuDropDownItem to="/branch-classes" label="Classes" />
                    <MenuDropDownItem
                        to="/branch-class-sections"
                        label="Class Sections"
                    />
                    <MenuDropDownItem
                        to="/branch-class-subjects"
                        label="Class Subjects"
                    />
                    <MenuDropDownItem
                        to="/branch-class-routine-day-times/class-routine"
                        label="Class Routine"
                    />
                    <MenuDropDownItem to="/exams" label="Exam Management" />
                    <MenuDropDownItem
                        to="/exam-routines/at-a-glance"
                        label="Exam Routine (Glance)"
                    />
                    <MenuDropDownItem
                        to="/exam-routines"
                        label="Exam Routine Management"
                    />
                    <MenuDropDownItem
                        to="/student-overall-evaluations"
                        label="Student Evaluations"
                    />
                    <MenuDropDownItem
                        to="/student-evaluation-criterias"
                        label="Evaluation Criterias"
                    />
                </MenuDropDown>

                {/* Fees Management */}
                <MenuDropDown icon="icon-wallet" group_title="Fees Management">
                    <MenuDropDownItem
                        to="/branch-class-fee-types"
                        label="Class Fee Types"
                    />
                    <MenuDropDownItem
                        to="/branch-class-fees"
                        label="Class Fees"
                    />
                    <MenuDropDownItem to="/user-students" label="Due List" />
                </MenuDropDown>

                {/* Meeting Management */}
                <MenuDropDown
                    icon="icon-calendar"
                    group_title="Meeting Management"
                >
                    <MenuDropDownItem to="/meeting" label="Meetings" />
                    <MenuDropDownItem
                        to="/meeting-agendas"
                        label="Meeting Agendas"
                    />
                </MenuDropDown>

                {/* Account Management */}
                <MenuDropDown
                    icon="icon-briefcase"
                    group_title="Account Management"
                >
                    <MenuDropDownItem
                        to="/accounts"
                        label="Account Management"
                    />
                    <MenuDropDownItem
                        to="/account-categories"
                        label="Account Categories"
                    />
                    <MenuDropDownItem to="/journal" label="Journal" />
                    <MenuDropDownItem to="/debit" label="Debit" />
                    <MenuDropDownItem to="/credit" label="Credit" />
                    <MenuDropDownItem
                        to="/profit-loss"
                        label="Profit And Loss"
                    />
                    <MenuDropDownItem
                        to="/month-wise-statement"
                        label="Month Wise Statement"
                    />
                </MenuDropDown>

                {/* HRM Management */}
                <MenuDropDown icon="icon-people" group_title="HRM Management">
                    <MenuDropDownItem
                        to="/leave-applications/pending"
                        label="Leave Management"
                    />
                    <MenuDropDownItem to="/leave-types" label="Leave Types" />
                </MenuDropDown>

                {/* Notice Management */}
                <MenuDropDown
                    icon="icon-bell"
                    group_title="Notice Management"
                >
                    <MenuDropDownItem
                        to="/notice-categorys"
                        label="Notice Categories"
                    />
                    <MenuDropDownItem
                        to="/notices"
                        label="Notice Management"
                    />
                    <MenuDropDownItem to="/faqs" label="FAQ Management" />
                    <MenuDropDownItem
                        to="/policies"
                        label="Policy Management"
                    />
                    <MenuDropDownItem
                        to="/contact-supports"
                        label="Contact Support"
                    />
                </MenuDropDown>

                <MenuSingle to="/settings" icon="icon-settings" label="Settings" />

                <MenuSingle
                    onClick={handleSubmit}
                    to="no-where"
                    icon="icon-power-off"
                    label="Logout"
                />
            </ul>