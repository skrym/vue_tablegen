<template>
  <b-table
    :items="items"
    :fields="fields"
    striped
    hover
    show-empty
  >

    <template #cell(number)="row">
      {{row.index + 1}}
    </template>

    <template #cell(actions)="row">
      <b-button
        class="mr-1"
        size="sm"
        @click="editItem(row.item)"
        variant="primary"
        v-b-tooltip.hover
        title="Edit this item"
      >
        <b-icon icon="pencil-fill" variant="light" />
      </b-button>
      <b-button
        size="sm"
        @click="removeItem(row.item.id)"
        variant="danger"
        v-b-tooltip.hover
        title="Remove this item"
      >
        <b-icon icon="x-circle-fill" variant="light" />
      </b-button>
    </template>
  </b-table>
</template>

<script>
import { formFields } from '../constants/formFields'

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    editItem: {
      type: Function,
      required: true,
    },
    removeItem: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      fields: [
        { key: 'number', label: '#' },
        ...formFields,
        { key: 'actions', label: 'Actions' },
      ],
    }
  },
}
</script>
