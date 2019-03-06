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
        <f7-button large fill @click="getList">Save card</f7-button>
    </f7-page>
</template>
<script>
    import {HTTP} from '../js/httpBase';
    export default {
        data() {
            return {
                cards: [],
                userID: localStorage.getItem('userID'),
            };
        },
        mounted() {
            HTTP.get('api/cards', {
                userID: this.userID
            })
                .then(response => {
                    alert(response.data.data);
                    this.cards = response.data.data;
                })
                .catch(e => {
                    this.$f7.dialog.alert(`Database is not responding. Try again later`);
                });
        },
        methods: {
            getList: function () {
                HTTP.get('api/cards', {
                    userID: this.userID
                })
                    .then(response => {
                        alert(response.data.data);
                        this.cards = response.data.data;
                    })
                    .catch(e => {
                        this.$f7.dialog.alert(`Database is not responding. Try again later`);
                    });
            }
        }
    };
</script>
