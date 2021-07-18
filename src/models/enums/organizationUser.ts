// enumはtypescriptの場合避けるべき。定義していない値が使われていてもコンパイル時に発見できないから
// enumは即時実行なので。 typescriptのUnion型を利用して定義するのがプラクティス
// https://qiita.com/saba_can00/items/bdefb28a1873658cf5d9
// STATUS_LEVELの名前衝突を回避でnamespace使ったけどこれはどうだろうか
// https://qiita.com/yuki153/items/a51878ad6a1ce913af48
export namespace Enum {
  export namespace OrganizationUser {
    export const MEMBER_ROLE = {
      NORMAL: 'normal',
      MANAGER: 'manager',
    } as const

    export const ACCEPT_STATUS = {
      WAIT: 'wait',
      ACCEPT: 'accept',
    } as const

    export type Role = typeof MEMBER_ROLE[keyof typeof MEMBER_ROLE]
    export type Status = typeof ACCEPT_STATUS[keyof typeof ACCEPT_STATUS]
  }
}
