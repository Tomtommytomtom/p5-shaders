export type complex = {
  real: number;
  imaginary: number;
};

export const complexAdd = (a: complex, b: complex) => {
  return {
    real: a.real + b.real,
    imaginary: a.imaginary + b.imaginary,
  };
};

export const complexMultiply = (a: complex, b: complex) => {
  return {
    real: a.real * b.real - a.imaginary * b.imaginary,
    imaginary: a.real * b.imaginary + a.imaginary * b.real,
  };
};

export const mandelbrot = (c: complex, constant: complex) => {
  return complexAdd(complexMultiply(c, c), constant);
};

export const complexMag = (c: complex) => {
  return Math.sqrt(c.real * c.real + c.imaginary * c.imaginary);
};

export const mandelbrotWithIterations = (
  c: complex,
  iterations: number
): {
  i: number;
  result: complex;
} => {
  let original = c;
  let current = c;
  let i = 0;

  while (complexMag(current) < 2 && i < iterations) {
    current = mandelbrot(current, original);
    i++;
  }

  return {
    i,
    result: current,
  };
};
