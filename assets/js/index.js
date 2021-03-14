$(function () {
  // 获得用户信息
  function getUserInfo() {
    // 发送ajax
    axios.get("/my/userinfo").then(function (res) {
      let data = res.data.data;
      let name = data.nickname || data.username;
      if (data.user_pic !== null) {
        $(".layui-nav-img").attr("url", data.user_pic).show();
        $(".text-avatar-box").hide();
      } else {
        $(".layui-nav-img").hide();
        $(".text-avatar-box").show().children().text(name[0].toUpperCase());
      }
      $("#welcome").text("欢迎 " + name);
    });
  }

  getUserInfo();

  // 点击退出
  $("#btnLogout").on("click", function () {
    layer.confirm("确定退出嘛?", { icon: 3, title: "提示" }, function (index) {
      localStorage.removeItem("token");
      location.href = "/login.html";
      layer.close(index); // 关闭窗口
    });
  });
});
