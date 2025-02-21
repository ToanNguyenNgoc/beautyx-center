// declare module '@yaireo/tagify';
// declare module '@yaireo/tagify/dist/react.tagify';
declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}
interface ImportMeta {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  env: any;
}