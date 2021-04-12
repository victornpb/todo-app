<template>
  <v-expansion-panels focusable>
    <v-expansion-panel>
      <!-- Project heading -->
      <v-expansion-panel-header>
        <v-layout>
          <v-text-field v-model="data.name" @change="saveProject" :loading="isLoading" label="Project" hide-details />
          <span class="headline" style="line-height: 48px">{{ completed }}/{{ length }}</span>
        </v-layout>
        <v-alert :value="error" type="error" dismissible>
          <div>{{ error }}</div>
        </v-alert>
        <v-progress-linear :value="(completed / length) * 100" :disabled="!length" class="progress"></v-progress-linear>
      </v-expansion-panel-header>
      
      <!-- Project Body -->
      <v-expansion-panel-content class="pa-0">
        
        <!-- Delete project row -->
        <div class="pa-1 text-right">
          <v-btn @click="deleteProject" color="error" text>
            <v-icon>delete</v-icon>
            Delete Project</v-btn>
        </div>
      
        <!-- Task List -->
        <v-list v-if="!isEmpty" subheader>
          <v-subheader>To do</v-subheader>
          <template v-for="task in tasksTodo">
            <Task :projectId="data._id" :value="task" :key="task._id" @deleted="getProject()" @completed="getProject()" />
          </template>
          <v-subheader>Done</v-subheader>
          <template v-for="task in tasksDone">
            <Task :projectId="data._id" :value="task" :key="task._id" />
          </template>
        </v-list>

        <!-- Empty State -->
        <v-card v-if="isEmpty" elevation="0">
          <v-card-text class="pa-4 text-center">
            <v-icon size="96" style="opacity: 0.25">inbox</v-icon>
            <p>This project is empty</p>
            <p>Add a task below</p>
            <v-icon>arrow_downward</v-icon>
          </v-card-text>
        </v-card>

        <v-divider/>
        
        <!-- Add Task -->
        <v-card class="pa-5">
          <v-form @submit.prevent="addNewTask()">
            <v-text-field v-model="newTaskDescription" :loading="isLoading" label="Add new task" outlined @click:append="addNewTask()" append-icon="add" hide-details />
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

    async getProject() {
      this.error = null;
      this.isLoading = true;
      try {
        const project = await this.$get('/projects/' + this.data._id);
        this.data = project;
      } catch (err) {
        this.error = err && err.response && err.response.data.message;
      } finally {
        this.isLoading = false;
      }
    },

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
  },
};
</script>
<style scoped>
.progress {
  position: absolute;
  top: 0px;
  left: 0px;
}
</style>

<style>
.pa-0 .v-expansion-panel-content__wrap{
  padding: 0 !important;
}
</style>