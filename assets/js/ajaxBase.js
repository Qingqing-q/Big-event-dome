// ============================= 优化1. 根路径 =============================
axios.defaults.baseURL = "http://api-breakingnews-web.itheima.net";

// ====================== 优化2. 请求头中携带token信息 ======================
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (config.url.indexOf("/my") !== -1) {
      config.headers.Authorization = localStorage.getItem("token");
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// ========================== 优化3. 优化访问权限 ===========================
// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    console.log(response);
    // 判断token是否正确 如果不正确就执行下述函数
    if (
      response.data.status !== 0 &&
      response.data.message !== "获取用户基本信息成功！"
    ) {
      localStorage.removeItem("token");
      location.href = "/login.html";
    }
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
//
