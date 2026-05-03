import { createRouter, createWebHistory } from 'vue-router'
import MoviesList from '../views/MoviesList.vue'
import MovieDetail from '../views/MovieDetail.vue'

const routes = [
  {
    path: '/',
    redirect: '/movies',
  },
  {
    path: '/movies',
    name: 'MoviesList',
    component: MoviesList,
  },
  {
    path: '/movie/:title',
    name: 'MovieDetail',
    component: MovieDetail,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
