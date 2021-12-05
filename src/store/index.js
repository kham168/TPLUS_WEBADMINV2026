import Vue from 'vue'
import Vuex from 'vuex'
import User from "@/store/User";
import Post from "@/store/Posts/Post"
import CatePost from "@/store/Posts/CatePost"
import DataPackage from "@/store/Packages/DataPackage"
import CateDataPackage from "@/store/Packages/CateDataPackage"
import Banner from "@/store/Banner"
import Contact from "@/store/Contact"
import Product from "@/store/Products/Product.js"
import CateProduct from "@/store/Products/CateProduct.js"
//get all users
import users from "./Users"
import logo from "@/store/logo"
import position from "@/store/position"
import permission from "@/store/permission";
import role from "@/store/role"


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        roleDialog: false,
        addUserRoles: false,
        editUserRoles: false,
        modalDeleteState: false,
        modalAddState: false,
        modalShowState: false,
        modalNotificationSuccess: {
            type: 'success',
            snackbar: false,
            message: ''
        },
        modalNotificationError: {
            type: 'error',
            snackbar: false,
            message: ''
        },
        modalNotificationWarning: {
            type: 'warning',
            snackbar: false,
            message: ''
        },
        post: {},
        res: {},
        menus: {
            users: {
                roles: ["super-admin", "admin","Employee"]
            }
        }
    },
    mutations: {
        IncrementRole(state) {
            state.roleDialog = !state.roleDialog;
        },
        IncrementUserRole(state) {
            state.addUserRoles = !state.addUserRoles;
        },
        IncrementUserRole_edit(state) {
            state.editUserRoles = !state.editUserRoles;
        },

        SET_NOTIFICATION_SUCCESS(state, message) {
            state.modalNotificationSuccess.snackbar = true;
            state.modalNotificationSuccess.message = message.message;
        },
        SET_NOTIFICATION_ERROR(state, message) {
            state.modalNotificationError.snackbar = true;
            state.modalNotificationError.message = message.message;
        },
        SET_NOTIFICATION_WARNING(state, message) {
            state.modalNotificationWarning.snackbar = true;
            state.modalNotificationWarning.message = message;
        },
        modalDelete_State(state, value) {
            state.modalDeleteState = value;
        },
        modalAdd_State(state, value) {
            state.modalAddState = value;
        },
        modalShow_State(state, value) {
            state.modalShowState = value;
        }

    },
    actions: {
        action_Notifi_Success({commit}, {message}) {
            commit('SET_NOTIFICATION_SUCCESS', {message});
        },
        action_Notifi_Error({commit}, {message}) {
            commit('SET_NOTIFICATION_ERROR', {message});
        },
        async getPost({commit}) {
            const data = await postService.getPost()
            commit('SET_POST', data)
        },
    },
    modules: {
        User,
        users,
        logo,
        position,
        permission,
        role,
        Post,
        CatePost,
        DataPackage,
        CateDataPackage,
        Banner,
        Contact,
        Product,
        CateProduct,
    }
})
