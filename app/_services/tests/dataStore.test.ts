import "./mocks/localStorageMock";
import api from "../dataStore";

describe("dataStore API", () => {
  describe("task", () => {
    describe("store", () => {
      it("creates a new task", () => {
        const response = api.task.store({
          name: "Task1",
          desc: "Task1",
        });

        expect(response.success).toBe(true);
        expect(response.data).toEqual([
          {
            name: "Task1",
            desc: "Task1",
            subtasks: [],
          },
        ]);
      });
    });

    describe("index", () => {
      it("returns all task data", () => {
        const response = api.task.index();

        expect(response.success).toBe(true);
        expect(response.data).toEqual([
          {
            name: "Task1",
            desc: "Task1",
            subtasks: [],
          },
        ]);
      });
    });

    describe("show", () => {
      it("returns a task by index", () => {
        const response = api.task.show(0);

        expect(response.success).toBe(true);
        expect(response.data).toEqual({
          name: "Task1",
          desc: "Task1",
          subtasks: [],
        });
      });

      it("unsuccessful if task not found", () => {
        const response = api.task.show(999);

        expect(response.success).toBe(false);
      });
    });

    describe("update", () => {
      it("updates name and description", () => {
        const response = api.task.update(0, {
          name: "Task1Updated",
          desc: "Task1Updated",
        });

        expect(response.success).toBe(true);
        expect(response.data).toEqual([
          {
            name: "Task1Updated",
            desc: "Task1Updated",
            subtasks: [],
          },
        ]);
      });

      it("updates task index", () => {
        api.task.store({
          name: "Task2",
          desc: "Task2",
        });

        const response = api.task.update(0, {
          newIndex: 1,
        });

        expect(response.success).toBe(true);
        expect(response.data).toEqual([
          {
            name: "Task2",
            desc: "Task2",
            subtasks: [],
          },
          {
            name: "Task1Updated",
            desc: "Task1Updated",
            subtasks: [],
          },
        ]);
      });

      it("unsuccessful if task not found", () => {
        const response = api.task.update(999, {});

        expect(response.success).toBe(false);
      });
    });

    describe("delete", () => {
      it("deletes a task", () => {
        const response = api.task.delete(0);

        expect(response.success).toBe(true);
        expect(response.data).toEqual([
          {
            name: "Task1Updated",
            desc: "Task1Updated",
            subtasks: [],
          },
        ]);
      });

      it("unsuccessful if task not found", () => {
        const response = api.task.delete(999);

        expect(response.success).toBe(false);
      });
    });
  });

  describe("subtask", () => {
    describe("store", () => {
      it("adds a new subtask", () => {
        const response = api.subtask.store(0, {
          name: "SubTask1",
        });

        expect(response.success).toBe(true);
        expect(response.data).toEqual([
          {
            name: "SubTask1",
            value: false,
          },
        ]);
      });

      it("unsuccessful if task not found", () => {
        const response = api.subtask.store(999, {
          name: "SubTask1",
        });

        expect(response.success).toBe(false);
      });
    });

    describe("update", () => {
      it("updates name and description", () => {
        const response = api.subtask.update(0, 0, {
          name: "SubTask1Updated",
          value: true,
        });

        expect(response.success).toBe(true);
        expect(response.data).toEqual([
          {
            name: "SubTask1Updated",
            value: true,
          },
        ]);
      });

      it("updates subtask index", () => {
        api.subtask.store(0, {
          name: "SubTask2",
          value: false,
        });

        const response = api.subtask.update(0, 0, {
          newIndex: 1,
        });

        expect(response.success).toBe(true);
        expect(response.data).toEqual([
          {
            name: "SubTask2",
            value: false,
          },
          {
            name: "SubTask1Updated",
            value: true,
          },
        ]);
      });

      it("unsuccessful if task not found", () => {
        const response = api.subtask.update(999, 0, {});

        expect(response.success).toBe(false);
      });

      it("unsuccessful if subtask not found", () => {
        const response = api.subtask.update(0, 999, {});

        expect(response.success).toBe(false);
      });
    });

    describe("delete", () => {
      it("deletes a subtask", () => {
        const response = api.subtask.delete(0, 0);

        expect(response.success).toBe(true);
        expect(response.data).toEqual([
          {
            name: "SubTask1Updated",
            value: true,
          },
        ]);
      });

      it("unsuccessful if task not found", () => {
        const response = api.subtask.delete(999, 0);

        expect(response.success).toBe(false);
      });

      it("unsuccessful if subtask not found", () => {
        const response = api.subtask.delete(0, 999);

        expect(response.success).toBe(false);
      });
    });
  });
});
