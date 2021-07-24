// expressが非同期関数のrejectをハンドルしない思想なのでエラーのハンドリングを
// 行うラッパーを用意するベストプラクティス 全てのエンドポイントは基本これを使うはず
// @See https://expressjs.com/ja/advanced/best-practice-performance.html#promises
// @ts-ignore
const asyncHandler = fn => (...args) => fn(...args).catch(args[2])

export default asyncHandler
