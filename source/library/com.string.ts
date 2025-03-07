export namespace Str {
    /**
     *
     */
    export function trimSpace(data: string): string {
        return data.replace(/ /g, '')
    }

    /**
     *
     */
    export function ucFirst(data: string, strict: boolean = false): string {
        return data.charAt(0).toUpperCase() + (strict ? data.slice(1).toLowerCase() : data.slice(1));
    }

    /**
     *
     */
    export function ucWords(data: string, strict: boolean = false): string {
        return data.split(' ').map(frag => frag.charAt(0).toUpperCase() + (strict ? frag.slice(1).toLowerCase() : frag.slice(1))).join(' ');
    }

    /**
     *
     */
    export function random(length: number = 10): string {
        const provider: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const out: string[] = [];

        for (let index = 0; index < length; index++) {
            out.push(provider.charAt(Math.floor(Math.random() * provider.length)))
        }

        return out.join('');
    }


    /**
     *
     */
    export function logTime(date: Date | undefined = undefined): string {
        return (date || (new Date())).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        });
    }

    /**
     *
     */
    export function logDateTime(date: Date | undefined = undefined): string {
        return (date || (new Date())).toLocaleTimeString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        });
    }
}