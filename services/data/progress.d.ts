// progress.d.ts
declare module "progress" {
    interface ProgressBarOptions {
        total: number
        width?: number
        complete?: string
        incomplete?: string
        renderThrottle?: number
        callback?: () => void
        clear?: boolean
    }

    export default class ProgressBar {
        constructor(format: string, options: ProgressBarOptions)
        tick(len?: number): void
        update(ratio: number): void
        interrupt(message: string): void
        terminate(): void
        render(): void
        complete: boolean
        curr: number
        total: number
    }
}
