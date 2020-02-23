<template>
  <div class="md-layout md-alignment-center-center">
    <form novalidate class="md-layout md-alignment-center-center" @keypress.enter="() => {}" @submit.enter.prevent="validateAsset">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Add new asset</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="owner">Owner</label>
                <md-input
                  name="owner"
                  id="owner"
                  autocomplete="name"
                  v-model="form.owner"
                  :disabled="form.owner != null"
                />
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="asset-name">Asset Name</label>
                <md-input
                  name="asset-name"
                  id="asset-name"
                  autocomplete="asset"
                  v-model="form.assetName"
                  :disabled="sending"
                />
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="product">Product</label>
                <md-select
                  name="product"
                  id="product"
                  v-model="form.product"
                  md-dense
                  :disabled="sending"
                >
                  <md-option
                    v-for="product of Products"
                    :value="product.name"
                    :key="product.id"
                  >{{product.name}}</md-option>
                </md-select>
                <span class="md-error">The gender is required</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="type">Type</label>
                <md-select md-dense id="type" name="type" v-model="form.type" :disabled="sending">
                  <md-option v-for="type of AssetTypes" :value="type" :key="type">{{type}}</md-option>
                </md-select>
              </md-field>
            </div>
          </div>

          <md-chips v-model="form.tags" md-placeholder="Add tag..."></md-chips>
        </md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label>Files</label>
              <md-file v-model="filesRef" multiple />
            </md-field>
            <div style="display:flex; flex-wrap: wrap;">
              <div :key="file.file.name + '_' + file.file.size" v-for="file of filesPreviews">
                <md-card style="max-width: 20vw;padding: 5px; margin: 5px;">
                  <md-card-media md-medium>
                    <img :src="file.preview" :alt="file.file.name" />
                  </md-card-media>
                  <md-card-header class="md-flex" style="flex-direction: column">
                    <md-card-header-text style="padding: 10px 0;">
                      <div
                        class="md-subtitle"
                      >{{file.file.name.substr(0, file.file.name.lastIndexOf('.'))}}</div>
                    </md-card-header-text>
                    <md-card-header-text style="padding: 10px 0;">
                      <div
                        class="md-subtitle"
                      >Format: {{file.file.name.substr(file.file.name.lastIndexOf('.') +1)}}</div>
                    </md-card-header-text>
                  </md-card-header>
                  <md-card-actions>
                    <md-button @click="removeFile({name:file.file.name, size:file.file.size})">
                      <md-icon>delete</md-icon>
                    </md-button>
                  </md-card-actions>
                </md-card>
              </div>
            </div>
          </div>
        </div>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending || !validateAssetForm(form)">Create Asset</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="err.err">{{err.msg}}</md-snackbar>
    </form>
  </div>
</template>

<script>
import formValidationMixin from "@/mixins/formValidationMixin";
import { mapGetters, mapActions } from "vuex";
export default {
  mixins: [formValidationMixin],
  data() {
    return {
      form: { tags: [], files: [] },
      sending: false,
      filesToUpload: [],
      filesPreviews: [],
      filesRef: null,
      err: { msg: "Form is not complete", err: false }
    };
  },
  beforeMount() {
    this.form.owner = this.User.email;
  },
  methods: {
    ...mapActions(['addAsset']),
    async handleNewFiles() {
      console.log(this.filesToUpload);
      if (this.filesToUpload.length > 0)
        this.filesToUpload = this.filesToUpload.filter(
          f =>
            this.form.files.find(
              f1 => f1.name == f.name && f1.size == f.size
            ) == null
        );

      this.form.files = [...this.form.files, ...this.filesToUpload];
      this.filesToUpload = [];

      console.log(this.form.files);
      await this.getAllFilesPreviews();
    },
    async removeFile({ name, size }) {
      this.form.files = this.form.files.filter(
        f => f.name != name && f.size != size
      );

      console.log(this.form.files);
      await this.getAllFilesPreviews();
    },
    async getAllFilesPreviews() {
      this.filesPreviews = [];
      for (var file of this.form.files) {
        const preview = await this.previewFile(file);
        this.filesPreviews.push({ file, preview });
      }
    },
    previewFile(file) {
      return new Promise((rs, rj) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
          rs(reader.result);
        };

        reader.onerror = function() {
          rj();
        };
      });
    },
    validateAsset(e) {
      console.log(e);
      if(e.keyCode == 13) return;
      if (this.form.owner == null) return;

      if (!this.validateAssetForm(this.form)) {
        // this.err = { msg: "Form is not complete", err: true };

        // setTimeout(() => {
        //   this.err.err = false;
        // }, 3000);

        return;
      }
      console.log(this.form);
      this.sending = true;

      setTimeout(() => {
        this.sending = false;
        this.addAsset(this.form);

        this.form = { tags: [], files: [] };
        this.$router.push('/');

      }, 2000);
    }
  },
  computed: {
    ...mapGetters(["User", "Products", "AssetTypes"]),
    lastUser() {
      return this.form.firstName + " " + this.form.lastName;
    }
  },
  watch: {
    async filesRef(n) {
      if (!this || n.length == 0 || !n.type) {
        return;
      }

      this.filesToUpload = [...n.target.files];
      await this.handleNewFiles();
    }
  }
};
</script>

<style>
</style>