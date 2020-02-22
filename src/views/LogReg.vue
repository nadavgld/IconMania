<template>
  <div class>
    <Register
      v-if="isRegister"
      :user="form"
      @register="onRegister"
      @toggleForm="isRegister = !isRegister"
    />
    <Login v-else :user="form" @login="onLogin" @toggleForm="isRegister = !isRegister" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Register from "@/components/Register";
import Login from "@/components/Login";

export default {
  components: { Register, Login },
  data() {
    return {
      form: {},
      isRegister: false
    };
  },
  methods: {
    onRegister(user) {
      console.log(user);

      this.form = user;
      this.isRegister = false;
    },
    onLogin(user) {
      console.log(user);

      this.form = user;
      this.Login(this.form);
    },
    ...mapActions(['Login'])
  },
  computed: {
    lastUser() {
      return this.form.firstName + " " + this.form.lastName;
    }
  }
};
</script>

<style scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>