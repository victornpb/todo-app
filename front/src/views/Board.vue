<template>
  <div>
    <AppToolbar/>
    <v-content>
      <v-container fill-height fluid>
        <v-btn large @click="createProject" ><v-icon>add</v-icon> New project </v-btn>
        <v-layout wrap>
          <v-flex v-for="project in projects.data" v-bind:key="project._id" xs12 sm12 md6 lg4 xl3 class="pa-2">
            <Project :value="project"  @deleted="fetchProjects" />
          </v-flex>
        </v-layout>

      </v-container>
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
        data: [],
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
      const projects = await this.$get('/projects');
      this.projects.data = projects.data;
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
