function filename(){
    const absoluteRout = self.location.href;   
    const lastbarposition = absoluteRout.lastIndexOf("/");
    const relativeRout = absoluteRout.substring( lastbarposition + "/".length , absoluteRout.length );
    return relativeRout;  
}

export{
    filename,
}

