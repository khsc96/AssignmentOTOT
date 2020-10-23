<template>
    <div>
        <b-card class="card-hover" v-b-hover="hoverColor" v-bind:style="color" :title="displayContactDetails.name" @click="showUpdateForm">
            <b-list-group flush>
                <b-list-group-item v-bind:style="color">Phone: {{ displayContactDetails.phone }}</b-list-group-item>
                <b-list-group-item v-bind:style="color">Email: {{ displayContactDetails.email }}</b-list-group-item>
                <b-list-group-item v-bind:style="color">Gender: {{ displayContactDetails.gender }}</b-list-group-item>
            </b-list-group>
        </b-card>
        <b-button class="close" @click="showDeleteModal">
          <span>x</span>
        </b-button>
        <b-modal ref="delete-modal" hide-footer title="Are you sure you want to delete?">
          <div class="d-block text-center">
            <h3>Deleting {{this.displayContactDetails.name}}</h3>
          </div>
          <b-button class="mt-3" variant="outline-danger" block @click="deleteContact">YES!</b-button>
          <b-button class="mt-2" variant="outline-warning" block @click="hideDeleteModal">NAH!</b-button>
        </b-modal>
    <b-modal ref='update-form' hide-footer title="Update Contact">
      <ValidationObserver v-slot="{ invalid }">
        <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" v-if="showUpdate">
          <b-form-group id="name-input-group" label="Name:" label-for="name-input">
            <ValidationProvider name="Name" rules="required|alpha|min:3|max:100" v-slot="{ errors }">
              <b-form-input
                id="name-input"
                v-model="contactDetails.name"
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
                v-model="contactDetails.phone"
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
                v-model="contactDetails.email"
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
                v-model="contactDetails.gender"
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
export default {
    props: {
        contactDetails: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            color: {
                background: "white"
            },
            showUpdate: true, 
            gender: [
                { value: null, text: 'Please select an option' },
                'Male',
                'Female',
            ],
            intialContactDetails: null,
            displayContactDetails: null,
        }
    },
    beforeMount() {
      this.intialContactDetails = JSON.parse(JSON.stringify(this.contactDetails))
      this.displayContactDetails = JSON.parse(JSON.stringify(this.contactDetails))
    },
    watch: {
      contactDetails(updated) {
        this.displayContactDetails = updated;
      }
    },
    methods: {
        showUpdateForm() {
            this.$refs['update-form'].show()
        },
        hoverColor(isHovered) {
            if (isHovered) {
                this.color.background = "lightgrey"
            } else {
                this.color.background = "white"
            }
        },
        onSubmitUpdate(evt) {
            evt.preventDefault()
            // TODO Update request
            this.$store.dispatch('updateContact', this.contactDetails)
              .then(() => {
                if (this.$store.state.contact.contactListStatus.isApiError) {
                  alert(this.$store.state.contact.contactListStatus.apiError)
                } else {
                  alert('Contact Successfully updated!')
                  this.$refs['update-form'].hide()
                }
              })
        },
        resetDisplayContactDetails(initialState) {
          this.displayContactDetails = initialState
        },
        onResetUpdate(evt) {
            evt.preventDefault()
            // TODO reset values
            // Reset our form values
            // Trick to reset/clear native browser form validation state
            this.resetDisplayContactDetails(this.intialContactDetails)
            this.showUpdate = false
            this.$nextTick(() => {
                this.showUpdate = true
            })
        },
        deleteContact() {
          console.log(this.contactDetails)
          this.$store.dispatch('deleteContact', this.contactDetails)
            .then(() => {
              if(this.$store.state.contact.isDeleteSuccessful) {
                alert("Contact successfully deleted!")
                this.$refs['delete-modal'].hide()
              } else {
                alert(this.$store.contact.deleteErrorMsg)
              }
            })
        },
        showDeleteModal(){
          this.$refs['delete-modal'].show()
        },
        hideDeleteModal() {
          this.$refs['delete-modal'].hide()
        }
    }
}
</script>

<style scoped>
  .close{
    padding: 10px;
  }
  .error-msg {
    color: red;
  }
</style>