import en from 'vee-validate/dist/locale/en'

const messages = {
  validation: en.messages,
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
};

export default messages;
