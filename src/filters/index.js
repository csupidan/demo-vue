export function formatters(val, format) {
  if (typeof (format) === 'function') {
    return format(val)
  } else return val
}

