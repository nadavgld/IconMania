<script>
export default {
  data() {
    return {
      emailReg: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gim
    };
  },
  methods: {
    validateRegistrationForm(form) {
      if (!form.lastName || form.lastName.trim().length < 2) return false;
      if (!form.firstName || form.firstName.trim().length < 2) return false;
      if (!form.gender || form.gender.trim().length == 0) return false;
      if (!form.password || form.password.trim().length < 6) return false;
      if (!form.email || form.email.match(this.emailReg) == null) return false;

      return true;
    },
    validateLoginForm(form) {
      if (!form.password || form.password.trim().length < 6) return false;
      if (!form.email || form.email.match(this.emailReg) == null) return false;

      return true;
    }
  }
};
</script>