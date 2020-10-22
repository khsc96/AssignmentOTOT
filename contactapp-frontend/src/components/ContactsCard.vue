<template>
    <div @click="showUpdateForm">
        <b-card class="card-hover" v-b-hover="hoverColor" v-bind:style="color" :title="contactDetails.name" >
            <b-list-group flush>
                <b-list-group-item v-bind:style="color">Phone: {{ contactDetails.phone }}</b-list-group-item>
                <b-list-group-item v-bind:style="color">Email: {{ contactDetails.email }}</b-list-group-item>
                <b-list-group-item v-bind:style="color">Gender: {{ contactDetails.gender }}</b-list-group-item>
            </b-list-group>
        </b-card>
    <b-modal ref='update-form' hide-footer title="Update Contact">
      <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" v-if="showUpdate">
        <b-form-group id="name-input-group" label="Name:" label-for="name-input">
          <b-form-input
            id="name-input"
            v-model="contactDetails.name"
            type="name"
            required
            placeholder="Enter Name of Contact"
          />
        </b-form-group>

        <b-form-group id="phone-input-group" label="Phone:" label-for="phone-input">
          <b-form-input
            id="phone-input"
            v-model="contactDetails.phone"
            required
            placeholder="Enter Phone Number"
          />
        </b-form-group>

        <b-form-group id="email-input-group" label="Email:" label-for="email-input">
          <b-form-input
            id="email-input"
            v-model="contactDetails.email"
            required
            placeholder="Enter Email Address"
          />
        </b-form-group>

        <b-form-group id="gender-input-group" label="Gender:" label-for="gender-input">
          <b-form-select
            id="gender-input"
            v-model="contactDetails.gender"
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

        },
        onResetUpdate(evt) {
            evt.preventDefault()
            // TODO reset values
            // Reset our form values
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        },
    }
}
</script>

<style scoped>

</style>