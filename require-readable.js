function require(file) {
  var f=new File(file), t=[], e=f.eof, i=0;
  if(f.isopen) {  
    for(;i<e;i++) t+=f.readchars(1);
    f.close(); eval(t+'');
  }
  else error("Missing required file: " + file);  
}

