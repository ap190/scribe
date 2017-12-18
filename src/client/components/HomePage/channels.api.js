export const handleDeleteChannel = (id = null) => {
  if (!id || typeof id !== "string") return;
  console.log(`deleting channel ${id}`);
};
