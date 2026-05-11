
class ValidaCPF{
    constructor(cpfEnviado){
        Object.defineProperty(this,'cpfLimpo', {
            writable: false,
            enumerable: false,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        });
    }

    eSequencia(){
        return this.cpfLimpo.charAt(0). repeat(11) === this.cpfLimpo;
    }

    geraNovoCpf(){
        const cpfSemDigitos = this.cpfLimpo.slice(0, -2);
        const digito1 = ValidaCPF.geraDigito(cpfSemDigitos);
        const digito2 = ValidaCPF.geraDigito(cpfSemDigitos + digito1);
        this.novoCPF = cpfSemDigitos + digito1 + digito2
    }

    static geraDigito(cpfSemDigitos){
        let total = 0;
        let reverso = cpfSemDigitos.length + 1;

        for(let stringNumerica of cpfSemDigitos){
            total += reverso * Number(stringNumerica)
            reverso--;
        }
        const digito = 11 - (total% 11)
        return digito <= 9 ? String(digito) : '0';
    }
    valida(){
        if(!this.cpfLimpo) return false;
        if(typeof this.cpfLimpo !== 'string') return false;
        if(this.cpfLimpo.length !== 11) return false;
        if(this.eSequencia()) return false
        this.geraNovoCpf();
       
        return this.novoCPF === this.cpfLimpo
        
    }
}

class GeraCPF {
    rand(min = 100000000, max = 999999999) {
        return String(Math.floor(Math.random() * (max - min) + min));
    }

    formatado(cpf) {
        return (
            cpf.slice(0, 3) + '.' +
            cpf.slice(3, 6) + '.' +
            cpf.slice(6, 9) + '-' +
            cpf.slice(9, 11)
        );
    }

    geraNovoCpf() {
        const cpfSemDigito = this.rand();

        const digito1 = ValidaCPF.geraDigito(cpfSemDigito);
        const digito2 = ValidaCPF.geraDigito(cpfSemDigito + digito1);

        this.novoCPF = cpfSemDigito + digito1 + digito2;

        return this.formatado(this.novoCPF);
    }
}


const botao1 = document.querySelector('#btnValida');
const botao2 = document.querySelector('#btnGerar');

const p = document.querySelector('#txtCPF');
const resul = document.querySelector('#resulCPF');

const input = document.querySelector('#vCPF');


 botao1.addEventListener('click', e => {
    const validaCpf = new ValidaCPF(input.value);
    
    if (validaCpf.valida()) {
        resul.textContent = 'CPF valido';
    } else {
         resul.textContent = 'CPF invalido';
    }
});

botao2.addEventListener('click', e => {
   const gera = new GeraCPF();

    p.textContent  = (gera.geraNovoCpf());
});