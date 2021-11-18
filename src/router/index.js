import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from "../views/Dashboard.vue"
import Login from "../components/Login.vue"
import Test from "../views/test/test.vue"
import Topping from "../views/Topping/topping.vue"

Vue.use(VueRouter)

const routes = [

  {
    path:"/test",
    name:"Test",
    component:Test,
    meta:{
      layout:'default'
    }
   },
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
    path:"/topping",
    name:"Topping",
    component:Topping,
    meta:{
      layout:'admin'
    }
   },

  //Category Post

  {
    path:"/cate_post",
    component:()=> import(/* webpackChunkName:"cate_post" */'../views/posts/cate_post/cate_post.vue'),
    meta:{
      layout:'admin'
    },
    children:[
     {
      path:"",
      name:"cate_post.index",
      component:()=> import(/* webpackChunkName:"cate_post index" */'../views/posts/cate_post/index.vue'),
      meta:{
        layout:"admin"
      }
     },
     {
      path:"create",
      name:"cate_post.create",
      component: () => import(/* webpackChunkName:"cate_post Create" */ '../components/forms/posts/cate_post/Create.vue'),
      meta:{
        layout:'admin',
      }

    },
    {
      path:"edit",
      name:"cate_post.edit",
      component: () => import(/* webpackChunkName:"cate_post Edit" */ '../components/forms/posts/cate_post/Edit.vue'),
      meta:{
        layout:'admin',
      }

    },
    ]
  },
  
    //News and Activity
    {
      path:"/post",
      component:() => import(/* webpackChunkName: "post" */ '../views/posts/post/post.vue'),
      meta:{
        layout:'admin'
      },
   
      children:[
       {
         path:"",
         name:"post.index",
         component: () => import(/* webpackChunkName: "post index" */ '../views/posts/post/index.vue'),
         meta:{
          layout:'admin'
         }
       },
        {
          path:"create",
          name:"post.create",
          component: () => import(/* webpackChunkName: "post create" */ '../components/forms/posts/post/Create.vue'),
          meta:{
           layout:'admin'
          }
        },
        {
          path:"edit",
          name:"post.edit",
          component:() => import(/* webpackChunkName: "post edit" */ '../components/forms/posts/post/Edit.vue'),
          meta:{
            layout:'admin'
          }
        }
      ]
     },


   //Category Product
   {
    path:"/cate_product",
    component:()=> import(/* webpackChunkName:"Cate_product" */'../views/cate_product/cate_product.vue'),
    meta:{
      layout:'admin'
    },
    children:[
     {
      path:"",
      name:"cate_product.index",
      component:()=> import(/* webpackChunkName:"Cate_product index" */'../views/cate_product/index.vue'),
      meta:{
        layout:"admin"
      }
     },
     {
      path:"create",
      name:"cate_product.create",
      component: () => import(/* webpackChunkName:"Cate_product Create" */ '../components/forms/cate_product/Create.vue'),
      meta:{
        layout:'admin',
      }

    },
    {
      path:"edit",
      name:"cate_product.edit",
      component: () => import(/* webpackChunkName:"Cate_product Edit" */ '../components/forms/cate_product/Edit.vue'),
      meta:{
        layout:'admin',
      }

    },
    ]
  },

  //Product
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


  //User
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


   //Category Package
   {
    path:"/cate_data_package",
    component:()=> import(/* webpackChunkName:"Data_package" */'../views/packages/cate_data_package/cate_data_package.vue'),
    meta:{
      layout:'admin'
    },
    children:[
     {
      path:"",
      name:"cate_data_package.index",
      component:()=> import(/* webpackChunkName:"Data_package index" */'../views/packages/cate_data_package/index.vue'),
      meta:{
        layout:"admin"
      }
     },
     {
      path:"create",
      name:"cate_data_package.create",
      component: () => import(/* webpackChunkName:"Data_package Create" */ '../components/forms/packages/cate_data_package/Create.vue'),
      meta:{
        layout:'admin',
      }

    },
    {
      path:"edit",
      name:"cate_data_package.edit",
      component: () => import(/* webpackChunkName:"Data_package Edit" */ '../components/forms/packages/cate_data_package/Edit.vue'),
      meta:{
        layout:'admin',
      }

    },
    ]
  },

  //Package
  {
    path:"/data_package",
    component:()=> import(/* webpackChunkName:"Data_package" */'../views/packages/data_package/data_package.vue'),
    meta:{
      layout:'admin'
    },
    children:[
     {
      path:"",
      name:"data_package.index",
      component:()=> import(/* webpackChunkName:"Data_package index" */'../views/packages/data_package/index.vue'),
      meta:{
        layout:"admin"
      }
     },
     {
      path:"create",
      name:"data_package.create",
      component: () => import(/* webpackChunkName:"Data_package Create" */ '../components/forms/packages/data_package/Create.vue'),
      meta:{
        layout:'admin',
      }

    },
    {
      path:"edit",
      name:"data_package.edit",
      component: () => import(/* webpackChunkName:"Data_package Edit" */ '../components/forms/packages/data_package/Edit.vue'),
      meta:{
        layout:'admin',
      }

    },
    ]
  },


    //Banner
    {
      path:"/banner",
      component:()=> import(/* webpackChunkName:"Banner" */'../views/banner/banner.vue'),
      meta:{
        layout:'admin'
      },
      children:[
       {
        path:"",
        name:"banner.index",
        component:()=> import(/* webpackChunkName:"Banner index" */'../views/banner/index.vue'),
        meta:{
          layout:"admin"
        }
       },
       {
        path:"create",
        name:"banner.create",
        component: () => import(/* webpackChunkName:"Banner Create" */ '../components/forms/banner/Create.vue'),
        meta:{
          layout:'admin',
        }
  
      },
      {
        path:"edit",
        name:"banner.edit",
        component: () => import(/* webpackChunkName:"Banner Edit" */ '../components/forms/banner/Edit.vue'),
        meta:{
          layout:'admin',
        }
  
      },
      ]
    },


    //Logo
    {
      path:"/logo",
      component:()=> import(/* webpackChunkName:"Logo" */'../views/logo/logo.vue'),
      meta:{
        layout:'admin'
      },
      children:[
       {
        path:"",
        name:"logo.index",
        component:()=> import(/* webpackChunkName:"Logo index" */'../views/logo/index.vue'),
        meta:{
          layout:"admin"
        }
       },
       {
        path:"create",
        name:"logo.create",
        component: () => import(/* webpackChunkName:"Logo Create" */ '../components/forms/logo/Create.vue'),
        meta:{
          layout:'admin',
        }
  
      },
      {
        path:"edit",
        name:"logo.edit",
        component: () => import(/* webpackChunkName:"Logo Edit" */ '../components/forms/logo/Edit.vue'),
        meta:{
          layout:'admin',
        }
  
      },
      ]
    },

    //Contact
    {
      path:"/contact",
      component:()=> import(/* webpackChunkName:"Contact" */'../views/contact/contact.vue'),
      meta:{
        layout:'admin'
      },
      children:[
       {
        path:"",
        name:"contact.index",
        component:()=> import(/* webpackChunkName:"Contact index" */'../views/contact/index.vue'),
        meta:{
          layout:"admin"
        }
       },
       {
        path:"create",
        name:"contact.create",
        component: () => import(/* webpackChunkName:"Contact Create" */ '../components/forms/contact/Create.vue'),
        meta:{
          layout:'admin',
        }
  
      },
      {
        path:"edit",
        name:"contact.edit",
        component: () => import(/* webpackChunkName:"Contact Edit" */ '../components/forms/contact/Edit.vue'),
        meta:{
          layout:'admin',
        }
  
      },
      ]
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
