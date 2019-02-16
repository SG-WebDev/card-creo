<template>
<f7-app :params="f7params">
  <!-- Status bar overlay for fullscreen mode-->
  <f7-statusbar></f7-statusbar>
  <!-- Views/Tabs container -->
  <f7-views tabs class="safe-areas">
    <!-- Tabbar for switching views-tabs -->
    <f7-toolbar tabbar labels bottom>
      <f7-link tab-link="#view-create" icon-md="material:create" text="Create"></f7-link>
      <f7-link tab-link="#view-my-cards" icon-md="material:collections" text="My Cards"></f7-link>
      <f7-link tab-link="#view-about" icon-md="material:info" text="About"></f7-link>
    </f7-toolbar>

    <!-- Your main view/tab, should have "view-main" class. It also has "tab-active" class -->
    <f7-view id="view-create" main tab tab-active url="/"></f7-view>

    <!-- Catalog View -->
    <f7-view id="view-my-cards" name="my-cards" tab url="/my-cards/"></f7-view>

    <!-- Settings View -->
    <f7-view id="view-about" name="about" tab url="/about/"></f7-view>

  </f7-views>

</f7-app>
</template>
<script>
  import cordovaApp from '../js/cordova-app.js';
  import routes from '../js/routes.js';

  export default {
    data() {
      return {
        // Framework7 Parameters
        f7params: {
          id: 'io.cardcreo.app', // App bundle ID
          name: 'CardCreo', // App name
          theme: 'md', // Automatic theme detection
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

      }
    },
    methods: {
    },
    mounted() {
      this.$f7ready((f7) => {
        // Init cordova APIs (see cordova-app.js)
        if (f7.device.cordova) {
          cordovaApp.init(f7);
        }
        // Call F7 APIs here
      });
    }
  }
</script>