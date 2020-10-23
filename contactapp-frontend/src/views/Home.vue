<template>
  <div class="home">
    <b-button id="addContactBtn" @click="showAddForm">Add Contact</b-button>
    <b-container>
      <b-row>
        <b-col class="card-container" cols="4" v-for="contact in displayContactList" :key="contact._id">
          <ContactsCard :contactDetails="contact"/>
        </b-col>
      </b-row>
    </b-container>
    <b-modal ref="add-form" hide-footer title="Add Contact">
      <ValidationObserver v-slot="{ invalid }">

        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group id="name-input-group" label="Name:" label-for="name-input">
            <ValidationProvider name="Name" rules="required|alpha|min:3|max:100" v-slot="{ errors }">
              <b-form-input
                id="name-input"
                v-model="contactDetailsName"
                type="name"
                required
                placeholder="Enter Name of Contact"
              />
              <span class="error-msg">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-form-group>

          <b-form-group id="phone-input-group" label="Phone:" label-for="phone-input">
            <ValidationProvider name="Phone number" rules="required|numeric|min:7|max:15" v-slot="{ errors }">
              <b-form-input
                id="phone-input"
                v-model="contactDetailsPhone"
                required
                placeholder="Enter Phone Number"
              />
              <span class="error-msg">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-form-group>

          <b-form-group id="email-input-group" label="Email:" label-for="email-input">
          <ValidationProvider name="Email" rules="required|email" v-slot="{ errors }">
            <b-form-input
              id="email-input"
              v-model="contactDetailsEmail"
              required
              placeholder="Enter Email Address"
            />
            <span class="error-msg">{{ errors[0] }}</span>
          </ValidationProvider>
          </b-form-group>

          <b-form-group id="gender-input-group" label="Gender:" label-for="gender-input">
            <ValidationProvider Name="Gender" rules="required" v-slot="{ errors }">
              <b-form-select
                id="gender-input"
                v-model="contactDetailsGender"
                :options="gender"
                required
              ></b-form-select>
              <span class="error-msg">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-form-group>
          <b-button type="submit" variant="primary" :disabled="invalid">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import ContactsCard from "../components/ContactsCard";

export default {
  name: "Home",
  components: {
    ContactsCard,
  },
  data() {
    return {
      // TODO change all this to store.modules state
      displayContactList: null,
      gender: [
        { value: null, text: 'Please select an option' },
        'Male',
        'Female',
      ],
      show: true,
    }
  },
  beforeMount() {
    this.$store.dispatch('getContactList')
    this.displayContactList = this.$store.state.contact.contactList
  },
  computed: {
    contactDetailsName: {
      get() {
        return this.$store.state.contact.contactDetails.name
      },
      set(value) {
        this.$store.commit('setContactDetailsAttribute', {
          field: 'name',
          value
        })
      }
    },
    contactDetailsEmail: {
      get() {
        return this.$store.state.contact.contactDetails.email
      },
      set(value) {
        this.$store.commit('setContactDetailsAttribute', {
          field: 'email',
          value
        })
      }
    },
    contactDetailsPhone: {
      get() {
        return this.$store.state.contact.contactDetails.phone
      },
      set(value) {
        this.$store.commit('setContactDetailsAttribute', {
          field: 'phone',
          value
        })
      }
    },
    contactDetailsGender: {
      get() {
        return this.$store.state.contact.contactDetails.gender
      },
      set(value) {
        this.$store.commit('setContactDetailsAttribute', {
          field: 'gender',
          value
        })
      }
    },
    contactList: {
      get() {
        return this.$store.state.contact.contactList
      },
      set(value) {
        this.$store.commit('setContactList', value)
      }
    }
  },
  watch: {
    contactList (updated) {
      this.displayContactList = updated;
    }
  },
  methods: {
    showAddForm() {
      this.$refs['add-form'].show()
    },
    onSubmit(evt) {
      evt.preventDefault()
      // TODO Post request
      this.$store.commit('setContactDetailsAttribute', {
        field: 'create_date',
        value: this.getCurrentDateTime()
      }) 
      this.$store.dispatch('addContact').then(() => {          
        alert("Contacts added!")
        this.$refs['add-form'].hide()
      }).catch((e) => {
        alert("Error: " + e.toString() + "\nContacts unable to be added, check connection!")
      }).finally(() => {
        this.$store.commit('clearContactDetails')
      })

    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.$store.commit('clearContactDetails')
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    getCurrentDateTime() {
      let currentDate = new Date();
      return currentDate.getDate() + "/"
          + (currentDate.getMonth() + 1) + "/"
          + currentDate.getFullYear() + " @ "  
          + currentDate.getHours() + ":"  
          + currentDate.getMinutes() + ":" 
          + currentDate.getSeconds() 
    } 
  }
};
</script>

<style scoped>
  .error-msg {
    color: red;
  }
</style>
