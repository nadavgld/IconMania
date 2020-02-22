<template>
  <div class="page-height">
    <md-autocomplete v-model="iconSearch" :md-options="icons" :md-open-on-focus="false" md-layout="box" md-dense>
      <label>Icon search</label>
    </md-autocomplete>

    <md-button class="md-fab md-primary float-button float-bottom-right" @click="$router.push('/add')">
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>

<script>
export default {
  name: "MainPage",
  data() {
    return {
      iconSearch: null,
      icons: [
        "Jim Halpert",
        "Dwight Schrute",
        "Michael Scott",
        "Pam Beesly",
        "Angela Martin",
        "Kelly Kapoor",
        "Ryan Howard",
        "Kevin Malone",
        "Creed Bratton",
        "Oscar Nunez",
        "Toby Flenderson",
        "Stanley Hudson",
        "Meredith Palmer",
        "Phyllis Lapin-Vance"
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
