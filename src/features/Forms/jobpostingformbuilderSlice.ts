import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BuilderData } from "@/types/jobpostingformbuilder";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

interface FormBuilderState {
  definition: BuilderData;
  isPreviewMode: boolean;
}

const initialState: FormBuilderState = {
  definition: {
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
    // Replace the entire form definition
    setDefinition(state, action: PayloadAction<BuilderData>) {
      state.definition = { ...action.payload };
    },

    // Add a new field
    addField(state, action: PayloadAction<any>) {
      state.definition.fields.push(action.payload);
    },

    // Update a specific field by index
    updateField(state, action: PayloadAction<{ index: number; field: any }>) {
      state.definition.fields[action.payload.index] = action.payload.field;
    },

    // Remove a field by index
    removeField(state, action: PayloadAction<number>) {
      state.definition.fields.splice(action.payload, 1);
    },

    // Move a field from one index to another
    moveField(state, action: PayloadAction<{ from: number; to: number }>) {
      const [moved] = state.definition.fields.splice(action.payload.from, 1);
      state.definition.fields.splice(action.payload.to, 0, moved);
    },

    // Toggle between edit and preview mode
    togglePreviewMode(state) {
      state.isPreviewMode = !state.isPreviewMode;
    },
  },
});

export const {
  setDefinition,
  addField,
  updateField,
  removeField,
  moveField,
  togglePreviewMode,
} = formBuilderSlice.actions;

export const selectFormBuilderDefinition = () => {
  const { definition } = useSelector(
    (state: RootState) => state.jobpostingformbuilder
  );
  return definition;
};
export default formBuilderSlice.reducer;
