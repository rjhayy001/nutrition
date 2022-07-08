import en from 'vee-validate/dist/locale/en'

const messages = {
  validation: en.messages,

  //general
  "global": {
    "summary": "Summary",
    "save": "Save",
    "update": "Update",
    "cancel": "Cancel",
    "create": "Create",
    "back": "Back",
    "add": "Add",
    "delete": "Delete",
    "filter": "Filter",
    "search": "Search",
    "uploadPhoto": "Upload Photo",
    "active": "Active",
    "inActive": "Inactive",
    "subscription": "Subscription",
    "status": "Status",
    "start": "Start",
    "end": "End",
    "payment": "Payment",
    "created_at": "Created at",
    "updated_at": "Updated at",
    "yes": "Yes",
    "no": "No",
    "edit": "Edit",
    "coach": "Coach",
  },

  //header
  "header": {
    "search":  "Search items by name, age ...",
  },

  //sidebar
  "sidebar": {
    "dashboard": "Dashboard",
    "clients": "Clients",
    "subscriptions": "Subscriptions",
    "payments": "Payments",
    "blogs": "Blogs",
    "announcement": "Announcement",
    "statistic": "Statistic",
    "settings": "Settings"
  },
  "subSidebar": {
    "usefulDocuments": "Useful Documents",
    "usefulLinks": "Useful Links",
    "photos": "Photos",
    "coaches": "Coaches",
    "plans": "Plans",
    "address": "Address",
    "others": "Others"
  },

  "popups": {
    "confirm": "Confirm",
    "cancel": "Annuler",
    "title": {
        "confirm": "Confirmation!",
        "delete": "Effacer cet enregistrement ?"
    },
    "message": {
        "create": "Etes-vous sûr de vouloir ajouter cet enregistrement ?",
        "update": "Etes-vous sûr de vouloir modifier cet enregistrement ?",
        "delete": "Une fois que vous aurez supprimé cet enregistrement, il serait impossible de le <strong> récupérer </strong>",
        "change": "Once you update this record, added items will be <strong> removed </strong>",
        "change_supplier": "Are you sure you want to add this record ? This will <strong> removed </strong> all selected products"
    },
    "added": " added.",
    "message_added": "Ajout avec succès d'un enregistrement ",
    "message_update": "Modification avec succès d'un enregistrement",
    "message_delete_one": "Suppression avec succès d'un enregistrement",
    "message_delete": "Enregistrements supprimés",
    "message_upload": "Uploadé avec succès",
    "message_remove_group": "Suppression avec succès du groupe",
    "alert_select_client": "Veuillez selectionner un client à exporter."
  },

  //Clients
  "clients": {
    "totalClients": "Total Clients",
    "totalActive": "Total Active",
    "totalInactive": "Total In-Active",
    "totalWithCoach": "Total w/ Coach",
    "totalWithoutCoach": "Total w/o Coach",

    "firstName": "First Name",
    "lastName": "Last Name",
    "fullName": "Full Name",
    "birthday": "Birthday",
    "email": "Email",
    "phone": "Phone",
    "address": "Address",
    "status": "Status",
    "tags": "Tags",
    "groups": "Groups",
    "createdAt": "Created at",
    "updatedAt": "Updated at",
    "username": "Username",
    "additionalAddress": "Additional Address",
    "city": "City",
    "zipcode": "Zipcode",
    "country": "Country",

    "createNewClient": "CREATE NEW CLIENT",
    "edit": "EDIT",
    "profile": "Profile",
    "loginCredential": "LOGIN CREDENTIALS",

    "form": "Forms",
    "measures": "Measures",
    "tracking": "Tracking",
    "feedback": "Feedback",
    //placeholder form
    "typeFirstName": "Type first name ...",
    "typeLastName": "Type last name ...",
    "typeYourMobile": "Type your mobile ...",
    "typeYourEmail": "Type your email ...",
    "chooseDateOfBirth": "Choose date of birth ...",
    "typeEmailOrUsername": "Type your email or username ...",
    "typeYourPassword": "Type your password ...",
    "typeYourAddress": "Type your address ...",
    "typeYourAddAddress": "Type your additional address ...",
    "selectTags": "Select tags ...",
    "selectGroups": "Select groups ...",

    "addNewPhoto": "Add New Photo",
    "typeTitle": "Type Title",
    "shareable": "Shareable",
    "typeDescription": "Type or Paste Description",

  },

  //coaches
  "coaches": {
    "totalCoaches": "Total coaches",
    "totalActive": "Total active",
    "totalInactive": "Total inactive",
    "totalWithClient": "Total w/ client",
    "totalWithoutClient": "Total w/o client",
  },

  //subscriptions
  "subscription": {
    "addSubscription": "Add subscription",
    "updateSubscription": "Update subscription",
    "selectClient": "Select client",
    "selectCoach": "Select coach",
    "selectSubscription": "Select subscription",
    "cancelled": "Cancelled",
    "inProgress": "In Progress",
    "pendingCancellation": "Pending Cancellation",
    "incomplete": "Incomplete",
    "incompleteCancelled": "Incomplete Cancelled",
    "onTrial": "On Trial",
    "unpaid": "Unpaid",
  },

  //payment
  "payment": {

  },

  //blogs
  "blogs": {
    "title": "Title",
    "typeTitle": "Type your title",
    "typeMessage": "Type your message",
    "summary": "Summary",
    "keywords": "Keywords",
    "showRightColumn": "Show right column",
    "showToRegisteredUsers": "Show to registered users",
    "optionalUrl": "Optional url",
    "content": "Content",
    "blogType": "Blog type",
    "category": "Category",
  },

  //announce
  "announce": {
    "totalAnnounce": "Total announce",
    "totalSent": "Total sent",
    "totalOnceSent": "Total Once Save",
    "totalRecurringSave": "Total Recurring Save",
    "totalRecurringSent": "Total Recurring Sent",
    "receiver": "Receiver",
    "check": "Check",
    "time": "Time",
    "schedulePeriod": "Schedule period",
    "cycleCount": "Cycle count",
    "cycleType": "Cycle type",

    "allCoaches": "All coaches",
    "haveClient": "Have client",
    "dontHaveClient": "Do not have client",
    "allClient": "All clients",
    "subscriberClient": "Subscriber client",
    "nonSubscriberClient": "Non subscriber client",
    "selecAll": "Select all",
    "selected": "Selected",
    "onTimeOnly": "On Time Only",
    "recurring": "Recurring",
    "timePeriod": "Time period",
    "daily": "Daily",
    "weekly": "Weekly",
    "monthly": "Monthly",
    "every3months": "Every 3 Months",
    "every6months": "Every 6 Months",
    "everyYear": "Every Year",
    "custom": "Custom",
    "send": "Send",
    "addNewNotification": "Add New Notification"
  },
};

export default messages;
