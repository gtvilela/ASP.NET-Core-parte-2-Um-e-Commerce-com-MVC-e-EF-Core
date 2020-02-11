using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CasaDoCodigo.wwwroot.js {
    public class Carrinho {
        clickIncremento(btn) {

            let data = this.getData(btn);
            this.postQuantidade(data);

        }

        clickDecremeto(btn) {
            let data = this.getData(btn);
            this.postQuantidade(data);
        }


        getData(elemento) {
            var linhaDoItem = $(elemento).parents('[item-id]')
            var itemId = $(linhaDoItem).attr('item-id');
            var novaQtde = $(linhaDoItem).find('input').val();

            return {
                Id: itemId,
                Quantidade: novaQtde
            };
        }

        postQuantidade(data) {
            $.ajax({
                url: '/pedido/updatequantdade',
                type: 'POST',
                contentType: 'application/json',
                data: Json.stringfy(data)
            });
        }





    }



}
