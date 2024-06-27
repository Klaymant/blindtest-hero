export const StorybookHelper = {
  deactivateProps<T extends string>(...props: T[]) {
    return props.reduce((acc: Record<string, any>, prop) => {
      acc[prop] = { table: { disable: true }};
      return acc;
    }, {});
  },
};
