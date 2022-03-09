import axios from "axios";
import store from "@/store/index";

const $axios = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL_TEST,
});

const state = {
  Customer: {},
  Activities: [],
  Promotions: [],
};

const getters = {
  Customers: (state) => state.Customer,
  Activities: (state) => state.Activities,
  Promotions: (state) => state.Promotions,
};

const mutations = {
  Fetch_Data_Customer(state, payload) {
    state.Customer = payload;
  },
  Fetch_Data_Activity(state, data) {
    state.Activities = data;
  },
  Fetch_Data_Promotions(state, data) {
    state.Promotions = data;
  },
};

const actions = {
  async getCustomer({ commit }) {
    const data = await $axios.get("report-users-all/customer");
    commit("Fetch_Data_Customer", data.data.data);
  },

  //   report Activity by calendar
  async getActivityByDate({ commit }, date) {
    await $axios
      .get("report-between-activities", {
        params: {
          startOfDate: date.Fromdate,
          endOfDate: date.Todate,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          const data = res.data.data.find((item) => item.Posts).Posts;
          var arr = [];
          if (localStorage.getItem("lang") == "en") {
            for (const i in data) {
              arr[i] = {
                title: data[i].PostTrans.find((item) => item.title).title,
                description: data[i].PostTrans.find((item) => item.description)
                  .description,
                image: data[i].PostImageTrans.find((item) => item.image).image,
                startDate: data[i].startDate,
                endDate: data[i].endDate,
                status: data[i].status,
              };
            }
          } else {
            for (const i in data) {
              arr[i] = {
                title: data[i].title,
                description: data[i].description,
                image: data[i].PostImages.find((item) => item.image).image,
                startDate: data[i].startDate,
                endDate: data[i].endDate,
                status: data[i].status,
              };
            }
          }
          commit("Fetch_Data_Activity", arr);
        }
      });
  },

  async getActivity({ commit }) {
    await $axios.get("report-activities").then((res) => {
      if (res.status == 200) {
        const data = res.data.data.find((item) => item.Posts).Posts;
        const arr = [];
        if (localStorage.getItem("lang") == "en") {
          for (const i in data) {
            arr[i] = {
              title: data[i].PostTrans.find((item) => item.title).title,
              description: data[i].PostTrans.find((item) => item.description)
                .description,
              image: data[i].PostImageTrans.find((item) => item.image).image,
              startDate: data[i].startDate,
              endDate: data[i].endDate,
              status: data[i].status,
            };
          }
        } else {
          for (const i in data) {
            arr[i] = {
              title: data[i].title,
              description: data[i].description,
              image: data[i].PostImages.find((item) => item.image).image,
              startDate: data[i].startDate,
              endDate: data[i].endDate,
              status: data[i].status,
            };
          }
        }
        commit("Fetch_Data_Activity", arr);
      }
    });
  },

  async getPromotions({ commit }) {
    await $axios.get("report-promotion").then((res) => {
      if (res.status == 200) {
        const data = res.data.data.find((item) => item.Posts).Posts;
        var arr = [];
        if (localStorage.getItem("lang") == "en") {
          for (const i in data) {
            arr[i] = {
              title: data[i].PostTrans.find((item) => item.title).title,
              description: data[i].PostTrans.find((item) => item.description)
                .description,
              image: data[i].PostImageTrans.find((item) => item.image).image,
              startDate: data[i].startDate,
              endDate: data[i].endDate,
              status: data[i].status,
            };
          }
        }else{
          for (const i in data) {
            arr[i] = {
              title: data[i].title,
              description: data[i].description,
              image: data[i].PostImages.find((item) => item.image).image,
              startDate: data[i].startDate,
              endDate: data[i].endDate,
              status: data[i].status,
            };
          }
        }
      }
      commit('Fetch_Data_Promotions',arr)
    });
  },
  async getPromotionByDate({commit},date){
    await $axios.get('report-between-promotion',{
      params:{
        startOfDate: date.Fromdate,
        endOfDate: date.Todate
      }
    }).then((res)=>{
      if(res.status == 200){
        const data = res.data.data.find((item) => item.Posts).Posts;
        var arr = [];
        if (localStorage.getItem("lang") == "en") {
          for (const i in data) {
            arr[i] = {
              title: data[i].PostTrans.find((item) => item.title).title,
              description: data[i].PostTrans.find((item) => item.description)
                .description,
              image: data[i].PostImageTrans.find((item) => item.image).image,
              startDate: data[i].startDate,
              endDate: data[i].endDate,
              status: data[i].status,
            };
          }
        }else{
          for (const i in data) {
            arr[i] = {
              title: data[i].title,
              description: data[i].description,
              image: data[i].PostImages.find((item) => item.image).image,
              startDate: data[i].startDate,
              endDate: data[i].endDate,
              status: data[i].status,
            };
          }
        }
      commit('Fetch_Data_Promotions',arr)
      }
    })
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
