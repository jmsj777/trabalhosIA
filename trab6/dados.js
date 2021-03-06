//prettier-ignore
const amostras = [
  [-1,-1, 1,-1,-1,-1, 1, 1,-1,-1,-1,-1, 1,-1,-1,-1,-1, 1,-1,-1,-1,-1, 1,-1,-1,-1,-1, 1,-1,-1,-1, 1, 1, 1,-1],
  [-1, 1, 1, 1,-1, 1,-1,-1,-1, 1,-1,-1,-1,-1, 1,-1,-1,-1, 1,-1,-1,-1, 1,-1,-1,-1, 1,-1,-1,-1, 1, 1, 1, 1, 1],
  [-1, 1, 1, 1,-1, 1,-1,-1,-1, 1,-1,-1,-1,-1, 1,-1,-1, 1, 1,-1,-1,-1,-1,-1, 1, 1,-1,-1,-1, 1,-1, 1, 1, 1,-1],
  [-1,-1,-1,-1, 1,-1,-1,-1, 1, 1,-1,-1, 1,-1, 1,-1, 1,-1,-1, 1, 1, 1, 1, 1, 1,-1,-1,-1,-1, 1,-1,-1,-1,-1, 1],
  [ 1, 1, 1, 1, 1, 1,-1,-1,-1,-1, 1,-1,-1,-1,-1, 1, 1, 1, 1,-1,-1,-1,-1,-1, 1,-1,-1,-1,-1, 1, 1, 1, 1, 1,-1],
  [-1, 1, 1, 1, 1, 1,-1,-1,-1,-1, 1,-1,-1,-1,-1, 1, 1, 1, 1,-1, 1,-1,-1,-1, 1, 1,-1,-1,-1, 1,-1, 1, 1, 1,-1],
  [ 1, 1, 1, 1, 1,-1,-1,-1,-1, 1,-1,-1,-1, 1,-1,-1,-1,-1, 1,-1,-1,-1, 1,-1,-1,-1,-1, 1,-1,-1,-1, 1,-1,-1,-1],
  [-1, 1, 1, 1,-1, 1,-1,-1,-1, 1, 1,-1,-1,-1, 1,-1, 1, 1, 1,-1, 1,-1,-1,-1, 1, 1,-1,-1,-1, 1,-1, 1, 1, 1,-1],
  [-1, 1, 1, 1,-1, 1,-1,-1,-1, 1, 1,-1,-1,-1, 1,-1, 1, 1, 1, 1,-1,-1,-1,-1, 1,-1,-1,-1,-1, 1, 1, 1, 1, 1,-1],
  [-1, 1, 1, 1,-1, 1,-1,-1,-1, 1, 1,-1,-1,-1, 1, 1,-1,-1,-1, 1, 1,-1,-1,-1, 1, 1,-1,-1,-1, 1,-1, 1, 1, 1,-1],
]
//prettier-ignore
const target = [
  [1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, 1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, 1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, 1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, 1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, 1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, 1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, 1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, 1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, 1],
]

export default {
  x: amostras,
  t: target,
}
