class Users {

    constructor() {
        this.id = 1;
        this.arrayUsers = [];
        this.editId = null;
    }

    salvar() {
        let user = this.lerDados();

        if (this.validaCampos(user)) {
            if (this.editId == null) {
                this.adicionar(user);
            } else {
                this.concluirEdicao(this.editId, user);
            }
        }

        this.listaTabela();
        this.limparFormulario();
    }

    listaTabela() {
        let tbody = document.getElementById("tbody");
        tbody.innerText = "";

        for (let i = 0; i < this.arrayUsers.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_name = tr.insertCell();
            let td_email = tr.insertCell();
            let td_cpf = tr.insertCell();
            let td_botaoDeletar = tr.insertCell();
            let td_botaoEditar = tr.insertCell();

            td_id.innerText = this.arrayUsers[i].id;
            td_name.innerText = this.arrayUsers[i].name;
            td_email.innerText = this.arrayUsers[i].email;
            td_cpf.innerText = this.arrayUsers[i].cpf;

            let botaoDeletar = document.createElement('button');
            botaoDeletar.innerHTML = "Deletar";
            botaoDeletar.setAttribute("onclick", "user.deletar(" + this.arrayUsers[i].id + ")");

            let botaoEditar = document.createElement('button');
            botaoEditar.innerHTML = "Editar";
            botaoEditar.setAttribute("onclick", "user.prepararEdicao(" + JSON.stringify(this.arrayUsers[i]) + ")");

            td_botaoDeletar.appendChild(botaoDeletar);
            td_botaoEditar.appendChild(botaoEditar);
        }
    }

    adicionar(user) {
        this.arrayUsers.push(user);

        this.id++;
    }

    lerDados() {
        let user = {}

        user.id = this.id;
        var name = document.getElementById("username");
        var email = document.getElementById("email");
        var cpf = document.getElementById("cpf");

        user.name = name.value;
        user.email = email.value;
        user.cpf = cpf.value;

        return user;
    }

    validaCampos(user) {
        let msg = "";

        if (user.name == "") {
            msg += "- Informe o seu nome! \n'";
        }

        if (user.email == "" || !(this.isEmailValid(user.email))) {
            msg += "- Informe o seu email corretamente! \n";
        }

        if (user.cpf == "" || !(this.isCPFValid(user.cpf))) {
            msg += "- Informe o seu cpf corretamente, com pontos e traço!! \n";
        }

        if (msg != "") {
            alert(msg);
            return false;
        }

        return true;
    }

    limparFormulario() {
        document.getElementById("username").value = "";
        document.getElementById("email").value = "";
        document.getElementById("cpf").value = "";
    }

    concluirEdicao(id, user) {
        for (let i = 0; i < this.arrayUsers.length; i++) {
            if (this.arrayUsers[i].id == id) {
                this.arrayUsers[i].name = user.name;
                this.arrayUsers[i].email = user.email;
                this.arrayUsers[i].cpf = user.cpf;
            }
        }

        document.getElementById("submit").innerText = "Submit";
        this.editId = null;
    }

    prepararEdicao(dados) {
        this.editId = dados.id;

        document.getElementById("username").value = dados.name;
        document.getElementById("email").value = dados.email;
        document.getElementById("cpf").value = dados.cpf;

        document.getElementById("submit").innerText = "Concluir edição";
    }

    deletar(id) {

        if (confirm("Confirme a remoção do usuario ID: " + id + "?")) {
            let tbody = document.getElementById("tbody");

            for (let i = 0; i < this.arrayUsers.length; i++) {
                if (id == this.arrayUsers[i].id) {
                    this.arrayUsers.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }
        }
    }

    isEmailValid(email) {
        const emailRegex = new RegExp(
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-z]{2,}$/
        );

        if (emailRegex.test(email)) {
            return true;
        }

        return false;
    }

    isCPFValid(cpf) {
        const cpfRegex = new RegExp(
            /^[0-9]{3}[.][0-9]{3}[.][0-9]{3}[-][0-9]{2}$/
        );

        if (cpfRegex.test(cpf)) {
            return true;
        }

        return false;
    }
}

var user = new Users();
