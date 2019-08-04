<template>
    <f7-page name="scan">
        <f7-block-title>Scan QR Code</f7-block-title>
        <f7-block>
            <f7-button large fill @click="scanQR">Scan now!</f7-button>
        </f7-block>
    </f7-page>
</template>>
<script>
    import vCard from 'vcf';
    import {HTTP} from '../js/httpBase';
    export default {
        data() {
            return {
                userID: localStorage.getItem('userID'),
            };
        },
        methods: {
            scanQR: function() {
                const vueInstance = this;
                cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        let cardData = new vCard().parse(result.text).data;
                        vueInstance.saveCardQR(cardData);
                    },
                    function (error) {
                        vueInstance.$f7.dialog.alert("Scanning failed: " + error);
                    },
                    {
                        resultDisplayDuration: 500,
                    }
                );
            },
            saveCardQR: function (qr) {
                HTTP.post(`api/card`, {
                    bgColor: '#ffffff',
                    fontColor: '#000000',
                    logo: null,
                    name: qr.n._data,
                    address: qr.adr._data,
                    email: qr.email._data,
                    phone: qr.tel._data,
                    website: qr.url._data,
                    userID : this.userID
                })
                    .then(response => {
                        this.$f7.dialog.alert(`Card has been created!`);
                    })
                    .catch(e => {
                        this.$f7.dialog.alert(`Database is not responding. Try again later.`);
                    });
            },
        },
    };
</script>