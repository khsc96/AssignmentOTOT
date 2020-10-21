<template>
    <div>
        <b-card :title="contactDetails.name" >
            <b-list-group flush>
                <b-list-group-item>{{ contactDetails.email }}</b-list-group-item>
                <b-list-group-item>{{ contactDetails.gender }}</b-list-group-item>
            </b-list-group>
        </b-card>
    </div>
</template>

<script>
export default {
    props: {
        contactDetails: {
            type: Object,
            required: true,
        }

    }
}
</script>

<style scoped>

</style>