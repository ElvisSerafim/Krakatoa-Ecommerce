export function checkString(Novo: string, Antigo: string): boolean {
    if (typeof Novo === 'string' && Novo !== Antigo)
        return true;
    return false;
}

export function checkNumber(Novo: number, Antigo: number): boolean {
    if (typeof Novo === 'number' && Novo > 0 && Novo !== Antigo)
        return true;
    return false;
}
export function checkArray(Novo: string[], Antigo: string[]): boolean {
    if (typeof Novo !== 'undefined' && Novo.length > 0 && Novo !== Antigo)
        return true;
    return false;
}