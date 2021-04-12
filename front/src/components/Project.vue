<template>
    <v-card>
        Project:
        {{data.name}} <v-btn @click="deleteProject">Delete</v-btn>
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

      deleteProjectDialog: null,
    };
  },
  mounted() {
    this.data = this.value;
  },
  computed: {},
  methods: {
    deleteProject() {
      this.deleteProjectDialog = this.value;
    },
  },
};
</script>