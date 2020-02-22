<template>
  <form novalidate class="md-layout md-alignment-center-center" @submit.prevent="validateUser">
    <md-card class="md-layout-item md-size-50 md-small-size-100">
      <md-card-header>
        <div class="md-title">Register</div>
      </md-card-header>

      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="first-name">First Name</label>
              <md-input
                name="first-name"
                id="first-name"
                autocomplete="given-name"
                v-model="form.firstName"
                :disabled="sending"
              />
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="last-name">Last Name</label>
              <md-input
                name="last-name"
                id="last-name"
                autocomplete="family-name"
                v-model="form.lastName"
                :disabled="sending"
              />
            </md-field>
          </div>
        </div>

        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="gender">Gender</label>
              <md-select
                name="gender"
                id="gender"
                v-model="form.gender"
                md-dense
                :disabled="sending"
              >
                <md-option value="M">M</md-option>
                <md-option value="F">F</md-option>
              </md-select>
              <span class="md-error">The gender is required</span>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="password">Password</label>
              <md-input
                type="password"
                id="password"
                name="password"
                autocomplete="password"
                v-model="form.password"
                :disabled="sending"
              />
            </md-field>
          </div>
        </div>

        <md-field>
          <label for="email">Email</label>
          <md-input
            type="email"
            name="email"
            id="email"
            autocomplete="email"
            v-model="form.email"
            :disabled="sending"
          />
        </md-field>
      </md-card-content>

      <md-progress-bar md-mode="indeterminate" v-if="sending" />

      <md-card-actions>
        <md-button type="submit" class="md-primary" :disabled="sending">Create user</md-button>
        <md-button type="button" class @click="() => $emit('toggleForm')">Login</md-button>
      </md-card-actions>
    </md-card>

    <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
    <md-snackbar :md-active.sync="err.err">{{err.msg}}</md-snackbar>
  </form>
</template>

<script>
import formValidationMixin from "@/mixins/formValidationMixin";
export default {
  props: ["user"],
  mixins: [formValidationMixin],
  data() {
    return {
      userSaved: false,
      sending: false,
      err: { msg: "Form is not complete", err: false }
    };
  },
  methods: {
    validateUser() {
      if (!this.validateRegistrationForm(this.form)) {
        this.err = { msg: "Form is not complete", err: true };

        setTimeout(() => {
          this.err.err = false;
        }, 3000);

        return;
      }
      console.log(this.form);
      this.sending = true;

      setTimeout(() => {
        this.userSaved = true;
        this.sending = false;
        this.$emit("register", this.form);
      }, 2000);
    }
  },
  computed: {
    form() {
      return this.user;
    },
    lastUser() {
      return this.form.firstName + " " + this.form.lastName;
    }
  }
};
</script>

<style>
</style>