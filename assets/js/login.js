$(function () {
  // 点击注册切换到注册页面
  $("#showReg").on("click", function () {
    $(".login-form").hide();
    $(".reg-form").show();
  });

  // 点击登录切换到登录页面
  $("#showLogin").on("click", function () {
    $(".login-form").show();
    $(".reg-form").hide();
  });

  // 给注册内容添加验证
  let form = layui.form;
  form.verify({
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    passPwd: function (value) {
      let pwd = $("#pwd").val();
      if (pwd !== value) {
        return "两次密码不一致";
      }
    },
  });

  // 发送注册ajax
  $(".reg-form").on("submit", function (e) {
    e.preventDefault();
    let value = $(this).serialize();
    // console.log(value);

    // 发送ajax
    axios
      .post("http://api-breakingnews-web.itheima.net/api/reguser", value)
      .then(function (res) {
        if (res.data.status !== 0) {
          return layer.msg(res.data.message);
        }
        layer.msg(res.data.message);
        $("#showLogin").click();
      });
  });
});
