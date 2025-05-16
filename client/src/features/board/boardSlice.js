import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {authFetch, checkForUnAuthorizedError} from "../../utils/axios";
import {nanoid} from "nanoid";
import {filterObject} from "../../utils/objectUtil";

const initialIDs = [nanoid(), nanoid()];

const initialState = {
    isEditBoardModalVisible: false,
    isCreateBoardModalVisible: false,
    isDeleteBoardModalVisible: false,
    alertText: '',
    isLoading: false,
    activeBoard: null,
    boards: [],

    isEditing: false,
    name: '',
    nameError: false,
    columns: [
        {[initialIDs[0]]: ''},
        {[initialIDs[1]]: '',}
    ],
    columnErrors: {
        [initialIDs[0]]: false,
        [initialIDs[1]]: false,
    }
}

export const createBoard = createAsyncThunk('createBoard', async (payload, thunkAPI) => {
    try {
        const {name, columns} = payload;

        const columnsObjects = columns.map((item) => {
            return {column: Object.values(item)[0]}
        });
        const {data} = await authFetch.post('/boards', {name, columns: columnsObjects});
        return data;
    } catch (error) {
        return checkForUnAuthorizedError(error, thunkAPI, setAlertText, closeCreateModal);
    }
});

export const getBoards = createAsyncThunk('getBoards', async (_, thunkAPI) => {
    try {
        const {data} = await authFetch.get('/boards');
        return data;
    } catch (error) {
        return checkForUnAuthorizedError(error, thunkAPI);
    }
});

export const deleteBoard = createAsyncThunk('deleteBoard', async (id, thunkAPI) => {
    try {
        await authFetch.delete(`boards/${id}`);
        thunkAPI.dispatch(getBoards());
    } catch (error) {
        return checkForUnAuthorizedError(error, thunkAPI, setAlertText, closeDeleteModal);
    }
});

export const editBoard = createAsyncThunk('editBoard', async (payload, thunkAPI) => {
    try {
        const {id, name, columns} = payload;

        const columnsObjects = columns.map((item) => {
            return {
                column: Object.values(item)[0],
                _id: Object.values(item)[1]
            }
        });

        const {data} = await authFetch.patch(`boards/${id}`, {name, columns: columnsObjects});
        thunkAPI.dispatch(getBoards());
        return data;
    } catch (error) {
        return checkForUnAuthorizedError(error, thunkAPI, setAlertText, closeCreateModal);
    }
});

