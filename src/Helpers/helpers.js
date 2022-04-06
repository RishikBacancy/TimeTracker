function formatMilliseconds(t) {
  let sign = 1; // 1 for positive and 0 for negative
  if (t < 0) {
    t = -t;
    sign = 0;
  }
  const pad = function (n) {
    return n < 10 ? '0' + n : n;
  };
  var s, m, h;
  s = Math.floor(t / 1000);
  m = Math.floor(s / 60);
  s = s % 60;
  h = Math.floor(m / 60);
  m = m % 60;

  if (m === 60) {
    h++;
    m = 0;
  }
  const result = [pad(h), pad(m), pad(s)].join(':');
  return sign ? result : '-' + result;
}

export {formatMilliseconds};
