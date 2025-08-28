export const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem("todos", JSON.stringify(state));
  } catch (error) {
    console.error(error);
  }
};

export const getFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("todos");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
