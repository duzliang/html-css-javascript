interface Square {
  kind: 'square';
  size: number;
}

interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}

interface Area {
  kind: 'circle';
  radius: number;
}

type Shape = Square | Rectangle | Area;

function area(s: Shape) {
  if (s.kind === 'square') {
    return s.size * s.size;
  } else if (s.kind === 'rectangle') {
    return s.width * s.height;
  } else if (s.kind === 'circle') {
    return Math.PI * s.radius ** 2;
  } else {
    const _exhaustiveCheck: never = s;
  }
}

/** use switch */
function areaWidthSwitch(s: Shape) {
  switch (s.kind) {
    case 'square':
      return s.size * s.size;
    case 'rectangle':
      return s.width * s.height;
    case 'circle':
      return Math.PI * s.radius ** 2;
    default:
      const _exhaustiveCheck: never = s;
  }
}
