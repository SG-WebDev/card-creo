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
    export default {
        data() {
            return {
            };
        },
        methods: {
            scanQR: function() {
                cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        if(!result.cancelled) {
                            this.$f7.dialog.alert(`You are cancelled scanning!`);
                        }
                        else {
                            let cardData = new vCard().parse(result.text)
                            alert(cardData.data);
                            this.$f7.dialog.alert(`New card has been created!`);
                        }
                    },
                    function (error) {
                        this.$f7.dialog.alert(`Something went wrong!`);
                    },
                    {
                        resultDisplayDuration: 500
                    }
                );
            },
        },
    };
</script>