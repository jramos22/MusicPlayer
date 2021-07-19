function filename(){
    const rutaAbsoluta = self.location.href;   
    const posicionUltimaBarra = rutaAbsoluta.lastIndexOf("/");
    const rutaRelativa = rutaAbsoluta.substring( posicionUltimaBarra + "/".length , rutaAbsoluta.length );
    return rutaRelativa;  
}

export{
    filename,
}