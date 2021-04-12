<template>
  <v-list-item :class="{ deletehover: confirmDelete }">
    <!-- Editable task -->
    <template v-if="!isDone">
      <v-list-item-action>
        <v-progress-circular v-if="isLoading" indeterminate color="primary" />
        <v-checkbox v-else @click="check()" :input-value="data.status" :disabled="data.status || confirmDelete"></v-checkbox>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>
          <v-text-field v-model="data.description" @change="updateTask()" :disabled="data.status || confirmDelete" placeholder="Untitled task" hide-details dense />
          <v-alert :value="error" type="error" dense>{{error}}</v-alert>
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action v-if="!confirmDelete">
        <v-btn @click="confirmDelete = true" icon color="error"><v-icon small>remove_circle</v-icon></v-btn>
      </v-list-item-action>
      <v-list-item-action v-else>
        <v-row>
          <v-btn @click="confirmDelete = false" color=""  text>Cancel</v-btn>
          <v-btn @click="deleteTask()" color="error" text>Remove</v-btn>
        </v-row>
      </v-list-item-action>
    </template>
    <!-- Readonly task -->
    <template v-else>
      <v-list-item-action>
        <v-icon color="success">check</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>{{data.description}}</v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon><v-icon>info</v-icon></v-btn>
          </template>
          <div>Created at {{ data.finished | dateFormatter }}</div>
          <div>Finished at {{ data.finished | dateFormatter }}</div>
        </v-tooltip>
      </v-list-item-action>
    </template>
  </v-list-item>
</template>
<script>
import STATUS from '@/constants/taskStatus';

export default {
  components: {},
  props: {
    value: Object,
    projectId: String,
  },
  data() {
    return {
      STATUS,

      isLoading: false,
      data: {},
      error: null,

      confirmDelete: false,
    };
  },
  mounted() {
    this.data = this.value;
  },
  filters:{
    dateFormatter(date){
      return new Date(date).toLocaleString();
    },
  },
  computed: {
    isDone() {
      return this.data.status === STATUS.DONE;
    },
  },
  methods: {
    async check() {
      if (this.data.status === STATUS.TODO) {
        await this.updateTask(true);
        this.data.status = STATUS.DONE;
        this.$emit('completed');
      }
    },

    async updateTask(check) {
      this.error = null;
      this.isLoading = true;
      try {
        const task = await this.$put(`/tasks/${this.projectId}/${this.data._id}`, {
          status: check ? STATUS.DONE : undefined,
          description: this.data.description || 'Untitled Task',
        });
        this.data = task;
      } catch (err) {
        this.error = err && err.response && err.response.data.message;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteTask() {
      this.error = null;
      this.isLoading = true;
      try {
        const task = await this.$delete(`/tasks/${this.projectId}/${this.data._id}`);
        this.$emit('deleted');
      } catch (err) {
        this.error = err && err.response && err.response.data.message;
      } finally {
        this.isLoading = false;
        this.confirmDelete = false;
      }
    },
  },
};
</script>