import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BuilderData } from "@/types/jobpostingformbuilder";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

interface FormBuilderState {
  formData: BuilderData;
  isPreviewMode: boolean;
}

const initialState: FormBuilderState = {
  formData: {
    fields: [
      {
        name: "job_title",
        label: "Job Title",
        type: "text",
        required: true,
        multiple: false,
        options: [],
      },
    ],
  },
  isPreviewMode: false,
};

const formBuilderSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    // Replace the entire form formData
    setformData(state, action: PayloadAction<BuilderData>) {
      state.formData = { ...action.payload };
    },

    // Add a new field
    addField(state, action: PayloadAction<any>) {
      state.formData.fields.push(action.payload);
    },

    // Update a specific field by index
    updateField(state, action: PayloadAction<{ index: number; field: any }>) {
      state.formData.fields[action.payload.index] = action.payload.field;
    },

    // Remove a field by index
    removeField(state, action: PayloadAction<number>) {
      state.formData.fields.splice(action.payload, 1);
    },

    // Move a field from one index to another
    moveField(state, action: PayloadAction<{ from: number; to: number }>) {
      const [moved] = state.formData.fields.splice(action.payload.from, 1);
      state.formData.fields.splice(action.payload.to, 0, moved);
    },

    // Toggle between edit and preview mode
    togglePreviewMode(state) {
      state.isPreviewMode = !state.isPreviewMode;
    },
  },
});

export const {
  setformData,
  addField,
  updateField,
  removeField,
  moveField,
  togglePreviewMode,
} = formBuilderSlice.actions;

export const useFormBuilderFormdata = () => {
  const { formData } = useSelector(
    (state: RootState) => state.jobpostingformbuilder
  );
  return formData;
};
export default formBuilderSlice.reducer;
