<template>
  <div class="page-height">
    <div v-if="User.email" class="page-height">
      <MainPage />
    </div>
    <div v-else>
      <LogReg />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import LogReg from "./LogReg";
import MainPage from "@/components/MainPage";

export default {
  name: "Home",
  computed: {
    ...mapGetters(["User"])
  },
  components: { LogReg, MainPage }
};
</script>
