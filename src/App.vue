<template>
  <div>
    <md-app style="height: 100vh;" md-mode="reveal">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Icon Mania</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

        <md-list>
          <md-list-item @click="moveTo('/')">
            <md-icon>home</md-icon>
            <span class="md-list-item-text">Home</span>
          </md-list-item>
          <div v-if="User.email">
            <md-list-item @click="moveTo('/profile')">
              <md-icon>face</md-icon>
              <span class="md-list-item-text">Profile</span>
            </md-list-item>
            <md-list-item @click="this._Logout">
              <md-icon>logout</md-icon>
              <span class="md-list-item-text">Logout</span>
            </md-list-item>
          </div>
          <md-list-item v-else @click="moveTo('/')">
            <md-icon>fingerprint</md-icon>
            <span class="md-list-item-text">Login/Register</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      menuVisible: false
    };
  },
  methods: {
    moveTo(route) {
      this.menuVisible = false;
      this.$router.push(route).catch(() => {});
    },
    _Logout() {
      this.Logout();
      this.moveTo("/");
    },
    ...mapActions(["Login", "Logout"])
  },
  computed: {
    ...mapGetters(["User"])
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.page-height{
  height: 100%;
  width: 100%;
  position: relative;
}

.float-button{
  position: absolute !important;
}

.float-bottom-right {
  bottom: 2%;
  right: 2%;
}
</style>
