<template>
  <v-list-item :class="{ red: confirmDelete }">
    <template v-if="!isDone">
      <v-list-item-action>
        <v-checkbox @click="check()" :input-value="data.status" :disabled="data.status" :loading="isLoading"></v-checkbox>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title><v-text-field v-model="data.description" @change="updateTask()" hide-details /></v-list-item-title>
      </v-list-item-content>

      <v-list-item-action v-if="!confirmDelete">
        <v-btn @click="confirmDelete = true" icon color="error"><v-icon small>remove_circle</v-icon></v-btn>
      </v-list-item-action>
      <v-list-item-action v-else>
        <v-btn @click="confirmDelete = false" color="" outlined>Cancel</v-btn>
        <v-btn @click="deleteTask()" color="" outlined>Remove</v-btn>
      </v-list-item-action>
    </template>
    <template v-else>
      <v-list-item-action>
        <v-checkbox :input-value="data.status" :disabled="data.status" :loading="isLoading"></v-checkbox>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title><v-text-field v-model="data.description" hide-details readonly /></v-list-item-title>
      </v-list-item-content>

      <v-list-item-action>
        <v-btn :title="data.finished"><v-icon>info</v-icon></v-btn>
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
  computed: {
    isDone() {
      return this.data.status === STATUS.DONE;
    },
  },
  methods: {
    check() {
        if(this.data.status===STATUS.TODO){
            this.data.status=STATUS.DONE;
            this.updateTask();
        }
    },
    async updateTask() {
      this.error = null;
      this.isLoading = true;
      try {
        await this.$put(`/tasks/${this.projectId}/${this.data._id}`, {
          status: this.data.status,
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
        const task = await this.$put(`/tasks/${this.projectId}/${this.data._id}`, {
          status: STATUS.DONE,
        });
        this.data = task;
      } catch (err) {
        this.error = err && err.response && err.response.data.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>