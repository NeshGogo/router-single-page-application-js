class Router{
  constructor(routes) {
    //Obtenemos el array de rutas de la aplicacion.
    this.routes = routes;
    this.loadInitialRoute();
  }

  matchUrlToRoute(urlSegs){
    //verifica que el segmento de la ruta coincida con los valores de rutas establecidos en el array de rutas.
    const matchedRoute = this.routes.find( route => {
      //parte el string en un arreglo y lo toma apartir del primer elemento.
      const routePathSegs = route.path.split('/').slice(1);
      //Cuando no coincide envia falso para cambiar de iteracion.
      if( routePathSegs.length !== urlSegs.length){
        return false;
      }

      //every: lo que hace es que verifica que todos los elementos de un array cumplan con la condicion.
      return routePathSegs
      .every((routePathSeg, i) => routePathSeg === urlSegs[i]);
    });

    return matchedRoute;
  }

  loadRoute(...urlSegs){
    //obtiene la ruta que coincide con el el segmento suministrado.
    const matchedRoute = this.matchUrlToRoute(urlSegs);
    //Estructura la url.
    const url = `/${urlSegs.join('/')}`;
    //Actualiza la ruta del navegador.
    history.pushState({},'this works', url);
    //obtiene el elemento del dom que se le pasara el template.
    const routerOutElement = document.querySelectorAll('[data-router]')[0];
    //Le pasamos el template de al elemento del dom.
    routerOutElement.innerHTML = matchedRoute.template;
  }
  //Esta es la inicializacion de nuestra ruta.
  loadInitialRoute(){
    //Obtiene la ruta actual y convierte en un arreglo divido por /.
    const pathNameSplit = window.location.pathname.split('/');
    //Obtiene el ultimo segmento de la ruta y si esta en la ruta raiz devuelve  string vacio. 
    const pathSegs = pathNameSplit.length > 1 ? pathNameSplit.slice(1) : '';
    this.loadRoute(...pathSegs);
  }

}
