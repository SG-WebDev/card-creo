<template>
    <f7-page name="home">
        <!-- Top Navbar -->
        <f7-navbar :sliding="false" large>
            <f7-nav-left>
                <f7-link icon-md="material:menu" panel-open="left"></f7-link>
            </f7-nav-left>
            <f7-nav-title sliding>Create</f7-nav-title>
            <f7-nav-title-large>CardCreo</f7-nav-title-large>
        </f7-navbar>
        <f7-block>
            <f7-button large outline @click="colorPickerBg = true">Select background color</f7-button>
            <f7-button large outline @click="colorPickerFont = true">Select font color</f7-button>
            <f7-button large outline @click="uploadLogo">Upload logo</f7-button>
        </f7-block>
        <div class="list no-hairlines-md">
            <ul>
                <li class="item-content item-input">
                    <div class="item-inner">
                        <div class="item-title item-floating-label">Name</div>
                        <div class="item-input-wrap">
                            <input v-model="name" type="text" placeholder="Name of you/your company">
                            <span class="input-clear-button"></span>
                        </div>
                    </div>
                </li>
                <li class="item-content item-input">
                    <div class="item-inner">
                        <div class="item-title item-floating-label">Address</div>
                        <div class="item-input-wrap">
                            <input v-model="address" type="text" placeholder="Address of you/your company">
                            <span class="input-clear-button"></span>
                        </div>
                    </div>
                </li>
                <li class="item-content item-input">
                    <div class="item-inner">
                        <div class="item-title item-floating-label">E-mail</div>
                        <div class="item-input-wrap">
                            <input v-model="email" type="text" placeholder="E-mail">
                            <span class="input-clear-button"></span>
                        </div>
                    </div>
                </li>
                <li class="item-content item-input">
                    <div class="item-inner">
                        <div class="item-title item-floating-label">Phone</div>
                        <div class="item-input-wrap">
                            <input v-model="phone" type="text" placeholder="Phone number">
                            <span class="input-clear-button"></span>
                        </div>
                    </div>
                </li>
                <li class="item-content item-input">
                    <div class="item-inner">
                        <div class="item-title item-floating-label">Website</div>
                        <div class="item-input-wrap">
                            <input v-model="website" type="text" placeholder="Link to your website">
                            <span class="input-clear-button"></span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <f7-block>
            <div class="preview" v-bind:style="{ backgroundColor: bgColor, color: fontColor}">
                <div v-if="logo" class="preview__logo">
                    <img class="preview__logo--img" :src="logo" alt="User Logo">
                </div>
                <div class="preview__info">
                    <p class="preview__info--name">{{name}}</p>
                    <p class="preview__info--address">{{address}}</p>
                    <p class="preview__info--email">{{email}}</p>
                    <p class="preview__info--phone">{{phone}}</p>
                    <p class="preview__info--website">{{website}}</p>
                </div>
            </div>
        </f7-block>
        <f7-block>
            <f7-button large fill @click="saveCard">Save card</f7-button>
        </f7-block>
        <f7-actions :grid="true" :opened="colorPickerBg" @actions:closed="colorPickerBg = false">
            <f7-actions-group>
                <f7-actions-button v-bind:style="{ backgroundColor: gray }"
                                   @click="changeBg(gray)"></f7-actions-button>
                <f7-actions-button v-bind:style="{ backgroundColor: white }"
                                   @click="changeBg(white)"></f7-actions-button>
                <f7-actions-button v-bind:style="{ backgroundColor: black }"
                                   @click="changeBg(black)"></f7-actions-button>
                <f7-actions-button v-bind:style="{ backgroundColor: grey }"
                                   @click="changeBg(grey)"></f7-actions-button>
            </f7-actions-group>
            <f7-actions-group>
                <f7-actions-button v-bind:style="{ backgroundColor: blue }"
                                   @click="changeBg(blue)"></f7-actions-button>
                <f7-actions-button v-bind:style="{ backgroundColor: green }"
                                   @click="changeBg(green)"></f7-actions-button>
                <f7-actions-button v-bind:style="{ backgroundColor: red }"
                                   @click="changeBg(red)"></f7-actions-button>
                <f7-actions-button v-bind:style="{ backgroundColor: orange }"
                                   @click="changeBg(orange)"></f7-actions-button>
            </f7-actions-group>
        </f7-actions>
        <f7-actions :grid="true" :opened="colorPickerFont" @actions:closed="colorPickerFont = false">
            <f7-actions-group>
                <f7-actions-button v-bind:style="{ backgroundColor: white }"
                                   @click="changeFont(white)"></f7-actions-button>
                <f7-actions-button v-bind:style="{ backgroundColor: black }"
                                   @click="changeFont(black)"></f7-actions-button>
            </f7-actions-group>
        </f7-actions>
    </f7-page>
</template>
<style scoped>
    .actions-group {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .actions-button {
        width: 50px;
        height: 50px;
        padding: 25px;
        margin: 10px;
        border-radius: 50% !important;
        border: 1px solid #aaaaaa;
    }
</style>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                colorPickerBg: false,
                colorPickerFont: false,
                bgColor: '',
                fontColor: '',
                logo: null,
                name: '',
                address: '',
                email: '',
                phone: '',
                website: '',
                gray: '#444444',
                grey: '#888888',
                white: '#ffffff',
                black: '#000000',
                red: '#d64541',
                blue: '#2574a9',
                green: '#16a085',
                orange: '#f27935',
            };
        },
        methods: {
            changeBg: function(e) {
                this.bgColor = e;
            },
            changeFont: function(e) {
                this.fontColor = e;
            },
            saveCard: function() {
                //save to DB and create QR Code
                axios.post(`http://cardcreo.tk/api/cards`, {
                    bgColor: this.bgColor,
                    fontColor: this.fontColor,
                    name: this.name,
                    logo: this.logo,
                    address: this.address,
                    email: this.email,
                    phone: this.phone,
                    website: this.website
                })
                    .then(response => {
                        this.$f7.dialog.alert(`Card has been created!`);
                        this.$f7.tab.show('#view-my-cards');
                    })
                    .catch(e => {
                        this.$f7.dialog.alert(`Database is not responding. Try again later.`);
                    })

            },
            uploadLogo: function () {
                navigator.camera.getPicture(this.imgOnSuccess, this.imgOnFail, {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
                });
            },
            imgOnSuccess: function(imageData) {
                this.logo = "data:image/jpeg;base64," + imageData;
            },
            imgOnFail: function(message) {
                alert('Błąd podczas pobierania zdjęcia');
            },
        },
    };
</script>