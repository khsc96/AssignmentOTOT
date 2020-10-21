import axios from "axios";
import 'babel-polyfill';

export default {
    state: {
        contactDetails: {
            id: "",
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
            state.contactList = payload
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
                .get("https://ly2xlzpho6.execute-api.ap-southeast-1.amazonaws.com/dev/api/contacts")
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
                .post("http://localhost:8080/api/contacts", state.contactDetails)
                .then((response) => {
                    commit("addToContactListdd", this.deepCopy(response));
                    commit("setContactDetails", this.deepCopy(response));
                    commit("setUploadsuccessful", true)
                })
        }
    },
    methods: {
        deepCopy(obj) {
           return JSON.parse(JSON.stringify(obj));
        }
    }

}