using CasaDoCodigo.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CasaDoCodigo.Models
{
    public class UpdateQuantidadeResponse
    {
        public UpdateQuantidadeResponse(ItemPedido temPedido, CarrinhoViewModel carrinhoViewModel)
        {
            this.temPedido = temPedido;
            CarrinhoViewModel = carrinhoViewModel;
        }

        public ItemPedido temPedido { get; }
        public CarrinhoViewModel CarrinhoViewModel { get; }
    }
}
