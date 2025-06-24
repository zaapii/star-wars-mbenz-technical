import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/people' },
  {
    path: '/people',
    name: 'people',
    component: () => import('@/pages/People.vue'),
    meta: {
      title: 'People',
      description: 'Explore the characters of the Star Wars universe',
    },
  },
  {
    path: '/planets',
    name: 'planets',
    component: () => import('@/pages/Planets.vue'),
    meta: {
      title: 'Planets',
      description: 'Explore the planets of the Star Wars universe',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/people',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
})

export default router
