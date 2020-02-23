<template>
  <div class="page-height">
    <md-autocomplete v-model="iconSearch" @md-changed="changeIconQuery" :md-options="icons" :md-open-on-focus="false" md-layout="box" md-dense>
      <label>Icon search</label>
    </md-autocomplete>

  <div v-for="icon of icons" :key="icon.id">
    {{icon}}
  </div>
    <md-button class="md-fab md-primary float-button float-bottom-right" @click="$router.push('/add')">
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "MainPage",
  data() {
    return {
      iconSearch: null,
      icons: [
      ]
    };
  },
  computed: {
    ...mapGetters(['getIconBySearch'])
  },
  methods: {
    changeIconQuery(q){
      const results = this.getIconBySearch(q);

      console.log(results);
      this.icons = results;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
