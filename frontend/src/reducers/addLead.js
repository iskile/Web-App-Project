import { types } from "../actions"
import fields from "./fields-data"

const initialValues = fields.reduce((values, field) => {
  values[field.key] = ""
  return values
}, {})

const fields_not_for_display = ["active"]
const initialState = {
  db_fields: {
    private: fields
      .filter(field => field.private)
      .map(field => ({ key: field.key, name: field.name }))
      .filter(f => fields_not_for_display.indexOf(f) < 0),
    public: fields
      .filter(field => !field.private)
      .map(field => ({ key: field.key, name: field.name }))
      .filter(f => fields_not_for_display.indexOf(f.key) < 0),
  },
  values: initialValues,
  errors: {},
  agree_to_terms: false,
  loading: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.ADD_LEAD_FORM_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.error.name]: action.error.value,
        },
      }

    case types.ADD_LEAD_AGREE_TO_TERMS:
      return {
        ...state,
        errors: {},
        agree_to_terms: action.agree_to_terms.value,
      }

    case types.ADD_LEAD_TOGGLE_LOADING:
      return {
        ...state,
        loading: action.loading,
      }

    case types.ADD_LEAD_CLEAR_FORM:
      return {
        ...state,
        values: initialValues,
        errors: {},
        agree_to_terms: state.agree_to_terms,
      }

    case types.ADD_LEAD_HANDLE_FORM_CHANGE:
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.name]: action.payload.value,
        },
        errors: {},
      }

    case types.ADD_LEAD_GET_DB_FIELDS:
      return {
        ...state,
        db_fields: action.db_fields,
      }
    default:
      return state
  }
}
