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