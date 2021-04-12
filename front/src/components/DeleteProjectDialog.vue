<template>
  <v-dialog :value="dialog" @input="dissmiss()" :persistent="loading" max-width="500">
    <v-card>
      <v-card-title class="headline">Delete project?</v-card-title>
      <v-card-text
        >Are you sure you want to delete <var>{{ value.name }}</var></v-card-text
      >
      <v-alert :value="!!this.error" type="error" dismissible>
        <div>{{ this.error }}</div>
      </v-alert>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :loading="loading" @click="deleteProject()" color="error" text>Delete Project</v-btn>
        <v-btn :disabled="loading" @click="dissmiss()" color text>Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  components: {},
  props: {
    value: Object,
  },
  data() {
    return {
      loading: false,
      error: null,
    };
  },
  mounted() {},
  methods: {
    dissmiss() {
      this.$emit('input', null);
    },
    async deleteProject() {
      this.error = null;
      this.loading = true;
      try {
        await this.$delete('/projects/' + this.value._id);
        this.$emit('changed', true);
      } catch (err) {
        this.error = err && err.response && err.response.data.message;
      } finally {
        this.loading = false;
      }
      this.loading = true;
      this.dissmiss();
    },
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', undefined);
      },
    },
  },
};
</script>