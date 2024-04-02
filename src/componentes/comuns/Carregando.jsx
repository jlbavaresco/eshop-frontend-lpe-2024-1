function Carregando(props) {

    return (
        <>
            {
                !props.carregando ? props.children :

                <div className="d-flex align-items-center m-5">
                    <strong role="status">Carregando...</strong>
                    <div className="spinner-border ms-auto" aria-hidden="true"></div>
                </div>
            }
        </>
    )

}

export default Carregando;