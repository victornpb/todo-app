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
    deleteProject() {
      this.deleteProjectDialog = this.value;
    },
  },
};
</script>