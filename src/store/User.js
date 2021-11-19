import axios from "axios";
import router from "@/router";

const $axios = axios.create(
    {
        baseURL: process.env.VUE_APP_BASE_API_URL,
    }
);

const state = {
    token: localStorage.getItem('access_token') || null,
    userProfile: {},
    msgErrors: '',
};

const getters = {
    LoggedIn(state) {
        return state.token !== null;
    },
    getUserType(state) {
        let profile = window.localStorage.getItem('user_profile');
        if (profile) {
            try {
                profile = JSON.parse(profile);
            } catch (err) {
                profile = {}
            }
        } else {
            profile = {};
        }

        if (Object.keys(state.userProfile).length) {
            return state.userProfile;
        }
        return profile.role_user;
    },
    getToken(state) {
        return state.token;
    },
    isAuth(state) {
        return state.token && state.token !== null;
    },
    ShowMsgErrors(state){
        return state.msgErrors;
    }
};


const mutations = {
    AdminSigIn(state, token) {
        state.token = token
    },
    destroyToken(state) {
        state.token = null;
    },
    setUserProfile(state, payload) {
        state.userProfile = payload;
    },
    Commit_ErrorLogin(state, payload){
        state.msgErrors = payload;
    }
};


const actions ={
    LoginUser(context, data) {
        return new Promise((resolve, reject) => {
            $axios.post('/login', {
                data: data.username,
                password: data.password
            })
                .then(response => {
                    if (response) {
                        resolve(response)
                        const token = response.data.accessToken;
                        localStorage.setItem('access_token', token);   // ເກັບ Token ໄວ້ໃນ Localstorage ເພື່ອຈະນຳໄປໃຊ້ຂໍຂໍ້ມູນ
                        // context.commit('AdminSigIn', token);
                        // context.commit('setUserProfile', response.data.authUser.roleUser);

                        // window.localStorage.setItem('user_profile', JSON.stringify(response.data.authUser.roleUser));
                        // $axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                        router.push({name:'Dashboard'})
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    } else {
                        // context.commit('error_msg_login', response.data.msg);
                        // setTimeout(() => {
                        //    context.commit('error_msg_login', '');
                        // }, 3000);
                    }
                }).catch(error => {
                reject(error)
                if (error.response.status == 404) {
                    context.commit('Commit_ErrorLogin', 'ອີເມວ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ...');
                    setTimeout(() => {
                        context.commit('Commit_ErrorLogin', '');
                    }, 3000);
                } else if (error.response.status == 400) {
                    context.commit('Commit_ErrorLogin', 'ອີເມວ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ...');
                    setTimeout(() => {
                        context.commit('Commit_ErrorLogin', '');
                    }, 3000);
                }
            })
        })
    },

    destroyToken(context) {
        if (context.getters.LoggedIn) {
            return new Promise((resolve, reject) => {
                // $axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                // $axios.post('auth/logout')
                //     .then(response => {
                //         resolve(response)
                //     })
                //     .catch((error) => {
                //         reject(error)
                //     })
                    // .finally(response => {
                        // resolve(response)
                        localStorage.removeItem('access_token')     // Remove Item Of Localstorage...
                        localStorage.removeItem('user_profile')     // Remove Item Of Localstorage...
                        context.commit('destroyToken')
                        router.push({
                            name: 'Login'
                        }).catch(() => {});
                    // })
            })
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

