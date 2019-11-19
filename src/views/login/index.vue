<template>
  <div class="login">
    <p class="title">
      <Icon type="md-planet" size="50"></Icon>
      <span>CNode</span>
    </p>

    <Form ref="form" :model="form" :rules="rules">
      <FormItem prop="user">
        <Input type="text" v-model="form.user" prefix="ios-person-outline" placeholder="Username" />
      </FormItem>
      <FormItem prop="password">
        <Input
          type="password"
          v-model="form.password"
          prefix="ios-lock-outline"
          placeholder="Password"
        />
      </FormItem>
      <FormItem>
        <Button class="submit-btn" type="primary" @click="handleSubmit">登录</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { value } from 'vue-function-api'
import { setToken } from '@/utils/auth'

export default {
  name: 'Login',
  setup (props, context) {
    const form = value({
      user: '',
      password: ''
    })

    const rules = value({
      user: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        {
          type: 'string',
          min: 6,
          message: '密码长度必须大于6位',
          trigger: 'blur'
        }
      ]
    })

    const handleSubmit = () => {
      context.refs.form.validate()

      try {
        context.root.$Message.success('登录成功')
        setToken(form.value)
        context.root.$router.replace({
          path: 'dashboard',
          query: { tab: 'all', page: 1 }
        })
      } catch (error) {
        context.root.$Message.error('登录失败')
      }
    }

    return {
      form,
      rules,
      handleSubmit
    }
  }
}
</script>

<style lang="less" scoped>
@media screen and (min-width: 600px) {
  .login {
    width: 30%;
  }
}

@media screen and (max-width: 599px) {
  .login {
    width: 85%;
  }
}

.login {
  position: absolute;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .title {
    width: 150px;
    margin: 0 auto 15px;

    span {
      font-size: 30px;
    }
  }

  .ivu-form {
    .submit-btn {
      width: 100%;
    }
  }
}
</style>
