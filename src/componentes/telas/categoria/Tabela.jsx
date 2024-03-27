import { useContext } from "react";
import CategoriaContext from "./CategoriaContext";
import Alerta from "../../comuns/Alerta";

function Tabela() {

    const { alerta, listaObjetos, remover } = useContext(CategoriaContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Categorias</h1>
            <Alerta alerta={alerta} />
            <button type="button" className="btn btn-primary">
                Novo <i className="bi bi-file-plus"></i>
            </button>
            {listaObjetos.length === 0 && <h1>Nenhum registro encontrado</h1>}
            {listaObjetos.length > 0 &&
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                                <th scope="col">Código</th>
                                <th scope="col">Nome</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaObjetos.map(objeto => (
                                    <tr>
                                        <td align="center">
                                            <button className="btn btn-info"
                                                title="Editar">
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                            <button className="btn btn-danger"
                                                title="Remover"
                                                onClick={() =>
                                                    remover(objeto.codigo)}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                        <th scope="row">{objeto.codigo}</th>
                                        <td>{objeto.nome}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            }

        </div>
    )
}

export default Tabela;
