<template>
  <div class="home">
    <!-- <ContactsCard/> -->
    <b-button id="addContactBtn" @click="showAddForm">Add Contact</b-button>
    <b-modal ref="add-form" hide-footer title="Add Contact">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="name-input-group" label="Name:" label-for="name-input">
          <b-form-input
            id="name-input"
            v-model="newContactDetails.name"
            type="name"
            required
            placeholder="Enter Name of Contact"
          />
        </b-form-group>

        <b-form-group id="phone-input-group" label="Phone:" label-for="phone-input">
          <b-form-input
            id="phone-input"
            v-model="newContactDetails.phone"
            required
            placeholder="Enter Phone Number"
          />
        </b-form-group>

        <b-form-group id="email-input-group" label="Email:" label-for="email-input">
          <b-form-input
            id="email-input"
            v-model="newContactDetails.email"
            required
            placeholder="Enter Email Address"
          />
        </b-form-group>

        <b-form-group id="gender-input-group" label="Email:" label-for="gender-input">
          <b-form-select
            id="gender-input"
            v-model="newContactDetails.gender"
            :options="gender"
            required
          ></b-form-select>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
// import ContactsCard from "../components/ContactsCard";

export default {
  name: "Home",
  components: {
    // ContactsCard,
  },
  data() {
    return {
      newContactDetails: {
        name: "",
        email: "",
        gender: null,
        phone: "",
        created_date: "",
      },
      gender: [
        { value: null, text: 'Please select an option' },
        'Male',
        'Female',
      ],
      show: true,
    }
  },
  computed: {

  },
  methods: {
      showAddForm() {
        this.$refs['add-form'].show()
      },
      onSubmit(evt) {
        evt.preventDefault()
        // TODO Post request
        this.newContactDetails.created_date = this.getCurrentDateTime()
        this.$store.dispatch('addContact').then(() => {          
          alert(JSON.stringify(this.newContactDetails))
        })

      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.newContactDetails.email = ''
        this.newContactDetails.name = ''
        this.newContactDetails.gender = null
        this.newContactDetails.phone = ''
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
