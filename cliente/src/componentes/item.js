const Item = ({producto}) => {
    return (
        <div className="item">
            <p><strong>Id:</strong>{producto.id}</p>
            <p><strong>Nombre:</strong>{producto.nombre}</p>
            <p><strong>Descripcion:</strong>{producto.descripcion}</p>
            <p><strong>Codigo del producto:</strong>{producto.codigo}</p>
            <p><strong>$:</strong>{producto.precio}</p>
            <p><strong>Stock:</strong>{producto.stock}</p>
        </div>
        )
}
export default Item;