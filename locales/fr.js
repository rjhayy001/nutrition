import fr from 'vee-validate/dist/locale/fr'

const messages = {
  validation: fr.messages,

  //general
  "global": {
    "summary": "Résumé",
    "save": "Sauvez",
    "update": "Mettre à jour",
    "cancel": "Annuler",
    "create": "Create",
    "back": "Arrière",
    "add": "Ajouter",
    "delete": "Supprimer",
    "filter": "Filtre",
    "search": "Recherche",
    "uploadPhoto": "Télécharger la photo",
    "active": "Actif",
    "inActive": "Inactif",
    "subscription": "Abonnement",
    "status": "Statut",
    "start": "Début",
    "end": "Fin",
    "payment": "Paiement",
    "created_at": "Créé à",
    "updated_at": "Mis à jour à",
    "yes": "Oui",
    "no": "Non",
    "edit": "Modifier",
    "coach": "Entraîneur",
  },

  //header
  "header": {
    "search":  "Recherche d'articles par nom, âge ...",
  },

  //sidebar
  "sidebar": {
    "dashboard": "Tableau de bord",
    "clients": "Clients",
    "subscriptions": "Abonnements",
    "payments": "Paiements",
    "blogs": "Blogs",
    "announcement": "Annonce",
    "statistic": "Statistiques",
    "settings": "Paramètres"
  },
  "subSidebar": {
    "usefulDocuments": "Documents utiles",
    "usefulLinks": "Liens utiles",
    "photos": "Photos",
    "coaches": "Entraîneurs",
    "plans": "Plans",
    "address": "Adresse ",
    "others": "Autres"
  },

  "popups": {
    "confirm": "Confirmer",
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

  //Clients datatable
  "clients": {
    "totalClients": "Total des clients",
    "totalActive": "Total actif ",
    "totalInactive": "Total des inactifs",
    "totalWithCoach": "Total avec l'entraîneur",
    "totalWithoutCoach": "Total sans entraîneur ",

    "firstName": "Prénom",
    "lastName": "Nom de famille",
    "fullName": "Nom complet",
    "birthday": "Anniversaire",
    "email": "E-mail",
    "phone": "Téléphone",
    "address": "Adresse",
    "status": "Statut",
    "tags": "Tags",
    "groups": "Groupes",
    "createdAt": "Créé à",
    "updatedAt": "Mis à jour à",
    "username": "Nom d'utilisateur",
    "additionalAddress": "Adresse supplémentaire",
    "city": "Ville",
    "zipcode": "Code postal",
    "country": "Pays",

    "createNewClient": "CRÉER UN NOUVEAU CLIENT",
    "edit": "Modifier",
    "profile": "Profil",
    "loginCredential": "INFORMATIONS D'IDENTIFICATION",
    
    "form": "Formulaires",
    "measures": "Mesures",
    "tracking": "Suivi",
    "feedback": "retour d'information",
    //placeholder form
    "typeFirstName": "Type Prénom ...",
    "typeLastName": "Type Nom de famille ...",
    "typeYourMobile": "Tapez votre mobile ...",
    "typeYourEmail": "Tapez votre e-mail ...",
    "chooseDateOfBirth": "Choisissez la date de naissance ...",
    "typeEmailOrUsername": "Tapez votre e-mail ou votre nom d'utilisateur ...",
    "typeYourPassword": "Tapez votre mot de passe ...",
    "typeYourAddress": "Tapez votre adresse ...",
    "typeYourAddAddress": "Tapez votre adresse supplémentaire ...",
    "selectTags": "Sélectionner les tags ...",
    "selectGroups": "Sélectionner les groupes ...",

    "addNewPhoto": "Ajouter une nouvelle",
    "typeTitle": "Titre du type",
    "shareable": "Partageable",
    "typeDescription": "Tapez ou collez la description",

  },

  //coaches
  "coaches": {
    "createCoach": "Créer un nouvel entraîneur",
    "editCoach": "Editer le coach",
    "totalCoaches": "Total des entraîneurs",
    "totalActive": "Total actif",
    "totalInactive": "Total des inactifs",
    "totalWithClient": "Total avec le client",
    "totalWithoutClient": "Total sans client",
  },

  //subscriptions
  "subscription": {
    "addSubscription": "Ajouter un abonnement",
    "updateSubscription": "Mise à jour de l'abonnement",
    "selectClient": "Sélectionner un client",
    "selectCoach": "Sélectionner un entraîneur",
    "selectSubscription": "Sélectionner un abonnement",
    "cancelled": "Annulé",
    "inProgress": "En cours",
    "pendingCancellation": "En attente d'annulation",
    "incomplete": "Incomplet",
    "incompleteCancelled": "Incomplet annulé",
    "onTrial": "En essai",
    "unpaid": "Impayé",
  },

  //payment
  "payment": {

  },

  //blogs
  "blogs": {
    "title": "Titre",
    "typeTitle": "Tapez votre titre",
    "typeMessage": "Tapez votre message",
    "summary": "Résumé",
    "keywords": "Mots clés",
    "showRightColumn": "Afficher la colonne de droite",
    "showToRegisteredUsers": "Afficher aux utilisateurs enregistrés",
    "optionalUrl": "Url facultatif",
    "content": "Contenu",
    "blogType": "Type de blog",
    "category": "Catégorie",
  },

  //announce
  "announce": {
    "totalAnnounce": "Annonce totale",
    "totalSent": "Total envoyé",
    "totalOnceSent": "Total une fois envoyé",
    "totalRecurringSave": "Total des économies récurrentes",
    "totalRecurringSent": "Total des envois récurrents",
    "receiver": "Récepteur",
    "check": "Vérifiez",
    "time": "Temps",
    "schedulePeriod": "Planifier le programme",
    "cycleCount": "Nombre de cycles",
    "cycleType": "Type de cycle",

    "allCoaches": "Tous les entraîneurs",
    "haveClient": "Ayez un client",
    "dontHaveClient": "N'ont pas de client",
    "allClient": "Tous les clients",
    "subscriberClient": "Clients abonnés",
    "nonSubscriberClient": "Clients non abonnés",
    "selecAll": "Sélectionner tout",
    "selected": "Sélectionné",
    "onTimeOnly": "Seulement à l'heure",
    "recurring": "Récurrent",
    "timePeriod": "Période de temps",
    "daily": "Quotidiennement",
    "weekly": "Hebdomadaire",
    "monthly": "Mensuel",
    "every3months": "Tous les 3 mois",
    "every6months": "Tous les 6 mois",
    "everyYear": "Chaque année",
    "custom": "Personnalisé",
    "send": "Envoyer",
    "addNewNotification": "Ajouter une nouvelle notification",
  },
};

export default messages;
