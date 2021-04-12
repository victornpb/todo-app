<template>
  <div>
    <AppToolbar/>
    <h1>This is an about page</h1>
    <v-content>
     
        <v-btn large @click="createProject" ><v-icon>add</v-icon> New project </v-btn>

        <Project :value="project" v-for="project in projects.data.data" v-bind:key="project._id" @deleted="fetchProjects" />

    </v-content>
  </div>
</template>
<script>
import AppToolbar from '@/components/AppToolbar.vue';
import Project from '@/components/Project.vue';

export default {
  components: {
    AppToolbar,
    Project,
  },
  data(){
    return {
      projects: {
        isLoading: false,
        data: null,
      },
    };
  },
  mounted(){
    this.fetchProjects();
  },
  computed:{

  },
  methods:{
    async fetchProjects(){
      this.projects.isLoading = true;
      this.projects.data = await this.$get('/projects');
      this.projects.isLoading = false;
    },

    async createProject(){
      this.projects.isLoading = true;
      await this.$post('/projects');
      this.fetchProjects();
      this.projects.isLoading = false;
    },

  },
}
</script>
