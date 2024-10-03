# New Lambda Timeout permanent crash

## Description
Lambda allows 10s for functions to initialize.

Previously when the runtime or sandbox crashed, function timed out, or ran out of memory - it would reinitialize causing a [mini cold start](https://aaronstuyvenberg.com/posts/ice-cold-starts). This still happens, but now the re-initialization is limited **to the function timeout**.

## Impact
If you have a Lambda function with a very short timeout and it crashes, it may never be able to re-initialize.

## Example
1. Deploy with `cdk deploy`
2. Curl the output url
3. Add `<url>?crash=true` to the end of the url
4. Curl the output url again without `?crash=true`

Result: The function will never successfully re-initialize.
