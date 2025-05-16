import {createSlice} from "@reduxjs/toolkit";
import {addThemeToLocalStorage, getThemeFromLocalStorage} from "../../utils/localStorage";

const initialState = {
    theme: getThemeFromLocalStorage() || 'dark',
}

const themeSlice = createSlice({
    name: 'themeSlice',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            const color = action.payload;
            state.theme = color;
            addThemeToLocalStorage(color)
        }
    }
});

export default themeSlice.reducer;

export const {setTheme} = themeSlice.actions;