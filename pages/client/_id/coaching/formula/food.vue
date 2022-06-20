<template>
  <div>
    <v-container>
      <v-row>
        <v-flex
          xs9
          class="px-2"
        >
          <v-card min-height="540" class="pa-4">
            <div
              v-for="(food, index) in foods"
              :key="food+index"
              class="mb-2"
            >
              <span class="formula-text text-capitalize">
                {{index}}:
              </span>
              <span class="text-capitalize font-weight-bold">
                {{food}}
              </span>
            </div>
          </v-card>
        </v-flex>
        <v-flex
          xs3
          class="px-2"
        >
          <v-card min-height="250">
            <v-toolbar
              dense
              flat
            >
              <v-toolbar-title
                class="text-uppercase font-weight-medium"
                style="font-size:17px;"
              >une journee type</v-toolbar-title>
            </v-toolbar>
          </v-card>
        </v-flex>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      foods: {
        'préférence alimentaire' : 'Méditerranéenne',
        'nombre de regas par jour': 4,
        'régime drastique': 'Oui',
        'Si oui, lequel (possibilité de dire lequel dans autre)': "Hypocalorique",
        "Il y'a combien de temps ": "Il y'a 1 an / 2ans  ",
        "Si aujourd'hui tu traques tes calories, quel est le total journalier": 4,
        "Est-ce que tu as des allergies alimentaires ": 4,
        "Est-ce que tu as des intolérances alimentaires ": 4,
        "Est-ce que tu as des adaptations de ton alimentaion liées à une religion ou culture ou conviction ?": 4,
        "Combien d'eau bois-tu par jour ": 4,
        "Bois-tu d'autres boissons que de l'eau pour rester hydrater ?": 4,
        "Combien de café bois-tu par jour ?": 4,
        "Combien de fois bois-tu de l'alcool par semaine": 4,
        "Prends-tu des suppléments alimentaires (oméga 3, protéine en poudre, probotiques, enzymes digestives, calcium, créatine, BCAA, pre/post workout, multivitamines ?": 4,
        "Peux-tu me décrire une journée type de ton repas de la veille ?": 4,
      }
    }
  }
}
</script>
