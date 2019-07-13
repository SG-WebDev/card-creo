<template>
    <f7-page name="cards">
        <f7-list>
            <f7-list-item
                    v-for="card in cards"
                    :key="card._id"
                    :title="card.name"
                    swipeout
                    @swipeout:deleted="deleteCard(card._id)"
                    :link="`/my-cards/${card._id}/`"
            >
                <f7-swipeout-actions right>
                    <f7-swipeout-button delete confirm-text="Are you sure you want to delete this card?">Delete</f7-swipeout-button>
                </f7-swipeout-actions>
            </f7-list-item>
        </f7-list>
    </f7-page>
</template>
<style lang="scss">
.swipeout {
    .item-content {
        padding-left: 0;
        .item-inner {
            padding: 20px;
            &::before {
                color: #ec644b;
            }
        }
    }
}
</style>
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
        methods : {
          deleteCard: function (e) {
              HTTP.delete(`api/card/${e}`)
                  .then(response => {
                      this.$f7.dialog.alert('Card has been removed!');
                  })
                  .catch(e => {
                      this.$f7.dialog.alert(`Database is not responding. Try again later`);
                  });
          }
        },
    };
</script>
