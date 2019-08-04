<template>
    <f7-page name="catalog">
        <f7-subnavbar>
            <f7-nav-left>
                <f7-link href="/my-cards/" class="tab-link" icon-md="material:keyboard_backspace"></f7-link>
            </f7-nav-left>
            <f7-nav-title>{{createDate}}</f7-nav-title>
        </f7-subnavbar>
        <f7-block>
            <div v-if="card" class="preview" v-bind:style="{ backgroundColor: card.bgColor, color: card.fontColor}">
                <div v-if="card.logo" class="preview__logo">
                    <img class="preview__logo--img" :src="card.logo" alt="User Logo">
                </div>
                <div class="preview__info">
                    <p v-if="card.name" class="preview__info--name">{{card.name}}</p>
                    <p v-if="card.address" class="preview__info--address">{{card.address}}</p>
                    <p v-if="card.email" class="preview__info--email">{{card.email}}</p>
                    <p v-if="card.phone" class="preview__info--phone">{{card.phone}}</p>
                    <p v-if="card.website" class="preview__info--website">{{card.website}}</p>
                </div>
            </div>
        </f7-block>
        <f7-block>
            <div v-if="card" class="qrcode">
                <qrcode-vue :value="qrValue" :size="qrSize" level="L"></qrcode-vue>
            </div>
        </f7-block>
    </f7-page>
</template>
<style scoped>
    .qrcode {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
<script>
    import {HTTP} from '../js/httpBase';
    import QrcodeVue from 'qrcode.vue';
    export default {
        data() {
            return {
                cardID: this.$f7route.params.id,
                card: null,
                createDate: null,
                qrValue: '',
                qrSize: 300
            };
        },
        components: {
            QrcodeVue
        },
        created() {
            HTTP.get(`api/card/${this.cardID}`)
                .then(response => {
                    this.card = response.data.data;
                    this.createDate = response.data.data.create_date.substring(0,10);
                    this.qrValue = `BEGIN:VCARD
VERSION:4.0N:${this.card.name};
N:${this.card.name}
ORG:${this.card.name}
PHOTO;MEDIATYPE=image/png jpg:${this.card.logo}
TEL;TYPE=work,voice;VALUE=uri:${this.card.phone}
ADR;TYPE=WORK;PREF=1;LABEL="${this.card.address}":${this.card.address}
EMAIL:${this.card.email}
URL:${this.card.website}
REV:20080424T195243Z
x-qq:21588891
END:VCARD`;
                })
                .catch(e => {
                    this.$f7.dialog.alert(`Database is not responding. Try again later`);
                });
        },
    };
</script>
