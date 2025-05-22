import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {nanoid} from "nanoid";
import {filterObject} from "../../utils/objectUtil";
import {authFetch, checkForUnAuthorizedError} from "../../utils/axios";

const initialIDs = [nanoid(), nanoid()];

const initialState = {
    isCreateTaskModalVisible: false,
    isTaskModalVisible: false,
    isEditTaskModalVisible: false,
    isDeleteTaskModalVisible: false,
    alertText: '',
    isLoading: false,
    activeTask: null,
    tasks: {},

    isEditing: false,
    title: '',
    titleError: false,
    description: '',
    status: '',
    subtasks: [
        {
            [initialIDs[0]]: '',
            isCompleted: false
        },
        {
            [initialIDs[1]]: '',
            isCompleted: false
        },
    ],
    subtaskErrors: {
        [initialIDs[0]]: false,
        [initialIDs[1]]: false,
    }
}

export const createTask = createAsyncThunk('createTask', async (payload, thunkAPI) => {
    try {
        const {title, description, status, boardId, subtasks} = payload;

        const subtasksObjects = subtasks.map((item) => {
            return {
                name: Object.values(item)[0],
                isCompleted: false
            }
        });

        const {data} = await authFetch.post('/tasks', {title, description, status, subtasks: subtasksObjects, boardId});
        return data;
    } catch (error) {
        return checkForUnAuthorizedError(error, thunkAPI, setAlertText, closeCreateTaskModal);
    }
});

export const getTasks = createAsyncThunk('getTasks', async (boardId, thunkAPI) => {
    try {
        const {data} = await authFetch.post(`/tasks/${boardId}`);
        return data;
    } catch (error) {
        return checkForUnAuthorizedError(error, thunkAPI);
    }
});

export const updateTask = createAsyncThunk('updateTask', async (payload, thunkAPI) => {
    try {
        const {_id: taskId, title, description, status, boardId, subtasks} = payload;

        const subtasksObjects = subtasks.map((item) => {
            return {
                name: Object.values(item)[0],
                isCompleted: Object.values(item)[1],
                _id: Object.values(item)[2]
            }
        });

        await authFetch.patch(`/tasks/${taskId}`, {title, description, status, boardId, subtasks: subtasksObjects});
        thunkAPI.dispatch(getTasks(boardId));
    } catch (error) {
        return checkForUnAuthorizedError(error, thunkAPI, setAlertText, closeTaskModal);
    }
});

export const deleteTask = createAsyncThunk('deleteTask', async (payload, thunkAPI) => {
    try {
        const {id, boardId} = payload;
        await authFetch.delete(`/tasks/${id}`);
        thunkAPI.dispatch(getTasks(boardId));
    } catch (error) {
        return checkForUnAuthorizedError(error, thunkAPI, setAlertText, closeDeleteTaskModal);
    }
});

const taskSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {
        showCreateTaskModal: (state) => {
            state.isCreateTaskModalVisible = true;
        },
        closeCreateTaskModal: (state) => {
            state.isCreateTaskModalVisible = false;
        },
        showTaskModal: (state) => {
            state.isTaskModalVisible = true;
        },
        closeTaskModal: (state) => {
            state.isTaskModalVisible = false;
        },
        showEditTaskModal: (state) => {
            state.isEditTaskModalVisible = true;
        },
        closeEditTaskModal: (state) => {
            state.isEditTaskModalVisible = false;
        },
        showDeleteTaskModal: (state) => {
            state.isDeleteTaskModalVisible = true;
        },
        closeDeleteTaskModal: (state) => {
            state.isDeleteTaskModalVisible = false;
        },
        setAlertText: (state, action) => {
            state.alertText = action.payload;
        },
        setActiveTask: (state, action) => {
            if (action.payload === null) {
                state.activeTask = null;
            } else {
                state.activeTask = action.payload;
            }
        },
        setTitleError: (state, action) => {
            state.titleError = action.payload;
        },
        setSubtaskErrors: (state, action) => {
            state.subtaskErrors = action.payload;
        },
        resetSubtaskErrors: (state) => {
            Object.keys(state.subtaskErrors).forEach((key) => {
                state.subtaskErrors[key] = false;
            });
        },
        handleTaskChange: (state, action) => {
            const {name, value} = action.payload;
            state[name] = value;
        },
        handleSubtaskChange: (state, action) => {
            const {name, value, checked} = action.payload;

            if (name === 'subtask') {
                const subtasks = state.activeTask.subtasks;
                subtasks.forEach((item) => {
                    if (item._id === value) {
                        item.isCompleted = checked;
                    }
                });
                state.activeTask = {...state.activeTask, subtasks};
                return;
            }

            const subtasks = state.subtasks;
            subtasks.forEach((item) => {
                const prop = Object.keys(item)[0];
                if (prop === name) {
                    item[prop] = value;
                }
            });
            state.subtasks = [...subtasks];
        },
        addRow: (state) => {
            const id = nanoid();
            state.subtasks = [...state.subtasks, {[id]: '', isCompleted: false}];
            state.subtaskErrors = {...state.subtaskErrors, [id]: false};
        },
        removeRow: (state, action) => {
            state.subtasks = state.subtasks.filter((item) => Object.keys(item)[0] !== action.payload);
            state.subtaskErrors = filterObject(state.subtaskErrors, action.payload);
        },
        resetTask: (state, action) => {
            state.title = '';
            state.description = '';
            state.status = action.payload;
            state.subtasks = [
                {
                    [initialIDs[0]]: '',
                    isCompleted: false
                },
                {
                    [initialIDs[1]]: '',
                    isCompleted: false
                },
            ];
            state.subtaskErrors = {
                [initialIDs[0]]: false,
                [initialIDs[1]]: false,
            }
        },
        setIsEditing: (state, action) => {
            state.isEditing = action.payload;

            if (action.payload === true) {
                const ids = state.activeTask.subtasks.map(() => nanoid());
                const values = [];
                const errors = {};
                ids.forEach((id, index) => {
                    const {name, isCompleted} = state.activeTask.subtasks[index];
                    values.push({[id]: name, isCompleted});
                    errors[id] = false;
                });

                state.title = state.activeTask.title;
                state.description = state.activeTask.description;
                state.status = state.activeTask.status;
                state.subtasks = values;
                state.subtaskErrors = errors;
            }
        },
        setStatus: (state, action) => {
            state.status = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createTask.pending, (state) => {
            state.isLoading = true;
        }).addCase(createTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isCreateTaskModalVisible = false;

            const {status} = action.payload.task;
            if (state.tasks[status]) {
                state.tasks = {...state.tasks, [status]: [...state.tasks[status], action.payload.task]};
            } else {
                state.tasks = {...state.tasks, [status]: [action.payload.task]};
            }

            state.title = '';
            state.description = '';
            state.subtasks = [
                {
                    [initialIDs[0]]: '',
                    isCompleted: false
                },
                {
                    [initialIDs[1]]: '',
                    isCompleted: false
                },
            ];
            state.subtaskErrors = {
                [initialIDs[0]]: false,
                [initialIDs[1]]: false,
            }
        }).addCase(createTask.rejected, (state, action) => {
            state.isLoading = true;
            state.alertText = action.payload;
            state.title = '';
            state.description = '';
            state.subtasks = [
                {
                    [initialIDs[0]]: '',
                    isCompleted: false
                },
                {
                    [initialIDs[1]]: '',
                    isCompleted: false
                },
            ];
            state.subtaskErrors = {
                [initialIDs[0]]: false,
                [initialIDs[1]]: false,
            }
        }).addCase(getTasks.pending, (state) => {
            state.isLoading = true;
        }).addCase(getTasks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tasks = action.payload.tasks;
        }).addCase(getTasks.rejected, (state) => {
            state.isLoading = false;
            state.tasks = [];
        }).addCase(updateTask.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateTask.fulfilled, (state) => {
            state.isLoading = false;
            state.isEditing = false;
            state.isTaskModalVisible = false;
            state.isCreateTaskModalVisible = false;
            state.activeTask = null;
            state.title = '';
            state.description = '';
            state.subtasks = [
                {
                    [initialIDs[0]]: '',
                    isCompleted: false
                },
                {
                    [initialIDs[1]]: '',
                    isCompleted: false
                },
            ];
            state.subtaskErrors = {
                [initialIDs[0]]: false,
                [initialIDs[1]]: false,
            }
        }).addCase(updateTask.rejected, (state) => {
            state.isLoading = false;
            state.activeTask = null;
            state.title = '';
            state.description = '';
            state.subtasks = [
                {
                    [initialIDs[0]]: '',
                    isCompleted: false
                },
                {
                    [initialIDs[1]]: '',
                    isCompleted: false
                },
            ];
            state.subtaskErrors = {
                [initialIDs[0]]: false,
                [initialIDs[1]]: false,
            }
        }).addCase(deleteTask.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteTask.fulfilled, (state) => {
            state.isLoading = false;
            state.activeTask = null;
            state.isDeleteTaskModalVisible = false;
        }).addCase(deleteTask.rejected, (state) => {
            state.isLoading = false;
        })
    }
});

export default taskSlice.reducer;

export const {
    showCreateTaskModal,
    closeCreateTaskModal,
    showTaskModal,
    closeTaskModal,
    showEditTaskModal,
    closeEditTaskModal,
    showDeleteTaskModal,
    closeDeleteTaskModal,
    setAlertText,
    setActiveTask,
    setIsEditing,
    setTitleError,
    setSubtaskErrors,
    resetSubtaskErrors,
    handleTaskChange,
    handleSubtaskChange,
    addRow,
    removeRow,
    resetTask,
    setStatus
} = taskSlice.actions;