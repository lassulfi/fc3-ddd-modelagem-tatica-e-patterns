class Customer {
    _id: string;
    _name: string;
    _address: string = ""; // opcional
    _active: boolean = true;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
    }

    changeName(name: string) {
        this._name = name;
    }

    changeAddress(address: string) {
        this._address = address;
    }

    activate() {
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }
}

// Os dados necessitam estar consistentes
// Pela regra de negocio não existem clientes sem nome
// let customer = new Customer("123");

// Dados consistentes
// devem estar disponiveis em todo o sistema
let customer = new Customer("123", "Maria de Fatima");
