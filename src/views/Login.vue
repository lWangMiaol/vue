<template>
  <div class="login">
    <form @submit.prevent="login">
      <p>
        <van-field ref="username" v-model="username" label="用户" placeholder="请输入用户名" />
      </p>
      <p>
        <van-field ref="password" v-model="password" label="密码" placeholder="请输入密码" />
      </p>
      <van-button type="primary" style="width:100%">登录</van-button>
    </form>
    <!-- 组件调用弹出框 -->
    <!-- <van-dialog v-model="show" title="标题" show-cancel-button>
      <img width="100%" src="https://img.yzcdn.cn/vant/apple-3.jpg" />
    </van-dialog> -->
  </div>
</template>

<script>
// import axios from "axios"

import { instance2 } from "@/utils/http";
import Vue from "vue";
import { Button, Field, Dialog } from "vant";
Vue.use(Button);
Vue.use(Field);
// Vue.use(Dialog);//组件调用

export default {
  data() {
    return {
      username: "",
      password: "",
      // show:true
    };
  },
  methods: {
    login() {
      if (!this.username.trim() || !this.password.trim()) {
        Dialog({ message: "请输入用户名密码！" });
        // alert("请输入用户名密码！");
        return false;
      }
      //请求接口http://47.96.0.211:3000/api/user/loginin post请求需要携带名称密码
      instance2
        .post("/api/user/loginin", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          console.log("login===>", res);
          localStorage.setItem("token", res.token);
          this.$router.push("/center");
        })
        .catch(err => {
          Dialog.confirm({
            title: "标题",
            message: err
          })
            .then(() => {
              console.log("点击了确定");
            })
            .catch(() => {
              console.log("点击了取消");
            })
            .finally(() => {
              // console.log(this)
              this.$refs.username.value = "";
              this.$refs.password.value = "";
              this.$refs.username.focus();
              // this.username=""
              // this.password=""
            });
        });
    }
  }
};
</script>

<style lang='scss' scoped>
form {
  background: #ccc;
  position: fixed;
  width: 100%;
  top: 2rem;
  padding: 12px;
  p {
    margin-bottom: 10px;
  }
}
</style>
