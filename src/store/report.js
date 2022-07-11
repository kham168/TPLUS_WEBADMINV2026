import axios from "axios";
import store from "@/store/index";

const $axios = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL_TEST,
});

const state = {
  Customer: {},
  Activities: [],
  Promotions: [],
  Packages: [],
  News: [],
};

const getters = {
  Customers: (state) => state.Customer,
  Activities: (state) => state.Activities,
  Promotions: (state) => state.Promotions,
  DataPackages: (state) => state.Packages,
  DataNews: (state) => state.News,
};

const mutations = {
  Fetch_Data_Customer(state, payload) {
    var totalActive = payload.rows.filter(
      (item) => item.status == "active"
    ).length;
    var totalInActive = payload.rows.filter(
      (item) => item.status == "inactive"
    ).length;
    let data = {
      rows: payload.rows,
      all: payload.count,
      active: totalActive,
      inactive: totalInActive,
    };
    state.Customer = data;
    console.log(data);
  },
  Fetch_Data_Activity(state, data) {
    state.Activities = data;
  },
  Fetch_Data_Promotions(state, data) {
    state.Promotions = data;
  },

  Fetch_Data_Packages(state, data) {
    state.Packages = data;
  },

  Fetch_Data_News(state, data){
    state.News = data;
  }
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
      }
      commit("Fetch_Data_Promotions", arr);
    });
  },
  async getPromotionByDate({ commit }, date) {
    await $axios
      .get("report-between-promotion", {
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
          commit("Fetch_Data_Promotions", arr);
        }
      });
  },

  //get data  package for reporting
  async getDataPackages({ commit }, data) {
    let lang = localStorage.getItem("lang") || "en";
    await $axios
      .get("report-packages", {
        params: { lang: lang, filter: data.packageType, cate_id: data.catId },
      })
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data.data);
          let data = res.data.data.NewPackages;
          let type_name;
          var arr = [];
          if (localStorage.getItem("lang") == "en") {
            for (const i in data) {
              arr[i] = {
                image: data[i].NewPackageTrans[0].image,
                packageCode: data[i].code,
                packageName: data[i].NewPackageTrans[0].name,
                catId: data[i].catePackage_Id,
                detail: data[i].NewPackageTrans[0].detail,
              };
            }
          } else {
            for (const i in data) {
              arr[i] = {
                image: data[i].image,
                packageCode: data[i].code,
                packageName: data[i].name,
                catId: data[i].catePackage_Id,
                detail: data[i].detail,
              };
            }
          }
          commit("Fetch_Data_Packages", arr);
        }
      });
  },

  // get data news
  async getDataNews({ commit }, body) {
    await $axios.get("report-news", { params: body }).then((res) => {
      if (res.status == 200) {
        let data = res.data.data[0].Posts;
        let arr = [];
        if (localStorage.getItem("lang") == "en") {
          for (const i in data) {
            arr[i] = {
              title: data[i].PostTrans[0].title,
              description: data[i].PostTrans[0].description,
              image: data[i].PostImageTrans[0].image,
              status: data[i].status,
            };
          }
        }else{
          for (const i in data) {
            arr[i] = {
              title: data[i].title,
              description: data[i].description,
              image: data[i].PostImages[0].image,
              status: data[i].status,
            };
          }
        }
        commit("Fetch_Data_News", arr);
      }
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
