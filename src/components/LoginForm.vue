<script lang="ts">
import { login } from '@/services';
import { useToast } from 'vue-toast-notification';
import Spin from './Spin.vue';

export default {
  name: 'LoginForm',
  components: {
    Spin,
  },
  props: {
    handleIsLogged: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      email: '',
      password: '',
      loggingIn: false,
    };
  },
  methods: {
    async handleLogin() {
      const $toast = useToast();
      const { email, password } = this;
      if (!email || !password) {
        $toast.error('É necessário informar seu email e senha!');
        this.loggingIn = false;
        return;
      }
      this.loggingIn = true;
      const { error, token } = await login(this.email, this.password);
      if (error) {
        $toast.error(error);
        this.loggingIn = false;
        return;
      }
      localStorage.setItem('token', token!);
      $toast.success('Login realizado com sucesso!');
      this.handleIsLogged(true);
      this.$router.push('/pedidos');
      this.loggingIn = false;
    },
  },
};
</script>
<template>
  <form class="login-form" @submit.prevent="handleLogin">
    <input class="login-input" type="text" v-model="email" placeholder="Digite seu email" />
    <input class="login-input" type="password" v-model="password" placeholder="Digite sua senha" />
    <button class="login-btn" type="submit">
      {{ !loggingIn ? 'Login' : null }}
      <Spin v-if="loggingIn" size="14px" class="spin-btn" />
    </button>
  </form>
</template>
<style scoped>
.login-form {
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.login-input,
.login-btn {
  border: 1px solid #cbcb;
  border-radius: 4px;
  padding: 5px 10px;
}

.login-btn {
  background-color: #222;
  border: 2px solid white;
  color: #fcba03;
  cursor: pointer;
  font-weight: 600;
  transition: 0.5s;
  width: 70px;
}

.login-btn:hover {
  background-color: #fcba03;
  color: #222;
}
.spin-btn {
  margin: 0 auto;
}
</style>
