<template>
  <div id="Call-Abroad">
    <section class="Call-Abroad">
      <v-skeleton-loader
        class="mx-auto"
        type="table"
        v-if="Loader"
      ></v-skeleton-loader>
      <div class="header contact-header">
        <h1>{{ $t("Call-Abroad.title") }}</h1>
        <v-btn @click="onCreate" class="btn btn-create">
          <v-icon>fal fa-plus-circle</v-icon>{{ $t("Contact.button") }}</v-btn
        >
      </div>
      <div class="contact-content">
        <v-data-table
          :headers="$t('Call-Abroad.table.headers')"
          :items="data"
          :search="searchItem"
          :loading-text="$t('Contact.loadingtext')"
          v-if="data"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                :label="$t('Contact.txtsearch')"
                filled
                rounded
                dense
                append-icon="fas fa-search"
                single-line
                hide-details
                v-model="searchItem"
              ></v-text-field>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <!-- table content -->
          <template v-slot:item="{ item, index }">
            <tr class="table-content">
              <td>{{ index + 1 }}</td>
              <td>{{ item.Country }}</td>
              <td>{{ item.CountryCode }}</td>
              <td>{{ item.Zone }}</td>
              <td>{{ item.Price }}</td>
              <td>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-on="on" v-bind="attrs">
                      <v-icon small>fas fa-ellipsis-v</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item link @click="onEdit">
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{
                          $t("Contact.table.options.iconEdit")
                        }}</v-icon>
                        <v-list-item-title>
                          {{ $t("Contact.table.options.edit") }}
                        </v-list-item-title>
                      </v-list-item-icon>
                    </v-list-item>
                    <v-list-item link @click="onDelete">
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{
                          $t("Contact.table.options.delicon")
                        }}</v-icon>
                        <v-list-item-title>
                          {{ $t("Contact.table.options.delete") }}
                        </v-list-item-title>
                      </v-list-item-icon>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </td>
            </tr>
          </template>
        </v-data-table>
        <div class="Table-empty" v-else>
          <div class="image">
            <v-img src="@/assets/Images/NoData.png"></v-img>
          </div>
          <h3>{{ $t("Contact.table.dontdata") }}</h3>
        </div>
      </div>
    </section>
    <DeleteModal/>
  </div>
</template>
<script>
import DeleteModal from "../../components/forms/call-abroad/Delete.vue"
export default {
  components: { DeleteModal },
  data() {
    return {
        Loader:false,
        data:[
            {No:1,Country:'ThaiLand',CountryCode:'22',Zone:'I',Price:"2000"},
            {No:2,Country:'ThaiLand',CountryCode:'22',Zone:'I',Price:"2000"},
            {No:3,Country:'ThaiLand',CountryCode:'22',Zone:'I',Price:"2000"},
            {No:4,Country:'ThaiLand',CountryCode:'22',Zone:'I',Price:"2000"},
            {No:5,Country:'ThaiLand',CountryCode:'22',Zone:'I',Price:"2000"},

        ]
    };
  },
  methods: {
     onCreate(){
         this.$router.push({name:'call-abroad.create'}).catch({})
     },
     onEdit(){
        this.$router.push({name:'call-abroad.edit',params:{id:1}}).catch({}) 
     },
     onDelete(){
         this.$store.commit('isDeleteCallAbroadModal')
     } 
  },
};
</script>
