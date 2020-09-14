import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
// import Bebidas from './pages/Bebidas/Bebidas';
import ComidaDetalhes from './pages/Comidas/ComidaDetalhes/ComidaDetalhes';
// import BebidaDetalhes from './pages/Bebidas/BebidaDetalhes/BebidaDetalhes';
import Provider from './contexts/Provider';
// import Comidas from './pages/Comidas/Comidas'; */
import Home from './pages/Home/Home';
import Explorar from './pages/Explorar/Explorar';
import ExplorarComidas from './pages/Explorar/ExplorarComidas/ExplorarComidas';
import ExplorarBebidas from './pages/Explorar/ExplorarBebidas/ExplorarBebidas';
import Perfil from './pages/Perfil/Perfil';
import ExplorarIngredientes from './pages/Explorar/ExplorarIngredientes';
import ExplorarArea from './pages/Explorar/ExplorarArea';
import ReceitasFeitas from './pages/Perfil/ReceitasFeitas/ReceitasFeitas';
import ReceitasFavoritas from './pages/Perfil/ReceitasFavoritas/ReceitasFavoritas';

function App() {
  return (
    <Provider>
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/comidas" component={Home} />
            <Route exact path="/bebidas" component={Home} />
            <Route exact path="/comidas/:id" component={ComidaDetalhes} />
            <Route exact path="/bebidas/:id" component={ComidaDetalhes} />
            {/* <Route exact path="/comidas/:id/in-progress" component={ComidaDetalhes} /> */}
            {/* <Route exact path="/bebidas/:id/in-progress" component={BebidaDetalhes} /> */}
            <Route exact path="/explorar/bebidas/area" component={ExplorarArea} />
            <Route exact path="/explorar/comidas/area" component={ExplorarArea} />
            <Route exact path="/explorar/bebidas/ingredientes" component={ExplorarIngredientes} />
            <Route exact path="/explorar/comidas/ingredientes" component={ExplorarIngredientes} />
            <Route exact path="/explorar/bebidas" component={ExplorarBebidas} />
            <Route exact path="/explorar/comidas" component={ExplorarComidas} />
            <Route exact path="/explorar" component={Explorar} />
            <Route exact path="/perfil" component={Perfil} />
            <Route exact path="/receitas-feitas" component={ReceitasFeitas} />
            <Route exact path="/receitas-favoritas" component={ReceitasFavoritas} />
            <Route exact path="/" component={Login} />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
