// enumはtypescriptの場合避けるべき。定義していない値が使われていてもコンパイル時に発見できないから
// enumは即時実行なので。 typescriptのUnion型を利用して定義するのがプラクティス
// https://qiita.com/saba_can00/items/bdefb28a1873658cf5d9
// STATUS_LEVELの名前衝突を回避でnamespace使ったけどこれはどうだろうか
// https://qiita.com/yuki153/items/a51878ad6a1ce913af48
export namespace Enum {
  export namespace Todo {
    export const STATUS_LEVEL = {
      UNDONE: 'undone', // Railsと違って文字列のほうが良さそう
      DONE: 'done',
      CANCELED: 'canceled',
    } as const

    // 0 | 1 | -1
    export type StatusLevel = typeof STATUS_LEVEL[keyof typeof STATUS_LEVEL]
  }
}

// https://scrapbox.io/nyaagoo/TypeScript_Enum%E3%81%AB%E9%9D%99%E7%9A%84%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC%E9%96%A2%E6%95%B0%E5%AE%9F%E8%A3%85
// namespace SystemAuth {
//   export function isGuest(auth: SystemAuth): boolean {
//     if (auth === SystemAuth.Guest)
//       return true;
//     else
//       return false;
//   }
//   export function isAboveMember(auth: SystemAuth): boolean {
//     if (auth === SystemAuth.Member || auth === SystemAuth.Admin)
//       return true;
//     else
//       return false;
//   }
// }
