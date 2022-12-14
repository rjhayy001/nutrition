import en from 'vee-validate/dist/locale/en'

const messages = {
    validation: en.messages,

    //general
    "global": {
        "hello": "Hello",
        "summary": "Summary",
        "save": "Save",
        "submit": "Submit",
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
        "search": "Search items by name, age ...",
        "headerSearch": "Search items by name or title ...",
        "switchToAdminView": "Switch to admin view",
        "switchToCoachView": "Switch to coach view",
        "markAsRead": "Mark as read",
        "profile": "Profile",
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

    //dashboard
    "dashboard": {
        "subscribersTracking": "Subscribers Tracking",
        "newSubscribers": "New Subscribers",
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
        "dateOfBirth": "Date Of Birth",
        "email": "Email",
        "password": "Password",
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

        //global
        "feedbackOfTheWeek": "FEEDBACK OF THE WEEK",
        "registeredSince": "registered since",
        "subscribedSince": "subscribed since",
        "activeSubscription": "active subscription",
        "nextCall": "Next Calls",
        "weekly": "Weekly",
        "lastFeedback7DaysAgo": "Last feedback 7 days ago",
        "allWeeklyPoints": "All weekly points",
        //formula
        "singleMan": "Single Man",
        "noChildren": "No Children",
        "weight": "Weight",
        "start": "Start",
        "current": "Current",
        "objective": "Objective",
        "height": "Height",
        "food": "Food",
        "pastHistory": "Past History",
        "sleep": "Sleep",

        "notSpecified": "NOT SPECIFIED",
        //food questionaire
        "foodPreference": "FOOD PREFERENCE",
        "mealsPerDay": "MEALS PER DAY",
        "followDrasticDiet": "FOLLOW DRASTIC DIET",
        "caloriesToday": "CALORIES TODAY",
        "foodIntolerances": "FOOD INTOLERANCES",
        "culturalAdaptationDiet": "CULTURAL ADAPTATIONS DIET",
        "waterPerDay": "WATER PER DAY",
        "drinksOtherThanWater": "DRINKS OTHER THAN WATER",
        "coffeePerDay": "COFFE PER DAY",
        "alcoholPerWeek": "ALCOHOL PER WEEK",
        "foodSupplement": "FOOD SUPPLEMENT",
        //standard day
        "standardDay": "Standard Day",
        "breakfast": "BREAKFAST",
        "morningSnack": "MORNING SNACK",
        "lunch": "LUNCH",
        "afternoonSnack": "AFTERNOON SNACK",
        "dinner": "DINNER",
        //past history questionaire
        "medicalHistory": "MEDICAL HISTORY",
        "medicalTreatment": "MEDICAL TREATMENT",
        "familyMedicalHistory": "FAMILY MEDICAL HISTORY",
        "eatingDisorder": "EATING DISORDER",
        "eatingDisorderAge": "EATING DISORDER AGE",
        "eatingDisorderRemedy": "EATING DISORDER REMEDY",
        //for women only
        "forWomenOnly": "FOR WOMEN ONLY",
        "premenstrualSendrome": "PREMENSTRUAL SYNDROME",
        "gynaecologicalCondition": "GYNAECOLOGICAL CONDITION",
        "observeMenstrualCycle": "OBSERVE MENSTRUAL CYCLE",
        "regularCycle": "REGULAR CYCLE",
        "cycleAverage": "CYCLE AVERAGE",
        //objectives questionaire
        "desireWeight": "DESIRED WEIGHT",
        "dateToReachTheGoal": "DATE TO REACH THE GOAL",
        "goalImportance": "GOAL IMPORTANCE",
        //goal hindrances
        "goalHindrances": "GOAL HINDRANCES",
        "whatToEat": "what to eat",
        "howMuchToEat": "how much to eat",
        "planMeals": "plan meals",
        "timeToCook": "time to cook",
        "drinkAlcohol": "drink alcohol",
        "cravings": "cravings",
        "emotionalVoid": "emotional void",
        "eatWhenNotHungry": "eat when not hungry",
        "alwaysHungry": "always hungry",
        "notHungry": "not hungry",
        "guiltyToEat": "guilty to eat",
        "accessToHealthyFood": "access to healthy food",
        //sparts questionaire
        "practiceSports": "PRACTICE SPORTS",
        "sportingActivityLevel": "sporting activity level",
        "activityOutsideSportLevel": "activity outside sport level",
        "trainingRecovery": "training recovery",
        "NumberOfTrainingDays": "number of training day",
        "pain": "pain",
        "confidentOnAthleticAbility": "confident on athletic ability",
        "comfortablePlace": "comfortable place",
        "placeToPractice": "place to practice",
        "energyToPractice": "energy to practice",
        "time": "time",
        "sportHindrances": "Sport Hindrances",
        "sportsTypes": "Sports Types",
        //stress questionaire
        "jobOrStudy": "JOB OR STUDY",
        "stressMeter": "STRESS METER",
        "fulfillingMeter": "FULFILLING METER",
        "homeStressed": "HOME STRESSED",
        "manageStress": "MANAGE STRESS",
        "planYourDay": "PLAN YOUR DAY",
        "timeOutsidePerDay": "TIME OUTSIDE PER DAY",

    },

    //coaches
    "coaches": {
        "profile": "Profile",
        "createCoach": "CREATE NEW COACH",
        "totalCoaches": "Total coaches",
        "totalActive": "Total active",
        "totalInactive": "Total inactive",
        "totalWithClient": "Total w/ client",
        "totalWithoutClient": "Total w/o client",
        //Documents
        'documents': "Documents",
        'types': "Types",
        'image': "Image",
        'video': "Video",
        'link': "Link",
        'application': "Application",
        'add_documents': "Add documents",
        'tittle': "Tittle",
        'Add_link_here': "Add link here",
        'Add_link': "Add link",
        'Dropfiles': "Drop files",
        'orclick': "or click to upload",
        'save': "Save",
        'cancel': "Cancel",
        'back': "Back",
        'search': "search",
        'all': "all",
        'shared_resources': "Shared resources",
        'all_resource': "All resources",
        'edit': "Edit",
        'delete': "Delete",
        'delete_confirm': "Delete confirmation",
        'delete_doc': "Are you sure to delete this documents?",
        'no': "non",
        'yes': "oui",
        'delete_sharedoc': "Êtes-vous sûr de vouloir supprimer ce document partagé ?",
        'file': "File",
        'file_name': "File name",
        'file_type': "File type",
        'file_size': "File",
        'actions': "Actions",
        'coach_client': 'Coach Client',
        'full_name': 'Full name',
        'email': 'Email',
        'phone': 'Phone',
        'address': 'Address',
        'status': 'Status',
        'coach_schedule': 'Coach Schedule',
        'date': 'Date',
        'day': 'Day',
        'time': 'Time',
        'status': 'Status',
        'add': 'Add',
        'delete': 'Delete',


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
        "price": "Price",
        "selectPrice": "Select price"
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