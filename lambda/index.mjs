'use strict';

async function delay(millis) {
  return new Promise((resolve) => {
    setTimeout(resolve, millis);
  });
}

let crash = false;
// Simulate a longer init duration
await delay(3000);
console.log('init done');
export async function hello(event) {
  if (event.queryStringParameters && event.queryStringParameters.crash) {
    crash = true;
    // simulate timeout
    // After this the function will no longer run, permanently
    await delay(5000);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({message: 'Hello from Lambda!'})
  };
}
