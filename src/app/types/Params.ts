export type Params<Type extends (...args: any) => any> = Type extends (...args: infer Args) => any ? Args : never;
