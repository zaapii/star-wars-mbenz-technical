import { createRouter, createWebHistory } from 'vue-router'

import People from '@/pages/People.vue'
import Planets from '@/pages/Planets.vue'

const routes = [
  { path: '/', redirect: '/people' },
  {
    path: '/people',
    name: 'people',
    component: People,
    meta: {
      title: 'People',
      description: 'Explore the characters of the Star Wars universe',
    },
  },
  {
    path: '/planets',
    name: 'planets',
    component: Planets,
    meta: {
      title: 'Planets',
      description: 'Explore the planets of the Star Wars universe',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
