<template>
  <div>
    <AppToolbar/>
    <v-main>
      <v-container fill-height fluid>

        <v-row class="pa-2">
          <v-spacer/>
          <v-btn @click="createProject()" color="accent" large><v-icon>add</v-icon> New project </v-btn>
        </v-row>

        <!-- Projects -->
        <v-row row wrap>
          <v-layout wrap justify-center>
            <v-flex v-for="project in projects.data" v-bind:key="project._id" xs12 sm12 md6 lg4 xl3 class="pa-2">
              <Project :value="project"  @deleted="fetchProjects" />
            </v-flex>
          </v-layout>
        </v-row>
        
        <!-- empty state -->
         <v-container v-if="isEmpty" class="pa-4 text-center" fill-height >
           <v-card-text>
              <v-icon size="96" style="opacity: 0.25">assistant</v-icon>
              <p class="subtitle-1">You don't have any projects</p>
              <p>Create a new project to get started</p>
              <p>
              <v-btn @click="createProject" color="accent" text><v-icon>add</v-icon> New project </v-btn>
              </p>
           </v-card-text>
        </v-container>

      </v-container>
    </v-main>
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
    isEmpty(){
      return !(this.projects.data && this.projects.data.length);
    }
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
