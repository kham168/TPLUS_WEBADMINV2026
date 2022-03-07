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
import PromotionEvent from "@/store/Posts/PromotionEvent.js"
import ChatQuestion from "@/store/ChatQuestion.js"
import Chat from "@/store/Chat.js"
import Topping from "@/store/Topping.js"
import PackageType from "@/store/Packages/PackageType.js"
import SimTypePackage from "@/store/Packages/SimTypePackage.js"

//get all users
import users from "./Users"
import Logo from "@/store/logo"
import position from "@/store/position"
import permission from "@/store/permission";
import role from "@/store/role"
import report from '../store/report'


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
        menus: {
            users: {
                roles: ["super-admin", "admin","Employee"]
            }
        },

        // Modal Call  abroad
        DeleteCallAbroadModal:false,
        CallAbroadId:null,
    },
    getters:{
     getCallAbroadId: state => state.CallAbroadId
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
        },
        isDeleteCallAbroadModal(state,id){
         state.DeleteCallAbroadModal = !state.DeleteCallAbroadModal
         state.CallAbroadId = id
        }

    },
    actions: {
        action_Notifi_Success({commit}, {message}) {
            commit('SET_NOTIFICATION_SUCCESS', {message});
        },
        action_Notifi_Error({commit}, {message}) {
            commit('SET_NOTIFICATION_ERROR', {message});
        },

    },
    modules: {
        User,
        users,
        Logo,
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
        PromotionEvent,
        ChatQuestion,
        Chat,
        Topping,
        report,
        PackageType,
        SimTypePackage
    },




})
