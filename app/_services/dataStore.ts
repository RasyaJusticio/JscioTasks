interface Task {
  name: string;
  desc: string;
  subtasks: SubTask[];
}
interface SubTask {
  name: string;
  value: boolean;
}
interface Response {
  success: boolean;
  data?: Task[] | Task | SubTask[] | SubTask;
}
function fetchData(): Task[] {
  return JSON.parse(localStorage.getItem("task-data") || "[]");
}

function saveData(data: Task[]) {
  const stringifiedData = JSON.stringify(data);
  localStorage.setItem("task-data", stringifiedData);
}

const api = {
  task: {
    index: (): Response => {
      return {
        success: true,
        data: fetchData(),
      };
    },

    show: (index: number): Response => {
      const data = fetchData();

      if (data[index] == null) {
        return {
          success: false,
        };
      }

      return {
        success: true,
        data: data[index],
      };
    },

    store: (args: { name: string; desc?: string }): Response => {
      const data = fetchData();

      data.push({
        name: args.name,
        desc: args.desc || "",
        subtasks: [],
      });

      saveData(data);

      return {
        success: true,
        data,
      };
    },

    update: (
      index: number,
      args: { name?: string; desc?: string; newIndex?: number }
    ): Response => {
      const data = fetchData();

      const task = data[index];
      if (task == null) {
        return {
          success: false,
        };
      }

      const updatedTask: Task = {
        name: args.name ?? task.name,
        desc: args.desc ?? task.desc,
        subtasks: task.subtasks,
      };
      data.splice(index, 1, updatedTask);

      if (args.newIndex && index !== args.newIndex) {
        data.splice(index, 1);
        data.splice(args.newIndex, 0, updatedTask);
      }

      saveData(data);

      return {
        success: true,
        data,
      };
    },

    delete: (index: number): Response => {
      const data = fetchData();

      if (data[index] == null) {
        return {
          success: false,
        };
      }

      data.splice(index, 1);

      saveData(data);

      return {
        success: true,
        data: data,
      };
    },
  },
  subtask: {
    store: (
      taskIndex: number,
      args: { name: string; value?: boolean }
    ): Response => {
      const data = fetchData();

      const task = data[taskIndex];
      if (task == null) {
        return {
          success: false,
        };
      }

      task.subtasks.push({
        name: args.name,
        value: args.value ?? false,
      });

      saveData(data);

      return {
        success: true,
        data: task.subtasks,
      };
    },

    update: (
      index: number,
      taskIndex: number,
      args: { name?: string; value?: boolean; newIndex?: number }
    ): Response => {
      const data = fetchData();

      const task = data[taskIndex];
      if (task == null) {
        return {
          success: false,
        };
      }

      const subtask = task.subtasks[index];
      if (subtask == null) {
        return {
          success: false,
        };
      }

      const updatedSubTask: SubTask = {
        name: args.name ?? subtask.name,
        value: args.value ?? subtask.value,
      };
      task.subtasks.splice(index, 1, updatedSubTask);

      if (args.newIndex && index !== args.newIndex) {
        task.subtasks.splice(index, 1);
        task.subtasks.splice(args.newIndex, 0, updatedSubTask);
      }

      saveData(data);

      return {
        success: true,
        data: task.subtasks,
      };
    },

    delete: (index: number, taskIndex: number): Response => {
      const data = fetchData();

      const task = data[taskIndex];
      if (task == null) {
        return {
          success: false,
        };
      }

      const subtask = task.subtasks[index];
      if (subtask == null) {
        return {
          success: false,
        };
      }

      task.subtasks.splice(index, 1);

      saveData(data);

      return {
        success: true,
        data: task.subtasks,
      };
    },
  },
};

export default api;
