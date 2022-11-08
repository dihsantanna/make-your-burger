<script lang="ts">
import { deleteOrder, getOrders, getOrdersStatus, updateOrderStatus } from '@/services';
import type { BurgerOrderType, StatusType } from '@/types';
import { useToast } from 'vue-toast-notification';
import Spin from './Spin.vue';

export default {
  name: 'OrderTable',
  components: {
    Spin,
  },
  data() {
    return {
      orders: [] as BurgerOrderType[],
      status: [] as StatusType[],
      loading: true,
      removingOrder: false,
      orderToBeRemoved: 0,
    };
  },
  methods: {
    async getBurgerOrders() {
      const data = await getOrders();
      this.orders = data;
    },
    async getStatus() {
      const data = await getOrdersStatus();
      this.status = data;
    },
    async getData() {
      await this.getBurgerOrders();
      await this.getStatus();
      this.loading = false;
    },
    async updateBurgerStatus(orderId: number, event: Event) {
      const statusId = (event.target as HTMLSelectElement).value;
      const data = await updateOrderStatus(orderId, +statusId);
      this.orders = this.orders.map((order) => (order.id === orderId ? data : order));
    },
    async cancelOrder(orderId: number) {
      this.orderToBeRemoved = orderId;
      this.removingOrder = true;
      const $toast = useToast();
      $toast.clear();
      await deleteOrder(orderId);
      this.orders = this.orders.filter((order) => order.id !== orderId);
      this.removingOrder = false;
      this.orderToBeRemoved = 0;
      $toast.success(`Pedido nº${orderId} cancelado com sucesso!`);
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<template>
  <div class="order-table">
    <div v-if="loading" class="order-table-loading">
      <Spin borderSize="2px" duration="0.5s" size="60px" class="loading-spin" />
    </div>
    <div v-if="!loading">
      <div class="burger-table-header">
        <div class="order-id">#:</div>
        <div>Cliente:</div>
        <div>Pão:</div>
        <div>Carne:</div>
        <div>Opcionais:</div>
        <div>Ações:</div>
      </div>
      <div
        v-for="{ id: orderId, name, bread, meat, optionals, status: orderStatus } in orders"
        :key="`order-${orderId}`"
        class="burger-table-rows"
      >
        <div class="burger-table-row">
          <div class="order-number">{{ orderId }}</div>
          <div>{{ name }}</div>
          <div>{{ bread }}</div>
          <div>{{ meat }}</div>
          <div>
            <ul>
              <li v-for="optional in optionals" :key="`optional-${optional}`">{{ optional }}</li>
            </ul>
          </div>
          <div>
            <select
              name="status"
              class="status"
              @change="(event) => updateBurgerStatus(orderId, event)"
            >
              <option value="" disabled>Selecione o status do Pedido</option>
              <option
                v-for="{ id: statusId, type } in status"
                :key="`status-${statusId}`"
                :value="statusId"
                :selected="type === orderStatus"
              >
                {{ type }}
              </option>
            </select>
            <button class="delete-btn" @click="() => cancelOrder(orderId)">
              {{ removingOrder && orderId === orderToBeRemoved ? null : 'Cancelar' }}
              <Spin v-if="removingOrder && orderId === orderToBeRemoved" class="delete-spin" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.order-table {
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  max-width: 1200px;
  width: 100vw;
}

.order-table div {
  width: 100%;
}

.order-table-loading {
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 100px;
}

.burger-table-header,
.burger-table-rows,
.burger-table-row {
  display: flex;
  flex-wrap: wrap;
}

.burger-table-header {
  border-bottom: 2px solid #333;
  font-weight: 600;
  padding: 12px;
}

.burger-table-header div,
.burger-table-row div {
  width: 19%;
}

.burger-table-row {
  border-bottom: 1px solid #ccc;
  padding: 12px;
  width: 100%;
}

.burger-table-header .order-id,
.burger-table-row .order-number {
  width: 5%;
}

.status,
.delete-btn {
  border-radius: 4px;
}

.status {
  border: 1px solid #cbcb;
  margin-right: 12px;
  padding: 8px;
  width: 50%;
}

.delete-btn {
  background-color: #222;
  border: 2px solid #222;
  color: #fcba03;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  justify-content: center;
  margin: 0 auto;
  padding: 6px;
  transition: 0.5s;
  width: 40%;
}

.delete-btn:hover {
  background-color: transparent;
  color: #222;
}

.delete-spin {
  margin: 0 auto;
}
</style>
