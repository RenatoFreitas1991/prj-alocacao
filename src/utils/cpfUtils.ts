export function formatCPF(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
  
  export function isValidCPF(cpf: string): boolean {
    const cleanedCPF = cpf.replace(/\D/g, "");
    if (cleanedCPF.length !== 11) return false;
  
    return true;
  }