import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/home.vue'
import Login from '@/components/login.vue'
import Register from '@/components/register.vue'




const routes = [
  { 
    path:"/",
    redirect : "/login"
  },
    { path: '/home',
      name:"Home",
      component: Home,
      meta:{
        requiresAuth:true,
      }

     },
    { path: '/login',
      name:"Login",
       component: Login },
    {path: '/register',
      name:"Register",
       component: Register}
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = localStorage.getItem('token'); 

//   if (to.meta.requiresAuth && !isAuthenticated) {
//     next('/login'); 
//   } else {
//     next('/home');  
//   }
// });
  
  export default router;