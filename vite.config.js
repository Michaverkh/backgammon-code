export default {
  build: {
    treeshake: {
      moduleSideEffects: (id) => {
        return true;
      },
    },
  },
};
