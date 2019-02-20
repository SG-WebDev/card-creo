<template>
    <f7-page name="home">
        <!-- Top Navbar -->
        <f7-navbar :sliding="false" large>
            <f7-nav-title sliding>Create</f7-nav-title>
            <f7-nav-title-large sliding>CardCreo</f7-nav-title-large>
        </f7-navbar>
        <f7-block>
            <f7-button large fill @click="colorPicker = true">Select background color</f7-button>
            <f7-button large outline  @click="uploadLogo = true">Upload logo</f7-button>
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
            <div class="preview" v-bind:style="{ backgroundColor: bgColor}">
                <div class="preview__logo">
                    <img src="" alt="">
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
        <!-- Grid -->
        <f7-actions :grid="true" :opened="colorPicker" @actions:closed="colorPicker = false">
            <f7-actions-group>
                <f7-actions-button v-bind:style="{ backgroundColor: gray }" @click="changeBg(gray)"></f7-actions-button>
                <f7-actions-button v-bind:style="{ backgroundColor: white }" @click="changeBg(white)"></f7-actions-button>
                <f7-actions-button v-bind:style="{ backgroundColor: black }" @click="changeBg(black)"></f7-actions-button>
                <f7-actions-button v-bind:style="{ backgroundColor: red }" @click="changeBg(red)"></f7-actions-button>
            </f7-actions-group>
            <f7-actions-group>
                <f7-actions-button v-bind:style="{ backgroundColor: blue }" @click="changeBg(blue)"></f7-actions-button>
                <f7-actions-button v-bind:style="{ backgroundColor: green }" @click="changeBg(green)"></f7-actions-button>
                <f7-actions-button v-bind:style="{ backgroundColor: yellow }" @click="changeBg(yellow)"></f7-actions-button>
                <f7-actions-button v-bind:style="{ backgroundColor: orange }" @click="changeBg(orange)"></f7-actions-button>
            </f7-actions-group>
        </f7-actions>
    </f7-page>
</template>
<style scoped>
    .preview {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%; /* 340px = 90 mm*/
        height: 200px; /* 189px = 50 mm*/
        border: 1px solid #999999;
    }
    .actions-group {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .actions-button {
        width: 50px;
        height: 50px;
        padding: 25px;
        margin: 10px 20px;
        border-radius: 50%!important;
        border: 1px solid #aaaaaa;
    }
</style>

<script>
    export default {
        data() {
            return {
                colorPicker: false,
                bgColor: '',
                name: '',
                address: '',
                email: '',
                phone: '',
                website: '',
                gray: '#444444',
                white: '#ffffff',
                black: '#000000',
                red: '#d64541',
                blue: '#6bb9f0',
                green: '#3fc380',
                yellow: '#ffff7e',
                orange: '#f89406',
            };
        },
        methods: {
            changeBg : function(e) {
                this.bgColor = e;
            },
            uploadLogo : function () {
                
            }
        },
    };
</script>