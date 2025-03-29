"use client";

import { MouseEvent, useEffect, useState } from "react";

interface ITodos {
  uuid: string;
  task: string;
}

export default function TodoList() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<ITodos[]>([]);

  const deleteTodo = async (e: MouseEvent<HTMLButtonElement>) => {
    await fetch("/api/todos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uuid: (e.currentTarget.parentElement as HTMLButtonElement).id,
      }),
    });
    fetchTodos();
  };

  const addTodo = async () => {
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: inputValue }),
    });

    setInputValue("");
    fetchTodos();
  };

  const fetchTodos = async () => {
    const response = await fetch("/api/todos");
    const data = await response.json();
    setTodos(data.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
        <div className="flex gap-2">
          <input
            type="text"
            className="border p-1"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="border bg-lime-500 p-1 rounded-md"
            onClick={addTodo}
          >
            등록
          </button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.uuid} id={todo.uuid}>
              <span>{todo.task}</span>
              <button
                className="border bg-rose-400 p-1 rounded-md"
                onClick={deleteTodo}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
