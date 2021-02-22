<template>
  <b-container fluid>
    <b-row class="mt-5 px-3">
      <b-col cols="3">
        <app-form
          :itemForEdit="editedItem"
          :onSubmit="handleOnSubmit"
          :onReset="handleOnReset"
        />
      </b-col>
      <b-col cols="9">
        <app-table
          :items="tableItems"
          :editItem="handleEditItem"
          :removeItem="handleRemoveItem"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AppForm from './components/AppForm.vue'
import AppTable from './components/AppTable.vue'
import ApiService from './services/api'

export default {
  data() {
    return {
      tableItems: [],
      editedItem: null,
    }
  },
  components: {
    AppForm,
    AppTable,
  },
  methods: {
    handleEditItem(item) {
      this.editedItem = item
    },
    handleRemoveItem(id) {
      this.showConfirmDialog('Are you sure you want to remove this item?', async () => {
        this.tableItems = await ApiService.removeItem(id)
      })
    },
    handleOnSubmit(item, id) {
      const action = this.editedItem ? 'update' : 'create'
      this.showConfirmDialog(`Are you sure you want to ${action} item?`, async () => {
        this.tableItems = await this.editedItem
          ? ApiService.updateItem(id, item)
          : ApiService.addItem(item)
        this.handleOnReset()
      })
    },
    handleOnReset() {
      this.editedItem = null
    },
    showConfirmDialog(msg, confirmCallback, rejectCallback) {
      this.$bvModal.msgBoxConfirm(msg, {
        title: 'Please Confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'primary',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true,
      })
        .then((result) => {
          result
            ? confirmCallback()
            : rejectCallback()
        })
    },
  },
  async mounted() {
    this.tableItems = await ApiService.getList()
  },
}
</script>
