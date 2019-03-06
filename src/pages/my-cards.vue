<template>
    <f7-page name="cards">
        <f7-list>
            <f7-list-item
                    v-for="card in cards"
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
            };
        },
        created() {
            HTTP.get('api/cards', {
                userID: localStorage.getItem('userID')
            })
                .then(response => {
                    this.cards = response.data;
                })
                .catch(e => {
                    this.$f7.dialog.alert(`Database is not responding. Try again later`);
                });
        },
        updated() {
            HTTP.get('api/cards', {
                userID: localStorage.getItem('userID')
            })
                .then(response => {
                    this.cards = response.data;
                })
                .catch(e => {
                    this.$f7.dialog.alert(`Database is not responding. Try again later`);
                });
        }
    };
</script>
