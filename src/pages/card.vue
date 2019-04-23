<template>
    <f7-page name="catalog">
        <f7-subnavbar>
            <f7-nav-left>
                <f7-link href="/my-cards/" class="tab-link" icon-md="material:keyboard_backspace"></f7-link>
            </f7-nav-left>
            <f7-nav-title>{{createDate}}</f7-nav-title>
        </f7-subnavbar>
        <f7-block>
            <div class="preview" v-bind:style="{ backgroundColor: card.bgColor, color: card.fontColor}">
                <div v-if="card.logo" class="preview__logo">
                    <img class="preview__logo--img" :src="card.logo" alt="User Logo">
                </div>
                <div class="preview__info">
                    <p class="preview__info--name">{{card.name}}</p>
                    <p class="preview__info--address">{{card.address}}</p>
                    <p class="preview__info--email">{{card.email}}</p>
                    <p class="preview__info--phone">{{card.phone}}</p>
                    <p class="preview__info--website">{{card.website}}</p>
                </div>
            </div>
        </f7-block>
    </f7-page>
</template>
<script>
    import {HTTP} from '../js/httpBase';
    export default {
        data() {
            return {
                cardID: this.$f7route.params.id,
                card: null,
                createDate: null,
            };
        },
        created() {
            HTTP.get(`api/card/${this.cardID}`)
                .then(response => {
                    this.card = response.data.data;
                    this.createDate = response.data.data.create_date.substring(0,10);
                })
                .catch(e => {
                    this.$f7.dialog.alert(`Database is not responding. Try again later`);
                });
        },
    };
</script>
