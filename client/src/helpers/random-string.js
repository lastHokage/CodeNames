export default function randomString(alphabet) {
  const result = [];
  while (result.length < 6) {
    const randome = Math.floor(Math.random() * alphabet.length);
    result.push(alphabet[randome]);
  }
  return result.join("").toUpperCase();
}
