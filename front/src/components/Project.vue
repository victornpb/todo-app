<template>
  <v-expansion-panels focusable>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <!-- {{ data.name }} -->
        <v-layout>
          <v-text-field v-model="data.name" @change="saveProject" :loading="isLoading" label="Project" hide-details />
          <span class="headline" style="line-height: 48px">{{ completed }}/{{ length }}</span>
        </v-layout>
        <v-progress-linear :value="(completed / length) * 100" :disabled="!length" class="progress"></v-progress-linear>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="pa-0">
        <v-btn @click="deleteProject">Delete</v-btn>
        <v-alert :value="error" type="error" dismissible>
          <div>{{ error }}</div>
        </v-alert>

        <v-list v-if="!isEmpty" subheader>
          <v-subheader>To do</v-subheader>
          <template v-for="task in tasksTodo">
            <Task :projectId="data._id" :value="task" :key="task._id" @deleted="taskDeleted(task)" />
          </template>
          <v-subheader>Done</v-subheader>
          <template v-for="task in tasksDone">
            <Task :projectId="data._id" :value="task" :key="task._id" />
          </template>
        </v-list>

        <v-card v-if="isEmpty" elevation="0">
          <v-card-text class="pa-4 text-center">
            <v-icon size="96" style="opacity: 0.25">inbox</v-icon>
            <p>This project is empty</p>
            <p>Add a task below</p>
            <v-icon>arrow_downward</v-icon>
          </v-card-text>
        </v-card>

        <v-card>
          <v-form @submit.prevent="addNewTask()">
            <v-text-field v-model="newTaskDescription" :loading="isLoading" label="Add new task" outlined />
            <v-btn :disabled="!newTaskDescription" type="submit">Add Task</v-btn>
          </v-form>
        </v-card>

        <DeleteProjectDialog v-if="deleteProjectDialog" v-model="deleteProjectDialog" @changed="$emit('deleted')" />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import DeleteProjectDialog from '@/components/DeleteProjectDialog.vue';
import Task from '@/components/Task.vue';

export default {
  components: {
    DeleteProjectDialog,
    Task,
  },
  props: {
    value: Object,
  },
  data() {
    return {
      isLoading: false,
      data: {},
      error: null,
      deleteProjectDialog: null,

      newTaskDescription: null,
    };
  },
  mounted() {
    this.data = this.value;
  },
  computed: {
    completed() {
      return this.data && this.data.tasks ? this.data.tasks.filter((task) => task.status).length : 0;
    },
    length() {
      return this.data && this.data.tasks ? this.data.tasks.length : 0;
    },

    tasksTodo() {
      return this.data && this.data.tasks ? this.data.tasks.filter((task) => !task.status) : [];
    },
    tasksDone() {
      return this.data && this.data.tasks ? this.data.tasks.filter((task) => task.status) : [];
    },

    isEmpty() {
      return !(this.data && this.data.tasks && this.data.tasks.length);
    },
  },
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
      if (!this.newTaskDescription) return;

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

    taskDeleted(task) {
      const index = this.data.tasks.indexOf(task);
      this.data.tasks.splice(index, 1);
    },
  },
};
</script>
<style scoped>
.progress {
  position: absolute;
  top: 0px;
  left: 0px;
}
.v-expansion-panel-content__wrap{
  padding:0;
}
</style>