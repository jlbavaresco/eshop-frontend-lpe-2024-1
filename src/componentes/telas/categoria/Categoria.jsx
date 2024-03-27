import { useState, useEffect } from "react";
import CategoriaContext from "./CategoriaContext";
import { getCategoriasAPI, getCategoriaPorCodigoAPI, 
    deleteCategoriaPorCodigoAPI, cadastrarCategoriaAPI } 
    from "../../../servicos/CategoriaServico";
import Tabela from "./Tabela";

function Categoria(){

    const [alerta, setAlerta] = useState({ status : "", message : ""});
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({codigo : "", nome : ""});

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status : "", message : ""});
        setObjeto({codigo : 0, nome : ""});        
    }

    const editarObjeto = async codigo => {
        setObjeto(await getCategoriaPorCodigoAPI(codigo));
        setEditar(true);
        setAlerta({ status : "", message : ""});
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        let metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastrarCategoriaAPI(objeto, metodo);
            setAlerta({status : retornoAPI.status, message : retornoAPI.message});
            setObjeto(retornoAPI.objeto);
            if(!editar){
                setEditar(true);
            }
        } catch(err){
            console.log(err);
        }
        recuperaCategorias();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [name] : value});
    }

    const recuperaCategorias = async () => {
        setListaObjetos(await getCategoriasAPI());
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteCategoriaPorCodigoAPI(codigo);
            setAlerta({status : retornoAPI.status, message : retornoAPI.message});
            recuperaCategorias();
        }
    }

    useEffect(()=>{
        recuperaCategorias();
    },[]);


    return (
        <CategoriaContext.Provider value={ {
            alerta, listaObjetos, remover, 
            objeto, editar, acaoCadastrar, handleChange, novoObjeto, editarObjeto
        }}>
            <Tabela/>
            
        </CategoriaContext.Provider>
    )
}

export default Categoria;
