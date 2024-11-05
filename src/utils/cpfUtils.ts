const formatCPF = (value: string): string => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

const isValidCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    const calcCheckDigit = (digits: string) => {
        const sum = digits.split('').reduce((acc, curr, i) => acc + parseInt(curr) * (digits.length + 1 - i), 0);
        const mod = sum % 11;
        return mod < 2 ? 0 : 11 - mod;
    };

    const checkDigit1 = calcCheckDigit(cpf.slice(0, 9));
    const checkDigit2 = calcCheckDigit(cpf.slice(0, 10));

    return checkDigit1 === parseInt(cpf[9]) && checkDigit2 === parseInt(cpf[10]);
};


module.exports = { formatCPF, isValidCPF };