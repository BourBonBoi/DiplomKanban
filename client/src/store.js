import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import boardSlice from "./features/board/boardSlice";
import themeSlice from "./features/theme/themeSlice";
import sidebarSlice from "./features/sidebarSlice/sidebarSlice";
import logoutSlice from "./features/logoutSlice/logoutSlice";
import taskSlice from "./features/task/taskSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        board: boardSlice,
        theme: themeSlice,
        sidebar: sidebarSlice,
        logout: logoutSlice,
        task: taskSlice
    }
});

export default store;