const boardSlice = createSlice({
    name: 'boardSlice',
    initialState,
    reducers: {
        showEditModal: (state) => {
            state.isEditBoardModalVisible = true;
        },
        closeEditModal: (state) => {
            state.isEditBoardModalVisible = false;
        },
        showCreateModal: (state) => {
            state.isCreateBoardModalVisible = true;
        },
        closeCreateModal: (state) => {
            state.isCreateBoardModalVisible = false;
        },
        showDeleteModal: (state) => {
            state.isDeleteBoardModalVisible = true;
        },
        closeDeleteModal: (state) => {
            state.isDeleteBoardModalVisible = false;
        },
        setAlertText: (state, action) => {
            state.alertText = action.payload;
        },
        setActiveBoard: (state, action) => {
            if (action.payload === null) {
                state.activeBoard = null;
            } else {
                const [board] = state.boards.filter((board) => board._id === action.payload);
                state.activeBoard = board;
            }
        },
        setNameError: (state, action) => {
            state.nameError = action.payload;
        },
        setColumnErrors: (state, action) => {
            state.columnErrors = action.payload;
        },
        resetColumnErrors: (state) => {
            Object.keys(state.columnErrors).forEach((key) => {
                state.columnErrors[key] = false;
            });
        },
        handleBoardChange: (state, action) => {
            const {name, value} = action.payload;
            state[name] = value;
        },
        handleColumnChange: (state, action) => {
            const {name, value} = action.payload;

            const columns = state.columns;
            columns.forEach((item) => {
                const prop = Object.keys(item)[0];
                if (prop === name) {
                    item[prop] = value;
                }
            })
            state.columns = [...columns];
        },
        addRow: (state) => {
            const id = nanoid();
            state.columns = [...state.columns, {[id]: ''}];
            state.columnErrors = {...state.columnErrors, [id]: false};
        },
        removeRow: (state, action) => {
            state.columns = state.columns.filter((item) => Object.keys(item)[0] !== action.payload)
            state.columnErrors = filterObject(state.columnErrors, action.payload);
        },
        resetBoard: (state) => {
            state.name = '';
            state.columns = [
                {[initialIDs[0]]: ''},
                {[initialIDs[1]]: '',}
            ];
            state.columnErrors = {
                [initialIDs[0]]: false,
                [initialIDs[1]]: false,
            }
        },
        setIsEditing: (state, action) => {
            state.isEditing = action.payload;

            if (action.payload === true) {
                const ids = state.activeBoard.columns.map(() => nanoid());
                const values = [];
                const errors = {};
                ids.forEach((id, index) => {
                    const {column, _id} = state.activeBoard.columns[index];
                    values.push({[id]: column, _id});
                    errors[id] = false;
                });

                state.name = state.activeBoard.name;
                state.columns = values;
                state.columnErrors = errors;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createBoard.pending, (state) => {
            state.isLoading = true;
        }).addCase(createBoard.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isCreateBoardModalVisible = false;
            state.boards = [...state.boards, action.payload.board];
            state.name = '';
            state.columns = [
                {[initialIDs[0]]: ''},
                {[initialIDs[1]]: '',}
            ];
            state.columnErrors = {
                [initialIDs[0]]: false,
                [initialIDs[1]]: false,
            }
        }).addCase(createBoard.rejected, (state) => {
            state.isLoading = false;
            state.name = '';
            state.columns = [
                {[initialIDs[0]]: ''},
                {[initialIDs[1]]: '',}
            ];
            state.columnErrors = {
                [initialIDs[0]]: false,
                [initialIDs[1]]: false,
            }
        }).addCase(getBoards.pending, (state) => {
            state.isLoading = true;
        }).addCase(getBoards.fulfilled, (state, action) => {
            state.isLoading = false;
            state.boards = action.payload.boards;
        }).addCase(getBoards.rejected, (state) => {
            state.isLoading = false;
        }).addCase(deleteBoard.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteBoard.fulfilled, (state) => {
            state.isLoading = false;
            state.activeBoard = null;
            state.isDeleteBoardModalVisible = false;
        }).addCase(deleteBoard.rejected, (state) => {
            state.isLoading = false;
        }).addCase(editBoard.pending, (state) => {
            state.isLoading = true;
        }).addCase(editBoard.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isCreateBoardModalVisible = false;
            state.activeBoard = action.payload.updatedBoard;
            state.isEditing = false;
            state.name = '';
            state.columns = [
                {[initialIDs[0]]: ''},
                {[initialIDs[1]]: '',}
            ];
            state.columnErrors = {
                [initialIDs[0]]: false,
                [initialIDs[1]]: false,
            }
        }).addCase(editBoard.rejected, (state) => {
            state.isLoading = false;
            state.isEditing = false;
            state.name = '';
            state.columns = [
                {[initialIDs[0]]: ''},
                {[initialIDs[1]]: '',}
            ];
            state.columnErrors = {
                [initialIDs[0]]: false,
                [initialIDs[1]]: false,
            }
        })
    }
});

export default boardSlice.reducer;

export const {
    showEditModal,
    closeEditModal,
    showCreateModal,
    closeCreateModal,
    showDeleteModal,
    closeDeleteModal,
    setAlertText,
    setActiveBoard,
    setNameError,
    setColumnErrors,
    resetColumnErrors,
    handleBoardChange,
    handleColumnChange,
    addRow,
    removeRow,
    resetBoard,
    setIsEditing
} = boardSlice.actions;