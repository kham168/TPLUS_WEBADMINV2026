import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from "../views/Dashboard.vue"
import Login from "../components/Login.vue"

Vue.use(VueRouter)

const routes = [
  {
   path:"/",
   name:"Login",
   component:Login,
   meta:{
     layout:'default'
   }
  },
  {
   path:"/dashboard",
   name:"Dashboard",
   component:Dashboard,
   meta:{
     layout:'admin'
   }
  },


  {
   path:"/product",
   component:() => import(/* webpackChunkName: "Product" */ '../views/product/Product.vue'),
   meta:{
     layout:'admin'
   },

   children:[
    {
      path:"",
      name:"product.index",
      component: () => import(/* webpackChunkName: "ProductIndex" */ '../views/product/index.vue'),
      meta:{
       layout:'admin'
      }
    },
     {
       path:"create",
       name:"product.create",
       component: () => import(/* webpackChunkName: "ProductCreate" */ '../components/forms/Product/Create.vue'),
       meta:{
        layout:'admin'
       }
     },
     {
       path:"edit",
       name:"product.edit",
       component:() => import(/* webpackChunkName: "ProductEdit" */ '../components/forms/Product/Edit.vue'),
       meta:{
         layout:'admin'
       }
     }
   ]
  },


  {
   path:"/users",
   component:() => import(/* webpackChunkName: "User" */ '../views/users/user.vue'),
   meta:{
     layout:'admin'
   },
    children:[

       {
         path:"",
         name:"users.index",
         component: () => import(/* webpackChunkName:"UserIndex" */ '../views/users/index.vue'),
         meta:{
           layout:'admin',
         }

       },

       {
        path:"create",
        name:"users.create",
        component: () => import(/* webpackChunkName:"UserCreate" */ '../components/forms/users/Create.vue'),
        meta:{
          layout:'admin',
        }

      },
      {
        path:"edit",
        name:"users.edit",
        component: () => import(/* webpackChunkName:"UserEdit" */ '../components/forms/users/Edit.vue'),
        meta:{
          layout:'admin',
        }

      },
    ]
  },


  // role

  {
   path:"/roles",
   component:() => import(/* webpackChunkName:"role" */ '../views/roles/role.vue'),
   meta:{
     layout:'admin'
   },
   children:[
     {
       path:"",
       name:"roles.index",
       component:() => import(/* webpackChunkName:"RoleIndex" */ '../views/roles/index.vue'),
       meta:{
         layout:'admin'
       }
     }
   ]
  },

  // persmission

  {
   path:"/permission",
   component:() => import(/* webpackChunkName:"permission" */ '../views/permission/permission.vue'),
   meta:{
     layout:'admin'
   },

   children:[
     {
       path:"",
       name:"permission.index",
       component:() => import(/* webpackChunkName:"PermissionIndex" */ '../views/permission/index.vue'),
       meta:{
         layout:'admin'
       }
     }
   ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
