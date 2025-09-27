export const noop = () => {}

export const pick = <Obj extends Record<string, unknown>, Key extends keyof Obj>(
  props: Key[],
  obj: Obj
): Pick<Obj, Key> =>
  props.reduce(
    (acc, prop) => {
      acc[prop] = obj[prop]
      return acc
    },
    {} as Pick<Obj, Key>
  )
