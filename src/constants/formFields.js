import { required, minLength } from 'vuelidate/lib/validators'

export const formFields = [
  {
    key: 'title',
    label: 'Title',
    type: 'text',
    rules: {
      required,
      minLength: 3,
    },
  },
  {
    key: 'desc',
    label: 'Description',
    type: 'text',
    sortable: true,
  },
  {
    key: 'platform',
    label: 'Platform',
    type: 'select',
    options: ['MacOS', 'Linux', 'Windows', 'iOS', 'Android'],
    rules: {
      required,
    },
  },
  {
    key: 'downloads',
    label: 'Downloads',
    type: 'number',
  },
  {
    key: 'revenue',
    label: 'Revenue',
    type: 'number',
  },
  {
    key: 'date',
    label: 'Date',
    type: 'date',
    rules: {
      required,
    },
  },
]

function getFieldKeys() {
  const fieldKeys = {}
  formFields.forEach(({ key }) => {
    fieldKeys[key] = null
  })

  return fieldKeys
}

function getFieldsValidation() {
  const fieldsValidation = {}
  formFields.forEach(({ key, rules }) => {
    fieldsValidation[key] = {
      ...rules,
      minLength: minLength(rules?.minLength || 0),
    }
  })

  return fieldsValidation
}

export const fieldsKeys = getFieldKeys()

export const fieldsValidation = getFieldsValidation()
