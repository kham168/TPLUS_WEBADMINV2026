import Vue from "vue";
import VueRouter from "vue-router";
import Middleware from "../middleware/index";
import Dashboard from "../views/Dashboard.vue";
import Login from "../components/Login.vue";
import Topping from "../views/Topping/topping.vue";
import ErrorRole from "../views/layout/errorRole";
import store from "@/store/index.js";
import Chatroom from "../components/Chatroom";
import ReportCustomer from "../views/report/customer.vue";
import ReportEvent from "../views/report/event-report.vue";
import ReportPromotion from "../views/report/promotion.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/chat-room/:chat_room_id/user/:user_id",
    name: "chatroom",
    component: Chatroom,
    meta: {
      layout: "admin",
      requiredAuth: true,
      menu: "users",
    },
  },
  {
    path: "/access-denied",
    name: "ErrorRole",
    component: ErrorRole,
    meta: {
      middleware: [Middleware.auth],
      layout: "admin",
    },
  },
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      layout: "default",
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      layout: "admin",
      requiredAuth: true,
      menu: "users",
    },
  },
  {
    path: "/topping",
    name: "Topping",
    component: Topping,
    meta: {
      middleware: [Middleware.auth],
      layout: "admin",
      requiredAuth: true,
      menu: "users",
    },
  },
  //Category Post
  {
    path: "/cate_post",
    component: () =>
      import(
        /* webpackChunkName:"cate_post" */ "../views/posts/cate_post/cate_post.vue"
      ),
    meta: {
      middleware: [Middleware.auth],
      layout: "admin",
      requiredAuth: true,
      menu: "users",
    },
    children: [
      {
        path: "",
        name: "cate_post.index",
        component: () =>
          import(
            /* webpackChunkName:"cate_post index" */ "../views/posts/cate_post/index.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
          requiredAuth: true,
          menu: "users",
        },
      },
      {
        path: "create",
        name: "cate_post.create",
        component: () =>
          import(
            /* webpackChunkName:"cate_post Create" */ "../components/forms/posts/cate_post/Create.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
      {
        path: "edit/:cate_post_id",
        name: "cate_post.edit",
        component: () =>
          import(
            /* webpackChunkName:"cate_post Edit" */ "../components/forms/posts/cate_post/Edit.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
    ],
  },
  //News and Activity
  {
    path: "/post",
    component: () =>
      import(/* webpackChunkName: "post" */ "../views/posts/post/post.vue"),
    meta: {
      layout: "admin",
      requiredAuth: true,
      menu: "users",
    },

    children: [
      {
        path: "",
        name: "post.index",
        component: () =>
          import(
            /* webpackChunkName: "post index" */ "../views/posts/post/index.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
      {
        path: "create",
        name: "post.create",
        component: () =>
          import(
            /* webpackChunkName: "post create" */ "../components/forms/posts/post/Create.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
      {
        path: "edit/:post_id",
        name: "post.edit",
        component: () =>
          import(
            /* webpackChunkName: "post edit" */ "../components/forms/posts/post/Edit.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
    ],
  },

  //Promotion
  {
    path: "/promotion",
    component: () =>
      import(
        /* webpackChunkName: "post" */ "../views/posts/promotion/promotion.vue"
      ),
    meta: {
      layout: "admin",
      requiredAuth: true,
      menu: "users",
    },

    children: [
      {
        path: "",
        name: "promotion.index",
        component: () =>
          import(
            /* webpackChunkName: "post index" */ "../views/posts/promotion/index.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
      {
        path: "create",
        name: "promotion.create",
        component: () =>
          import(
            /* webpackChunkName: "post create" */ "../components/forms/posts/promotion_event/Create.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
      {
        path: "edit/:promotion_event_id",
        name: "promotion.edit",
        component: () =>
          import(
            /* webpackChunkName: "post edit" */ "../components/forms/posts/promotion_event/Edit.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
    ],
  },

  //Event
  {
    path: "/event",
    component: () =>
      import(/* webpackChunkName: "post" */ "../views/posts/event/event.vue"),
    meta: {
      layout: "admin",
      requiredAuth: true,
      menu: "users",
    },

    children: [
      {
        path: "",
        name: "event.index",
        component: () =>
          import(
            /* webpackChunkName: "post index" */ "../views/posts/event/index.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
      {
        path: "create",
        name: "event.create",
        component: () =>
          import(
            /* webpackChunkName: "post create" */ "../components/forms/posts/event/Create.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
      {
        path: "edit/:promotion_event_id",
        name: "event.edit",
        component: () =>
          import(
            /* webpackChunkName: "post edit" */ "../components/forms/posts/promotion_event/Edit.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
    ],
  },

  //Category Product
  {
    path: "/cate_product",
    component: () =>
      import(
        /* webpackChunkName:"Cate_product" */ "../views/products/cate_product/cate_product.vue"
      ),
    meta: {
      layout: "admin",
      requiredAuth: true,
      menu: "users",
    },
    children: [
      {
        path: "",
        name: "cate_product.index",
        component: () =>
          import(
            /* webpackChunkName:"Cate_product index" */ "../views/products/cate_product/index.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
      {
        path: "create",
        name: "cate_product.create",
        component: () =>
          import(
            /* webpackChunkName:"Cate_product Create" */ "../components/forms/products/cate_product/Create.vue"
          ),
        meta: {
          layout: "admin",
        },
      },
      {
        path: "edit/:cate_product_id",
        name: "cate_product.edit",
        component: () =>
          import(
            /* webpackChunkName:"Cate_product Edit" */ "../components/forms/products/cate_product/Edit.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
    ],
  },

  //Product
  {
    path: "/product",
    component: () =>
      import(
        /* webpackChunkName: "Product" */ "../views/products/product/Product.vue"
      ),
    meta: {
      layout: "admin",
      requiredAuth: true,
      menu: "users",
    },

    children: [
      {
        path: "",
        name: "product.index",
        component: () =>
          import(
            /* webpackChunkName: "ProductIndex" */ "../views/products/product/index.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
      {
        path: "create",
        name: "product.create",
        component: () =>
          import(
            /* webpackChunkName: "ProductCreate" */ "../components/forms/products/Product/Create.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
      {
        path: "edit/:product_id",
        name: "product.edit",
        component: () =>
          import(
            /* webpackChunkName: "ProductEdit" */ "../components/forms/products/Product/Edit.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
    ],
  },

  //Logo
  {
    path: "/logo",
    component: () =>
      import(/* webpackChunkName:"Logo" */ "../views/logo/logo.vue"),
    meta: {
      layout: "admin",
      requiredAuth: true,
      menu: "users",
    },
    children: [
      {
        path: "",
        name: "logo.index",
        component: () =>
          import(/* webpackChunkName:"Logo index" */ "../views/logo/index.vue"),
        meta: {
          layout: "admin",
          requiredAuth: true,
          menu: "users",
        },
      },
      {
        path: "edit/:logo_id",
        name: "logo.edit",
        component: () =>
          import(
            /* webpackChunkName:"RoleCreate" */ "../components/forms/logo/Edit"
          ),
        meta: {
          layout: "admin",
        },
      },
    ],
  },
  //Position
  // {
  //     path: "/position",
  //     component: () => import(/* webpackChunkName:"Position" */'../views/position/position'),
  //     meta: {
  //         layout: 'admin'
  //     },
  //     children: [
  //         {
  //             path: "",
  //             name: "position.index",
  //             component: () => import(/* webpackChunkName:"Position index" */'../views/position/index.vue'),
  //             meta: {
  //                 layout: "admin"
  //             }
  //         },
  //         {
  //             path: "create",
  //             name: "position.create",
  //             component: () => import(/* webpackChunkName:"Position Create" */ '../components/forms/position/Create.vue'),
  //             meta: {
  //                 layout: 'admin',
  //             }
  //
  //         },
  //
  //         {
  //             path: "edit",
  //             name: "position.edit",
  //             component: () => import(/* webpackChunkName:"Position Edit" */ '../components/forms/position/Edit.vue'),
  //             meta: {
  //                 layout: 'admin',
  //             }
  //
  //         },
  //     ]
  // },
  //User
  {
    path: "/users",
    component: () =>
      import(/* webpackChunkName: "User" */ "../views/users/user.vue"),
    children: [
      {
        path: "",
        name: "users.index",
        component: () =>
          import(/* webpackChunkName:"UserIndex" */ "../views/users/index.vue"),
        meta: {
          layout: "admin",
          requiredAuth: true,
          menu: "users",
        },
      },

      {
        path: "create",
        name: "users.create",
        component: () =>
          import(
            /* webpackChunkName:"UserCreate" */ "../components/forms/users/Create.vue"
          ),
        meta: {
          layout: "admin",
          requiredAuth: true,
          menu: "users",
        },
      },
      {
        path: "edit",
        name: "users.edit",
        component: () =>
          import(
            /* webpackChunkName:"UserEdit" */ "../components/forms/users/Edit.vue"
          ),
        meta: {
          layout: "admin",
          requiredAuth: true,
          menu: "users",
        },
      },
    ],
  },
  //User Role
  {
    path: "/users-role/:user_id",
    component: () =>
      import(
        /* webpackChunkName: "UserRole" */ "../views/users/RoleUser/index"
      ),
    meta: {
      layout: "admin",
      requiredAuth: true,
      menu: "users",
    },
    children: [
      {
        path: "",
        name: "roleUser.index",
        component: () =>
          import(
            /* webpackChunkName:"UserRoleIndex" */ "../views/users/RoleUser/index"
          ),
        meta: {
          layout: "admin",
        },
      },
    ],
  },
  //User Permission
  {
    path: "/permission-role/:user_id",
    component: () =>
      import(
        /* webpackChunkName: "UserPermission" */ "../views/users/PermissionUser/index"
      ),
    meta: {
      layout: "admin",
      requiredAuth: true,
      menu: "users",
    },
    children: [
      {
        path: "",
        name: "permissionUser.index",
        component: () =>
          import(
            /* webpackChunkName:"UserPermissionIndex" */ "../views/users/PermissionUser/index"
          ),
        meta: {
          layout: "admin",
        },
      },
    ],
  },
  // role
  {
    path: "/roles",
    component: () =>
      import(/* webpackChunkName:"role" */ "../views/roles/role.vue"),
    meta: {
      layout: "admin",
      requiredAuth: true,
      menu: "users",
    },
    children: [
      {
        path: "",
        name: "roles.index",
        component: () =>
          import(/* webpackChunkName:"RoleIndex" */ "../views/roles/index.vue"),
        meta: {
          layout: "admin",
        },
      },
      {
        path: "create-role",
        name: "roles.create",
        component: () =>
          import(
            /* webpackChunkName:"RoleCreate" */ "../components/forms/role/Create"
          ),
        meta: {
          layout: "admin",
        },
      },
      {
        path: "edit-role",
        name: "roles.edit",
        component: () =>
          import(
            /* webpackChunkName:"RoleEdit" */ "../components/forms/role/Edit"
          ),
        meta: {
          layout: "admin",
        },
      },
    ],
  },
  // persmission
  {
    path: "/permission",
    component: () =>
      import(
        /* webpackChunkName:"permission" */ "../views/permission/permission.vue"
      ),
    meta: {
      layout: "admin",
      requiredAuth: true,
      menu: "users",
    },

    children: [
      {
        path: "",
        name: "permission.index",
        component: () =>
          import(
            /* webpackChunkName:"PermissionIndex" */ "../views/permission/index.vue"
          ),
        meta: {
          layout: "admin",
        },
      },
      {
        path: "/create-permission",
        name: "permission.create",
        component: () =>
          import(
            /* webpackChunkName:"PermissionCreate" */ "../components/forms/permission/Create"
          ),
        meta: {
          layout: "admin",
        },
      },
      {
        path: "/edit-permission",
        name: "permission.edit",
        component: () =>
          import(
            /* webpackChunkName:"PermissionEdit" */ "../components/forms/permission/Edit"
          ),
        meta: {
          layout: "admin",
        },
      },
    ],
  },
  //add Permission In Role
  {
    path: "/permission-in-role/:role_id",
    component: () =>
      import(
        /* webpackChunkName:"permissionInRole" */ "../views/permissionInRole/index"
      ),
    meta: {
      layout: "admin",
      requiredAuth: true,
      menu: "users",
    },

    children: [
      {
        path: "",
        name: "permissionRole.index",
        component: () =>
          import(
            /* webpackChunkName:"IndexPermissionInRole" */ "../views/permissionInRole/index.vue"
          ),
        meta: {
          layout: "admin",
          requiredAuth: true,
          menu: "users",
        },
      },
      // {
      //     path: "/create-permission",
      //     name: "permission.create",
      //     component: () => import(/* webpackChunkName:"PermissionCreate" */ '../components/forms/permission/Create'),
      //     meta: {
      //         layout: 'admin'
      //     }
      // },
    ],
  },

  //Package Type
  {
    path: "/package_type",
    component: () =>
        import(
            /* webpackChunkName:"Data_package" */ "../views/packages/package_type/package_type.vue"
            ),
    meta: {
      layout: "admin",
      requiredAuth: true,
      menu: "users",
    },
    children: [
      {
        path: "",
        name: "package_type.index",
        component: () =>
            import(
                /* webpackChunkName:"Data_package index" */ "../views/packages/package_type/index.vue"
                ),
        meta: {
          layout: "admin",
        },
      },

      {
        path: "edit/:package_type_id",
        name: "package_type.edit",
        component: () =>
            import(
                /* webpackChunkName:"Data_package Edit" */ "../components/forms/packages/package_type/Edit.vue"
                ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },

      {
        path: "/package_type_priority",
        name: "package_type.priority",
        component: () =>
            import(
                /* webpackChunkName:"Data_package Edit" */ "../views/packages/package_type/priority.vue"
                ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
    ],
  },


  //SimType Package
  {
    path: "/sim_type_package",
    component: () =>
      import(
        /* webpackChunkName:"Data_package" */ "../views/packages/sim_type_package/sim_type_package.vue"
      ),
    meta: {
      layout: "admin",
      requiredAuth: true,
      menu: "users",
    },
    children: [
      {
        path: "",
        name: "sim_type_package.index",
        component: () =>
          import(
            /* webpackChunkName:"Data_package index" */ "../views/packages/sim_type_package/index.vue"
          ),
        meta: {
          layout: "admin",
        },
      },
      {
        path: "create",
        name: "sim_type_package.create",
        component: () =>
          import(
            /* webpackChunkName:"Data_package Create" */ "../components/forms/packages/sim_type_package/Create.vue"
          ),
        meta: {
          layout: "admin",
        },
      },
      {
        path: "edit/:cate_data_package_id:name:description",
        name: "sim_type_package.edit",
        component: () =>
          import(
            /* webpackChunkName:"Data_package Edit" */ "../components/forms/packages/sim_type_package/Edit.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
    ],
  },

  //Package
  {
    path: "/data_package",
    component: () =>
      import(
        /* webpackChunkName:"Data_package" */ "../views/packages/data_package/data_package.vue"
      ),
    meta: {
      layout: "admin",
      requiredAuth: true,
      menu: "users",
    },
    children: [
      {
        path: "",
        name: "data_package.index",
        component: () =>
          import(
            /* webpackChunkName:"Data_package index" */ "../views/packages/data_package/index.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
      {
        path: "create",
        name: "data_package.create",
        component: () =>
          import(
            /* webpackChunkName:"Data_package Create" */ "../components/forms/packages/data_package/Create.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
      {
        path: "edit/:data_package_id",
        name: "data_package.edit",
        component: () =>
          import(
            /* webpackChunkName:"Data_package Edit" */ "../components/forms/packages/data_package/Edit.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
      {
        path: "simtype/:data_package_id",
        name: "data_package.simtype",
        component: () =>
          import(
            /* webpackChunkName:"Data_package Create" */ "../views/packages/data_package/fill_simtype.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
    ],
  },

  //Banner
  {
    path: "/banner",
    component: () =>
      import(/* webpackChunkName:"Banner" */ "../views/banner/banner.vue"),
    meta: {
      layout: "admin",
      requiredAuth: true,
      menu: "users",
    },
    children: [
      {
        path: "",
        name: "banner.index",
        component: () =>
          import(
            /* webpackChunkName:"Banner index" */ "../views/banner/index.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
      {
        path: "create",
        name: "banner.create",
        component: () =>
          import(
            /* webpackChunkName:"Banner Create" */ "../components/forms/banner/Create.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
      {
        path: "edit/:banner_id",
        name: "banner.edit",
        component: () =>
          import(
            /* webpackChunkName:"Banner Edit" */ "../components/forms/banner/Edit.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
    ],
  },

  //Contact
  {
    path: "/contact",
    component: () =>
      import(/* webpackChunkName:"Contact" */ "../views/contact/contact.vue"),
    meta: {
      layout: "admin",
      requiredAuth: true,
      menu: "users",
    },
    children: [
      {
        path: "",
        name: "contact.index",
        component: () =>
          import(
            /* webpackChunkName:"Contact index" */ "../views/contact/index.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
      //  {
      //   path:"create",
      //   name:"contact.create",
      //   component: () => import(/* webpackChunkName:"Contact Create" */ '../components/forms/contact/Create.vue'),
      //   meta:{
      //     layout:'admin',
      //   }

      // },
      {
        path: "edit/:contact_id",
        name: "contact.edit",
        component: () =>
          import(
            /* webpackChunkName:"Contact Edit" */ "../components/forms/contact/Edit.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
      {
        path: "/add-title",
        name: "contact.add-title",
        component: () =>
          import(
            /* webpackChunkName:"Contact Add title" */ "../views/contact/add-title.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
    ],
  },

  // Call abroad

  {
    path: "/call-abroad",
    component: () => import(/* webpackChunkName:"Call Abroad" */ "../views/call-abroad/call-abroad.vue"),
    meta: {
        middleware: [Middleware.auth],
        layout: "admin",
      },

      children:[
          {
              path:"",
              name:"call-abroad.index",
              component: () => import(/* webpackChunkName:"Call Abroad Index" */ "../views/call-abroad/index.vue"),
              meta: {
                  middleware: [Middleware.auth],
                  layout: "admin",
                },
          },
          {
            path:"/Create",
            name:"call-abroad.create",
            component: () => import(/* webpackChunkName:"Call Abroad Create" */ "../components/forms/call-abroad/Create.vue"),
            meta: {
                middleware: [Middleware.auth],
                layout: "admin",
              },
        },
        {
          path:"/Edit/:id",
          name:"call-abroad.edit",
          component: () => import(/* webpackChunkName:"Call Abroad Edit" */ "../components/forms/call-abroad/Edit.vue"),
          meta: {
              middleware: [Middleware.auth],
              layout: "admin",
            },
      }
      ]
  },

  //Chat List
  {
    path: "/chat_list",
    name: "chat_list.index",
    component: () =>
      import(
        /* webpackChunkName:"chat_question" */ "../views/chat_list/index.vue"
      ),
    meta: {
      layout: "admin",
      requiredAuth: true,
      menu: "users",
    },

    // beforeRouteEnter (to, from, next) {
    //     next(vm => {
    //         console.log('chat_list')
    //     })
    // },
    //
    // beforeRouteLeave (to, from, next) {
    //     const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    //     if (answer) {
    //         next()
    //     } else {
    //         next(false)
    //     }
    // }
  },

  //Chat Question
  {
    path: "/chat_question",
    component: () =>
      import(
        /* webpackChunkName:"chat_question" */ "../views/chat_question/chat_question.vue"
      ),
    meta: {
      layout: "admin",
      requiredAuth: true,
      menu: "users",
    },
    children: [
      {
        path: "",
        name: "chat_question.index",
        component: () =>
          import(
            /* webpackChunkName:"chat_question index" */ "../views/chat_question/index.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
      {
        path: "create",
        name: "chat_question.create",
        component: () =>
          import(
            /* webpackChunkName:"chat_question Create" */ "../components/forms/chat_question/Create.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
      {
        path: "edit/:chat_question_id",
        name: "chat_question.edit",
        component: () =>
          import(
            /* webpackChunkName:"chat_question Edit" */ "../components/forms/chat_question/Edit.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
    ],
  },

  //Chat Sub Question
  {
    path: "/chat_sub_question",
    component: () =>
      import(
        /* webpackChunkName:"chat_sub_question" */ "../views/chat_question/chat_sub_question/chat_sub_question.vue"
      ),
    meta: {
      layout: "admin",
      requiredAuth: true,
      menu: "users",
    },
    children: [
      {
        path: ":chat_question_id",
        name: "chat_sub_question.index",
        component: () =>
          import(
            /* webpackChunkName:"chat_sub_question index" */ "../views/chat_question/chat_sub_question/index.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
      {
        path: "create/:chat_question_id",
        name: "chat_sub_question.create",
        component: () =>
          import(
            /* webpackChunkName:"chat_sub_question Create" */ "../components/forms/chat_question/chat_sub_question/Create.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
    ],
  },

  {
    path: "/chat_test",
    name: "chat_test.index",
    component: () =>
      import(
        /* webpackChunkName:"chat_sub_question index" */ "../views/chat_question/chat_test/index.vue"
      ),
    meta: {
      layout: "admin",
      requiredAuth: true,
      menu: "users",
    },
  },

  {
    path: "/chat_test2",
    component: () =>
      import(
        /* webpackChunkName:"chat_sub_question" */ "../views/chat_question/chat_test2/chat_test2.vue"
      ),
    meta: {
      layout: "admin",
      requiredAuth: true,
      menu: "users",
    },
    children: [
      {
        path: "",
        name: "chat_test2.index",
        component: () =>
          import(
            /* webpackChunkName:"chat_sub_question index" */ "../views/chat_question/chat_test2/index.vue"
          ),
        meta: {
          middleware: [Middleware.auth],
          layout: "admin",
        },
      },
    ],
  },
  //  report customer
  {
    path: "/report-customer",
    name: "Customer",
    component: ReportCustomer,
    meta: {
      layout: "admin",
      requiredAuth: true,
      menu: "users",
    },
  },

  // report event

  {
    path: "/report-event",
    name: "Event",
    component: ReportEvent,
    meta: {
      layout: "admin",
      requiredAuth: true,
      menu: "users",
    },
  },
  //     report promotion
  {
    path: "/report-promotion",
    name: "Promotion",
    component: ReportPromotion,
    meta: {
      layout: "admin",
      requiredAuth: true,
      menu: "users",
    },
  },
  //jobRecruit
  // {
  //     path: "/jobRecruit",
  //     component: () => import(/* webpackChunkName:"jobRecruit" */'../views/jobRecruit/index'),
  //     meta: {
  //         layout: 'admin'
  //     },
  //     children: [
  //         {
  //             path: "",
  //             name: "jobRecruit.index",
  //             component: () => import(/* webpackChunkName:"jobRecruit index" */'../views/jobRecruit/index.vue'),
  //             meta: {
  //                 layout: "admin"
  //             }
  //         },
  //         // {
  //         //     path: "create",
  //         //     name: "contact.create",
  //         //     component: () => import(/* webpackChunkName:"Contact Create" */ '../components/forms/contact/Create.vue'),
  //         //     meta: {
  //         //         layout: 'admin',
  //         //     }
  //         //
  //         // },
  //         // {
  //         //     path: "edit",
  //         //     name: "contact.edit",
  //         //     component: () => import(/* webpackChunkName:"Contact Edit" */ '../components/forms/contact/Edit.vue'),
  //         //     meta: {
  //         //         layout: 'admin',
  //         //     }
  //         //
  //         // },
  //     ]
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// function nextCheck(context, middleware, index) {
//     const nextMiddleware = middleware[index];
//
//     if (!nextMiddleware) return context.next;
//
//     return (...parameters) => {
//         context.next(...parameters);
//         const nextMidd = nextCheck(context, middleware, index + 1);
//
//         nextMiddleware({...context, nextMidd});
//     }
// }
//
// router.beforeEach((to, from, next) => {
//     if (to.meta.middleware) {
//         const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware]
//         const ctx = {
//             from,
//             next,
//             router,
//             to
//         }
//         const nextMiddleware = nextCheck(ctx, middleware, 1);
//         return middleware[0]({...ctx, nextMiddleware});
//     }
//     return next();
// })

router.beforeEach((to, from, next) => {
  // if(to.path === '/chat_list'){
  //     console.log('GGEZ')
  // }

  if (to.meta.requiredAuth) {
    const authUser = localStorage.getItem("access_token");
    if (!authUser) {
      next({ name: "Login" });
    }
    if (store.state.menus[to.meta.menu]) {
      const authUserRole = localStorage.getItem("roleUser");
      if (
        store.state.menus[to.meta.menu].roles.includes(
          (authUserRole || "").toLowerCase()
        )
      ) {
        next();
      } else {
        next("/access-denied");
      }
    }
  } else {
    next();
  }
});
export default router;
