export const handleDeleteChannel = (id = null, channels = null) => {
  if (!id || typeof id !== "string" || !channels) return;
  return channels.filter(channel => channel.id !== id);
};
