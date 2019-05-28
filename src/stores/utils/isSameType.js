export default function isSameType(
  target, // instance created by Model.create
  type, // model
) {
  return type.is(target.$treenode.storedValue);
}
