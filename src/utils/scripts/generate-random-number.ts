export function generateRandomNumbers() {
  let code = '';
  for (let i = 0; i < 6; i++) {
    const randomNumber = Math.floor(Math.random() * 10);
    if (i === 3) {
      code += ' ';
    }
    code = code + randomNumber;
  }

  return code;
}
