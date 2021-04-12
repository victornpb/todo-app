<template>
    <v-card>
        Project:
        {{data.name}}
        <v-text-field v-model="data.name" @change="saveProject" :loading="isLoading" />
        <v-alert :value="error" type="error" dismissible>
            <div>{{ error }}</div>
        </v-alert>

        <v-btn @click="deleteProject">Delete</v-btn>
        <ul>
            <li v-for="task in data.tasks" :key="task._id">
               Task: {{task}}
            </li>
        </ul>

        <v-form @submit.prevent="addNewTask()">
            Add task
            <v-text-field v-model="newTaskDescription" :loading="isLoading" />
            <v-btn :disabled="!newTaskDescription" type="submit">Add Task</v-btn>
        </v-form>

        <DeleteProjectDialog v-if="deleteProjectDialog" v-model="deleteProjectDialog" @changed="$emit('deleted')" />
    </v-card>
</template>
<script>
import DeleteProjectDialog from '@/components/DeleteProjectDialog.vue';

export default {
  components: {
      DeleteProjectDialog,
  },
  props: {
    value: Object,
  },
  data() {
    return {
      isLoading: false,
      data: null,
      error: null,
      deleteProjectDialog: null,

      newTaskDescription: null,
    };
  },
  mounted() {
    this.data = this.value;
  },
  computed: {},
  methods: {
    async saveProject() {
      this.error = null;
      this.isLoading = true;
      try {
        await this.$put('/projects/' + this.data._id, {
            name: this.data.name || 'Untitled Project',
        });
      } catch (err) {
        this.error = err && err.response && err.response.data.message;
      } finally {
        this.isLoading = false;
      }
    },

    async addNewTask() {
      if(!this.newTaskDescription) return;

      this.error = null;
      this.isLoading = true;
      try {
        const task = await this.$post('/tasks/' + this.data._id, {
            description: this.newTaskDescription,
        });
        this.data.tasks.push(task);
        this.newTaskDescription = ''; // clear input
      } catch (err) {
        this.error = err && err.response && err.response.data.message;
      } finally {
        this.isLoading = false;
      }
    },
    deleteProject() {
      this.deleteProjectDialog = this.value;
    },
  },
};
</script>