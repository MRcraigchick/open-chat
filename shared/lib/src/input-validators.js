export function validateText(val, minLength, maxLength) {
  return {
    required: !isNull(val),
    len: lengthInRange(val, minLength, maxLength),
  };
}

export function validateEmail(val) {
  const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return {
    required: !isNull(val),
    matches: emailRegEx.test(val),
  };
}

export function lengthInRange(val, min, max) {
  return minLength(val, min) && maxLength(val, max);
}

export function minLength(val, length) {
  return val.length < length ? false : true;
}

export function maxLength(val, length) {
  return val.length > length ? false : true;
}

export function isNull(val) {
  return (
    [null, 'null', NaN, 'NaN', undefined, 'undefined', false, 'false', ''].includes(
      val
    ) || val.length === 0
  );
}

export function validateBody({ body, expectedPropertys, allowNull = false }) {
  if (!body) return false;
  if (Object.keys(body).length !== expectedPropertys.length) return false;
  if (!Object.keys(body).every((key) => expectedPropertys.includes(key))) return false;
  if (allowNull) return true;
  else if (
    !Object.values(body).every((val) => {
      let result = false;
      if (
        ![null, 'null', NaN, 'NaN', undefined, 'undefined', false, 'false', ''].includes(
          val
        )
      ) {
        result = true;
      }
      if (val.length === 0) result = false;
      return result;
    })
  )
    return false;
  return true;
}
