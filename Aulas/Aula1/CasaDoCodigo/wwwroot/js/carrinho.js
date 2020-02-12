class Carrinho {
    //Função para aumentar uma unidade a cada click no botão +
    clickIncremento(button) {

        let data = this.getData(button);
        data.Quantidade++;
        this.postQuantidade(data);

    }

    //Função para diminuir uma unidade a cada click no botão -
    clickDecremento(button) {
        let data = this.getData(button);
        data.Quantidade--;
        this.postQuantidade(data);
    }

    //Função para atualizar a quantidade de itens
    updateQuantidade(input) {

        let data = this.getData(input);
        this.postQuantidade(data);
    }

    getData(elemento) {
        //Pegar o elemento pai do atributo item-id
        var linhaDoItem = $(elemento).parents('[item-id]')
        //Pegar o atributo desse elemento pai
        var itemId = $(linhaDoItem).attr('item-id');
        //Incluir a nova quantidade no elemento input desse pai (ou o botão de + ou o de -);
        var novaQuantidade = $(linhaDoItem).find('input').val();

        //Retorno JSON informando o id e a quantidade do item
        return {
            Id: itemId,
            Quantidade: novaQuantidade
        };
    }

    postQuantidade(data) {

        let token = $('[name=__RequestVerificationToken]').val();

        let headers = {};
        headers['RequestVerificationToken'] = token;

        $.ajax({
            url: '/pedido/updatequantidade',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            headers: headers
        }).done(function (response) {
            //Aumentar a quantidade de itens do mesmo produto ao clicar em + e diminuir ao clicar em -
            let itemPedido = response.itemPedido;
            let linhaDoItem = $('[item-id=' + itemPedido.id + ']');
            linhaDoItem.find('input').val(itemPedido.quantidade);
            //Aumenta/dimunui o valor do subtotal do mesmo produto ao aumentar/diminuir a quantidade de itens no carrinho
            //Formatar com duas casas decimais através da função duasCasas()
            linhaDoItem.find('[subtotal]').html((itemPedido.subtotal).duasCasas());

            //Informar a soma da quantidade de itens dos produtos no carrinho
            let carrinhoViewModel = response.carrinhoViewModel;
            $('[numero-itens]').html('Total:' + carrinhoViewModel.itens.length + ' itens');
            $('[total]').html((carrinhoViewModel.total).duasCasas());

            //Remover o item do carrinho caso a quantidade passar a ser zero
            if (itemPedido.quantidade == 0) {
                linhaDoItem.remove();
            }

        });
    }

}

var carrinho = new Carrinho;


//Função para formatar o valor em duas casas decimais e separado por vírgula
Number.prototype.duasCasas = function () {
    return this.toFixed(2).replace('.', ',');
}