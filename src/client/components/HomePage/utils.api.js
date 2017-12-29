const getCurrentChannelAndThreadIdx = componentContext => {
  let currentThreads = componentContext.getCurrentThreads();
  let currentChannel = componentContext.getCurrentChannel();

  if (!currentChannel || !componentContext.state.channels)
    return { currentChannelIdx: null, currentThreadIdx: null };

  const currentChannelIdx = componentContext.state.channels.findIndex(
    channel => channel.id === currentChannel.id
  );
  const currentThreadIdx = currentThreads.findIndex(thread => thread.selected);

  return { currentChannelIdx, currentThreadIdx };
};

const getCurrentChannelAndThreadById = (
  componentContext,
  channelId,
  threadId
) => {
  if (!componentContext || !channelId || !threadId)
    return { currentChannelIdx: null, currentThreadIdx: null };

  const currentChannelIdx = componentContext.state.channels.findIndex(
    channel => channel.id === channelId
  );

  if (currentChannelIdx === -1)
    throw new Error("Utils API, could not find ChannelsIDX!");

  const currentThreadIdx = componentContext.state.channles.findIndex(
    componentContext.state.channels[currentChannelIdx].findIndex(
      thread => thread.id === threadId
    )
  );

  if (currentThreadIdx === -1)
    throw new Error("Utils API, could not find ChannelsIDX!");

  return {
    currentChannelIdx,
    currentThreadIdx
  };
};

export const getChannelAndThreadIdx = (
  componentContext,
  channelId,
  threadId
) => {
  if (!channelId || !threadId)
    return getCurrentChannelAndThreadIdx(componentContext);
  return getCurrentChannelAndThreadById(componentContext, channelId, threadId);
};
