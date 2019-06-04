<template>
    <f7-app :params="f7params">

        <f7-panel left reveal>
            <f7-view>
                <f7-page>
                    <f7-block v-if="currentUser">
                        <p>Hi, {{currentUser}}</p>
                        <f7-link class="logout-link" @click="logout">LogOut</f7-link>
                    </f7-block>
                </f7-page>
            </f7-view>
        </f7-panel>

        <f7-panel right reveal>
            <f7-view>
                <f7-page>
                    <f7-block-title>About My App</f7-block-title>
                    <f7-block strong>
                        <p>
                            This is hybrid mobile app based on Framework7 + Vue.js created by
                            <a target="_blank" class="link external git-link" href="https://github.com/SG-WebDev/">SG-WebDev</a> used to
                            create and sharing business cards.
                        </p>
                    </f7-block>
                </f7-page>
            </f7-view>
        </f7-panel>
        <!-- Status bar overlay for fullscreen mode-->
        <f7-statusbar></f7-statusbar>
        <!-- Views/Tabs container -->
        <f7-views tabs class="safe-areas">
            <!-- Navbar -->
            <f7-navbar>
                <f7-nav-left>
                    <f7-link icon-material="person" panel-open="left"></f7-link>
                </f7-nav-left>
                <f7-nav-title class="navbar__title">CardCreo</f7-nav-title>
                <f7-nav-right>
                    <f7-link icon-material="info" panel-open="right"></f7-link>
                </f7-nav-right>
            </f7-navbar>

            <!-- Tabbar for switching views-tabs -->
            <f7-toolbar tabbar labels bottom>
                <f7-link @click="changeTab('/')" class="tab-link" :class="{ 'tab-link-active': activeTab === '/' }" icon-material="create" text="Create"></f7-link>
                <f7-link @click="changeTab('/scan/')" class="tab-link" :class="{ 'tab-link-active': activeTab === '/scan/' }" icon-material="camera_alt" text="Scan"></f7-link>
                <f7-link @click="changeTab('/my-cards/')" class="tab-link" :class="{ 'tab-link-active': activeTab === '/my-cards/' }" icon-material="collections" text="My Cards"></f7-link>
            </f7-toolbar>

            <!-- Your main view/tab, should have "view-main" class. It also has "tab-active" class -->
            <f7-view id="view-create" main tab tab-active url="/"></f7-view>

            <!-- Scan View -->
            <f7-view id="view-scan" name="scan" tab url="/scan/"></f7-view>

            <!-- My Cards View -->
            <f7-view id="view-my-cards" name="my-cards" tab url="/my-cards/"></f7-view>

            <f7-view id="view-card" name="card" tab></f7-view>

        </f7-views>
        <f7-login-screen class="login-screen" :opened="loginScreenOpened" @loginscreen:closed="loginScreenOpened = false">
            <f7-page login-screen>
                <f7-login-screen-title>CardCreo</f7-login-screen-title>
                <f7-list form>
                    <f7-list-input
                            label="Username"
                            type="text"
                            placeholder="Your Email"
                            :value="email"
                            @input="email = $event.target.value"
                    ></f7-list-input>
                    <f7-list-input
                            label="Password"
                            type="password"
                            placeholder="Your Password"
                            :value="password"
                            @input="password = $event.target.value"
                    ></f7-list-input>
                </f7-list>
                <f7-block>
                    <f7-button large outline @click="signIn">Sign In</f7-button>
                    <f7-button large fill @click="signUp">Sign Up</f7-button>
                </f7-block>
            </f7-page>
        </f7-login-screen>
    </f7-app>
</template>
<script>
    import cordovaApp from '../js/cordova-app.js';
    import routes from '../js/routes.js';
    import {HTTP} from '../js/httpBase';

    export default {
        data() {
            return {
                // Framework7 Parameters
                f7params: {
                    id: 'io.cardcreo.app', // App bundle ID
                    name: 'CardCreo', // App name
                    theme: 'md',
                    panels3d: {
                        enabled: true,
                    },
                    // App routes
                    routes: routes,
                    // Input settings
                    input: {
                        scrollIntoViewOnFocus: !!this.$device.cordova,
                        scrollIntoViewCentered: !!this.$device.cordova,
                    },
                    // Cordova Statusbar settings
                    statusbar: {
                        overlay: this.$device.cordova && this.$device.ios || 'auto',
                        iosOverlaysWebView: true,
                        androidOverlaysWebView: false,
                    },
                },
                loginScreenOpened: true,
                email: '',
                password: '',
                currentUser: null,
                activeTab: '/',
            }
        },
        methods: {
            logout: function () {
                HTTP.get('auth/logout')
                    .then(response => {
                            this.currentUser = null;
                            this.loginScreenOpened = true;
                            localStorage.removeItem('userID');
                            this.$f7.dialog.alert(`${response.data.message}`);
                    })
                    .catch(e => {
                        this.loginScreenOpened = false;
                    });
            },
            changeTab: function (tab) {
                this.activeTab = tab;
                this.$f7.views.main.router.navigate(tab);
            },
            signIn : function () {
                if(this.email && this.password) {
                    HTTP.post('auth/login', {
                        email: this.email,
                        password: this.password
                    })
                        .then(response => {
                            if(response.data._id) {
                                this.currentUser = response.data.local.email;
                                localStorage.setItem('userID', response.data._id);
                                this.loginScreenOpened = false;
                                this.$f7.dialog.alert(`You're Log In!`);
                            }
                            else {
                                this.loginScreenOpened = true;
                                this.$f7.dialog.alert(`Can't find this user in database`);
                            }
                        })
                        .catch(e => {
                            this.loginScreenOpened = true;
                            this.$f7.dialog.alert(`Can't find this user in database`);
                        });
                }
                else {
                    this.$f7.dialog.alert(`Email and password field must be fill!`);
                }

            },
            signUp : function () {
                if(this.email && this.password) {
                    HTTP.post('auth/signup', {
                        email: this.email,
                        password: this.password
                    })
                        .then(response => {
                            if (response.data._id) {
                                this.currentUser = response.data.local.email;
                                localStorage.setItem('userID', response.data._id);
                                this.loginScreenOpened = false;
                                this.$f7.dialog.alert(`You're Log In!`);
                            } else {
                                this.loginScreenOpened = true;
                                this.$f7.dialog.alert(`Database is not responding. Try again later`);
                            }
                        })
                        .catch(e => {
                            this.loginScreenOpened = true;
                            this.$f7.dialog.alert(`Can't find this user in database`);
                        });
                }
                else {
                    this.$f7.dialog.alert(`Email and password field must be fill!`);
                }
            },
        },
        mounted() {
            this.$f7ready((f7) => {
                if (f7.device.cordova) {
                    cordovaApp.init(f7);
                }
            });
            HTTP.get('auth/check')
                .then(response => {
                    if(response.data._id) {
                        this.currentUser = response.data.local.email;
                        localStorage.setItem('userID', response.data._id);
                        this.loginScreenOpened = false;
                        this.$f7.dialog.alert(`${response.message}`);
                    }
                    else {
                        this.loginScreenOpened = true;
                        this.$f7.dialog.alert(`You must log in!`);
                    }
                })
                .catch(e => {
                    this.loginScreenOpened = true;
                    this.$f7.dialog.alert(`Can't find this user in database`);
                });
        }
    }
</script>