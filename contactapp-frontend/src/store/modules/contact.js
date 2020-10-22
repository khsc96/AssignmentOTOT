import axios from "axios";
import 'babel-polyfill';

export default {
    state: {
        contactDetails: {
            _id: "",
            name: "",
            email: "",
            gender: "",
            phone: "",
            create_date: "",
        },
        contactList: [],
        contactListStatus: {
            isLoading: true,
            isApiError: false,
            apiError: "",
        },
        contactDetailsStatus: {
            isLoading: false,
            isApiError: false,
            apiError: "",
        },
        isUploadSuccessful: false,
    },
    mutations: {
        setUploadsuccessful(state, payload) {
            state.isUploadSuccessful = payload;
        },
        setContactListLoading(state, payload) {
            if (payload) {
                state.contactListStatus.isApiError = false
            }
            state.contactListStatus.isLoading = payload
        },
        setContactListApiError(state, payload) {
            state.contactListStatus.isApiError = true;
            state.contactListStatus.apiError = payload;
        },
        setContactDetailsLoading(state, isLoading) {
            state.contactDetailsStatus.isLoading = isLoading;
        },
        setContactDetailsApiError(state, msg) {
            state.ContactDetails.isApiError = true;
            state.ContactDetails.apiError = msg;
        },
        setContactList(state, payload) {
            state.contactList = payload.data
        },
        setContactDetails(state, payload) {
            state.contactDetails = payload; 
        },
        setContactDetailsAttribute(state, {field, value}) {
            state.contactDetails[field] = value
        },
        clearContactDetails(state) {
            state.contactDetails.name = "";
            state.contactDetails.email = "";
            state.contactDetails.gender = "";
            state.contactDetails.phone = "";
            state.contactDetails.create_date = "";
        },
        updateContactList(state, payload) {
            state.contactList = state.contactList.map((contact) => {
                if (contact.id === payload.id) {
                    return payload
                }
                return contact
            })
        },
        addToContactList(state, payload) {
            state.contactList.push(payload)
        },
        deleteFromContactList(state, payload) {
            const index = state.contactList.findIndex((contact) => {
                contact.id === payload
            })
            state.contactList.splice(index, 1)
        }
    },
    actions: {
        async getContactList({commit}) {
            commit("setContactListLoading", true);
            axios
                .get("/api/contacts")
                .then((response) => {
                    commit("setContactList", response.data);
                })
                .catch((e) => {
                    commit("setContactListApiError", e.toString());
                })
                .finally(() => {
                    commit("setContactListLoading", false);
                });
        },
        async addContact({commit, state}) {
            commit("setContactListLoading", true);
            await axios
                .post("/api/contacts", state.contactDetails)
                .then((response) => {
                    commit("addToContactList", JSON.parse(JSON.stringify(response.data.data)));
                    commit("setContactDetails", JSON.parse(JSON.stringify(response.data.data)));
                    commit("setUploadsuccessful", true)
                })
                .catch((e) => {
                    commit("setUploadsuccessful", false)
                    commit("setContactDetailsApiError", e.toString())
                })
        },
        async updateContact({commit, state}) {
            commit("setContactListLoading", true)
            console.log(state.contactDetails)
            await axios
                .put("/api/contacts/" + state.contactDetails._id, state.contactDetails)
                .then((response) => {
                    console.log(response.data)
                    commit("updateContactList", response.data.data)
                })
                .catch((e) => {
                    commit("setContactListApiError", e.toString())
                })
                .finally(() => {
                    commit("setContactListLoading", false)
                })
        }
    },
    watch: {

    }
}