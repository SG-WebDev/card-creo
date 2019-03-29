<template>
    <f7-page name="cards">
        <f7-list>
            <f7-list-item
                    v-for="card in cards"
                    :key="card._id"
                    :title="card.name"
                    :link="`/my-cards/${card._id}/`"
            >
            </f7-list-item>
        </f7-list>
    </f7-page>
</template>
<script>
    import {HTTP} from '../js/httpBase';
    export default {
        data() {
            return {
                cards: [],
                userID: null,
            };
        },
        mounted() {
            this.userID = localStorage.getItem('userID');
            if(this.userID) {
                HTTP.get(`api/cards/${this.userID}`)
                    .then(response => {
                        this.cards = response.data.data;
                    })
                    .catch(e => {
                        this.$f7.dialog.alert(`Database is not responding. Try again later`);
                    });
            }
            else {
                this.$f7.dialog.alert(`Something went wrong!`);
            }
        },
    };
</script>
