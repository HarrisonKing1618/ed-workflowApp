export const sidebarMenu = {
  nurse: [
    {
      title: "Dashboard",
      path: "/dashboard/nurse",
    },
    {
      title: "Check-in",
      path: "/dashboard/checkin",
    },
    {
      title: "Triage",
      path: "/dashboard/triage",
    },
    {
      title: "Queue",
      path: "/dashboard/patient-queue",
    },
    {
      title: "Records",
      path: "/dashboard/records/:patientId",
    },
    {
      title: "Notification",
      path: "/dashboard/notification",
    },
  ],

  doctor: [
    {
      title: "Dashboard",
      path: "/dashboard/doctor",
    },
    {
      title: "My Patients",
      path: "/dashboard/doctor/patients",
    },
    // {
    //   title: "Schedule",
    //   path: "/dashboard/doctor/schedule",
    // },


    // {
    //   title: "Patient Records",
    //   path: "/dashboard/doctor/patient-records",
    // },
    // {
    //   title: "Clinical Documentation",
    //   path: "/dashboard/doctor/clinical-documentation",
    // },
    {
      title: "Notifications",
      path: "/dashboard/doctorsnotification",
    },
  ],

  admin: [
    {
      title: "Live ED Monitoring",
      path: "/dashboard/monitoring",
    },
    {
      title: "Staff Management",
      path: "/dashboard/staffmanagement",
    },
    {
      title: "Reports",
      path: "/dashboard/reports",
    },
    {
      title: "User Management",
      path: "/dashboard/usermanagement",
    },
    {
      title: "Audit Logs",
      path: "/dashboard/log",
    },
    {
      title: "System Settings",
      path: "/dashboard/settings",
    },
  ],
};