<template>
   <div id="Contact">
    <section class="contact-section">
      <div class="header contact-header">
        <h1>{{ $t("Contact.title") }}</h1>
        <v-btn @click="CreateContact" class="btn btn-create" v-if="false">
          <v-icon>fal fa-plus-circle</v-icon>{{ $t("Contact.button") }}</v-btn
        >
      </div>
      <div class="contact-content">
        <v-data-table
          :headers="$t('Contact.table.headers')"
          :items="contact['data']"
          :search="searchItem"
          :loading="loading"
          :loading-text="$t('Contact.loadingtext')"
          v-if="contact['data'] != ''"
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
              <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.title }}</td>
              <td>{{ item.description }}</td>
             
              <td>
               <v-menu offset-y>
                 <template v-slot:activator="{on,attrs}">
                   <v-btn icon v-on="on" v-bind="attrs">
                  <v-icon small>fas fa-ellipsis-v</v-icon>
                </v-btn>
                 </template>
                 <v-list>
                   <v-list-item link @click="$router.push({name:'contact.edit',params: { 'contact_id':item.id,'name':item.name,'email':item.email,'title':item.title,'description':item.description }}).catch(()=>{})">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('Contact.table.options.iconEdit')}}</v-icon>
                       <v-list-item-title>
                         {{$t('Contact.table.options.edit')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                    <v-list-item link>
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('Contact.table.options.delicon')}}</v-icon>
                       <v-list-item-title>
                         {{$t('Contact.table.options.delete')}}
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
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
    name: 'Contact',

    data() {
        return {
             loading: false,
      myContact: [
        {
          ContactName: "M1",
        Email: "tplus@gmail.com",
         Tile: "None",
          description: "1024MB",
      
        },
     
        
      ],
      searchItem: "",
        };
    },

    mounted() {
        this.getContact()
    },

    methods: {
        CreateContact() {
      this.$router
        .push({
          name: "contact.create",
        })
        .catch(() => {});
    },

    ...mapActions({
      getContact:'Contact/getContact'
    })
    },

    computed:{
      ...mapGetters({
        contact:'Contact/contact'
      })
    }
};
</script>

<style lang="scss" scoped>
.contact-section {
  width: 100%;
  background-color: $white-color;

  .contact-content {
    width: 100%;
    padding: 1rem;

  }
}
</style>