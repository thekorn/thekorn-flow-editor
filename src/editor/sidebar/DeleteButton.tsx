import type { Component } from 'solid-js';

const DeleteButton: Component = () => {
  return (
    <button
      class="flex items-center justify-center gap-1 rounded border bg-red-700 p-2 px-2 py-1 text-white transition duration-100 ease-in hover:border-gray-400 focus:border-gray-400 active:border-gray-400 active:shadow"
      type="button"
    >
      Delete
    </button>
  );
};

export default DeleteButton;
