<template>
  <div>
    <b-form @submit.stop.prevent="handleOnSubmit">
      <b-form-group
        v-for="field of formFields"
        :key="field.key"
        :label="field.label"
      >
        <b-form-select
          v-if="field.type === 'select'"
          :options="field.options"
          v-model="$v.form[field.key].$model"
          :state="validateState(field.key)"
          :input-1-live-feedback="`${field.key}_feedback`"
        />
        <b-form-input
          v-else
          :type="field.type"
          v-model="$v.form[field.key].$model"
          :state="validateState(field.key)"
          :input-1-live-feedback="`${field.key}_feedback`"
        />

        <b-form-invalid-feedback :id="`${field.key}_feedback`">This is a required field.</b-form-invalid-feedback>
      </b-form-group>

      <b-button type="submit" variant="primary">{{submitTitle}}</b-button>
      <b-button class="ml-2" @click="handleResetForm()">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { formFields, fieldsKeys, fieldsValidation } from '../constants/formFields'

export default {
  props: {
    itemForEdit: Object,
    onSubmit: {
      type: Function,
      required: true,
    },
    onReset: {
      type: Function,
      required: true,
    },
  },
  mixins: [validationMixin],
  data() {
    return {
      formFields,
      form: fieldsKeys,
    }
  },
  computed: {
    submitTitle() {
      return this.itemForEdit ? 'Update' : 'Create'
    },
  },
  validations: {
    form: fieldsValidation,
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name]
      return $dirty ? !$error : null
    },
    handleResetForm() {
      this.form = fieldsKeys
      this.onReset()

      this.$nextTick(() => {
        this.$v.$reset()
      })
    },
    handleOnSubmit() {
      this.$v.form.$touch()
      if (this.$v.form.$anyError) {
        return
      }

      this.onSubmit(this.form, this.form.id)
    },
  },
  watch: {
    itemForEdit() {
      if (this.itemForEdit) {
        this.form = { ...this.itemForEdit }
      }
    },
  },
}
</script>
