import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlantInfo } from '../types';

interface PlantState {
  selectedPlant: string | null;
  plantInfo: PlantInfo | null;
  image: File | null;
}

const initialState: PlantState = {
  selectedPlant: null,
  plantInfo: null,
  image: null,
};

const plantSlice = createSlice({
  name: 'plant',
  initialState,
  reducers: {
    setSelectedPlant: (state, action: PayloadAction<string>) => {
      state.selectedPlant = action.payload;
    },
    setPlantInfo: (state, action: PayloadAction<PlantInfo | null>) => {
      state.plantInfo = action.payload;
    },
    setImage: (state, action: PayloadAction<File | null>) => {
      state.image = action.payload;
    },
    clearPlantInfo: (state) => {
      state.plantInfo = null;
      state.image = null;
    },
  },
});

export const { setSelectedPlant, setPlantInfo, setImage, clearPlantInfo } = plantSlice.actions;
export default plantSlice.reducer;
