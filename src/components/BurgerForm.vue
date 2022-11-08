<script lang="ts">
import { getIngredients, postOrder } from '@/services';
import type { BurgerOrderType, IngredientsType } from '@/types';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import Spin from './Spin.vue';

export default {
  name: 'BurgerForm',
  components: {
    Spin,
  },
  data() {
    return {
      ingredients: {} as IngredientsType,
      name: '',
      bread: '',
      meat: '',
      optionals: [] as string[],
      loading: true,
      sendingOrder: false,
    };
  },
  methods: {
    async getIngredients() {
      const data = await getIngredients();
      this.ingredients = data;
      this.loading = false;
    },
    async createOrder(e: Event) {
      e.preventDefault();
      const $toast = useToast();
      $toast.clear();
      try {
        const { name, bread, meat, optionals } = this;
        if (!name || !bread || !meat) {
          $toast.error('Preencha todos os campos!');
          return;
        }
        this.sendingOrder = true;
        const order = {
          name,
          bread,
          meat,
          optionals,
        };

        const response = await postOrder(order as BurgerOrderType);

        $toast.success(`Pedido nº ${response.id} enviado com sucesso!`);
        this.sendingOrder = false;
        this.name = '';
        this.bread = '';
        this.meat = '';
        this.optionals = [] as string[];
      } catch (_error) {
        $toast.error('Desculpe! Ocorreu um erro ao enviar o pedido!');
        this.sendingOrder = false;
      }
    },
  },
  mounted() {
    this.getIngredients();
  },
};
</script>
<template>
  <div v-if="loading" class="form-loading">
    <Spin borderSize="2px" duration="0.5s" size="60px" class="loading-spin" />
  </div>
  <form v-if="!loading" class="burger-form" @submit="createOrder">
    <div class="input-container">
      <label class="input-label" for="name">Nome do Cliente:</label>
      <input type="text" name="name" id="name" v-model="name" placeholder="Digite o seu nome" />
      <span class="required-field">* Campo obrigatório</span>
    </div>
    <div class="input-container">
      <label class="input-label" for="bread">Escolha o pão do seu burger:</label>
      <select name="bread" id="bread" v-model="bread">
        <option value="" disabled>Selecione o tipo do pão</option>
        <option v-for="{ id, type } in ingredients.breads" :key="'bread-' + id" :value="type">
          {{ type }}
        </option>
      </select>
      <span class="required-field">* Campo obrigatório</span>
    </div>
    <div class="input-container">
      <label class="input-label" for="meat">Escolha a carne do seu burger:</label>
      <select name="meat" id="meat" v-model="meat">
        <option value="" disabled>Selecione o tipo de carne</option>
        <option v-for="{ id, type } in ingredients.meats" :key="'meat-' + id" :value="type">
          {{ type }}
        </option>
      </select>
      <span class="required-field">* Campo obrigatório</span>
    </div>
    <div class="input-container optionals-container">
      <label class="input-label optionals-title" for="optionals">Opcionais:</label>
      <div
        v-for="{ id, type } in ingredients.optionals"
        :key="'optional-' + id"
        class="checkbox-container"
      >
        <label>
          <input
            :id="'optional-' + id"
            type="checkbox"
            name="optionals"
            v-model="optionals"
            :value="type"
          />
          {{ type }}
        </label>
      </div>
    </div>
    <div class="input-container">
      <button class="submit-btn" type="submit">
        {{ !sendingOrder ? 'Enviar Pedido' : null }}
        <Spin v-if="sendingOrder" class="spin-btn" />
      </button>
    </div>
  </form>
</template>
<style scoped>
.burger-form,
.form-loading {
  max-width: 500px;
  margin: 0 auto;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.input-label {
  border-left: 3px solid #fcba03;
  color: #222;
  font-weight: 600;
  margin-bottom: 15px;
  padding: 5px 10px;
}

input,
select {
  border: 1px solid #cbcb;
  border-radius: 4px;
  padding: 5px 10px;
  width: 300px;
}

.optionals-container {
  flex-direction: row;
  flex-wrap: wrap;
}

.optionals-title {
  width: 100%;
}

.checkbox-container {
  align-items: center;
  display: flex;
  margin-bottom: 20px;
  width: 50%;
}

.checkbox-container input,
.checkbox-container label {
  cursor: pointer;
  width: auto;
}

.checkbox-container label {
  font-weight: 600;
  margin-left: 6px;
}

.submit-btn {
  background-color: #222;
  border: 2px solid #222;
  border-radius: 4px;
  color: #fcba03;
  cursor: pointer;
  font-size: 1.15rem;
  padding: 10px;
  transition: 0.5s;
  width: 150px;
}

.submit-btn:hover {
  background-color: transparent;
  color: #222;
}

.required-field {
  color: #787878;
  font-size: 0.65rem;
  margin-top: 5px;
}

.loading-spin {
  margin: 120px auto;
}

.spin-btn {
  margin: 0 auto;
}
</style>
