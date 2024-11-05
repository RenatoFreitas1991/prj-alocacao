var formatCPF = function (value) {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

var isValidCPF = function (cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf))
        return false;
    var calcCheckDigit = function (digits) {
        var sum = digits.split('').reduce(function (acc, curr, i) { return acc + parseInt(curr) * (digits.length + 1 - i); }, 0);
        var mod = sum % 11;
        return mod < 2 ? 0 : 11 - mod;
    };
    var checkDigit1 = calcCheckDigit(cpf.slice(0, 9));
    var checkDigit2 = calcCheckDigit(cpf.slice(0, 10));
    return checkDigit1 === parseInt(cpf[9]) && checkDigit2 === parseInt(cpf[10]);
};

module.exports = { formatCPF: formatCPF, isValidCPF: isValidCPF };
